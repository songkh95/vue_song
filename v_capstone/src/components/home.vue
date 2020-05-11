<template>
  <div class="home">
    <div v-if="QQQ" class="Curation_form">
      {{answer}}
      <form v-on:submit.prevent="postpost">
        
        <div v-show="start_question">
          <h1>제품 견적 큐레이션</h1>
            <p>고객님에게 필요한 제품을 알려드리며 쉽고 빠르게 견적서를 받을 수 있습니다.</p>
        </div>
        
        <div>
          <div v-if="question">
            <h6>{{Q_number}}/7</h6>
            <h4>{{question.title}}</h4>
            <div v-for="select of question.selects" :key="select.value">
              <input type="radio" name="one_radio_question" :value="select.value" v-model="answer[Q_number]">
              <label>{{select.text}} / {{select.value}}</label>
            </div>
          </div>
          
          <div v-if="subquestions.length > 0">
            <div v-for="(subquestion, index) in subquestions" :key="subquestion.title">
              <h4>{{subquestion.title}}</h4>
              <div v-for="select of subquestion.selects" :key="select.value">
                <input type="radio"  :value="select.value" v-model="answer[`${Q_number}-${index+1}`]">
                <label>{{select.text}} / {{select.value}}</label>
              </div>
            </div>
          </div>  
        </div>

<!-- 결과 보기 -->
        <div v-show="result_question">
          <div class="Curation_result">

            <h1>- 질문지 결과</h1>
            <p>
              #1 희망하시는 기기: {{answer["1"]}}<br><br>

              #2 구매 방법: {{answer["2"]}}<br> 
              #2_1 계약기간: {{answer["2-1"]}} <br>
              #2_2 고객이 생각하는 임대 금액: {{answer["2-2"]}}<br><br>

              #3 스캔 속도: {{answer["3"]}}<br>
              #3-1 프린터 속도: {{answer["3-1"]}}<br><br>

              #4 프린트 해상도: {{answer["4"]}}<br><br>

              #5 옵션: {{answer["5"]}}<br><br>

              #6 장점: {{answer["6"]}}<br><br>

              #7 사용 인원: {{answer["7"]}}<br>
              #7_1 출력물 종류: {{answer["7-1"]}}<br>
              #7_2 한달 평균 사용량: {{answer["7-2"]}}<br>
              #7_3 한달 평균 용지 사용량: {{answer["7-3"]}}<br>
              <!-- 총 12개 질문 / 대질문: 7개 / 소질문: 5개 -->
            </p>
          </div>
        </div><br>
        

            <!-- <img src="../assets/1.png" alt=""> -->
            <img :src="`../assets/${result_id}.png`" alt="기기 이미지"/><br>
            id: {{result_id}} / <br>
            <span v-if="results">
              {{results}}

              <br><br><br>
              상품명: {{result_name}}<br>
              희망 임대료: {{answer["2-1"]}}<br>
              희망 계약기간: {{answer["2-2"]}} <br>
              옵션: {{answer["5"]}}<br>
              기본 매수: <br><br>
              <button>문의 하기</button><br><br><br>
            </span>
              

        <div class="Curation_btn">
          <input type="submit" v-show="btn_before" value="이전" @click="diminishNumber" placeholder="이전">
          <input type="submit" v-show="btn_after" value="다음" @click="increaseNumber" placeholder="다음">
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

      results_img: null,

      results: null,
      result_name: null,
      result_id: null
    }
  },
  created(){
    this.get_question();
    this.postpost();

    if(this.Q_number == 0){
        this.start_question = true;
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
     postpost(){
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
            this.results = res.data;
            this.result_name = res.data.name;
            this.result_id = res.data._id;
            //this.results_img = res.data.img;
            console.log(this.results_img)
          }
          
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
      }

      if(this.Q_number > 7){
        this.result_question = true;
        this.result_img = true;
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
      }
      if(this.Q_number <= 7){
          this.result_question = false;
          //console.log(this.result_img = false)
      }
      
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
  background-color: rgb(207, 250, 250);
  width: 100%;
  padding-top: 100px;
  padding-left: 150px;
}
.Curation_form h1{
  font-size: 60px;
  text-align: left;
  margin-top: 10px;
  font-weight: 13;
}
.Curation_form h3{
  font-size: 20px;
  text-align: left;
  margin: 0px 0px 0px 40px;
  color:rgb(52, 52, 172)
}
.Curation_form p{
  text-align: left;
}
.Curation_form label{
  text-align: left;
}
.Curation_form .Que_list{
  text-align: left;
  margin-left: 40px;
  font-size: 22px;
}
.Curation_btn{
  text-align: left;
  margin-left: 500px;
}
.Curation_result p{
  font-size: 20px;
  margin-left: 50px;
}

</style>

