<template>
  <div id="view" class="modify">
    <h2>수정</h2>
    <form @submit="_modifyNotice">
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
      <!-- CKEditor부분, class로 나누어 css적용가능 -->
      <div class="document-editor">
        <div class="document-editor__toolbar"></div>
        <div class="document-editor__editable-container">
          <div class="document-editor__editable" id="content">
            <span v-html="editorData"></span>
          </div>
        </div>
      </div>
      <div id="btnModify">
        <button type="submit">완료</button>
        <button @click="modifyCancel">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor'
export default {
  name: 'Modify',
  data: function () {
    return {
      notices: [],
      editorData: '' // CKEditor span에 부분
    }
  },
  methods: {
    ...mapMutations(['modifyNotice']),
    // 수정 완료 클릭시
    _modifyNotice (event) {
      console.log(event)
      this.modifyNotice({
        category: event.target[0].value,
        title: event.target[1].value,
        contents: document.getElementById('content').innerHTML,
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
    // CKEditor 생성메서드, ClassicEditor는 css적용이 어려워 DecoupledEditor 사용
    DecoupledEditor
      .create(document.querySelector('.document-editor__editable'))
      .then(editor => {
        const toolbarContainer = document.querySelector('.document-editor__toolbar')
        toolbarContainer.appendChild(editor.ui.view.toolbar.element)
        console.log('11111====', this.notices)
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
  #btnModify{
    margin: 15px 0 15px 0;
  }
  #btnModify button {
    width: 55px;
    height: 35px;
    border: 1px solid #e7e9ee;
    background: #fff;
    border-radius: 5px;
    margin: 2px 10px 2px 10px;
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
