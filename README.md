# Respond

TypeScript web framework optimized for delivery 🚚

## New tech

- Universal routing (SSR & SPA 🧖‍♀️)
- Client side ES modules (🚫 webpack, ✅ dynamic imports)
- TypeScript sources in devtools (breakpoints! 🔴)
- Built-in server environments (Node.js HTTP, AWS Lambda, Cloudflare Worker ☁️)
- JSX 🏭

## Old wisdom

- First class approach to server side execution 🥇
- Structured request pipeline (initializers, middleware, layouts 🏗️)
- Simple DOM operations (🚫 virtual dom, ✅ `createElement`)
- Simple remote function calls 🛰️
- Very few production NPM dependencies 🚫📦

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
2. [`middleware`](src/middleware) — Prepare conditional complex inputs (params, cookies, uploads)
3. [`routes`](src/routes) — Render output for particular conditions (typically by url)
4. [`layouts`](src/layouts) — Layouts wrap the route output
5. [`finalizers`](src/finalizers) — Prepares final output (body, MIME type, HTTP code)
