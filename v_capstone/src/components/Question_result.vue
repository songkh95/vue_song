<template>
  <div id="question_result">
    <div>
      {{answer["2-3"]}}
      <form v-on:submit.prevent="result_save"  class="result_save">
        <h1> 질문지 결과</h1>
        <div>
          <table>
            <tr>
              <td>#희망하시는 기기: {{answer["1"]}} </td>
              <td>#구매 방법: {{answer["2"]}}</td>
            </tr>
            <tr>
              <td>#계약기간: {{answer["2"] == "lease" ? answer["2-1"] : answer["2-3"]}}</td>
              <td>#희망 임대 금액: {{answer["2-2"]}}</td>
            </tr>
            <tr>
              <td>#희망 구매 금액: {{answer["2-3"]}}</td>
              <td>#스캔 속도: {{answer["3"]}}</td>
            </tr>
            <tr>
              <td>#프린터 속도: {{answer["3-1"]}}</td>
              <td>#프린트 해상도: {{answer["4"]}}</td>
            </tr>
            <tr>
              <td>#옵션: {{answer["5"]}}</td>
              <td>#장점: {{answer["6"]}}</td>
            </tr>
            <tr>
              <td>#사용 인원: {{answer["7"]}}</td>
              <td>#출력물 종류: {{answer["7-1"]}}</td>
            </tr>
            <tr>
              <td>#한달 평균 사용량: {{answer["7-2"]}}</td>
              <td>#한달 평균 용지 사용량: {{answer["7-3"]}}</td>
            </tr>
          </table>
        
          <!-- 총 12개 질문 / 대질문: 7개 / 소질문: 5개 -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question_result',
    props: {
    answer: Object
  },
  data: function() {
    return {
    }
  },

  
}
</script>

<style>
.result_save{
  text-align: left;
}

.result_save td{
  width: 10vw;
  font-size: 15px;
}

.result_save h1{
  font-size: 30px;
}
</style>