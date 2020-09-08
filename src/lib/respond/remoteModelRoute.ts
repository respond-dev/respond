export const remoteModelRouteRegex = /\/remote\/([^\.]+).json/

export const remoteModelRoute = {
  matcher: remoteModelRouteRegex,
  controller: "lib/respond/controllers/remoteModel",
  extraInput: { modelsPath: "models" },
}

export default remoteModelRoute
