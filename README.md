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

## Server and client differences

Server side requests begin with a HTTP handler callback (Node, Lambda, or otherwise). Every phase of the pipeline executes each server side request. Source files whose names begins with `client` are ignored on the server side.

Client side requests begin with a page load, a link click, or a `window.history.pushState` call. The `constructors` phase executes only on initial page load, at the very beginning of the SPA session. The `initializers` phase executes only when the route changes. The rest of the phases (`middleware`, `routers`, `settlers`) execute for all requests, and receive cached input in the case that an earlier phase did not execute. Source files whose names begin with `server` are ignored on the client side.

Source files without `client` or `server` at the beginning are considered universal.

| Request phase                             | Server execution | Client execution                        |
| :---------------------------------------- | :--------------- | :-------------------------------------- |
| ① [📁 **constructors**](src/constructors) | Every request    | On page load (beginning of SPA session) |
| ② [📁 **initializers**](src/initializers) | Every request    | On route change                         |
| ③ [📁 **middleware**](src/middleware)     | Every request    | Every request                           |
| ④ [📁 **routers**](src/routers)           | Every request    | Every request                           |
| ⑤ [📁 **settlers**](src/settlers)         | Every request    | Every request                           |
