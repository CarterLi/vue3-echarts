import * as echarts from 'echarts';
import { capitalize, defineComponent, h } from 'vue';
// https://echarts.apache.org/zh/api.html#events
const Events = [
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    'mouseover',
    'mouseout',
    'globalout',
    'legendselectchanged',
    'legendselected',
    'legendunselected',
    'legendscroll',
    'datazoom',
    'datarangeselected',
    'timelinechanged',
    'timelineplaychanged',
    'restore',
    'dataviewchanged',
    'magictypechanged',
    'geoselectchanged',
    'geoselected',
    'geounselected',
    'pieselectchanged',
    'pieselected',
    'pieunselected',
    'mapselectchanged',
    'mapselected',
    'mapunselected',
    'axisareaselected',
    'focusnodeadjacency',
    'unfocusnodeadjacency',
    'brush',
    'brushselected',
];
export const VueEcharts = defineComponent({
    name: 'VueEcharts',
    props: {
        option: {
            type: Object,
        },
        theme: {
            type: String,
            default: 'default',
        },
        groupId: {
            type: String,
            default: null,
        },
        loadingOption: {
            type: Object,
            default: () => ({
                text: 'Loading...',
                color: '#c23531',
                textColor: '#489CFF',
                spinnerRadius: 6,
                lineWidth: 2,
                maskColor: 'rgba(0, 0, 0, 0.1)',
                zlevel: 0,
            }),
        },
        initCfg: Object,
    },
    emits: Events,
    watch: {
        option: 'refreshOption',
        theme: 'refreshChart',
    },
    mounted() {
        this.refreshChart();
        this.$el._component = this;
        if (!VueEcharts._ro) {
            VueEcharts._ro = new ResizeObserver(function (entries) {
                entries.forEach(entry => {
                    const that = entry.target._component;
                    if (entry.contentRect.width && entry.contentRect.height && that.chart && !that.resizing) {
                        that.resizing = true;
                        requestAnimationFrame(() => {
                            if (that.chart)
                                that.chart.resize(entry.contentRect);
                            that.resizing = false;
                        });
                    }
                });
            });
        }
        VueEcharts._ro.observe(this.$el);
    },
    beforeUnmount() {
        var _a;
        if (this.chart) {
            this.chart.dispose();
            this.chart = undefined;
        }
        (_a = VueEcharts._ro) === null || _a === void 0 ? void 0 : _a.unobserve(this.$el);
    },
    methods: {
        setOption(...args) {
            return this.chart.setOption(...args);
        },
        dispatchAction(...args) {
            return this.chart.dispatchAction(...args);
        },
        refreshChart() {
            if (this.chart) {
                this.chart.dispose();
                this.chart = undefined;
            }
            const chart = echarts.init(this.$el, this.theme, this.initCfg);
            chart.group = this.groupId;
            this.chart = chart;
            this.refreshOption();
            Events.forEach(x => {
                const eventName = 'on' + capitalize(x);
                if (typeof this.$.vnode.props[eventName] === 'function') {
                    chart.on(x, this.$emit.bind(this, x));
                }
            });
        },
        refreshOption() {
            if (!this.chart)
                return;
            if (this.option && Object.keys(this.option).some(x => /^[a-z]/.test(x))) {
                this.chart.setOption(this.option, true);
                if (this.$el.clientHeight) {
                    this.chart.resize({
                        width: this.$el.clientWidth,
                        height: this.$el.clientHeight,
                    });
                }
                this.chart.hideLoading();
            }
            else {
                this.chart.showLoading('default', this.loadingOption);
            }
        },
        getInstance() {
            return this.chart;
        },
    },
    render() {
        return h('div', { class: 'vue-echarts' });
    },
});
//# sourceMappingURL=index.js.map