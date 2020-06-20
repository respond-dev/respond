import { busboyBuilder } from "../lib/busboyBuilder"
import { headerCleaner } from "../lib/headerCleaner"
import RequesterInputType from "./requesterInputType"
import RequesterOutputType from "./requesterOutputType"

export class LambdaRequester {
  accept({
    apiGatewayProxyEvent,
  }: RequesterInputType): boolean {
    return !!apiGatewayProxyEvent
  }

  async respond({
    apiGatewayProxyEvent: req,
  }: RequesterInputType): Promise<RequesterOutputType> {
    const [path, querystring] = req.path.split("?")
    const headers = headerCleaner(req.headers)

    let body = req.body
    let params = {}
    let files = {}

    if (req.isBase64Encoded) {
      body = Buffer.from(
        req.body.toString(),
        "base64"
      ).toString()
    }

    if (req.httpMethod === "POST") {
      if (headers["content-type"] === "application/json") {
        params = JSON.parse(body)
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
      files,
      headers,
      method: req.httpMethod,
      params,
      path,
      querystring,
    }
  }
}

export const httpRequester = new LambdaRequester()
export default httpRequester
