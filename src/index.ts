import {
  initDriver,
  getIntroPopover,
  buildDriverSteps,
} from './utils'

type DriverIntorsDoneCallback = (result: string) => void

class DriverIntors {

  doneCallback: DriverIntorsDoneCallback | null = null

  config = () => {

  }

  start = () => {

  }

  done = (callback: DriverIntorsDoneCallback) => {
    this.doneCallback = callback;
  }
}

export {
  initDriver,
  getIntroPopover,
  buildDriverSteps,
  DriverIntors,
}

export default DriverIntors;
