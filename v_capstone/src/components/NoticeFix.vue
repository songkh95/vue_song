<template>
  <div id="view" class="notice">
    <section class="notice_all">
      <ul id="lists">
        <li id="list" v-for="notice in notices.slice(listNum, listNum + 10)" v-bind:key="notice.nid">
          <div id="post">
            <table>
              <tr>
                <td class="table_td_category">
                  <span id="subCategory" class="sub">
                    <img src="../assets/noticeFix.png" />
                  </span>
                </td>
                <td class="table_td_title">
                  <router-link id="title" :to="'/notice/' + notice.nid">
                    {{notice.title}}
                  </router-link>
                </td>
                <td class="table_td_subInformation">
                  <span id="subInfor" class="sub">
                    <span>{{notice.date}} | </span>
                    <span>{{notice.viewCnt}}</span>
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </li>

      </ul>
      <div id="btnPage">
        <button id="prevPage" v-bind:disabled="pageNum === 0" @click="prevPage">이전</button>
        <span>
          <span class="btn page-count"> {{ pageNum + 1 }} / {{ pageCount }} </span>
        </span>
        <button id="nextPage" v-bind:disabled="pageNum >= pageCount - 1" @click="nextPage">다음</button>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'NoticeAll',
    data: function () {
      return {
        pageNum: 0, // 현재 페이지
        listNum: 0, // 페이지 수 리스트 보여질 때, 0~10, 10~20 ...
        notices: [], // 가져온 게시글들 정보
      }
    },
    props: {
      pageSize: { // 한 페이지에 출력될 게시글의 수
        type: Number,
        required: false,
        default: 10
      },
      val: String
    },
    methods: {
      // 이전 페이지를 눌를 때
      prevPage() {
        this.pageNum -= 1
        this.listNum -= 10
      },
      // 다음 페이지를 눌를 때
      nextPage() {
        this.pageNum += 1
        this.listNum += 10
      }
    },
    mounted() {
      this.notices = this.$store.state.notices.filter(notice => notice.category === 'fix')
    },

    computed: {
      pageCount() {
        var listLeng = this.notices.length // 게시글의 총 개수
        var maxPage = Math.ceil(listLeng / this.pageSize) // 페이지 총수
        return maxPage
      }
    }
  }
</script>
<style scoped>

  * {
    margin: 0;
    padding: 0;
  }

  .notice_all {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  #lists {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 30px;
    width: 77%;
  }
  #lists a{
text-decoration: none; 
    outline: none;
    color: black;
    font-weight: bold;
 }

    #lists li {
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 15px 5%;
      border-bottom: 2px solid #fff;
    }

      #lists li:nth-child(odd) {
        background: #efefef;
      }

      #lists li:nth-child(even) {
        background: #fbfbfb;
      }



  #category {
    background: #efefef;
  }

    #category button {
      width: 150px;
      height: auto;
      font-size: 25px;
      font-weight: 700;
      border: none;
      text-shadow: 1px 1px 1px #808080;
      margin: 0 30px;
    }

      #category button:hover {
        transform: translate(1px, 1px);
        text-shadow: none;
      }

  #search {
    display: flex;
    align-items: center;
    justify-items: center;
  }

  #searchInput {
    position: relative;
    padding: 13px 10px;
    width: 650px;
  }

  #searchIcon {
    width: 45px;
    height: 45px;
    transform: translateX(-46px);
  }

  #searchAdmin {
    position: absolute;
    left: 76%;
  }

    #searchAdmin img {
      width: 20px;
      height: 20px;
    }

  #post {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #title {
    height: 22px;
    font-size: 17px;
    align-items: center;
  }

  .sub {
    font-size: 12px;
  }

  #subInfor {
    text-align: right;
  }

  #subCategory {
    margin-right: 35px
  }

    #subCategory img {
      width: 22px;
    }

  .table_td_category {
    width: 9%;
  }

  .table_td_title {
    width: 700px;
  }

  .table_td_subInformation {
    width: 100px;
  }

  #btnPage {
    margin: 15px 0 15px 0;
    color: #000;
  }

  #nextPage, #prevPage {
    width: 60px;
    height: 40px;
    border: 1px solid #e7e9ee;
    background: #fff;
    border-radius: 5px;
    margin: 5px 13px;
  }

    #nextPage:hover, #prevPage:hover {
      background: #e7e9ee;
    }

  #admin {
    display: block;
    position: fixed;
    top: 50px;
    left: 50px;
  }
</style>


