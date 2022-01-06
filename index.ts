import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
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

type EchartsInstance = ReturnType<typeof echarts.init>;

@Component({
  name: 'VueEcharts',
  emits: Events,
})
export class VueEcharts extends VueComponentBase {
  @Prop() readonly option: EChartsOption;
  @Prop({ default: 'default' }) readonly theme: string;
  @Prop() readonly groupId: string;
  @Prop({
    default: () => ({
      text: '努力加载中',
      color: '#c23531',
      textColor: '#489CFF',
      spinnerRadius: 6,
      lineWidth: 2,
      maskColor: 'rgba(0, 0, 0, 0.1)',
      zlevel: 0,
    }),
  }) readonly loadingOption: Record<string, any>;
  @Prop() readonly initCfg: Parameters<typeof echarts.init>[2];

  @Inreactive resizing: boolean;
  @Inreactive chart: EchartsInstance;

  $el: HTMLDivElement & { _component: VueEcharts };

  static ro: ResizeObserver;

  render() {
    return h('div', { class: 'vue-echarts' });
  }

  mounted() {
    this.refreshChart();
    this.$el._component = this;
    if (!VueEcharts.ro) {
      VueEcharts.ro = new ResizeObserver(function(this: void, entries: ResizeObserverEntry[]) {
        entries.forEach(entry => {
          const that = (entry.target as HTMLDivElement & { _component: VueEcharts })._component;
          if (entry.contentRect.width && entry.contentRect.height && that.chart && !that.resizing) {
            that.resizing = true;
            requestAnimationFrame(() => {
              if (that.chart) that.chart.resize(entry.contentRect);
              that.resizing = false;
            });
          }
        });
      });
    }

    VueEcharts.ro.observe(this.$el);
  }

  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = undefined;
    }
    VueEcharts.ro?.unobserve(this.$el);
  }

  @Watch('option')
  refreshOption() {
    if (!this.chart) return;
    if (this.option && Object.keys(this.option).some(x => /^[a-z]/.test(x))) {
      this.chart.setOption(this.option, true);
      if (this.$el.clientHeight) this.chart.resize();
      this.chart.hideLoading();
    } else {
      this.chart.showLoading('default', this.loadingOption);
    }
  }

  @Watch('theme')
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

  setOption(...args: Parameters<EchartsInstance['setOption']>) {
    return this.chart.setOption(...args);
  }

  dispatchAction(...args: Parameters<EchartsInstance['dispatchAction']>) {
    return this.chart.dispatchAction(...args);
  }
}
