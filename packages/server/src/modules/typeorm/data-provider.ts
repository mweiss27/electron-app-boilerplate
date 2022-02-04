import { Func1, Nullable } from "@common/typings"
import { Injectable } from "@nestjs/common"
import { groupBy } from "lodash"
import {
  BaseEntity,
  Connection,
  EntityManager,
  EntityTarget,
  getConnection as globalGetConnection,
  ObjectType,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
} from "typeorm"
import { connectionOptions } from "./db"

const defaultParentAlias = "parent"
const defaultChildAlias = "child"

@Injectable()
export class DataProvider {
  private transactionalEntityManager: Nullable<EntityManager>

  public getConnection(): Connection {
    return globalGetConnection(connectionOptions.name)
  }

  private getEntityManager(): EntityManager {
    return this.transactionalEntityManager ?? this.getConnection().manager
  }

  public transaction<T>(fn: Func1<EntityManager, Promise<T>>): Promise<T> {
    return this.getConnection().transaction(async (tem: EntityManager): Promise<T> => {
      this.transactionalEntityManager = tem
      try {
        return await fn(tem)
      } finally {
        this.transactionalEntityManager = null
      }
    })
  }

  public getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity> {
    return this.getEntityManager().getRepository(target)
  }

  public save<Entity, TEntityType = Entity | Entity[]>(
    entity: TEntityType,
    options?: SaveOptions
  ): Promise<TEntityType> {
    return this.getEntityManager().save(entity, options)
  }

  public remove<Entity, TEntityType = Entity | Entity[]>(
    entity: TEntityType,
    options?: SaveOptions
  ): Promise<TEntityType> {
    return this.getEntityManager().remove(entity, options)
  }

  public getPrimaryKeyPropertyName<T extends BaseEntity>(entity: T | EntityTarget<T>): string {
    const connection = this.getConnection()
    const entityMetadata =
      entity instanceof BaseEntity
        ? connection.entityMetadatas.find(em => em.inheritanceTree[0] === entity.constructor)
        : connection.getMetadata(entity)

    if (entityMetadata) {
      const primaryColumns = entityMetadata.ownColumns.filter(c => c.isPrimary)
      if (primaryColumns.length !== 1) {
        throw new Error(`Failed to get a single primary column for entity ${entity}: ${primaryColumns}`)
      }
      const primaryProperty = primaryColumns[0].propertyName
      return primaryProperty
    }

    throw new Error(`Failed to get metadata for entity ${entity}`)
  }

  private async getChildItems<TParent extends BaseEntity, TResult>(
    parentEntityTarget: ObjectType<TParent>,
    parentKeys: ReadonlyArray<number>,
    relation: keyof TParent,
    defaultValue: TResult,
    customExpression?: CustomExpression<TParent>
  ): Promise<ReadonlyArray<TResult>> {
    const parentPrimaryKey = this.getPrimaryKeyPropertyName(parentEntityTarget)

    const parentAlias = customExpression?.parentAlias ?? defaultParentAlias
    const childAlias = customExpression?.childAlias ?? defaultChildAlias

    let parentsWithChildrenQuery = this.getRepository(parentEntityTarget)
      .createQueryBuilder(parentAlias)
      .innerJoinAndSelect(`${parentAlias}.${relation}`, childAlias)

    if (customExpression) {
      parentsWithChildrenQuery = customExpression.expression(parentsWithChildrenQuery)
    }

    parentsWithChildrenQuery = parentsWithChildrenQuery.where(
      `${parentAlias}.${parentPrimaryKey} IN (:...parentKeys)`,
      {
        parentKeys,
      }
    )

    const parentsWithChildren = await parentsWithChildrenQuery.getMany()

    const childrenLookupByParentId = groupBy(parentsWithChildren, parent => parent[parentPrimaryKey])
    const result = parentKeys.map(
      parentId => (childrenLookupByParentId[parentId]?.[0]?.[relation] ?? (defaultValue as unknown)) as TResult
    )

    return result
  }

  public async getChild<TParent extends BaseEntity, TChild>(
    parentEntityTarget: ObjectType<TParent>,
    parentKeys: ReadonlyArray<number>,
    relation: keyof TParent,
    customExpression?: CustomExpression<TParent>
  ): Promise<ReadonlyArray<Nullable<TChild>>> {
    return this.getChildItems<TParent, Nullable<TChild>>(
      parentEntityTarget,
      parentKeys,
      relation,
      null,
      customExpression
    )
  }

  public async getChildren<TParent extends BaseEntity, TChild>(
    parentEntityTarget: ObjectType<TParent>,
    parentKeys: ReadonlyArray<number>,
    relation: keyof TParent,
    customExpression?: CustomExpression<TParent>
  ): Promise<ReadonlyArray<ReadonlyArray<TChild>>> {
    return this.getChildItems<TParent, ReadonlyArray<TChild>>(
      parentEntityTarget,
      parentKeys,
      relation,
      [],
      customExpression
    )
  }
}

export interface CustomExpression<TParent> {
  readonly expression: Func1<SelectQueryBuilder<TParent>, SelectQueryBuilder<TParent>>
  readonly parentAlias: string
  readonly childAlias: string
}
