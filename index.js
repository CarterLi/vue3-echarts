var VueEcharts_1;
import { __decorate, __metadata } from "tslib";
import * as echarts from 'echarts';
import ResizeObserver from 'resize-observer-polyfill';
import { capitalize, h } from 'vue';
import { Component, Inreactive, Prop, VueComponentBase, Watch } from 'vue3-component-base';
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
let VueEcharts = VueEcharts_1 = class VueEcharts extends VueComponentBase {
    render() {
        return h('div', { class: 'vue-echarts' });
    }
    mounted() {
        this.refreshChart();
        this.$el._component = this;
        if (!VueEcharts_1.ro) {
            VueEcharts_1.ro = new ResizeObserver(function (entries) {
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
        VueEcharts_1.ro.observe(this.$el);
    }
    beforeUnmount() {
        var _a;
        if (this.chart) {
            this.chart.dispose();
            this.chart = undefined;
        }
        (_a = VueEcharts_1.ro) === null || _a === void 0 ? void 0 : _a.unobserve(this.$el);
    }
    refreshOption() {
        if (!this.chart)
            return;
        if (this.option && Object.keys(this.option).some(x => /^[a-z]/.test(x))) {
            this.chart.setOption(this.option, true);
            if (this.$el.clientHeight)
                this.chart.resize();
            this.chart.hideLoading();
        }
        else {
            this.chart.showLoading('default', this.loadingOption);
        }
    }
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
    }
    setOption(...args) {
        return this.chart.setOption(...args);
    }
    dispatchAction(...args) {
        return this.chart.dispatchAction(...args);
    }
};
__decorate([
    Prop(),
    __metadata("design:type", Object)
], VueEcharts.prototype, "option", void 0);
__decorate([
    Prop({ default: 'default' }),
    __metadata("design:type", String)
], VueEcharts.prototype, "theme", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], VueEcharts.prototype, "groupId", void 0);
__decorate([
    Prop({
        default: () => ({
            text: '努力加载中',
            color: '#c23531',
            textColor: '#489CFF',
            spinnerRadius: 6,
            lineWidth: 2,
            maskColor: 'rgba(0, 0, 0, 0.1)',
            zlevel: 0,
        }),
    }),
    __metadata("design:type", Object)
], VueEcharts.prototype, "loadingOption", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Object)
], VueEcharts.prototype, "initCfg", void 0);
__decorate([
    Inreactive,
    __metadata("design:type", Boolean)
], VueEcharts.prototype, "resizing", void 0);
__decorate([
    Inreactive,
    __metadata("design:type", Object)
], VueEcharts.prototype, "chart", void 0);
__decorate([
    Watch('option'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VueEcharts.prototype, "refreshOption", null);
__decorate([
    Watch('theme'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VueEcharts.prototype, "refreshChart", null);
VueEcharts = VueEcharts_1 = __decorate([
    Component({
        name: 'VueEcharts',
        emits: Events,
    })
], VueEcharts);
export { VueEcharts };
//# sourceMappingURL=index.js.map