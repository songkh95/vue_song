<template>
  <div id="post_email">

    <!-- 문의하기 -->
    <form v-on:submit.prevent="post_email" @submit="checkForm" novalidate="true">
      <div v-show="customer_service">
        <h1>견적서 문의</h1>
        이름:             <input type="text" value="이름"     v-model="customer_name"><br>
        회사명:           <input type="text" value="회사명"   v-model="customer_company"><br>
        지역:             <input type="text" value="지역"     v-model="customer_local"><br>
        연락처:           <input type="text" value="연락처"   v-model="customer_phone"><br>
        이메일:           <input type="email" value="이메일"  v-model="customer_email"><br>
        설치 날짜/시간:   <input type="date" value="설지날짜" v-model="customer_date"><br>
        내용:             <input type="textarea" value="내용" v-model="customer_content"><br>
        
        <p v-if="errors.length">
          <label v-for="error in errors" :key="error.value">{{error}}</label>
        </p>

        <div>
          {{$store.state.counter}}
        </div>
        <br><br><br>
        <button type="submit" class="btn_before" >전송하기</button>
      </div>

    </form>
  </div>
</template>

<script>
import axios from "axios"

export default {
 name: 'Post_email',
   props: {
    first_results: String,
    option_select: String
  },
  data: function () {
    return {
      errors: [],
      customer_name: "",
      customer_company: "",
      customer_local:"",
      customer_email: "",
      customer_phone: "",
      customer_date: "",
      customer_content: "",
      customer_service: true
    }
  },
  methods:{ 
    //문의하기 유효성 검사
    checkForm(e) {
        e.preventDefault();
        this.errors = [];
        if (!this.customer_name) {
          this.errors.push("이름은 필수입니다.");
        }
        if (!this.customer_email) {
          this.errors.push("이메일은 필수입니다.");
        } else if (!this.validEmail(this.customer_email)) {
          this.errors.push("이메일 형식을 확인하세요.");
        }
        if (!this.errors.length) {
          this.result_Explanation = true;
          this.customer_service = false;  
          location.reload();
          return true;
        }
      },
      validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    //이메일 전송
    post_email() {
        let customer_name = this.customer_name;
        let customer_company = this.customer_company;
        let customer_local = this.customer_local;
        let customer_email = this.customer_email;
        let first_results = this.first_results;
        let customer_phone = this.customer_phone;
        let customer_date = this.customer_date;
        let customer_content = this.customer_content;
        let option_select = this.option_select;

        console.log(customer_name)
        console.log("이메일 전송: " + this.first_results)

        axios.get('http://localhost:8081/mail/mail', {
            params: {
              customer_name: customer_name,
              customer_company: customer_company,
              customer_local: customer_local,
              customer_email: customer_email,
              first_results: first_results,
              customer_phone: customer_phone,
              customer_date: customer_date,
              customer_content: customer_content,
              option_select: option_select
            },
            timeout: 2000
          })
          .then((res) => {
            console.log(res.deta)
          })
      }
  }
}
</script>

<style>

</style>