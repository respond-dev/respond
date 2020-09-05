document.addEventListener("click", (e) => {
  const el = e.target as HTMLLinkElement

  if (el.tagName === "A") {
    window.history.pushState({}, "", el.href)

    if (typeof e.cancelable !== "boolean" || e.cancelable) {
      e.preventDefault()
    }
  }
})
