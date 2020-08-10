# Respond

TypeScript web framework optimized for delivery 🚚

## New tech

- First class universal routing (SSR & SPA 🧖‍♀️)
- Client side ES modules (🚫 webpack, ✅ MJS)
- TypeScript sources and breakpoints in browser 🧘
- Built-in server environments (Node.js HTTP, AWS Lambda, Cloudflare Worker ☁️)
- JSX 🏭

## Old wisdom

- Structured request pipeline (initializers, middleware, controllers, views, etc 🏗️)
- Simple DOM operations (🚫 virtual dom, ✅ `createElement`)
- Simple remote function calls 🛰️
- Code generators 📝
- Very few production NPM dependencies 📉📦

## Create a new project

```bash
git clone git@github.com:respond-dev/respond.git [project-name]
cd [project-name]
npm install
```

## Start dev task

```bash
npm run dev
```

> ℹ️ If you install [AutoLaunch](https://marketplace.visualstudio.com/items?itemName=philfontaine.autolaunch) for VS Code, the `dev` tasks starts automatically.

## Generate a homepage

```bash
npm run generate
```

Press `<enter>` at each prompt to accept the defaults. You'll notice some updated files:

&emsp;📁 app/controllers/homeController.ts<br/>&emsp;📁 app/models/homeModel.ts<br/>&emsp;📁 app/routers/defaultRouter.ts<br/>&emsp;📁 app/styles/homeStyle.scss<br/>&emsp;📁 app/views/homeView.ts

Visit <http://localhost:3000> to view your new page.

## Universal request pipeline

There are five successive phases of the universal request pipeline. Each pipeline phase corresponds to directories of source files:

1. **constructors** — Builds input for initializers, only runs once<br/>&emsp;[📁 app/constructors](src/app/constructors)<br/>&emsp;[📁 framework/constructors](src/framework/constructors)
2. **initializers** — Builds input for middleware, only runs when route changes<br/>&emsp;[📁 app/initializers](src/app/initializers)<br/>&emsp;[📁 framework/initializers](src/framework/initializers)
3. **middleware** — Builds input for routers, runs on every request<br/>&emsp;[📁 app/middleware](src/app/middleware)<br/>&emsp;[📁 framework/middleware](src/framework/middleware)
4. **routers** — Returns an element or string, runs on every request<br/>&emsp;[📁 app/routers](src/app/routers)
5. **settlers** — Settles the final output, runs on every request<br/>&emsp;[📁 app/settlers](src/app/settlers)<br/>&emsp;[📁 framework/settlers](src/framework/settlers)

Each source file of each directory has a default export function. Each function executes in parallel during each phase of the pipeline, building the input for the next phase of the pipeline.

The input and output types for each phase are centrally located in [📁 framework/types](src/framework/types).

If a source file begins with `client` or `server`, it will only execute on that environment.
