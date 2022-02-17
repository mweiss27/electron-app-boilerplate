import { Ports } from "./ports"

export abstract class ServerClientBase {
  private endpointBase: string

  constructor(endpointBase: string) {
    this.endpointBase = endpointBase.startsWith("/") ? endpointBase : `/${endpointBase}`
  }

  protected generateUrl(endpoint: string): string {
    return `http://localhost:${Ports.Server}${this.endpointBase}${endpoint ?? ""}`
  }

  protected get<T>(endpoint: string): Promise<T> {
    return fetch(this.generateUrl(endpoint)).then(response => response.json())
  }

  protected post<T>(endpoint: string, data?: object): Promise<T> {
    return fetch(this.generateUrl(endpoint), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    }).then(response => response.json())
  }
}
