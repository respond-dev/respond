import "source-map-support/register"
import { APIGatewayProxyEvent } from "aws-lambda"
import { APIGatewayProxyResult } from "aws-lambda"
import pipelinePaths from "libs/pipelinePaths/pipelinePaths"
import pipeline from "libs/pipeline/pipeline"
import { SettlerOutputType } from "types/respond/settlerTypes"
import { join } from "path"

export async function lambdaServer(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const modules = await pipelinePaths("web-app")

  const { respond }: SettlerOutputType = await pipeline(
    "web-app",
    {
      input: {
        apiGatewayProxyEvent: event,
        remoteModelDirPath: join(
          __dirname,
          "apps/web/models"
        ),
      },
      paths: modules,
    }
  )

  const { binary, httpCode, mimeType, output } = respond

  return {
    body: typeof output === "string" ? output : "",
    headers: { "Content-Type": mimeType },
    isBase64Encoded: binary,
    statusCode: httpCode,
  }
}
