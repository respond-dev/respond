import { APIGatewayProxyEvent } from "aws-lambda"
import querystring from "querystring"
import cookie from "cookie"
import { busboyBuilder } from "../lib/busboyBuilder"
import { headerCleaner } from "../lib/headerCleaner"

export interface LambdaRequesterInput {
  apiGatewayProxyEvent?: APIGatewayProxyEvent
}

export interface LambdaRequesterOutput {
  cookies: Record<string, string>
  files: Record<
    string,
    { name: string; path: string; mimetype: string }
  >
  headers: Record<string, string>
  method: string
  params: Record<string, any>
  path: string
}

export class LambdaRequester {
  accept({
    apiGatewayProxyEvent,
  }: LambdaRequesterInput): boolean {
    return !!apiGatewayProxyEvent
  }

  async respond({
    apiGatewayProxyEvent: req,
  }: LambdaRequesterInput): Promise<LambdaRequesterOutput> {
    const [path, pathParams] = req.path.split("?")
    const headers = headerCleaner(req.headers)
    const cookies = headers.cookie
      ? cookie.parse(headers.cookie)
      : {}

    let body = req.body
    let params = {}
    let files = {}

    if (req.httpMethod === "GET" && pathParams) {
      params = querystring.parse(pathParams)
    }

    if (req.isBase64Encoded) {
      body = Buffer.from(
        req.body.toString(),
        "base64"
      ).toString()
    }

    if (req.httpMethod === "POST") {
      if (headers["content-type"] === "application/json") {
        params = JSON.parse(body)
      } else if (
        headers["content-type"] ===
        "application/x-www-form-urlencoded"
      ) {
        params = querystring.parse(body)
      } else {
        const [busboy, finished] = busboyBuilder(
          headers,
          files,
          params
        )

        busboy.write(
          req.body,
          req.isBase64Encoded ? "base64" : "binary"
        )

        busboy.end()
        ;({ files, params } = await finished)
      }
    }

    return {
      cookies,
      files,
      headers,
      method: req.httpMethod,
      params,
      path,
    }
  }
}

export const httpRequester = new LambdaRequester()
export default httpRequester
