import echarts from 'echarts';
import ResizeObserver from 'resize-observer-polyfill';
import { capitalize, defineComponent, h } from 'vue';

import type { VEchartsInstance } from './type';

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

export const VEcharts = defineComponent({
  props: {
    option: Object,
    theme: {
      type: String,
      default: 'default',
    },
    groupId: String,
    loadingOption: Object,
    initCfg: Object,
  },

  render(this: VEchartsInstance) {
    return h('div');
  },

  mounted(this: VEchartsInstance) {
    this.refreshChart();
    this._ro = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width && entry.contentRect.height && this._chart && !this._resizing) {
        this._resizing = true;
        requestAnimationFrame(() => {
          if (this._chart) this._chart.resize(entry.contentRect);
          this._resizing = false;
        });
      }
    });

    this._ro.observe(this.$el);
  },

  beforeUnmount(this: VEchartsInstance) {
    if (this._chart) {
      this._chart.dispose();
      this._chart = undefined;
    }
    if (this._ro) {
      this._ro.disconnect();
      this._ro = undefined;
    }
  },

  methods: {
    refreshOption(this: VEchartsInstance) {
      if (!this._chart) return;
      if (this.option && Object.keys(this.option).some(x => /^[a-z]/.test(x))) {
        this._chart.setOption(this.option, true);
        if (this.$el.clientHeight) this._chart.resize();
        this._chart.hideLoading();
      } else {
        this._chart.showLoading('default', this.loadingOption);
      }
    },

    refreshChart(this: VEchartsInstance) {
      if (this._chart) {
        this._chart.dispose();
        this._chart = undefined;
      }

      const chart = echarts.init(this.$el, this.theme, this.initCfg);
      chart.group = this.groupId;

      this._chart = chart;

      this.refreshOption();

      Events.forEach(x => {
        const eventName = 'on' + capitalize(x);
        if (typeof this.$.vnode.props[eventName] === 'function') {
          chart.on(x, this.$emit.bind(this, x));
        }
      });
    },

    setOption(this: VEchartsInstance, option: Record<string, any>, ...args) {
      return this._chart.setOption(option, ...args);
    },

    dispatchAction(this: VEchartsInstance, payload: Record<string, any>) {
      return this._chart.dispatchAction(payload);
    },
  },
  watch: {
    option: 'refreshOption',
    theme: 'refreshChart',
  },
});
