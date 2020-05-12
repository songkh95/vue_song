<template>
  <div class="home">
    <div v-if="QQQ" class="Curation_form">
      <form v-on:submit.prevent="curation_result">
        <div v-show="start_question">
          <h1>제품 견적 큐레이션</h1>
          <p>고객님에게 필요한 제품을 알려드리며 쉽고 빠르게 견적서를 받을 수 있습니다.</p>
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

        <!-- 결과 보기 -->
        <div class="result_question_list">
          <div class="result_Explanation" v-show="result_Explanation">
            <h1>제품 큐레이션 결과</h1>
            <p>
              제품 큐레이션을 이용해주셔서 감사합니다! <br><br>

              7개의 질문을 통해 고객님의 사용환경에 맞는 제품을 추천해드며<br>
              쉽고 빠르게 크린솔루션의 제품 견적서를 받으실 수 있으십니다. <br><br>

              "문의하기" 버튼을 클릭하시면 저희 회사에 큐레이션 결과가 전송되어 당일에 고객님께 연락드립니다.


            </p>
          </div>
          <div v-show="result_question">
            <div class="Curation_result">

              <h1> 질문지 결과</h1>
              <div class="Curation_result_content">
                #1 희망하시는 기기: {{answer["1"]}}<br>

                #2 구매 방법: {{answer["2"]}}  /
                #2_1 계약기간: {{answer["2-1"]}}  / 
                #2_2 고객이 생각하는 임대 금액: {{answer["2-2"]}}<br>

                #3 스캔 속도: {{answer["3"]}} /
                #3-1 프린터 속도: {{answer["3-1"]}}<br>

                #4 프린트 해상도: {{answer["4"]}}<br>

                #5 옵션: {{answer["5"]}}<br>

                #6 장점: {{answer["6"]}}<br>

                #7 사용 인원: {{answer["7"]}}/
                #7_1 출력물 종류: {{answer["7-1"]}}/
                #7_2 한달 평균 사용량: {{answer["7-2"]}}/
                #7_3 한달 평균 용지 사용량: {{answer["7-3"]}}<br>
                <!-- 총 12개 질문 / 대질문: 7개 / 소질문: 5개 -->
              </div>
            </div>
          </div><br>
          <div class="Curation_btn">
            <input class="btn_before" type="submit" v-show="btn_before" value="Before" @click="diminishNumber"
              placeholder="이전">
            <input class="btn_after" type="submit" v-show="btn_after" value="Next" @click="increaseNumber"
              placeholder="다음">

            <button v-show="question_result_show_btn" @click="question_result_btn" class="">질문지 결과</button>
            <button v-show="send_btn" class="send_btn">문의 하기</button><br><br><br>
          </div>
        </div>





        <div>
          <!-- <img src="../assets/1.png" alt=""> -->
          <div class="Curation_img">
            <span v-if="first_results">
              <img :src="`../assets/${result_id}.png`" alt="기기 이미지" /><br>
              <br><br><br>
              상품명: {{result_name}}<br>
              희망 임대료: {{answer["2-1"]}}<br>
              희망 계약기간: {{answer["2-2"]}} <br>
              옵션: {{answer["5"]}}<br>
              기본 매수: <br><br>
            </span>
          </div>

          <div class="Curation_img" v-show="other_results">
            <img :src="`../assets/${result_id}.png`" alt="기기 이미지" /><br>
            <br><br><br>
            다음 상품명: {{result_img_name}}<br>
            상품 아이디: {{result_img_id}}<br>
          </div>

          <div class="other_results_btn">
            <form v-on:submit.prevent="curation_result_img">
              <div v-show="other_results_btn">
                <input type="submit" value="이전" @click="diminish_img" placeholder="이전">
                <input type="submit" value="다음" @click="increase_img" placeholder="다음">
              </div>
            </form>
          </div>
        </div>



      </form>


    </div>
    <!-- {{answer}} <br> -->
    <div>
      <router-link to="/result">다른 페이지 이동</router-link>
    </div>
    <router-view /><br><br>



  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'home',
  data: function() {
    return {

      answer: {},
      question: null,

      title:"",
      selects:[],

      QQQ: true,
     
      btn_before: true,
      btn_after: true,
      Q_number: 0,

      start_question: false,
      result_question: false,
      result_Explanation: false,
      question_result_show_btn: false,

      result_img: null,
      result_img_name: null,
      result_img_id: null,
      
      first_results: null,
      result_name: null,
      result_id: null,
      recommend: null,
      
      other_results: false,
      other_results_btn: false,
      send_btn: false,
      count: null
    }
  },
  created(){
    this.get_question();
    this.curation_result();
    this.curation_result_img();

    if(this.Q_number == 0){
        this.start_question = true;
        this.btn_before = false;
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
     curation_result(){
       let que1 = this.answer["1"];
       let que2 = this.answer["3"];
       let que3 = this.answer["3-1"];
       let que4 = this.answer["4"];
       let que5 = this.answer["6"];

       axios.post('http://localhost:8081/todos/' +  this.Q_number, {   
         que1: que1,
         que2: que2,
         que3: que3,
         que4: que4,
         que5: que5
       }) 
       .then((res)=>{
          if(this.Q_number == 8){
            this.first_results = res.data;
            this.result_name = res.data.name;
            this.result_id = res.data._id;
            this.recommend = res.data._id;
            console.log("추천상품 아이디: " + this.recommend)
          }
      })
    },
    curation_result_img(){
      let result_id = this.result_id;

      axios.post('http://localhost:8081/todos/img/' + this.result_id , {   
        result_id: result_id
      }) 
      .then((res)=>{
          if(this.Q_number == 8){
            this.result_img = res.data;
            this.result_img_name = res.data.name;
            this.result_img_id = res.data._id;
            console.log(this.result_img_name)
          }
      })
    },
    document_count(){
      axios.get('http://localhost:8081/todos/count') 
      .then((res)=>{
        this.count = res.data;
        console.log(this.count)
      })
    },
    get_question(){
      axios.get('http://localhost:8081/questions/' + this.Q_number) 
      .then((res)=>{
        this.question = res.data;
      })
    },
    increaseNumber() {
      if(this.Q_number >= 0 && this.Q_number <= 7){
        this.Q_number++;
        this.get_question();
      }    

      if(this.Q_number >= 1){
        this.start_question = false
        this.btn_before = true;
      }

      if(this.Q_number > 7){
        this.result_question = false;
        this.question_result_show_btn = true;
        this.result_img = true;
        this.other_results_btn = true;
        this.send_btn = true;
        this.btn_after = false;
        this.result_Explanation = true;
      }  
    },
    diminishNumber() {
      if(this.Q_number >= 1 && this.Q_number <= 8){
        this.Q_number--;
        this.get_question();
        this.result_img = false;
      }

      if(this.Q_number == 0){
        this.start_question = true;
        this.btn_before = false;
      }
      if(this.Q_number <= 7){
        this.question_result_show_btn = false;
        this.result_question = false;
        this.first_results = false;
        this.other_results_btn = false;
        this.send_btn = false;
        this.other_results = false;
        this.btn_after = true;
        this.result_Explanation = false;
      }
    },
    increase_img(){
      this.other_results = true; 
    
      if(this.result_img_id <= 4){
        this.result_id++;
             
        this.first_results = false;
        if(this.result_id == 4){
          this.result_id = 1;
        }
      }  
    },
    diminish_img(){
      this.other_results = true;

      if(this.result_img_id >= 1){
        this.result_id--;
 
        this.first_results = false;
        if(this.result_id == 0){
          this.result_id = 4;
        }
      }
    },
    question_result_btn(){
      this.result_question = !this.result_question;
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  margin: 0;
  
}
.Curation_form{
  background-color: rgb(229, 244, 250);
  height: 1000px;
  padding: 100px 70px 70px 150px;

}
.Curation_form h1{
  font-size: 60px;
  text-align: left;
  margin-top: 10px;
  font-weight: 13;
}
.Curation_form h3{
  font-size: 50px;
  text-align: left;
  margin: 0px 0px 0px 40px;
  color:rgb(5, 5, 79)
}
.Curation_form h4{
  font-size: 28px;
  text-align: left;
  margin: 20px 0px 0px 40px;
  color:rgb(5, 5, 79)
}
.Curation_form h5{
  font-size: 28px;
  text-align: left;
  margin: 20px 0px 10px 60px;
  color:rgb(0, 0, 0)
}
.Curation_form p{
  margin-top: 100px;
  font-size: 25px;
  text-align: left;
}
.Curation_form label{
  font-size:20px;
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





.Curation_result{
  position: absolute;
  margin-top: 10vh;
}
.Curation_result h1{
  width: 30vw;
  font-size: 35px;
}
.Curation_result_content{
  position: absolute;
  display: block;
  font-size: 20px;
  text-align: left;
  margin: 0px 0px 50px 30px;
}
/* 질문지 결과 */
.result_question_list button{
  position: relative;
  width: 100px;
  height: 60px;
  margin: 0% 0% 0px 0%;
  color: rgb(0, 0, 0);
  font-size: 15px;
  text-decoration: none;
  border: 2px solid #09003b;
  overflow: hidden;
  transition: 0.6s all ease;
  background: rgb(255, 255, 255);
}
/* Before after 버튼 */

.Curation_btn{
   float: left;
}
.btn_after{
  position: relative;
  width: 100px;
  height: 60px;
  margin: -20% 0px 0px 30px;
  color: rgb(0, 0, 0);
  font-size: 15px;
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
  width: 100px;
  height: 60px;
  margin: 0% 0px 0px 0px;
  color: rgb(0, 0, 0);
  font-size: 15px;
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
  height: 60px;
  margin: 0% 0% 0px 0%;
  color: rgb(0, 0, 0);
  font-size: 15px;
  text-decoration: none;
  border: 2px solid #09003b;
  overflow: hidden;
  transition: 0.6s all ease;
  background: rgb(255, 255, 255);
}
.send_btn:hover{
  background: rgb(2, 0, 68);
  color:rgb(255, 255, 255)
}





.Curation_img{
  position: absolute;
  width: 300px;
  float: right;
  text-align: left;
  margin: 8% 70px 0px 8%;
}
.other_results_btn{
  position: absolute;
  margin-top: 270px;
  margin-left: 46%;
}
.other_results_btn input:hover{
  background: rgb(2, 0, 68);
  color:rgb(255, 255, 255)
}
.other_results_btn input{
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
.other_results_btn input:nth-child(2){
  margin-left: 500px;
}
</style>

