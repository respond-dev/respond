import URL from "url"
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
    const headers = headerCleaner(req.headers)
    const url = URL.parse(
      `https://${headers.host}${req.path}`
    )

    return {
      headers,
      method: req.httpMethod,
      url,
    }
  }
}

export const httpRequester = new LambdaRequester()
export default httpRequester
