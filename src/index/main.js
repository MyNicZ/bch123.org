// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import 'iview/dist/styles/iview.css'
import '@/theme.less'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import touch from 'vue-directive-touch';

import "@/registerServiceWorker"

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(touch)

const shared = {
  isZh: /zh/.test(window.navigator.language || window.navigator.userLanguage),
}

const translations = {
  zh: {
    home: {
      title: '比特币现金导航',
      about: '关于',
      aboutTitle: '联系/捐赠开发者(BCH)',
      mobile: '电话&微信',
      email: '邮箱',
      sourceCode: '开放源码',
      searchPlaceholder: 'BCH 地址，$handler',
    },
    address: {
      balance: '余额',
      latestTxs: '近 10 笔',
      sent: '发送',
      received: '接收',
      serviceUnavailable: '服务暂不可用',
      retry: '重试',
      direction: '方向',
      amount: '金额',
      time: '时间',
    },
    handle: {
      title: ' 的 BCH 收款',
      copy: '复制',
      copied: '已复制',
      useLegacy: '使用旧版地址',
      failed: '查询失败，请检查 $handle 拼写是否正确'
    }
  },
  en: {
    home: {
      title: 'BCH',
      about: 'About',
      aboutTitle: 'Donate to the developer (BCH)',
      mobile: 'Mobile&Wechat',
      email: 'Email',
      sourceCode: 'Source Code',
      searchPlaceholder: 'BCH address, $handler',
    },
    address: {
      balance: 'Balance',
      latestTxs: 'Latest 10 Transactions',
      sent: 'Sent',
      received: 'Received',
      serviceUnavailable: 'Service Unavailable',
      retry: 'Retry',
      direction: 'Direction',
      amount: 'Amount',
      time: 'Time',
    },
    handle: {
      title: '\'s BCH Receiving Address',
      copy: 'copy',
      copied: 'copied',
      useLegacy: 'use Legacy Address',
      failed: 'Query failed, please check the spelling of $handle'
    }
  },
}

const i18n = new VueI18n({
  locale: shared.isZh ? 'zh' : 'en',
  messages: translations,
})

new Vue({
  data: {
    shared,
  },
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
