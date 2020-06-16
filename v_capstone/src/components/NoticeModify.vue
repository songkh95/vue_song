<template>
  <div id="view" class="modify">
    <header class="curation_header">
      <Menu />
    </header>
    <section class="notice_modify">
      <h2>수정</h2>
      <form class="modify_form" @submit="_modifyNotice">
        <div id="category">
          <label>형식</label>
          <select :value="notices.category">
            <option value="" disabled hidden>글 형식</option>
            <option value="question">자주 묻는 질문</option>
            <option value="fix">고장 에러 대처방법</option>
            <option value="util">유용한 기능</option>
          </select>
        </div>
        <div id="title">
          <label>제목</label>
          <input type="text" v-model="notices.title">
        </div>
        <div id="editor1" v-html="editorData"></div>

        <div id="btnModify">
          <button type="submit">완료</button>
          <button @click="modifyCancel">취소</button>
        </div>
      </form>
      </section>
  </div>
  </template>

  <script>
  import { mapMutations } from 'vuex'
   import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    import Menu from './Menu'
  export default {
    name: 'Modify',
    data: function () {
      return {
        notices: [],
        editorData: 'zz'
      }
    },
    components: {
        Menu
      },
    methods: {
      ...mapMutations(['modifyNotice']),
      // 수정 완료 클릭시
      _modifyNotice(event) {
        this.$store.state.category=''
        this.editorData = document.querySelectorAll('.ck-editor__editable_inline')[0].innerHTML
        this.$store.dispatch('modifyNotice', {
          category: event.target[0].value,
          title: event.target[1].value,
          contents: this.editorData,
          nid: this.notices.nid
        })
        this.$router.push({
          path: '/notice'
        })
        alert('Notice modified 공지사항 수정됨') // 한글깨짐
      },
      // 취소 클릭시
      modifyCancel () {
        this.$router.push({
          path: '/notice'
        })
      }
    },
    created () {
      // 수정 전 페이지인 detail에 저장된 정보 가져옴
      this.notices = this.$store.state.data
      this.editorData = this.notices.contents
    },
    mounted () {
     ClassicEditor
        .create(document.querySelector('#editor1'),
          {
            cloudServices: {
              tokenUrl: 'https://72480.cke-cs.com/token/dev/pLd5XoK3Vhe6elnckjraC53xi2lF72rlPSqlxV0zI7Mw1q2FaejxbdYQHP0x',
              uploadUrl: 'https://72480.cke-cs.com/easyimage/upload/'
    }
            })
        .then(editor => {
        })
        .catch( error => {
          console.error( error );
        });
    }
  }
  </script>

  <style scoped>

    .notice_modify {
      display: flex;
      flex-direction: column;
      margin: 30px 0;
      align-items: center;
      width: 100%;
    }
    .modify_form {
      width: 80%;
    }

    #title, #category {
      text-align: left;
      font-size: 20px;
      margin: 5px 0 15px 0;
    }

      #title label, #category label {
        margin-right: 40px;
      }

      #title input {
        padding: 10px 10px 10px 10px;
        width: 40%;
        min-width: 250px;
      }

      #category select {
        height: 35px;
        padding: 5px;
      }

    .document-editor__editable {
      border: 1px solid var(--ck-color-base-border);
      min-height: 500px;
    }

    #btnModify {
      display: flex;
      margin: 15px 0 15px 0;
      justify-content: center;
    }

      #btnModify button {
        width: 70px;
        height: 50px;
        border: 1px solid #e7e9ee;
        background: #fff;
        border-radius: 5px;
        margin: 5px 13px;
      }

        #btnModify button:hover {
          background: #e7e9ee;
          color: #000;
        }

    @media screen and (max-width: 550px) {
      #title label {
        display: none;
      }
    }
  </style>
