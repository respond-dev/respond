import {
  FinalizerInputType,
  FinalizerOutputType,
} from "../types/finalizerTypes"

export function stringsFinalizer({
  strings,
}: FinalizerInputType): FinalizerOutputType {
  if (!strings) {
    return
  }

  return {
    finalOutput: strings.join("\n"),
  }
}

export default stringsFinalizer
