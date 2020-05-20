<template>
  <div class="home">
    <div v-if="QQQ" class="Curation_form">
      <form v-on:submit.prevent="curation_result">
        <div v-show="start_question">
          <h1>제품 견적 큐레이션</h1>
          <p>고객님에게 필요한 제품을 알려드리며 쉽고 빠르게 견적서를 받을 수 있습니다.</p>
        </div>

        <div v-show="restart_question">
          <sample title="안녕" :Q_number="Q_number" v-show="sam"/>
          <h1>제품 견적 큐레이션</h1>
          <p>고객님께 추천드리는 상품은 {{result_name}} 입니다.</p>
        </div>

        <div>
          <div v-if="question">
            <h5>{{Q_number}}/7</h5>
            <h3>{{question.title}}</h3>
            <div class="question_content">
              <div v-for="select of question.selects" :key="select.value">
                <input type="radio" name="one_radio_question" :value="select.value" v-model="answer[Q_number]">
                <label>{{select.text}}</label>
              </div>
            </div>
          </div>

          <div v-if="subquestions.length > 0" class="subquestion_content">
            <div v-for="(subquestion, index) in subquestions" :key="subquestion.title">
              <h4>{{subquestion.title}}</h4>
              <div class="question_content">
                <div v-for="select of subquestion.selects" :key="select.value">
                  <input type="radio" :value="select.value" v-model="answer[`${Q_number}-${index+1}`]">
                  <label>{{select.text}}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
          <!-- 질문 -->
          <div class="Curation_btn">
            <input type="submit" class="btn_before" v-show="curation_restart" value="다시하기" @click="curation_restart_click">
            <input class="btn_before" type="submit" v-show="btn_before" value="Before" @click="diminishNumber" placeholder="이전">
            <input class="btn_after" type="submit" v-show="btn_after" value="Next" @click="increaseNumber" placeholder="다음">

            <!-- <button v-show="question_result_show_btn" class="send_btn" @click="question_result_btn">질문지 결과</button> -->
            <button v-show="send_btn" class="send_btn" @click="customer_service_btn">문의 하기</button>
          </div>
        
        <div>
             
          <div v-show="views">
            <h5 class="view">큐레이션 사용횟수: {{result_count}}</h5>   
          </div>

          <!-- 결과 감사 소개-->
          <div class="result_Explanation" v-show="result_Explanation">
            <h1>제품 큐레이션 결과</h1>
            <p>
              제품 큐레이션을 이용해주셔서 감사합니다! <br><br>

              7개의 질문을 통해 고객님의 사용환경에 맞는 제품을 추천해드며<br>
              쉽고 빠르게 크린솔루션의 제품 견적서를 받으실 수 있으십니다. <br><br>

              "문의하기" 버튼을 클릭하시면 저희 회사에 큐레이션 결과가 전송되어 당일에 고객님께 연락드립니다.<br><br>

            </p>
          </div>

            <!-- 추천 상품 -->
            <div class="Curation_img">
              <span v-show="first_results_img">
              <!-- <img :src="require(`../assets/${result_name}.png`)" alt="처음 이미지" /><br> -->
              <br><br><br>
              맞춤 추천 상품명: {{result_name}}<br>
              희망 임대료: {{answer["2-1"]}}<br>
              희망 계약기간: {{answer["2-2"]}} <br>
              옵션: {{answer["5"]}}<br>
              기본 매수: <br><br>
              </span>
            </div>

            <input type="submit" @click="click_other" value="다른 상품 보기" v-show="btn_other">

        <OtherProducts v-show="curation_products_result"
        :Q_number="Q_number"
        :answer="answer" 
        :result_id="result_id" 
        :result_name="result_name" 
        :result_img_name="result_img_name"
        :result_img="result_img"
        />
          <!-- 질문자 결과 -->
          <question_result :answer="answer"/>

          <!-- 문의하기 -->
          <form v-on:submit.prevent="post_email">
            <div v-show="customer_service" class="customer_service">
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

        

        
      </form>
    </div>



  </div>
</template>

<script>
import axios from "axios"
import Sample from './Sample'
import Question_result from './Question_result'
import OtherProducts from './OtherProducts'

