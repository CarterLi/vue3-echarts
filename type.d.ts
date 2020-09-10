import { ComponentPublicInstance } from 'vue';

export interface VEchartsPrivate {
  _chart: any; // `@types/echarts` does exist but it's incomplete，and very hard to use
  _resizing: boolean;
  _ro: ResizeObserver;
}

export interface VEchartsProps {
  readonly option: Record<string, any>;
  readonly theme: string;
  readonly groupId: string;
  readonly loadingOption: Record<string, any>;
  readonly initCfg: Record<string, any>;
}

export interface VEchartsMethods {
  refreshOption(): void;
  refreshChart(): void;
  setOption(option: Record<string, any>, notMerge?: boolean, lazyUpdate?: boolean): void;
  setOption(option: Record<string, any>, opts?: Record<string, any>): void;
  dispatchAction(payload: Record<string, any>): void;
}

export interface VEchartsInstance extends ComponentPublicInstance,
  VEchartsPrivate,
  VEchartsProps,
  VEchartsMethods {}
