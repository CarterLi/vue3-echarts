import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import ResizeObserver from 'resize-observer-polyfill';
import { VueComponentBase } from 'vue3-component-base';
declare type EchartsInstance = ReturnType<typeof echarts.init>;
export declare class VueEcharts extends VueComponentBase {
    readonly option: EChartsOption;
    readonly theme: string;
    readonly groupId: string;
    readonly loadingOption: Record<string, any>;
    readonly initCfg: Parameters<typeof echarts.init>[2];
    resizing: boolean;
    chart: EchartsInstance;
    $el: HTMLDivElement & {
        _component: VueEcharts;
    };
    static ro: ResizeObserver;
    render(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    mounted(): void;
    beforeUnmount(): void;
    refreshOption(): void;
    refreshChart(): void;
    setOption(...args: Parameters<EchartsInstance['setOption']>): void;
    dispatchAction(...args: Parameters<EchartsInstance['dispatchAction']>): void;
}
export {};
