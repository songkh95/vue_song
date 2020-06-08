<template>
  <div id="view" class="NoticeCreate">
    <h2>글쓰기</h2>
    <form @submit="createNotice">
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
      <!-- CKEditor부분, class로 나누어 css적용가능 -->
      <div class="document-editor">
        <div class="document-editor__toolbar"></div>
        <div class="document-editor__editable-container">
          <div class="document-editor__editable" id="content">
          </div>
        </div>
      </div>
      <div id="btnCreate">
        <button type="submit">완료</button>
        <button @click="createCancel">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor'
export default {
  name: 'Create',
  data () {
    return {
      editorData: ''
    }
  },
  methods: {
    ...mapMutations(['setForm']),
    // create완료 버튼 클릭시 DB에 저장기능 수행
    createNotice (event) {
      // event.preventDefault()
      // editor div 속 내용을 eidtorData로 옮김
      this.editorData = document.getElementById('content').innerHTML
      // title 혹은 contents가 비어있으면 저장 되지않음
      if (event.target[0].value === '' || event.target[1].value === '' || this.editorData === '') {
        alert('입력을 마쳐주세요.')
      } else {
        // Date()로 날짜를 구해 string형식으로 전달
        const today = new Date()
        const date = today.getFullYear() +
          '.' + (today.getMonth() + 1) + '.' + today.getDate()
        // 백엔드로 보낼 데이터 객체
        this.setForm({
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
    createCancel () {
      this.$router.push({
        path: '/notice'
      })
    }
  },
  mounted () {
    // CKEditor 생성메서드, ClassicEditor는 css적용이 어려워 DecoupledEditor 사용
    DecoupledEditor
      .create(document.querySelector('.document-editor__editable'))
      .then(editor => {
        const toolbarContainer = document.querySelector('.document-editor__toolbar')
        toolbarContainer.appendChild(editor.ui.view.toolbar.element)
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style scoped>
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
    padding: 5px;
  }
  .document-editor__editable {
    border: 1px solid var(--ck-color-base-border);
    min-height: 500px;
  }
  #btnCreate{
    margin: 15px 0 15px 0;
  }
  #btnCreate button{
    width: 55px;
    height: 35px;
    border: 1px solid #e7e9ee;
    background: #fff;
    border-radius: 5px;
    margin: 2px 10px 2px 10px;
  }
  #btnCreate button:hover{
    background: #e7e9ee;
    color: #000;
  }

  @media screen and (max-width: 550px) {
    #title label {
      display: none;
    }
  }
</style>
