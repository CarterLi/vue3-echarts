vue3-echarts
====================


[![npm](https://img.shields.io/npm/v/vue3-echarts.svg)](https://www.npmjs.com/package/vue3-echarts)


Echarts binding for [Vue 3](https://github.com/vuejs/vue-next)

## How to use

1. Install

    ```shell
    yarn add vue3-echarts
    ```

2. Register it in `components` of Vue options

    ```js
    import { VueEcharts } from 'vue3-echarts';

    export default {
        data,
        methods,
        ...
        components: {
            VueEcharts,
        },
    }
    ```

3. Use the component in template

    ```html
    <vue-echarts :option="option" style="height: 500px" ref="chart" />
    ```

    prop `option` is required

    ```ts
    (this.$refs.chart as VueEcharts).refreshOption();
    ```

    Note: `vue-echarts` has no height by default. You need to specify it manually. DOM size change is detected automatically using `ResizeObserver`, no manual `resize` call needed.

## Props

### option

Type: `object`  

Echarts option. Documents can be found here: <https://echarts.apache.org/en/option.html#title>. If `null`, `loading` animation will be shown

### theme

Type: `string`
Default: `default`

Theme used, should be pre-registered using [echarts.registerTheme](https://echarts.apache.org/en/api.html#echarts.registerTheme)

### groupId

Type: `number`

Group name to be used in chart [connection](https://echarts.apache.org/en/api.html#echarts.connect)

### loadingOption

Config used by [showLoading](https://echarts.apache.org/en/api.html#echartsInstance.showLoading).

Loading animation will be shown automatically when `option` is null or an empty object.

### initCfg

Other configuration used by [echarts.init](https://echarts.apache.org/en/api.html#echarts.init)

## Methods

### refreshOption

Refresh option using `setOption`. If `option` is null or an empty object, `loading` animation will be shown. See [loadingOption](#loadingOption)

### refreshChart

Recreate echarts instance

### setOption

Alias of [echartsInstance.setOption](https://echarts.apache.org/en/api.html#echartsInstance.setOption)

### dispatchAction

Alias of [echartsInstance.dispatchAction](https://echarts.apache.org/en/api.html#echartsInstance.dispatchAction)

## events

All echarts events are supported. Doc can be found here: https://echarts.apache.org/en/api.html#events

## LICENSE

MIT
