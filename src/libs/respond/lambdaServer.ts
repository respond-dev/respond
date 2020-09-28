import "source-map-support/register"
import { APIGatewayProxyEvent } from "aws-lambda"
import { APIGatewayProxyResult } from "aws-lambda"
import pipelinePaths from "libs/pipelinePaths/pipelinePaths"
import requester from "./requester"

export async function lambdaServer(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const modules = await pipelinePaths("web-app")

  const { respond } = await requester(modules, {
    apiGatewayProxyEvent: event,
  })

  const { binary, httpCode, mimeType, output } = respond

  return {
    body: typeof output === "string" ? output : "",
    headers: { "Content-Type": mimeType },
    isBase64Encoded: binary,
    statusCode: httpCode,
  }
}