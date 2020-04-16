// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({ //vue 인스턴스
  el: '#app', //index.html의 <div id="app"> 마운팅
  router, // vue-router를 사용할 수 있게 합니다.
  components: { App }, // App 컴포넌트를 사용합니다.
  template: '<App/>', //화면에 표시할 HTML, CSS 등의 마크업 요소를 정의하는 속성
                      //#app에 마운팅 되는 컴포넌트는 <App /> 입니다.
  data: {
    message: "야호"
  }
})
