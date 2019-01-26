<template lang="pug">
#app(:class="{ handle: currentView === 'handle' }")
  Layout
    Header
      .layout-logo.link(@click="go({path: '/'})")
        span(v-if="!currentView && $route.name === 'Home'") {{$t('home.title')}}
        .logo-wrap(v-else)
      span.sub-page-title(v-if="currentView && $route.meta.titles[currentView]") > {{$route.meta.titles[currentView]}}
      .layout-nav
        // .link(v-if="$route.name === 'Home'" @click="go({path: '/safe-guides'})") 安全指南
        .link(v-if='isSupportWebShare', @click='share') 分享
    Content(v-if="currentView")
      router-view(:name="currentView")
    Content(v-else)
      keep-alive
        router-view(v-if='$route.meta.keepAlive')
      transition(name='fade', v-if='!$route.meta.keepAlive')
        router-view
    Footer.layout-footer-center @{{(new Date().getFullYear())}} © bch.oaker.bid 
</div>
</template>

<script>
import mixin from '@/mixin.js'
import { Layout, Header, Footer, Icon, Button } from 'iview'
export default {
  mixins: [mixin],
  name: 'app',
  components: {
    Layout,
    Header,
    Footer,
    Icon,
    Button,
  },
  data () {
    return {
      currentView: null,
    }
  },
  methods: {
    share () {
      navigator
        .share({
          title: 'bch.oaker.bid',
          text: '',
          url: window.location.href
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
    }
  },
  watch: {
    '$route.query.q': function (newRoute, oldRoute) {
      // console.log(newRoute, oldRoute)
      let id = newRoute
      if (id) {
        this.currentView = this.isHandle(id) ? 'handle' : 'address'
      } else {
        this.currentView = null
        document.title = 'BCH_' + this.$t('home.title')
      }
    },
  },
  created () {
    let id = this.$route.query.q
    if (id) {
      this.currentView = this.isHandle(id) ? 'handle' : 'address'
    } else {
      this.currentView = null
    }
  }
}
</script>

<style lang="stylus">
// @import "@/assets/github-markdown.css"
::-webkit-scrollbar {
  width: 0.3em;
  height: 0.3em;
}
::-webkit-scrollbar-thumb {
  background: #AAAAAB;
}
::-webkit-scrollbar-track {
  background: #F1F1F1;
}
body {
  font-size: initial;
  scrollbar-face-color: #AAAAAB;
  scrollbar-track-color: #F1F1F1;
}
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-decoration-line: none;
  color: var(--theme);
}
a:active, a:hover {
  color: green;
}
a:focus {
  // color: green;
  font-weight: bold;
  border-bottom: 1px solid;
}
input,textarea{
  outline:0;
  -webkit-tap-highlight-color:transparent;
  -webkit-user-modify:read-write-plaintext-only
}

ul {
  // list-style: none;
  // padding: 0;
}

:root {
  --theme: #f08b16;
}

body {
  margin: 0;
}

#app {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
}

footer {
  text-align: center;
  padding: 15px 0 10px;
  color: #ccc;
}

footer a {
  color: #bbb6b6;
}

img, embed, iframe {
  max-width: 100%;
}

.expand-enter-active, .expand-leave-active {
  transition: all .3s ease;  /*padding: 10px;*/
  overflow: hidden;
}
.expand-enter, .expand-leave-active {
  height: 0;
  padding: 0 5px;
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

.link {
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in;
  -webkit-user-select: none;
}
.link:before {
  content: '';
  background-color: aliceblue;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scale(0.001, 0.001);
}
.link:focus {
  // outline: 0;
  // color: #fff;
}
.link:focus:before {
  animation: effect_dylan 0.8s ease-out;
}
@keyframes effect_dylan {
  50% {
    transform: scale(1.5, 1.5);
    opacity: 0;
  }
  99% {
    transform: scale(0.001, 0.001);
    opacity: 0;
  }
  100% {
    transform: scale(0.001, 0.001);
    opacity: 1;
  }
}

.btn {
  font-size: .12rem;
  background: #eee;
  color: #333;
  margin: .05rem;
  padding: .05rem;
  border: 1px solid #dedada;
  color: var(--theme);
}
  .layout-logo{
    display: flex;
    border-radius: 3px;
    float: left;
    position: relative;
    font-size: 1.2rem;
    padding-left: 10px;
    // background: var(--theme);
    color: var(--theme);
  }
  .layout-nav{
		margin-right: 20px;
		float: right;
    display: flex;
		font-size: .9rem;
  }
  .layout-nav .link {
    margin-left: 10px;
    font-size: .9rem;
  }
  .layout-footer-center{
    text-align: center;
  }
  .ivu-layout,
  .ivu-layout-footer {
    background: none;
  }
  .ivu-layout-header {
    background: none;
    boxShadow: 0 2px 3px 2px rgba(0,0,0,.1);
    padding: 0;
    margin-top: 10px;
    height: 44px;
    line-height: @height;
  }
  .logo-wrap {
    width: 44px;
    height: @width;
    margin-right: 10px;
    background: url('../assets/favicon.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }
  @media only screen and (min-width: 900px) {
    .ivu-layout {
      width: 750px;
      margin: 0 auto;
      // border: 1px solid #efefef;
    }
  }
  @media only screen and (max-width: 450px) {
    .layout-logo {
      left: 0;
      font-size: 1.2rem;
    }
    .address-detail {
      align-items: center;
    }
  }
  </style>

