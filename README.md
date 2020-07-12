# Respond

TypeScript web framework optimized for delivery 🚚

## New tech

- First class universal routing (SSR & SPA 🧖‍♀️)
- Client side ES modules (🚫 webpack, ✅ MJS)
- TypeScript sources and breakpoints in browser 🧘
- Built-in server environments (Node.js HTTP, AWS Lambda, Cloudflare Worker ☁️)
- JSX 🏭

## Old wisdom

- Structured request pipeline (initializers, middleware, etc 🏗️)
- Simple DOM operations (🚫 virtual dom, ✅ `createElement`)
- Simple remote function calls 🛰️
- Very few production NPM dependencies 📉📦

## Create a new project

```bash
git clone git@github.com:respond-dev/respond.git [project-name]
cd [project-name]
npm install
```

## Start server

```bash
npm start
```

## Universal request pipeline

There are five successive phases of the universal request pipeline. Each phase corresponds to a directory of source files:

1. [`src/pipeline/constructors`](src/pipeline/constructors) — Builds input for initializers, only runs once
2. [`src/pipeline/initializers`](src/pipeline/initializers) — Builds input for middleware, only runs when route changes
3. [`src/pipeline/middleware`](src/pipeline/middleware) — Builds input for routers
4. [`src/pipeline/routers`](src/pipeline/routers) — Executes user code to build output for settlers
5. [`src/pipeline/settlers`](src/pipeline/settlers) — Settles the final output

Each source file exports a default function, which executes in parallel with other functions of the same directory (phase). Its collective output combines to build the input for the next phase of the pipeline.

If a source file begins with `client` or `server`, it will only execute on the respective environment. Otherwise, it is up to the function to conditionally enable or disable itself.
