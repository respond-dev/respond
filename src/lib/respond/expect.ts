import expect, {
  extractExpectedAssertionsErrors,
} from "expect"

afterEach((): void => {
  const [error] = extractExpectedAssertionsErrors()
  if (error) {
    throw new Error(
      `expected ${error.expected} assertions, received ${error.actual}`
    )
  }
})

export default expect
