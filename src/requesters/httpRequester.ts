import { APIGatewayProxyEvent } from "aws-lambda"
import { IncomingMessage } from "http"
import querystring from "querystring"
import { busboyBuilder } from "../lib/busboyBuilder"
import { headerCleaner } from "../lib/headerCleaner"
import streamStringifier from "../lib/streamStringifier"

export interface HttpRequesterInput {
  apiGatewayProxyEvent?: APIGatewayProxyEvent
  httpIncomingMessage?: IncomingMessage
}

export interface HttpRequesterOutput {
  files: Record<
    string,
    { name: string; path: string; mimetype: string }
  >
  headers: Record<string, string>
  method: string
  params: Record<string, any>
  path: string
}

export class HttpRequester {
  accept({
    httpIncomingMessage,
  }: HttpRequesterInput): boolean {
    return !!httpIncomingMessage
  }

  async respond({
    httpIncomingMessage: req,
  }: HttpRequesterInput): Promise<HttpRequesterOutput> {
    const headers = headerCleaner(req.headers)
    const [path, pathParams] = req.url.split("?")

    let params = {}
    let files = {}

    if (req.method === "GET" && pathParams) {
      params = querystring.parse(pathParams)
    }

    if (req.method === "POST") {
      if (headers["content-type"] === "application/json") {
        params = JSON.parse(await streamStringifier(req))
      } else {
        const [busboy, finished] = busboyBuilder(
          headers,
          files,
          params
        )

        req.pipe(busboy)
        ;({ files, params } = await finished)
      }
    }

    return {
      files,
      headers,
      method: req.method,
      params,
      path,
    }
  }
}

export const httpRequester = new HttpRequester()
export default httpRequester
