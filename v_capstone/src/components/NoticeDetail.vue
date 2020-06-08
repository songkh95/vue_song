<template>
  <div id="view" class="detail">
    <div id="title">
      <div>{{details.title}}</div>
      <span>{{details.date}}</span>
    </div>
    <div id="contents" v-html="details.contents"></div>
    <div id="btnAdmin" v-if="admin">
      <button @click="_deleteNotice">삭제</button>
      <router-link :to="'/notice/modify/' + this.nid" tag="button">수정</router-link>
    </div>
    <div id="disqus_thread"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Detail',
  data: function () {
    return {
      details: [], // 게시글 details 정보
      admin: false,
      nid: 0
    }
  },
  methods: {
    ...mapMutations(['getDetail', 'deleteNotice', 'modifyNotice']),
    // 삭제시에 한번 더 묻고 result에 따라 삭제 요청을 수행
    _deleteNotice () {
      var result = confirm('이 공지를 삭제하시겠습니까?')
      if (result) {
        alert('삭제되었습니다.', this.nid)
        this.deleteNotice(this.nid)
        this.$router.push({
          path: '/notice'
        })
      }
    }
  },
  created () {
    this.nid = this.$route.params.nid // db에 요청할 nid 번호를 가져온다
    this.getDetail(this.nid) // nid에 맞는 details요청
    this.admin = this.$store.state.admin.verify
  },
  mounted () {
    // nid에 따른 요청정보를 가져와 details에 저장
    this.details = this.$store.state.data;
    // DISQUS 호출
    (function () {
      var d = document
      var s = d.createElement('script')
      s.src = 'https://noticetest.disqus.com/embed.js'
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s)
    })()
  }
}
</script>

<style scoped>
  .detail{
    text-align:left;
  }
  #title{
    padding: 30px 90px 30px 90px;
    margin: 20px 0 25px 0;
    display: flex;
    flex-direction: column;
    background:#f7f7f7;
    border-bottom: 2px solid #e7e9ee;
    border-top: 2px solid #e7e9ee;
  }
  #title div{
    font-size: 18px;
  }
  #title span{
    margin-top: 7px;
    font-size: 14px;
    color: #444343;
  }
  #contents{
    padding: 0 90px 30px 90px;
    border-bottom: 2px solid #e7e9ee;
    margin-bottom: 15px;
  }
  #btnAdmin{
    text-align: center;
    margin: 15px 0 15px 0;
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
  #disqus_thread {
  }
</style>
