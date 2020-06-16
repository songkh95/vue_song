<template>
  <div id="view" class="NoticeCreate">
    <header class="curation_header">
      <Menu />
    </header>
    <section class="notice_create">
      <h2>글쓰기</h2>
      <form class="create_form" @submit="createNotice">
        <div id="category">
          <label>형식</label>
          <select>
            <option value="" selected disabled hidden>글 형식</option>
            <option value="question">자주 묻는 질문</option>
            <option value="fix">고장 에러 대처방법</option>
            <option value="util">유용한 기능</option>
          </select>
        </div>
        <div id="title">
          <label>제목</label>
          <input type="text" placeholder="TITLE">
        </div>
        <div id="editor1" >
        </div>
        <!--
        <div class="document-editor">
          <div class="document-editor__toolbar"></div>
          <div class="document-editor__editable-container">
            <div class="document-editor__editable">
              <p>The initial editor data.</p>
            </div>
          </div>
        </div>
         -->
        <div id="btnCreate">
          <button type="submit">완료</button>
          <button @click="createCancel">취소</button>
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
    name: 'Create',
    data() {
      return {
        editorData: '',
      }
    },
    components: {
      Menu
    },
    methods: {
      ...mapMutations(['setForm']),
      // create완료 버튼 클릭시 DB에 저장기능 수행
      createNotice(event) {
        // editor div 속 내용을 eidtorData로 옮김
        // title 혹은 contents가 비어있으면 저장 되지않음
        event.preventDefault()
        this.$store.state.category = ''
        this.editorData = document.querySelectorAll('.ck-editor__editable_inline')[0].innerHTML
        if (event.target[0].value === '' || event.target[1].value === '' || this.editorData === '') {
          alert('입력을 마쳐주세요.')
        } else {
          // Date()로 날짜를 구해 string형식으로 전달
          const today = new Date()
          const date = today.getFullYear() +
            '.' + (today.getMonth() + 1) + '.' + today.getDate()
          // 백엔드로 보낼 데이터 객체
          this.$store.dispatch('setForm', {
            category: event.target[0].value,
            title: event.target[1].value,
            contents: this.editorData,
            date: date
          })
          this.$router.push({
            path: '/notice'
          })
          alert('추가되었습니다.')
        }
      },
      // 취소 클릭시
      createCancel() {
        this.$router.push({
          path: '/notice'
        })
      }
    },
    mounted() {
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

  .notice_create {
    display: flex;
    flex-direction: column;
    margin: 30px 0;
    align-items: center;
    width: 100%;
  }

  .create_form {
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

  #btnCreate {
    display: flex;
    margin: 15px 0 15px 0;
    justify-content: center;
  }

    #btnCreate button {
      width: 70px;
      height: 50px;
      border: 1px solid #e7e9ee;
      background: #fff;
      border-radius: 5px;
      margin: 5px 13px;
    }

      #btnCreate button:hover {
        background: #e7e9ee;
        color: #000;
      }

  @media screen and (max-width: 550px) {
    #title label {
      display: none;
    }
  }

  .ck.ck-editor__editable_inline {
    height: 400px;
  }
</style>
