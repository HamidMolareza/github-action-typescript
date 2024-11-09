import { getNumberInputOrDefault } from './utility'
import { DEFAULT_INPUTS } from './configs'

export interface IInputs {
  milliseconds: number
}

export function getInputs(): IInputs {
  return {
    milliseconds:
      getNumberInputOrDefault('milliseconds', undefined, true) ??
      DEFAULT_INPUTS.milliseconds
  }
}

export function ensureInputsValid(inputs: IInputs): void {
  if (!inputs.milliseconds)
    throw new Error("The 'milliseconds' parameter is required.")
}
