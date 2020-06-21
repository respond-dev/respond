import URL from "url"
import { headerCleaner } from "../lib/headerCleaner"
import InitializerInputType from "./initializerInputType"
import InitializerOutputType from "./initializerOutputType"

export class HttpInitializer {
  accept({
    httpIncomingMessage,
  }: InitializerInputType): boolean {
    return !!httpIncomingMessage
  }

  async respond({
    httpIncomingMessage: req,
  }: InitializerInputType): Promise<InitializerOutputType> {
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

export const httpInitializer = new HttpInitializer()
export default httpInitializer
