<template>
  <div id="ost_mail">
    
          <!-- 문의하기 -->
          <form v-on:submit.prevent="post_email">
            <div v-show="customer_service">
              <h1>견적서 문의</h1>
              이름: <input type="text" value="이름" placeholder="이름" v-model="customer_name"><br>
              회사명: <input type="text" value="회사명" placeholder="회사명" v-model="customer_company"><br>
              지역: <input type="text" value="지역" placeholder="지역" v-model="customer_local"><br>
              연락처: <input type="text" value="연락처" placeholder="연락처"><br>
              이메일: <input type="email" value="이메일" placeholder="songch95@naver.com" v-model="customer_email"><br>
              설치 날짜/시간: <input type="text" value="설지날짜" placeholder="희망하는 날짜와 시간대를 작성해주세요."><br>
              내용: <input type="textarea" value="내용" placeholder="희망사항"><br>

              <br><br><br>
              <button type="submit" class="btn_before" @click="send_mail">전송하기</button>
            </div>

          </form>
  </div>
</template>

<script>
import axios from "axios"

export default {
 name: 'Other_products',
  data: function () {
    return {
      customer_name: "",
      customer_company: "",
      customer_local:"",
      customer_email: "",
      customer_service: true
    }
  },
  props: {
    first_results: String
  },
  methods:{
    //이메일 전송
    post_email(){
      let customer_name = this.customer_name;
      let customer_company = this.customer_company;
      let customer_local = this.customer_local;
      let customer_email = this.customer_email;
      let first_results = this.first_results;

      console.log("asd: "+this.first_results)

       axios.get('http://localhost:8081/mail/mail', { 
         params: {
          customer_name: customer_name,
          customer_company: customer_company,
          customer_local: customer_local,
          customer_email: customer_email,
          first_results: first_results
         },
         timeout: 2000
       }) 
       .then((res)=>{
            console.log(res.deta)
      })
    },
        //문의하기 ->  이메일 전송 버튼
    send_mail(){
       this.result_Explanation = true;
       this.customer_service = false;
       //this.result_question = false;
    },
  }
}
</script>

<style>

</style>