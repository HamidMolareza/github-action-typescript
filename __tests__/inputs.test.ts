import * as core from '@actions/core'
import { ensureInputsValid, getInputs, IInputs } from '../src/inputs'
import { AppInputNames, mockGetInput } from './mocks.utility'

jest.mock('@actions/core')

describe('getInputs', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return the input milliseconds from the action', () => {
    const milliseconds = 10
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(
          name,
          [{ name: AppInputNames.milliseconds, givenValue: milliseconds }],
          options
        )
      )

    const inputs: IInputs = getInputs()

    expect(Object.keys(inputs).length).toBe(1)
    expect(inputs.milliseconds).toBe(milliseconds)
  })

  it('give invalid input, should reject promise', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(
          name,
          [{ name: AppInputNames.milliseconds, givenValue: '' }],
          options
        )
      )
    expect(() => getInputs()).toThrow(
      'Input required and not supplied: milliseconds'
    )
  })

  it('name must be trim', () => {
    const milliseconds = 10
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(
          name,
          [
            {
              name: AppInputNames.milliseconds,
              givenValue: `    ${milliseconds}    `
            }
          ],
          options
        )
      )

    const inputs: IInputs = getInputs()

    expect(Object.keys(inputs).length).toBe(1)
    expect(inputs.milliseconds).toBe(milliseconds)
  })
})

describe('ensureInputsValid', () => {
  it('should not throw an error when milliseconds is provided', () => {
    const validInput: IInputs = { milliseconds: 1000 }
    expect(() => ensureInputsValid(validInput)).not.toThrow()
  })

  it('should throw an error when milliseconds is missing or zero', () => {
    const invalidInput: IInputs = { milliseconds: null! }
    expect(() => ensureInputsValid(invalidInput)).toThrow(
      "The 'milliseconds' parameter is required."
    )
  })
})
