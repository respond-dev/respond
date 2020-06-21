import URL from "url"
import { headerCleaner } from "../lib/headerCleaner"
import InitializerInputType from "./initializerInputType"
import InitializerOutputType from "./initializerOutputType"

export class LambdaInitializer {
  accept({
    apiGatewayProxyEvent,
  }: InitializerInputType): boolean {
    return !!apiGatewayProxyEvent
  }

  async respond({
    apiGatewayProxyEvent: req,
  }: InitializerInputType): Promise<InitializerOutputType> {
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

export const httpInitializer = new LambdaInitializer()
export default httpInitializer
