import run from '../src/main'
import * as core from '@actions/core'
import { AppInputNames, mockGetInput } from './mocks.utility'

jest.mock('@actions/core')

describe('run', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should process and set output', async () => {
    // Arrange
    const infoMock = jest.spyOn(core, 'info')
    const setOutputMock = jest.spyOn(core, 'setOutput')
    const errorMock = jest.spyOn(core, 'error')
    const setFailedMock = jest.spyOn(core, 'setFailed')

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

    // Act
    await run()

    // Assert
    expect(infoMock).toHaveBeenCalledWith(
      `Waiting ${milliseconds} milliseconds ...`
    )
    expect(setOutputMock).toHaveBeenCalledWith('time', milliseconds)

    expect(errorMock).not.toHaveBeenCalled()
    expect(setFailedMock).not.toHaveBeenCalled()
  })

  it('must getInputs fails and error catch', async () => {
    // Arrange
    const debugMock = jest.spyOn(core, 'debug')
    const infoMock = jest.spyOn(core, 'info')
    const setOutputMock = jest.spyOn(core, 'setOutput')
    const errorMock = jest.spyOn(core, 'error')
    const setFailedMock = jest.spyOn(core, 'setFailed')

    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(
          name,
          [{ name: AppInputNames.milliseconds, givenValue: `` }],
          options
        )
      )

    // Act
    await run()

    // Assert
    expect(debugMock).not.toHaveBeenCalled()
    expect(infoMock).not.toHaveBeenCalled()
    expect(setOutputMock).not.toHaveBeenCalled()

    expect(errorMock).toHaveBeenCalledWith('Operation failed.')
    expect(setFailedMock).toHaveBeenCalledWith(
      'Input required and not supplied: milliseconds'
    )
  })
})
