<template>
  <div id="view" class="notice" >
    <header class="curation_header">
      <Menu />
    </header>
    <section class="notice_section">
      <div class="notice_category">
        <div @click="$store.state.category='All'"><img src="../assets/noticeAll.png" /><span>고객<br />센터</span></div>
        <div @click="$store.state.category='Question'"><img src="../assets/noticeQuestion.png" /><span>자주 묻는<br /> 질문</span></div>
        <div @click="$store.state.category='Fix'"><img src="../assets/noticeFix.png" /><span>고장 에러<br /> 대처방법</span></div>
        <div @click="$store.state.category='Util'"><img src="../assets/noticeUtil.png" /><span>유용한<br /> 기능</span></div>
      </div>
      <section class="category_section" :is="$store.state.category"></section>
      <div id="searchAdmin"><img src="../assets/setting.png"  @click="authAdmin"></div>
    </section>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Menu from './Menu'
import All from './NoticeAll'
import Util from './NoticeUtil'
import Question from './NoticeQuestion'
import Fix from './NoticeFix'
export default {
  name: 'Notice',
  components: {
    Menu,
    All,
    Util,
    Question,
    Fix
  },
  data: function () {
    return {
      auth: ''
    }
  },
  methods: {
    ...mapMutations(['getNotices']),
    authAdmin(){
      if (this.$store.state.admin.verify == false){
        var pw = prompt('관리자 로그인', '');
        if(this.$store.state.admin.pw == pw){
          this.$store.state.admin.verify = true
        }
      }else{
        this.$router.push({
            path: '/notice/create'
          })
      }
    }
  },
  created() {
    this.$store.dispatch('getNotices')
  }
}
</script>

<style scoped>
  *{
    margin:0;
    padding:0;
  }
  .notice_section{
    display: flex;
    flex-direction:column;
    margin: 30px 0;
    align-items:center;
  }
  .notice_category{
    display: flex;
    justify-content: space-around;
    width: 75%;
    margin: 60px 0px;
  }
  .notice_category div{
    margin: 0px;
    display:flex;
    flex-direction:column;
    width: 20%;
    font-size: 18px;
    padding-top: 10px;
    font-weight: bold;
    align-items:center;
    justify-content:center;
  }
    .notice_category div:hover {
      background: #f1f1f1;
      border-radius: 7px;
    }

  .notice_category img{
    height: 50px;
    cursor: pointer;
  }
  .notice_category span{
    padding: 15px;
    cursor: pointer;
    text-align:center;
  }
  .category_section{
    width:85%;
  }
  .admin{
    position: fixed;
  }
  #searchAdmin img{
    position: absolute;
    left: 80%;
    width: 20px;
    height: 20px;
    transform:translateY(-50px)
  }
</style>
