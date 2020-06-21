import { APIGatewayProxyEvent } from "aws-lambda"
import { IncomingMessage } from "http"

export interface InitializerInputType {
  apiGatewayProxyEvent?: APIGatewayProxyEvent
  httpIncomingMessage?: IncomingMessage
}

export default InitializerInputType
