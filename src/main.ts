import * as core from '@actions/core'
import { wait } from './wait'
import { setOutputs } from './outputs'
import { ensureInputsValid, getInputs } from './inputs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export default async function run(): Promise<void> {
  try {
    await mainProcess()
    core.debug('Operation completed successfully.')
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.error('Operation failed.')
    // @ts-expect-error we want catch all errors as string
    core.setFailed(error instanceof Error ? error.message : error.toString())
  }
}

async function mainProcess(): Promise<void> {
  const inputs = getInputs()
  ensureInputsValid(inputs)

  core.info(`Waiting ${inputs.milliseconds} milliseconds ...`)

  // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
  core.debug(new Date().toTimeString())
  await wait(inputs.milliseconds)
  core.debug(new Date().toTimeString())

  setOutputs({ time: inputs.milliseconds })
}
