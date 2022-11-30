import * as echarts from 'echarts';
import { type PropType } from 'vue';
export declare const VueEcharts: import("vue").DefineComponent<{
    option: {
        type: ObjectConstructor;
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
    initCfg: PropType<{
        locale?: string | {
            time: {
                month: string[];
                monthAbbr: string[];
                dayOfWeek: string[];
                dayOfWeekAbbr: string[];
            };
            legend: {
                selector: {
                    all: string;
                    inverse: string;
                };
            };
            toolbox: {
                brush: {
                    title: {
                        rect: string;
                        polygon: string;
                        lineX: string;
                        lineY: string;
                        keep: string;
                        clear: string;
                    };
                };
                dataView: {
                    title: string;
                    lang: string[];
                };
                dataZoom: {
                    title: {
                        zoom: string;
                        back: string;
                    };
                };
                magicType: {
                    title: {
                        line: string;
                        bar: string;
                        stack: string;
                        tiled: string;
                    };
                };
                restore: {
                    title: string;
                };
                saveAsImage: {
                    title: string;
                    lang: string[];
                };
            };
            series: {
                typeNames: {
                    pie: string;
                    bar: string;
                    line: string;
                    scatter: string;
                    effectScatter: string;
                    radar: string;
                    tree: string;
                    treemap: string;
                    boxplot: string;
                    candlestick: string;
                    k: string;
                    heatmap: string;
                    map: string;
                    parallel: string;
                    lines: string;
                    graph: string;
                    sankey: string;
                    funnel: string;
                    gauge: string;
                    pictorialBar: string;
                    themeRiver: string;
                    sunburst: string;
                };
            };
            aria: {
                general: {
                    withTitle: string;
                    withoutTitle: string;
                };
                series: {
                    single: {
                        prefix: string;
                        withName: string;
                        withoutName: string;
                    };
                    multiple: {
                        prefix: string;
                        withName: string;
                        withoutName: string;
                        separator: {
                            middle: string;
                            end: string;
                        };
                    };
                };
                data: {
                    allData: string;
                    partialData: string;
                    withName: string;
                    withoutName: string;
                    separator: {
                        middle: string;
                        end: string;
                    };
                };
            };
        };
        renderer?: "canvas" | "svg";
        devicePixelRatio?: number;
        useDirtyRect?: boolean;
        useCoarsePointer?: boolean;
        pointerSize?: number;
        ssr?: boolean;
        width?: number;
        height?: number;
    }>;
}, unknown, unknown, {}, {
    setOption(option: echarts.EChartsCoreOption, opts?: echarts.SetOptionOpts): any;
    dispatchAction(payload: echarts.Payload, opt?: boolean | {
        silent?: boolean;
        flush?: boolean;
    }): any;
    refreshChart(): void;
    refreshOption(): void;
    getInstance(): echarts.ECharts;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    option: {
        type: ObjectConstructor;
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
    initCfg: PropType<{
        locale?: string | {
            time: {
                month: string[];
                monthAbbr: string[];
                dayOfWeek: string[];
                dayOfWeekAbbr: string[];
            };
            legend: {
                selector: {
                    all: string;
                    inverse: string;
                };
            };
            toolbox: {
                brush: {
                    title: {
                        rect: string;
                        polygon: string;
                        lineX: string;
                        lineY: string;
                        keep: string;
                        clear: string;
                    };
                };
                dataView: {
                    title: string;
                    lang: string[];
                };
                dataZoom: {
                    title: {
                        zoom: string;
                        back: string;
                    };
                };
                magicType: {
                    title: {
                        line: string;
                        bar: string;
                        stack: string;
                        tiled: string;
                    };
                };
                restore: {
                    title: string;
                };
                saveAsImage: {
                    title: string;
                    lang: string[];
                };
            };
            series: {
                typeNames: {
                    pie: string;
                    bar: string;
                    line: string;
                    scatter: string;
                    effectScatter: string;
                    radar: string;
                    tree: string;
                    treemap: string;
                    boxplot: string;
                    candlestick: string;
                    k: string;
                    heatmap: string;
                    map: string;
                    parallel: string;
                    lines: string;
                    graph: string;
                    sankey: string;
                    funnel: string;
                    gauge: string;
                    pictorialBar: string;
                    themeRiver: string;
                    sunburst: string;
                };
            };
            aria: {
                general: {
                    withTitle: string;
                    withoutTitle: string;
                };
                series: {
                    single: {
                        prefix: string;
                        withName: string;
                        withoutName: string;
                    };
                    multiple: {
                        prefix: string;
                        withName: string;
                        withoutName: string;
                        separator: {
                            middle: string;
                            end: string;
                        };
                    };
                };
                data: {
                    allData: string;
                    partialData: string;
                    withName: string;
                    withoutName: string;
                    separator: {
                        middle: string;
                        end: string;
                    };
                };
            };
        };
        renderer?: "canvas" | "svg";
        devicePixelRatio?: number;
        useDirtyRect?: boolean;
        useCoarsePointer?: boolean;
        pointerSize?: number;
        ssr?: boolean;
        width?: number;
        height?: number;
    }>;
}>> & {
    [x: `on${Capitalize<string>}`]: (...args: any[]) => any;
}, {
    theme: string;
    groupId: string;
    loadingOption: Record<string, any>;
}>;
