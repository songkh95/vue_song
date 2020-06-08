import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const url = 'http://localhost:8081/notice/'
Vue.use(Vuex)

export const store =new Vuex.Store({
  state: {
    counter:'',
    data: { // default data�̴�. ���� �����Ǵ� �Խñ��� ���� ������ ��´�.
      category: '',
      title: '',
      contents: '',
      date: '',
      viewCnt: 0,
      nid: 0
    },
    notices: [],
    admin: { // ������ �α��ν�
      pw: 'abcd', // ������ �ڵ�(?)
      verify: true // ������ ����
    }
  },
  mutations: { // ���� ó���� ���
    // �÷��ǿ� ����� ��� ������ ���� �����´�(Notice.vue)
    getNotices (state) {
      axios.post(
        url
        ).then((res) => {
          state.notices = res.data
        }).catch((res) => {
        console.log(res)
      })
    },
    // collection�� ���ο� document�� �߰�(Create-Notice.vue)
    setForm (state, { title, contents, date, category }) {
      state.data.category = category
      state.data.title = title
      state.data.contents = contents
      state.data.date = date
      state.data.viewCnt = 0
      axios.post(
        url + 'create',
        state.data
      ).then((res) => {
        console.log('setForm Success')
      }).catch((res) => {
        console.log(res)
      })
    },
    // nid�� ���� detail������ �����´�.(detail.vue)
    getDetail (state, nid) {
      axios.post(
        url + ':nid',
        { nid: nid }
      ).then((res) => {
        console.log('getDetail Success')
        state.data.category = res.data.category
        state.data.title = res.data.title
        state.data.contents = res.data.contents
        state.data.date = res.data.date
        state.data.viewCnt = res.data.viewCnt
        state.data.nid = res.data.nid
      }).catch((res) => {
        console.log(res)
      })
    },
    // �ش� �������� document�� ����(detail.vue)
    deleteNotice (state, nid) {
      // state.data.nid = nid
      axios.post(
        url + 'delete/:nid',
        { nid: nid }
      ).then((res) => {
        console.log('deleteNotice Success')
      }).catch((res) => {
        console.log(res)
      })
    },
    // detail�� �����ϱ����� ������������ �̵�(detail.vue)
    modifyNotice (state, { title, contents, nid, category }) {
      axios.post(
        url + 'modify/:nid',
        {
          category: category,
          title: title,
          contents: contents,
          nid: nid
        }
      ).then((res) => {
        console.log('modifyNotice Success')
      }).catch((res) => {
        console.log(res)
      })
    },
    checkbox_estimate: function (state, payload) {
      return state.counter = payload;
    }
  },
  actions: { // �񵿱� ó���� ���
    checkbox_estimate: function (context, payload) {
      // commit 의 대상인 addCounter 는 mutations 의 메서드를 의미한다.
      return context.commit('checkbox_estimate', payload);
    }
  },
  modules: {
  }
})
