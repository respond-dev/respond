import { APIGatewayProxyEvent } from "aws-lambda"
import { IncomingMessage } from "http"

export interface ConstructorInputType {
  client?: Window
  apiGatewayProxyEvent?: APIGatewayProxyEvent
  httpIncomingMessage?: IncomingMessage
}

export interface ConstructorOutputType {
  constructed?: boolean
}
