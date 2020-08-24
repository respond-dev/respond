import { APIGatewayProxyEvent } from "aws-lambda"
import { IncomingMessage } from "http"
import elementBuilder from "../lib/elementBuilder"

export interface ConstructorInputType {
  client?: boolean
  apiGatewayProxyEvent?: APIGatewayProxyEvent
  httpIncomingMessage?: IncomingMessage
}

export interface ConstructorOutputType {
  constructed?: boolean
  doc?: Document
  elementBuilder?: typeof elementBuilder
  win?: Window
}
