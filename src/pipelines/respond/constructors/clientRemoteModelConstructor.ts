import remoteModelRequester from "libs/respond/remoteModelRequester"

if (typeof history !== "undefined") {
  window["remoteModelRequester"] = remoteModelRequester
}
