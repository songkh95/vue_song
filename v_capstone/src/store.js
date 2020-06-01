import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {  
    //컴포넌트간 공유할 Data 객체를 의미
    counter: ""
  },
  getters: { 
    //공유하는 Data 를 그대로 전달, 혹은 가공하여 전달
    //쉽게 다른 언어에서도 사용하고 있는 Getter 같은 역할이라고 생각하면 편함

  },
  mutations: {
        // 저장소에 공유되어 있는 Data 를 가공
    // 인자를 전달받아 미리 정의된 모듈을 실행하여 상태를 재 변경
    // Setter 역할이라고 생각하면 편함
    checkbox_estimate: function (state, payload) {
      return state.counter = payload;
    }
  },
  actions: {
        // Mutations 과 동일하나 비동기 작업을 처리할때 사용
    // 주로 네트워크 통신을 통한 API 호출, 반응형 동작시 사용
    checkbox_estimate: function (context, payload) {
      // commit 의 대상인 addCounter 는 mutations 의 메서드를 의미한다.
      return context.commit('checkbox_estimate', payload);
    }
  }
})