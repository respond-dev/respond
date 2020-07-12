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

## Request pipeline

There are five successive phases of the request pipeline. Each phase corresponds to a directory of source files:

1. [`src/pipeline/constructors`](src/pipeline/constructors) — Builds input for initializers (⚠️ only executes on very first request)
2. [`src/pipeline/initializers`](src/pipeline/initializers) — Builds input for middleware (⚠️ in SPA mode, only executes when route changes)
3. [`src/pipeline/middleware`](src/pipeline/middleware) — Builds input for routers
4. [`src/pipeline/routers`](src/pipeline/routers) — Executes user code to build output
5. [`src/pipeline/settlers`](src/pipeline/settlers) — Builds the final output

Each source file exports a default function. This function executes in parallel with other functions of the same directory (phase), and its collective output combines to build the input for the next phase of the pipeline.

If a source file begins with `client` or `server`, it will only execute on the respective environment. Otherwise, it is up to the function to conditionally enable or disable itself.
