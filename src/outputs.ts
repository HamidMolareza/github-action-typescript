import * as core from '@actions/core'

export interface IActionOutputs {
  time: number
}

export function setOutputs(data: IActionOutputs): void {
  for (const key of Object.keys(data)) {
    // @ts-expect-error the `data[key]` can be any type
    core.setOutput(key, data[key])
  }
}
