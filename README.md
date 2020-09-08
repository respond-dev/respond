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
&emsp;[📁 **routers**](src/routers)/router.ts<br/>
&emsp;[📁 **styles**](src/styles)/homeStyle.scss<br/>
&emsp;[📁 **views**](src/views)/homeView.ts

Visit <http://localhost:3000> to view your new page.

## Universal request pipeline

There are five successive phases of the universal request pipeline. Each pipeline phase corresponds to directories of source files:

&emsp;① [📁 **constructors**](src/constructors) — Builds input for initializers<br/>
&emsp;② [📁 **initializers**](src/initializers) — Builds input for middleware<br/>
&emsp;③ [📁 **middleware**](src/middleware) — Builds input for routers<br/>
&emsp;④ [📁 **routers**](src/routers) — Returns an element or string<br/>
&emsp;⑤ [📁 **settlers**](src/settlers) — Settles the final output

> ℹ️ The input and output types for each phase are centrally located in [📁 **types/respond**](src/types/respond).

## Differentiating between server and client

Server side requests execute every phase of the pipeline, ignoring source files whose name begins with `client`.

On the client, the `constructors` phase only ever executes once on page load, and the `initializers` phase is only called when the route changes. The rest of the phases always execute, whether for a page load, a link click, or a `window.history.pushState` call. Source files that begin with `server` are ignored on the client side.

Source files without `client` or `server` at the beginning are considered universal.

| Phase                                   | Server execution | Client execution                        |
| --------------------------------------- | ---------------- | --------------------------------------- |
| [📁 **constructors**](src/constructors) | Every request    | On page load (beginning of SPA session) |
| [📁 **initializers**](src/initializers) | Every request    | On route change                         |
| [📁 **middleware**](src/middleware)     | Every request    | Every request                           |
| [📁 **routers**](src/routers)           | Every request    | Every request                           |
| [📁 **settlers**](src/settlers)         | Every request    | Every request                           |
