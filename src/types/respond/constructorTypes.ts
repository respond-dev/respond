import { APIGatewayProxyEvent } from "aws-lambda"
import { IncomingMessage } from "http"
import { SettlerOutputType } from "./settlerTypes"

export interface ConstructorInputType {
  client?: boolean
  apiGatewayProxyEvent?: APIGatewayProxyEvent
  httpIncomingMessage?: IncomingMessage
}

export type ConstructorOutputType = SettlerOutputType & {
  constructed?: boolean
}