export default {
  name: 'home',
  components: {
    Sample,
    Question_result,
    OtherProducts
  },
  data: function() {
    return {
      customer_name: "",
      customer_company: "",
      customer_local:"",
      customer_email: "",
      answer: {},
      question: null,

      title:"",
      selects:[],

      QQQ: true,
     
      btn_before: true,
      btn_after: true,
      Q_number: 0,

      start_question: false,
      restart_question: false,
      //result_question: false,
      result_Explanation: false,
      question_result_show_btn: false,
      customer_service: false,

      result_img: null,
      result_img_name: null,
      result_img_id: null,
      
      first_results_img: false,
      first_results: null,
      btn_other: false,

      result_name: null,
      result_id: "",
      
      other_results: false,
      other_results_btn: false,
      send_btn: false,
      result_count: null,

      lease_selects: "",
      optin_selects: "",
      shopping_basket: "",
      shopping_basket_result:"",
      finish: true,

      curation_products_result: false,
      btn_other: false,

      sam: false


    }
  },
  created(){
    this.get_question();
    // this.curation_result_img();
    
    if(this.Q_number == 0){
        this.start_question = true;
        this.btn_before = false;
        this.views = false;

      if(localStorage.getItem('curation_result')){
        this.restart_question = true;
        this.start_question = false;
        this.curation_restart = true;
        this.btn_after = false;
      } else {
        this.restart_question = false;
        this.start_question = true;
        this.curation_restart = false;
      }
    }
  },
  computed: {
    subquestions: function () {
      if (!this.question) return []
      if (!this.question.subquestions) {
        return []
      } else {
        if (this.Q_number == 2) {
          if (this.answer["2"] == "lease") {
            return this.question.subquestions
          }
          else return []
        } 
        
        if (this.Q_number == 3) {
          if (this.answer["1"] == 'black' && this.answer["3"] == 'Low등급') {
            return alert("흑백기는 Low등급이 없습니다!")
          } else if (this.answer["1"] == 'black' && this.answer["3"] == 'Middle등급') {
            return this.question.subquestions.filter(function (item) {
              return item._id === "3-1";
            })
          } else if (this.answer["1"] == 'black' && this.answer["3"] == 'High등급') {
            return this.question.subquestions.filter(function (item) {
              return item._id === "3-2";
            })
          } else if (this.answer["1"] == 'color' && this.answer["3"] == 'Low등급') {
            return this.question.subquestions.filter(function (item) {
              return item._id === "3-3";
            })
          } else if (this.answer["1"] == 'color' && this.answer["3"] == 'Middle등급') {
            return this.question.subquestions.filter(function (item) {
              return item._id === "3-4";
            })
          } else if (this.answer["1"] == 'color' && this.answer["3"] == 'High등급') {
            console.log(this.answer["3"])
            return this.question.subquestions.filter(function (item) {
              return item._id === "3-5";
            })
          } else return []
        }

        if (this.Q_number == 7) {
            return this.question.subquestions
        } else return []
         

        return []
      }
    } 
  },
  methods: {
    //이메일 전송
    post_email(){
      let customer_name = this.customer_name;
      let customer_company = this.customer_company;
      let customer_local = this.customer_local;
      let customer_email = this.customer_email;
      let first_results = this.first_results;
      let result_img = this.result_img;

       axios.post('http://localhost:8081/mail/' +  this.Q_number, {   
         customer_name: customer_name,
         customer_company: customer_company,
         customer_local: customer_local,
         customer_email: customer_email,
         first_results: first_results,
         result_img: result_img

       }) 
       .then((res)=>{
            console.log(res.deta)
      })
    },
    // 맞춤 추천
    curation_result(){
       let que1 = this.answer["1"];
       let que2 = this.answer["3"];
       let que3 = this.answer["3-1"];
       let que4 = this.answer["4"];
       let que5 = this.answer["6"];

      if (this.answer["1"] == 'black') {
        axios.get('http://localhost:8081/b_products/search/', {   
          params: {
            que1: que1,
            que2: que2,
            que3: que3,
            que4: que4,
            que5: que5
          }
       }) 
       .then((res)=>{
          if(this.Q_number == 8){
            this.first_results = JSON.stringify(res.data);
            this.result_name = res.data.name;
            this.result_id = res.data._id;
            

            localStorage.setItem("curation_result", JSON.stringify(this.first_results))
          }
      })
      } else if(this.answer["1"] == 'color'){
        axios.get('http://localhost:8081/c_products/search/', {   
          params: {
            que1: que1,
            que2: que2,
            que3: que3,
            que4: que4,
            que5: que5
         }
       }) 
       .then((res)=>{
          if(this.Q_number == 8){
            this.first_results = JSON.stringify(res.data);
            this.result_name = res.data.name;
            this.result_id = res.data._id;
            console.log(this.result_name + " / " + this.result_id);

            localStorage.setItem("curation_result", JSON.stringify(this.first_results))
          }
      })        
      }
    },
    //질문 결과 정리 - 테스트중
    result_save() {
      let first_results = this.first_results;
      let customer_name = this.customer_name;

      if (this.Q_number > 7 && this.finish) {

        axios.get('http://localhost:8081/results/count', {
            first_results: first_results,
            customer_name: customer_name
          })
          .then((res) => {
            this.result_count = res.data.counter;
            console.log("큐레이션 사용 횟수: " + JSON.stringify(this.result_count))
            this.finish = false;
          })
      }
    },
    //질문 가져오기
    get_question(){
      axios.get('http://localhost:8081/questions/' + this.Q_number) 
      .then((res)=>{
        this.question = res.data;
      })
    },
    //다음 질문
    increaseNumber() {
      if(this.Q_number >= 0 && this.Q_number <= 7){
        this.Q_number++;
        this.get_question();
      }    

      if(this.Q_number >= 1){
        this.start_question = false
        this.btn_before = true;
        this.curation_restart = false;
      }

      if(this.Q_number > 7){
       //this.result_question = false;
        this.question_result_show_btn = true;
        this.result_img = true;
        this.other_results_btn = true;
        this.send_btn = true;
        this.btn_after = false;
        this.result_Explanation = true;
        this.views = true;

        this.first_results_img = true;
        this.btn_other = true;
        this.result_save();
      }  
    },
    //이전 질문
    diminishNumber() {
      if(this.Q_number >= 1 && this.Q_number <= 8){
        this.Q_number--;
        this.get_question();
        this.result_img = false;
        this.curation_restart= false;
      }

      if(this.Q_number == 0){
        this.start_question = true;
        this.btn_before = false;
      }
      if(this.Q_number <= 7){
        this.question_result_show_btn = false;
        //this.result_question = false;
        this.other_results_btn = false;
        this.send_btn = false;
        this.other_results = false;
        this.btn_after = true;
        this.result_Explanation = false;
        this.views=false;

        this.first_results_img = false;
        this.btn_other = false;
        }
    },
    click_other(){
      this.first_results_img = false;
      this.btn_other = false;
      this.curation_products_result = true;
    },
    //질문지 결과 확인 버튼
    question_result_btn(){
     // this.result_question = true;
      this.result_Explanation = false;
      this.customer_service = false;
    },
    //문의하기 버튼
    customer_service_btn(){
      this.customer_service = true;
      //this.result_question = false;
      this.result_Explanation = false;
    },
    //문의하기 ->  이메일 전송 버튼
    send_mail(){
       this.result_Explanation = true;
       this.customer_service = false;
       //this.result_question = false;
    },
    //큐레이션 다시시작하기 버튼
    curation_restart_click(){
      localStorage.removeItem("curation_result"); 
      this.Q_number++;
      this.get_question();
      
      this.start_question = false;
      this.restart_question = false;
      this.curation_restart = false;
      this.btn_after = true;
      this.btn_before = true;
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  margin: 0;
  padding: 0;
}
.Curation_form{
  position:absolute;
  background-color: rgb(229, 244, 250);
  top: 0;
  padding: 10px 70px 70px 10px;
  margin: 0;
  width: 100%;
}
.Curation_form h1{
  font-size: 40px;
  text-align: left;
  margin-top: 10px;
  font-weight: 13;
}
.Curation_form h3{
  font-size: 22px;
  text-align: left;
  margin: 0px 0px 0px 40px;
  color:rgb(5, 5, 79)
}
.Curation_form h4{
  font-size: 17px;
  text-align: left;
  margin: 10px 0px 0px 40px;
  color:rgb(5, 5, 79)
}
.Curation_form h5{
  font-size: 15px;
  text-align: left;
  margin: 20px 0px 10px 60px;
  color:rgb(0, 0, 0)
}
.Curation_form p{
  margin-top: 100px;
  font-size: 13px;
  text-align: left;
}
.Curation_form label{
  font-size: 12px;
  text-align: left;
  margin: 0px 0px 0px 10px;
  color:rgb(0, 0, 0)
}
.Curation_form .subquestion_content{
  margin: 40px 0px 0px 10px;
}

.question_content{
  text-align: left;
  margin-left: 50px;
  margin-top: 20px;
}


.result_Explanation{
  margin: 0 0 20px 0px;
  background: rgb(203, 255, 230);
  width: 45%;
  height: 50vh;
}
.result_Explanation h1{
  font-size: 40px;
}
.result_Explanation p{
  font-size: 14px;
}
.Curation_result{
  top: 16vh;
  margin: 0 0 20px 0px;
  background: rgb(226, 218, 109);
  width: 35%;
  height: 50vh;
}
.Curation_result h1{
  width: 30vw;
  font-size: 40px;
}
.Curation_result_content{
  display: block;
  font-size: 14px;
  text-align: left;
  margin: 0px 0px 50px 30px;
}
/* 질문지 결과 */
.result_question_list button{
  position: relative;
  width: 80px;
  height: 35px;
  color: rgb(0, 0, 0);
  font-size: 12px;
  text-decoration: none;
  border: 2px solid #09003b;
  overflow: hidden;
  transition: 0.6s all ease;
  background: rgb(255, 255, 255);
}
.result_question_list button:hover{
  background: rgb(2, 0, 68);
  color:rgb(255, 255, 255)
}
/* Before after 버튼 */

.Curation_btn{
   float: left;
   margin-left: 70px;
   width: 300px;
}
.btn_after{
  position: relative;
  width: 80px;
  height: 35px;
  margin: 0% 0px 0px 30px;
  color: rgb(0, 0, 0);
  font-size: 13px;
  text-decoration: none;
  border: 2px solid #09003b;
  overflow: hidden;
  transition: 0.6s all ease;
  background: rgb(255, 255, 255);
}
.btn_after:hover{
  background: rgb(2, 0, 68);
  color:rgb(255, 255, 255)
}
.btn_before{
  position: relative;
  width: 80px;
  height: 35px;
  color: rgb(0, 0, 0);
  font-size: 13px;
  text-decoration: none;
  border: 2px solid #09003b;
  overflow: hidden;
  transition: 0.6s all ease;
  background: rgb(255, 255, 255);
}
.btn_before:hover{
  background: rgb(2, 0, 68);
  color:rgb(255, 255, 255)
}
/* 문의하기 버튼 */
.send_btn{  
  position: relative;
  width: 100px;
  height: 35px;
  font-size: 15px;
  text-decoration: none;
  border: 2px solid #09003b;
  overflow: hidden;
  transition: 0.6s all ease;
  color: rgb(0, 0, 0);
  background: rgb(255, 255, 255);
}
.send_btn:hover{
  background: rgb(2, 0, 68);
  color:rgb(255, 255, 255)
}


.customer_service{
  position: relative;
  margin: 0 0 20px 0px;
  background: rgb(203, 255, 230);
  width: 40vw;
  height: 50vh;
  text-align: left;
}

.customer_service button{
  margin-right: 50px;
  float: right;
}


.Curation_img{
  position: absolute;
  width: 30vw;
  top: 30vh;
  left: 50vw;
  text-align: left;
  margin: 0% 70px 0px 8%;
  background: rgb(214, 169, 255);
  font-size: 13px;
}
.other_results_btn{
  position: absolute;
  top: 35vh;
  left: 52vw;
  
}

.other_results_btn input{
  position: absolute;
  color: rgb(0, 0, 0);
  width: 50px;
  height: 40px;
  font-size: 13px;
  text-decoration: none;
  border: 2px solid #09003b;
  overflow: hidden;
  transition: 0.6s all ease;
  background: rgb(255, 255, 255);
}
.other_results_btn input:hover{
  background: rgb(2, 0, 68);
  color:rgb(255, 255, 255)
}
.other_results_btn input:nth-child(2){
  margin-left: 40vw;
}

.view{
  position: absolute;
  right: 150px;
  
}
</style>

