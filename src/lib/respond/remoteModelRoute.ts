export const remoteModelRouteRegex = /\/remote\/([^\.]+).json/

export const remoteModelRoute = {
  matcher: remoteModelRouteRegex,
  controller: "respond/remoteModel",
  extraInput: { modelsPath: "models" },
}

export default remoteModelRoute
