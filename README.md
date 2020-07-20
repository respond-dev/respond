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

There are five successive phases of the universal request pipeline. Each phase corresponds to a directory of source files that export a default function:

1. **constructors** ([app](src/constructors), [framework](src/framework/constructors)) — Builds input for initializers, only runs once
2. **initializers** ([app](src/initializers), [framework](src/framework/initializers)) — Builds input for middleware, only runs when route changes
3. **middleware** ([app](src/middleware), [framework](src/framework/middleware)) — Builds input for routers
4. **routers** ([app](src/routers), [framework](src/framework/routers)) — Executes user code to build output for settlers
5. **settlers** ([app](src/settlers), [framework](src/framework/settlers)) — Settles the final output

With each phase of the request pipeline, the functions in each respective directory execute in parallel. Their collective output combines to build the input for the next phase of the pipeline.

If a source file begins with `client` or `server`, it will only execute on that environment. Otherwise, it is up to the function to conditionally enable or disable itself.
