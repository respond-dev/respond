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

| Location                              | Filename            | Purpose                                       |
| :------------------------------------ | :------------------ | :-------------------------------------------- |
| [📁 **controllers**](src/controllers) | `homeController.ts` | Return elements or JSON from models and views |
| [📁 **models**](src/models)           | `homeModel.ts`      | Data store                                    |
| [📁 **routers**](src/routers)         | `router.ts`         | Return elements or JSON from controllers      |
| [📁 **styles**](src/styles)           | `homeStyle.scss`    | Sass style sheet                              |
| [📁 **views**](src/views)             | `homeView.ts`       | Return elements from JSX                      |

Visit <http://localhost:3000> to view your new page.

## Universal request pipeline

There are five successive phases of the universal request pipeline. Each pipeline phase corresponds to directories of source files:

| Request phase                             | Purpose                             |
| :---------------------------------------- | :---------------------------------- |
| ① [📁 **constructors**](src/constructors) | Builds input for initializers       |
| ② [📁 **initializers**](src/initializers) | Builds input for middleware         |
| ③ [📁 **middleware**](src/middleware)     | Builds input for routers            |
| ④ [📁 **routers**](src/routers)           | Returns an element or string (JSON) |
| ⑤ [📁 **settlers**](src/settlers)         | Settles the final output            |

> ℹ️ The input and output types for each phase are centrally located in [📁 **types/respond**](src/types/respond).

## Server and client differences

**Server side** requests begin with a Node HTTP, Lambda API Gateway, or Cloudflare Worker handler event. The server side request pipeline is pretty simple; all five pipeline phases are executed on every request. Request pipeline filenames that begin with `client` are ignored on the server side.

**Client side** requests begin with an initial page load, a link click, or a `window.history.pushState` call. The `constructors` phase executes only on initial page load. The `initializers` phase executes on initial page load or route change. The rest of the phases (`middleware`, `routers`, `settlers`) execute for all requests, and receive cached input if the request is not from a page load or route change (also known as a refresh or redraw). Request pipeline filenames that begin with `server` are ignored on the client side.

Request pipeline filenames that do not begin with `client` or `server` are considered **universal**.

| Request phase                             | Server execution | Client execution             |
| :---------------------------------------- | :--------------- | :--------------------------- |
| ① [📁 **constructors**](src/constructors) | Every request    | On page load (once)          |
| ② [📁 **initializers**](src/initializers) | Every request    | On page load or route change |
| ③ [📁 **middleware**](src/middleware)     | Every request    | Every request                |
| ④ [📁 **routers**](src/routers)           | Every request    | Every request                |
| ⑤ [📁 **settlers**](src/settlers)         | Every request    | Every request                |
