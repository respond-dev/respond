import { APIGatewayProxyEvent } from "aws-lambda"
import { IncomingMessage } from "http"
import { UrlWithStringQuery } from "url"

export interface InitializerInputType {
  client?: boolean
  apiGatewayProxyEvent?: APIGatewayProxyEvent
  httpIncomingMessage?: IncomingMessage
}

export interface InitializerOutputType {
  headers: Record<string, string>
  method: string
  url: UrlWithStringQuery
}
