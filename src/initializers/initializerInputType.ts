import { APIGatewayProxyEvent } from "aws-lambda"
import { IncomingMessage } from "http"

export interface InitializerInputType {
  client?: boolean
  apiGatewayProxyEvent?: APIGatewayProxyEvent
  httpIncomingMessage?: IncomingMessage
}

export default InitializerInputType
