<template>
  <div id="Estimate">

    <!-- 문의하기 -->
        <button class="cancel" @click="btn_close" v-show="btn_cencle"> 
          <img :src="require(`../assets/close.png`)" alt="상품 이미지" /><br>
        </button> <br><br><br>
    <form v-on:submit.prevent="post_email" @submit="checkForm" novalidate="true" class="mail_form">
      <div v-show="customer_service" class="post_email">
        <h1> 견적서 문의</h1>

              
        <table v-show="estimate_table">
          <tr>
            <td>이름: *</td>
            <td><input type="text" value="이름" v-model="customer_name"></td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;내용:</td>
          </tr>
          <tr>
            <td>회사명:</td>
            <td><input type="text" value="회사명" v-model="customer_company"></td>
            <td rowspan="5"><input class="mail_textarea" type="textarea" value="내용" v-model="customer_content"></td>
          </tr>
          <tr>
            <td>지역:</td>
            <td><input type="text" value="지역" v-model="customer_local"></td>
          </tr>
          <tr>
            <td>연락처: *</td>
            <td><input type="text" value="연락처" v-model="customer_phone"></td>
          </tr>
          <tr>
            <td>이메일: *</td>
            <td><input type="email" value="이메일" v-model="customer_email"></td>
          </tr>
          <tr>
            <td>설치 날짜:</td>
            <td><input type="date" value="설지날짜" v-model="customer_date"></td>
          </tr>
          <tr>
          </tr>
          <tr>
            <td colspan="2">
              <h3>선택한 항목</h3>
            </td>
            <td class="estimate_error">
              <p v-if="errors.length">
                <label v-for="error in errors" :key="error.value">{{error}}</label>
              </p>
            </td>
          </tr>
          <tr class="estimate">
            <td colspan="2">{{$store.state.counter}}</td>
            <td><button type="submit" class="btn_mail">전송하기</button></td>
          </tr>
        </table>
        <div>
        </div>
        <br><br><br>
      
      </div>

    </form>
  </div>
</template>

<script>
import axios from "axios"
import VeeValidate, { Validator } from 'vee-validate'


export default {
 name: 'Estimate',
   props:{
    first_results: String,
    option_select: String,
    estimate: Boolean
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
      customer_service: true,
      estimate_table: true,
      pass: false,
      btn_cencle: true,
      cencle_check: true
    }
  },
  methods:{ 
    //문의하기 유효성 검사
      checkForm(e) {
        e.preventDefault();
        this.errors = [];
        if (!this.customer_name) {
          this.errors.push("  이름은 필수입니다.");
        } else if (!this.customer_email) {
          this.errors.push("  이메일은 필수입니다.");
        } else if (!this.validEmail(this.customer_email)) {
          this.errors.push("  이메일 형식을 확인하세요.");
        }
        if (!this.errors.length) {
          this.result_Explanation = true;
          this.customer_service = false;  
          this.pass = true;
          this.post_email();
          //location.reload();
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
        let other_products = this.$store.state.counter;

        if(this.pass == true){
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
                option_select: option_select,
                other_products: other_products
              },
              timeout: 2000
            })
            .then((res) => {
              console.log(res.deta)
            })
        }

      },
      btn_close() {
        console.log("as:", this.estimate)
        this.$emit("eee", this.estimate)
      }
  }
}
</script>

<style scoped>

.post_email{
  position: relative;
  margin: 0;
  height: 38vh;
}
.estimate{
  border: 4px;
}
.estimate_error{
  position: relative;
  float: right;
}

.post_email h1{
   position: relative;
  font-size: 30px;
  top: -3vh;
}
.post_email input{
  left: 20vw;

}
.post_email td{
  width: 8vw;
  font-size: 13px;
}
.post_email h3{
  margin: 5px;
} 
.mail_textarea{
  width: 15vw;
  height:15vh;
  margin-left: 2vw;
}
.btn_mail{
  position: relative;
  float: right;
  width: 60px;
  height: 25px;
  color: rgb(0, 0, 0);
  font-size: 10px;
  text-decoration: none;
  border: 1px solid #000000;
  overflow: hidden;
  transition: 0.6s all ease;
  background: rgb(255, 255, 255);
}
.btn_mail:hover{
  color:rgb(241, 0, 0)
}
.cancel{
  width: 2vw;
  height: 2vh;
  background: #fff;
  border: none;
  z-index: 2;
  transform: translateX(34vw);
}
.cancel img{
  width: 20px;
  height: 20px;
}

</style>