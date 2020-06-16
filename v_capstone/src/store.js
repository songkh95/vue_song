import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const url = 'http://localhost:8081/notice/'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    counter:'',
    product_name: '',
    product_content: {},
    product_home: {},
    category: '',
    data: { 
      category: '',
      title: '',
      contents: '',
      date: '',
      viewCnt: 0,
      nid: 0
    },
    notices: [],
    admin: { 
      pw: 'abc',
      verify: false 
    }
  },
  mutations: { 
    getNotices(state, payload) {
      state.notices = payload
      state.category = 'all'
  },
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
    checkbox_estimate(state, payload) {
      return state.counter = payload;
    },
    product_intro(state, payload){   
      state.product_content = payload;
    },
    product_home(state, payload){
      state.product_home = payload;
    }
    
    
  },
  actions: { 
    getNotices(context){
      axios.post(url)
        .then((res) => {
          context.commit('getNotices', res.data)
        })
        .catch((res) => {
          console.log(res)
        })
    },
    setForm(context, payload){
      axios.post(
          url + 'create',
          payload, {
            timeout: 2000
          }
      ).then((res) => {
          context.commit('getNotices', res.data)
      }).catch((res) => {
          console.log(res)
      })
    },
    deleteNotice(context, nid){
      console.log('nid',nid)
      axios.post(
          url + 'delete/:nid',
          { nid: nid }, {
            timeout: 2000
          }
      ).then((res) => {
          context.commit('getNotices', res.data)
      }).catch((res) => {
          console.log(res)
      })
    },
    modifyNotice(context, payload){
      axios.post(
          url + 'modify/:nid',
          payload, {
            timeout: 2000
      }
      ).then((res) => {
          context.commit('getNotices', res.data)
      }).catch((res) => {
          console.log(res)
      })
    },
    checkbox_estimate(context, payload) {
      return context.commit('checkbox_estimate', payload);
    },
    product_intro(context, payload){
      let product_name = payload;
      axios.get('http://localhost:8081/c_products/product/', {   
          params: {
            product_name: product_name
          },
          timeout: 2000
      }) 
      .then((res)=>{
          context.commit('product_intro', res.data);

      })
      
      axios.get('http://localhost:8081/b_products/product/', {   
          params: {
            product_name: product_name
          },
          timeout: 2000
      }) 
      .then((res)=>{
        context.commit('product_intro', res.data);
      })
    },
    product_home(context, payload){
      let product_name = payload;
      axios.get('http://localhost:8081/best_new_products/product/', {   
          params: {
            product_name: product_name
          },
          timeout: 2000
      }) 
      .then((res)=>{
        context.commit('product_intro', res.data);
      })

      axios.get('http://localhost:8081/best_new_products/img/', {
            timeout: 2000
          })
          .then((res) => {
            context.commit('product_home', res.data);
          })
          .catch((err) => {
            console.log(err);
          })
    }
  }
})
