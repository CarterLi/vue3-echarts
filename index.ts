import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import ResizeObserver from 'resize-observer-polyfill';
import { capitalize, defineComponent, h, type PropType } from 'vue';

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

export const VueEcharts = defineComponent({
  name: 'VueEcharts',

  props: {
    option: {
      type: Object as PropType<EChartsOption>,
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
    initCfg: Object as PropType<Parameters<typeof echarts.init>[2]>,
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
      VueEcharts._ro = new ResizeObserver(function (this: void, entries) {
        entries.forEach(entry => {
          const that = (entry.target as HTMLDivElement & { _component: any })._component;
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

    VueEcharts._ro.observe(this.$el);
  },

  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = undefined;
    }
    VueEcharts._ro?.unobserve(this.$el);
  },

  methods: {
    setOption(...args: Parameters<EchartsInstance['setOption']>) {
      return this.chart.setOption(...args);
    },
    dispatchAction(...args: Parameters<EchartsInstance['dispatchAction']>) {
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
      if (!this.chart) return;
      if (this.option && Object.keys(this.option).some(x => /^[a-z]/.test(x))) {
        this.chart.setOption(this.option, true);
        if (this.$el.clientHeight) {
          this.chart.resize({
            width: this.$el.clientWidth,
            height: this.$el.clientHeight,
          });
        }
        this.chart.hideLoading();
      } else {
        this.chart.showLoading('default', this.loadingOption);
      }
    },
    getInstance() {
      return this.chart as EchartsInstance;
    },
  },

  render() {
    return h('div', { class: 'vue-echarts' });
  },
});
