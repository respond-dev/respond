import "source-map-support/register"
import { APIGatewayProxyEvent } from "aws-lambda"
import { APIGatewayProxyResult } from "aws-lambda"
import modulesLister from "./modulesLister"
import requester from "./requester"

export async function lambdaServer(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const modules = await modulesLister()

  const output = await requester(modules, {
    apiGatewayProxyEvent: event,
  })

  const {
    finalHttpCode,
    finalMimeType,
    finalOutput,
  } = output

  return {
    body: finalOutput || "",
    headers: { "Content-Type": finalMimeType },
    isBase64Encoded: finalMimeType === "font/ttf",
    statusCode: finalHttpCode,
  }
}
