import elementSerializer from "../lib/elementSerializer"
import {
  FinalizerInputType,
  FinalizerOutputType,
} from "../types/finalizerTypes"

export function elementsFinalizer({
  elements,
}: FinalizerInputType): FinalizerOutputType {
  if (!elements) {
    return
  }

  return {
    finalOutput: elementSerializer(elements),
  }
}

export default elementsFinalizer
