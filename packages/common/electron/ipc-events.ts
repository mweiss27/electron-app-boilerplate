export interface IpcEvent {
  readonly request: string
  readonly response: string
}

const createIpcEvent = (name: string): IpcEvent => ({
  request: `${name}.request`,
  response: `${name}.response`,
})

export const IpcEvents = {
  GetUserDataPath: createIpcEvent("GetUserDataPath"),
}
