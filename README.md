# Respond

JavaScript web framework optimized for delivery 🚚

## New tech

- Client side ES modules (🚫 webpack)
- TypeScript in devtools (🚫 compiled JS)
- Multiple server modes (Node.js HTTP, AWS Lambda, Cloudflare Worker ☁️)
- Universal routing (SSR & SPA)
- JSX

## Old wisdom

- Framework included (hack on the framework live ⚡)
- First class approach to server side code execution
- Thin JSX implementation (🚫 virtual dom, ✅ `createElement`)
- Remote function calls (🚫 graphql)
- Very few production NPM dependencies

## New project

```bash
git clone git@github.com:respond-dev/respond.git [project-name]
cd [project-name]
npm install
```

## Start server

```bash
npm start
```

## Request phases

1. [`initializers`](src/initializers) — Prepare basic universal inputs (headers, method, and url)
2. [`middleware`](src/middleware) — Prepare conditional inputs (params, cookies, uploads)
3. [`routes`](src/routes) — User code to build output (retrieve data, return elements)
4. [`layouts`](src/layouts) — Views that wrap the route output
5. [`finalizers`](src/finalizers) — Prepares final output (body, MIME type, HTTP code)
