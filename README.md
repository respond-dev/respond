# Respond

TypeScript web framework optimized for delivery 🚚

## New tech

- Universal routing (SSR & SPA 🧖‍♀️)
- Client side ES modules (🚫 webpack)
- TypeScript source in devtools (🚫 compiled JS)
- Built-in server environments (Node.js HTTP, AWS Lambda, Cloudflare Worker ☁️)
- JSX 🏭

## Old wisdom

- Structured request pipeline (initializers, middleware, layouts, etc)
- First class approach to server side execution
- Simple DOM operations (🚫 virtual dom, ✅ `createElement`)
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
