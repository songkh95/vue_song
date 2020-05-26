<template>
  <div id="question_result">
    <div>

      <form v-on:submit.prevent="result_save">
        <h1> 질문지 결과</h1>
        <div>
          <ul>
            <li>희망하시는 기기: {{answer["1"]}}</li>
            <li>구매 방법: {{answer["2"]}}</li>
            <li>계약기간: {{answer["2-1"]}}</li>
            <li>희망 임대 금액: {{answer["2-2"]}}</li>
            <li>스캔 속도: {{answer["3"]}}</li>
            <li>프린터 속도: {{answer["3-1"]}}</li>
            <li>프린트 해상도: {{answer["4"]}}</li>
            <li>옵션: {{answer["5"]}}</li>
            <li>장점: {{answer["6"]}}</li>
            <li>사용 인원: {{answer["7"]}}</li>
            <li>출력물 종류: {{answer["7-1"]}}</li>
            <li>한달 평균 사용량: {{answer["7-2"]}}</li>
            <li>한달 평균 용지 사용량: {{answer["7-3"]}}</li>
          </ul>
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

</style>