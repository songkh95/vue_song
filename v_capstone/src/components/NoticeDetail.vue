<template>
  <div id="view" class="detail">
    <header class="curation_header">
      <Menu />
    </header>
    <section class="detail_section">
      <div id="detail_information">
        <span id="detail_title">{{details.title}}</span>
        <span id="detail_date">{{details.date}}</span>
      </div>
      <div id="contents" v-html="details.contents"></div>
      <div id="searchAdmin" v-show="!admin"><img src="../assets/setting.png"  @click="authAdmin"></div>
      <div  id="btnAdmin">
        <button v-show="admin" @click="_deleteNotice">삭제</button>
        <router-link v-show="admin" to="/notice" tag="button">목록</router-link>
        <router-link v-show="admin"  :to="'/notice/modify/' + nid" tag="button">수정</router-link>
      </div>
      </section>
    <Disqus/>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
import Menu from './Menu'
import Disqus from './Disqus'

export default {
    name: 'Detail',
    components: {
      Menu,
      Disqus
  },
  data: function () {
    return {
      details: [], // 게시글 details 정보
      nid: 0,
      admin: false
    }
  },
  methods: {
    ...mapMutations(['getDetail', 'deleteNotice', 'modifyNotice']),
    // 삭제시에 한번 더 묻고 result에 따라 삭제 요청을 수행
    _deleteNotice () {
      var result = confirm('이 공지를 삭제하시겠습니까?')
      if (result) {
        this.$store.state.category=''
        this.$store.dispatch('deleteNotice', this.nid)
        alert('삭제되었습니다.', this.nid)
        this.$router.push({
          path: '/notice'
        })
      }
    },
    authAdmin(){
      if (this.$store.state.admin.verify == false){
        var pw = prompt('관리자 로그인', '');
        if(this.$store.state.admin.pw == pw){
          this.$store.state.admin.verify = true
          this.admin=true
        } 
      }else{
        this.admin=true
      }
    }
  },
  created () {
    this.nid = this.$route.params.nid // db에 요청할 nid 번호를 가져온다
    this.getDetail(this.nid) // nid에 맞는 details요청
  },
  mounted () {
    // nid에 따른 요청정보를 가져와 details에 저장
    this.details = this.$store.state.data;
  }
}
</script>

<style scoped>
  *{
    margin:0;
    padding:0;
  }
  .detail_section{
    margin-top: 10px; 
    display: flex;
    flex-direction:column;
    align-items:center;
  }
  #detail_information{
    padding: 30px 90px;
    margin: 25px 0;
    display: block;
    width: 65%;
    background:#f7f7f7;
    border-bottom: 2px solid #e7e9ee;
    border-top: 2px solid #e7e9ee;
  }
  #detail_title{
    font-size: 20px;
    font-weight: bold;
  }
  #detail_date{
    margin: 5px 20px 0 0 ;
    font-size: 14px;
    color: #444343;
    float: right;
  }
  #contents{
    padding: 0 30px 30px 30px;
    border-bottom: 2px solid #e7e9ee;
    margin-bottom: 15px;
    width: 74%;
    min-height: 400px;
  }
  #btnAdmin{
    text-align: center;
    margin: 15px 0 40px 0;
  }
  #btnAdmin button{
    width: 55px;
    height: 35px;
    border: 1px solid #e7e9ee;
    background: #fff;
    border-radius: 5px;
    margin: 2px 10px 2px 10px;
  }
  #btnAdmin button:hover{
    background: #e7e9ee;
    color: #000;
  }
  #searchAdmin img{
    position: absolute;
    left: 80%;
    width: 20px;
    height: 20px;
  }

</style>
