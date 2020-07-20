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

1. **constructors** — Builds input for initializers, only runs once<br/>([app](src/constructors), [framework](src/framework/constructors))
2. **initializers** — Builds input for middleware, only runs when route changes<br/>([app](src/initializers), [framework](src/framework/initializers))
3. **middleware** — Builds input for routers<br/>([app](src/middleware), [framework](src/framework/middleware))
4. **routers** — Executes user code to build output for settlers<br/>([app](src/routers), [framework](src/framework/routers))
5. **settlers** — Settles the final output<br/>([app](src/settlers), [framework](src/framework/settlers))

With each phase of the request pipeline, the functions in each respective directory execute in parallel. Their collective output combines to build the input for the next phase of the pipeline.

If a source file begins with `client` or `server`, it will only execute on that environment. Otherwise, it is up to the function to conditionally enable or disable itself.
