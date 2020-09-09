export const remoteModelRouteRegex = /\/remote\/([a-zA-Z\/]*)(server[a-zA-Z]+).json/

export const remoteModelRoute = {
  matcher: remoteModelRouteRegex,
  controller: "respond/remoteModel",
  extraInput: { modelsPath: "models" },
}

export default remoteModelRoute
