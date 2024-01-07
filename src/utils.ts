interface DriverStepConfig {
  sortIndex?: number;
}

interface DriverSteps {
  element: Element;
  popover: DriverStepConfig;
}

const initDriver = (Driver: any, config: Record<string, any>) => {
  return new Driver({
    stageBackground: '',
    padding: -1,
    doneBtnText: '完成',
    closeBtnText: '关闭',
    nextBtnText: '下一个 >',
    prevBtnText: '< 上一个',
    ...config
  })
}

const buildDriverSteps = ({
  container,
  domDataSetKey,
  introByKey,
}: {
  container: Element;
  domDataSetKey: string;
  introByKey: Record<string, any>;
}): any[] => {
  if (!container) {
    return [];
  }

  if (!domDataSetKey) {
    return [];
  }

  if (Object.prototype.toString.call(introByKey) !== '[object Object]') {
    return [];
  }

  const intorKeys = Object.keys(introByKey);
  if (!intorKeys.length) {
    return [];
  }

  const domDataSetStr = domDataSetKey.replace(/([A-Z])/g, "_$1").toLowerCase();

  const allStepNodes = container.querySelectorAll(`[data-${domDataSetStr}]`);

  if (!Array.isArray(allStepNodes) || allStepNodes.length === 0) {
    return [];
  }

  let needSort = true;

  const steps: DriverSteps[] = [];

  allStepNodes.forEach(node => {
    const stepPopover = getIntroPopover({
      node,
      domDataSetKey,
      introByKey
    })

    if (!stepPopover) {
      return;
    }

    if (!('sortIndex' in stepPopover)) {
      needSort = false
    }

    steps.push({
      element: node,
      popover: stepPopover
    })
  })

  if (needSort) {
    steps.sort(item => item.popover.sortIndex! - item.popover.sortIndex!)
  }

  return steps;
}

const getIntroPopover = ({
  node,
  domDataSetKey,
  introByKey
}: {
  node: any;
  domDataSetKey: string;
  introByKey: Record<string, DriverStepConfig>;
}): DriverStepConfig | undefined => {
  const introName = node.dataset[domDataSetKey];
  return introByKey[introName]
}

export {
  initDriver,
  getIntroPopover,
  buildDriverSteps,
}
