import { APIGatewayProxyEvent } from "aws-lambda"
import { IncomingMessage } from "http"

export interface RequesterInputType {
  apiGatewayProxyEvent?: APIGatewayProxyEvent
  httpIncomingMessage?: IncomingMessage
}

export default RequesterInputType
