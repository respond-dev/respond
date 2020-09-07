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

&emsp;[📁 **controllers**](src/controllers)/homeController.ts<br/>
&emsp;[📁 **models**](src/models)/homeModel.ts<br/>
&emsp;[📁 **routers**](src/routers)/defaultRouter.ts<br/>
&emsp;[📁 **styles**](src/styles)/homeStyle.scss<br/>
&emsp;[📁 **views**](src/views)/homeView.ts

Visit <http://localhost:3000> to view your new page.

## Universal request pipeline

There are five successive phases of the universal request pipeline. Each pipeline phase corresponds to directories of source files:

&emsp;[📁**constructors**](src/constructors) — Builds input for initializers, only runs once<br/>
&emsp;[📁**initializers**](src/initializers) — Builds input for middleware, only runs when route changes<br/>
&emsp;[📁**middleware**](src/middleware) — Builds input for routers, runs on every request<br/>
&emsp;[📁**routers**](src/routers) — Returns an element or string, runs on every request<br/>
&emsp;[📁**settlers**](src/settlers) — Settles the final output, runs on every request

Each source file of each directory has a default export function. Each function executes in parallel during each phase of the pipeline, building the input for the next phase of the pipeline.

The input and output types for each phase are centrally located in [📁 types/respond](src/types/respond).

If a source file begins with `client` or `server`, it will only execute on that environment.
