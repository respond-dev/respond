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

## Generate a homepage

```bash
npm run generate
```

1. When prompted for generator selections, press `<enter>` (default selections).
2. When prompted for a name, type `homePage` (or any name you like).
3. When prompted for a path, press `<enter>` (default path).

## Start server

```bash
npm start
```

Visit <http://localhost:3000> to view your universally rendered homepage!

## Universal request pipeline

There are five successive phases of the universal request pipeline. Each phase corresponds to a directory of source files:

1. **constructors** — Builds input for initializers, only runs once ([📁 app](src/app/constructors), [📁 framework](src/framework/constructors))
2. **initializers** — Builds input for middleware, only runs when route changes ([📁 app](src/app/initializers), [📁framework](src/framework/initializers))
3. **middleware** — Builds input for routers ([📁 app](src/app/middleware), [📁 framework](src/framework/middleware))
4. **routers** — Executes user code to build output for settlers ([📁 app](src/app/routers))
5. **settlers** — Settles the final output ([📁 app](src/app/settlers), [📁 framework](src/framework/settlers))

In each directory, the default function of each source file is executed in parallel. The collective output of those functions combine to build the input for the next phase of the pipeline.

If a source file begins with `client` or `server`, it will only execute on that environment. Otherwise, it is up to the function to conditionally enable or disable itself.
