<template>
  <div id="view" class="notice">
    <header>
      <Menu />
    </header>
    <h2>고객지원</h2>
            <router-link id="Create" to="/notice/create" tag="a" v-if="admin">CREATE</router-link>
        <a id="Admin" @click="verifyAdmin" v-if="!admin">ADMIN</a>
    <ul id="lists">
      <li id="category">
        <button id="category1" @click="cateFilter('question')">자주 묻는 질문</button>
        <button id="category2" @click="cateFilter('fix')">고장 에러 대처방법</button>
        <button id="category3" @click="cateFilter('util')">유용한 기능</button>
      </li>
      <li id="list" v-for="notice in notices.slice(listNum, listNum + 10)" v-bind:key="notice.nid">
        <div id="title">
          <router-link v-bind:to="'/notice/' + notice.nid" >
            {{notice.title}}
          </router-link>
        </div>
        <div id="sub">
          <span id="subInfor">
            <span>{{notice.date}} | </span>
            <span>{{notice.viewCnt}}</span>
          </span>
          <span id="subCategory">
            <span v-if="notice.category == 'question'">자주 묻는 질문</span>
            <span v-else-if="notice.category == 'fix'">고장 에러 대처방법</span>
            <span v-else>유용한 기능</span>
          </span>
        </div>
      </li>
    </ul>
    <div id="btnPage">
      <button id="prevPage" v-bind:disabled="pageNum === 0" @click="prevPage">이전</button>
      <span>
        <span v-if="cateState===null" class="btn page-count"> {{ pageNum + 1 }} / {{ pageCount }} </span>
        <span v-else class="btn page-count"> {{ pageNum + 1 }} / {{ pageCount }} </span>
      </span>
      <button id="nextPage" v-bind:disabled="pageNum >= pageCount - 1" @click="nextPage">다음</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Menu from './Menu'
export default {
  name: 'Notice',
  components: {

    Menu
  },
  data: function () {
    return {
      admin: false,

      cateState: '',
      pageNum: 0, // 현재 페이지
      listNum: 0, // 페이지 수
      listSize: 0,
      listLeng: 0,
      notices: [], // 가져온 게시글들 정보
      cateNotice: []
    }
  },
  props: {
    pageSize: { // 한 페이지에 출력될 게시글의 수
      type: Number,
      required: false,
      default: 10
    }
  },
  methods: {
    ...mapMutations(['getNotices']),
    // server에 요청해 notices콜렉션 데이터를 받아온다
    _getNotices () {
      this.getNotices()
    },
    // 이전 페이지를 눌를 때
    prevPage () {
      this.pageNum -= 1
      this.listNum -= 10
    },
    // 다음 페이지를 눌를 때
    nextPage () {
      this.pageNum += 1
      this.listNum += 10
    },
    cateFilter (category) {
      this.cateState = category
      this.cateNotice = this.notices.filter(notice => notice.category === this.cateState)
      console.log(this.cateNotice)
    },
     verifyAdmin () {
      event.preventDefault() // ������ ���ΰ�ħ ����
      var input = prompt('������ �α���' + '')
      if (input === this.$store.state.admin.pw) {
        this.$store.state.admin.verify = true
        this.admin = true
      }
    }
  },
  mounted () {
    this.admin = this.$store.state.data.pw
  },
  updated () {
    if (this.pageNum === 0) {
      this.notices = this.$store.state.notices
    }
  },
  created () {
    this._getNotices()
  },
  computed: {
    // db에서 가져온 문서들의 길이를 가져와 *게시글 수와 *페이지 수를 구한다.
    pageCount () {
      var listLeng = this.$store.state.notices.length // 게시글의 총 개수
      var listsize = Math.ceil(listLeng / this.pageSize) // 페이지 총수
      return listsize
    }
  }
}
</script>

<style scoped>
header{
  top: 0;
}
  #lists{
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 15px;
  }
  #lists li{
    display: flex;
    flex-direction:column;
    text-align: left;
    max-width: 1440px;
    padding: 30px 90px 30px 90px;
  }
  #lists li:nth-child(odd){
    background:#f7f7f7;
  }
  #lists li:nth-child(even){
    background:#fff;
  }
  #lists li:first-child{
    flex-direction:row;
    justify-content: space-between;
  }
  #category button {
    width: auto;
    height: auto;
    font-size: 25px;
    font-weight: 700;
    border: none;
    background:none;
    text-shadow: 1px 1px 1px #808080;
  }
  #category button:hover{
    transform: translate(1px, 1px);
    text-shadow: none;
  }
  #title{
    font-size: 18px;
  }
  #title a{
    text-decoration: none;
    color: #000;
  }
  #sub{
    margin-top: 7px;
    font-size: 14px;
    color: #444343;
  }
  #subInfor{
    text-align: left;
  }
  #subCategory{
    float: right;
    text-align: right;
  }
  #btnPage{
    margin: 15px 0 15px 0;
    color: #000;
  }
  #nextPage, #prevPage {
    width: 55px;
    height: 35px;
    border: 1px solid #e7e9ee;
    background: #fff;
    border-radius: 5px;
    margin: 2px 10px 2px 10px;
  }
  #nextPage:hover, #prevPage:hover {
    background: #e7e9ee;
  }
</style>
