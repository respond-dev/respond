import URL from "url"
import { headerCleaner } from "../lib/headerCleaner"
import RequesterInputType from "./requesterInputType"
import RequesterOutputType from "./requesterOutputType"

export class HttpRequester {
  accept({
    httpIncomingMessage,
  }: RequesterInputType): boolean {
    return !!httpIncomingMessage
  }

  async respond({
    httpIncomingMessage: req,
  }: RequesterInputType): Promise<RequesterOutputType> {
    const headers = headerCleaner(req.headers)
    const https = !!req.socket["encrypted"]
    const url = URL.parse(
      `http${https ? "s" : ""}://${headers.host}${req.url}`
    )

    return {
      headers,
      method: req.method,
      url,
    }
  }
}

export const httpRequester = new HttpRequester()
export default httpRequester
