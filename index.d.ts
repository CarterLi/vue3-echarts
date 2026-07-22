import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { type PropType } from 'vue';
type EchartsInstance = ReturnType<typeof echarts.init>;
export declare const VueEcharts: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    option: {
        type: PropType<EChartsOption>;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    groupId: {
        type: StringConstructor;
        default: any;
    };
    loadingOption: {
        type: ObjectConstructor;
        default: () => {
            text: string;
            color: string;
            textColor: string;
            spinnerRadius: number;
            lineWidth: number;
            maskColor: string;
            zlevel: number;
        };
    };
    initCfg: PropType<Parameters<typeof echarts.init>[2]>;
}>, {}, {}, {}, {
    setOption(option: echarts.EChartsCoreOption, opts?: echarts.SetOptionOpts): any;
    dispatchAction(payload: echarts.Payload, opt?: boolean | {
        silent?: boolean;
        flush?: boolean | undefined;
    }): any;
    refreshChart(): void;
    refreshOption(): void;
    getInstance(): EchartsInstance;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    option: {
        type: PropType<EChartsOption>;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    groupId: {
        type: StringConstructor;
        default: any;
    };
    loadingOption: {
        type: ObjectConstructor;
        default: () => {
            text: string;
            color: string;
            textColor: string;
            spinnerRadius: number;
            lineWidth: number;
            maskColor: string;
            zlevel: number;
        };
    };
    initCfg: PropType<Parameters<typeof echarts.init>[2]>;
}>> & Readonly<{
    [x: `on${Capitalize<string>}`]: (...args: any[]) => any;
}>, {
    theme: string;
    groupId: string;
    loadingOption: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export {};
