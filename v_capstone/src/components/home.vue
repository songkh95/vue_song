<template>
  <div class="home">
    <div v-if="QQQ" class="Curation_form">
      <form v-on:submit.prevent="postpost">
        <!-- 
        <div v-if="Q_number === 0">
          <h1>제품 견적 큐레이션</h1>
            <p>고객님에게 필요한 제품을 알려드리며 쉽고 빠르게 견적서를 받을 수 있습니다.asd</p>
        </div> -->
        {{answer}} <br>
        <div>
          <div v-if="question">
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
                <label>{{select.text}}</label>
              </div>
            </div>
          </div>  

          <!-- <div v-if="three_question">
            <h4>{{three_title}}</h4>
            <div v-for="select of three_selects" :key="select.value">
              <input type="radio" name="three_radio_question" :value="select.value">
              <label>{{select.text}}</label>
            </div>
          </div>

          <div v-if="four_question">
            <h4>{{four_title}}</h4>
            <div v-for="select of four_selects" :key="select.value">
              <input type="radio" name="four_radio_question" :value="select.value">
              <label>{{select.text}}</label>
            </div>
          </div>

          <div v-if="five_question">
            <h4>{{five_title}}</h4>
            <div v-for="select of five_selects" :key="select.value">
              <input type="radio" name="five_radio_question" :value="select.value">
              <label>{{select.text}}</label>
            </div>
          </div>

          <div v-if="six_question">
            <h4>{{six_title}}</h4>
            <div v-for="select of six_selects" :key="select.value">
              <input type="radio" name="six_radio_question" :value="select.value">
              <label>{{select.text}}</label>
            </div>
          </div> -->
        </div>



        <!-- 결과 보기 -->
        <div v-if="result_question">
          <div class="Curation_result">

            <h1>- 질문지 결과</h1>
            <p>
              #1 희망하시는 기기: {{selects}}<br><br>

              #2 구매 방법: <br> 
              #2_1 계약기간: <br>
              #2_2 고객이 생각하는 임대 금액: <br><br>

              #3 스캔 속도: <br><br>

              #4 프린트 해상도: <br><br>

              #5 옵션:<br><br>

              #6 장점: <br><br>

              #7 사용 인원:<br>
              #7_1 출력물 종류:<br>
              #7_2 한달 평균 사용량:<br>
              #7_3 한달 평균 용지 사용량:<br>
            </p>
          </div>
        </div><br>

        <div class="Curation_btn">
          <input type="submit" v-show="btn_before" value="이전" @click="diminishNumber" placeholder="이전">
          <input type="submit" v-show="btn_after" value="다음" @click="increaseNumber" placeholder="다음">
        </div>

      </form>
    </div>
<!-- 
    <div>
      <form v-on:submit.prevent="get2">
        <input type="submit" value="특정 ID 조회">
      </form>
    </div>
    -->
     <div>
      <form v-on:submit.prevent="get1">
        <input type="submit" value="테스트">
      </form>
    </div>
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

      // two_title:"",
      // two_selects:[],

      // three_title:"",
      // three_selects:[],

      // four_title:"",
      // four_selects:[],

      // five_title:"",
      // five_selects:[],

      // six_title:"",
      // six_selects:[],

      //que1: "DC V2060",
      QQQ: true,
     
      btn_before: true,
      btn_after: true,
      Q_number: 0,

      one_question: "",
      two_question: "",
      three_question: "",
      four_question: "",
      five_question: "",
      six_question: "",
      result_question: ""
    }
  },
  created(){
    this.get_question();
    this.postpost();
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
        
        if (this.Q_number == 3){
          if(this.answer["1"] == 'black' && this.answer["3"] == 'Middle등급'){
              console.log("1번 질문: " + this.answer["1"])
              console.log("3번 서브질문: " , this.question.subquestions[0])
              console.log("3번 서브질문: " + this.question.subquestions[0])
              console.log("3번 서브질문: " , JSON.stringify(this.question.subquestions[0]))
              console.log("3번 서브질문: " + JSON.stringify(this.question.subquestions[0]))
             return this.question.subquestions[0]
          }
          else return []
        }

        return []
      }
    } //answer[`${Q_number}-${index+1}`]
  },
  methods: {
     postpost(){
       let que1 = "DC V2060";
       
       axios.post('http://localhost:8081/todos/' +  this.Q_number, {   
         que1: que1
       }) 
       .then((res)=>{
        // console.log(que1);
        // console.log(res.data);
      })
    },
    get_question(){
      axios.get('http://localhost:8081/questions/' + this.Q_number) 
      .then((res)=>{
        console.log(res.data)
        this.question = res.data
        // this.title = res.data.title;
        // this.selects = res.data.select;

        // this.two_title = res.data.two_title;
        // this.two_selects = res.data.two_select;
        
        // this.three_title = res.data.three_title;
        // this.three_selects = res.data.three_select;

        // this.four_title = res.data.four_title;
        // this.four_selects = res.data.four_select;

        // this.five_title = res.data.five_title;
        // this.five_selects = res.data.five_select;

        // this.six_title = res.data.six_title;
        // this.six_selects = res.data.six_select;

        console.log(this.Q_number)
      })
    },
    increaseNumber() {
      if(this.Q_number >= 0 && this.Q_number <= 7){
        this.Q_number++;
        this.get_question();
      }

      // switch(true){
      //   case this.Q_number === 1:
      //     this.one_question = true;
      //     break;
      //   case this.Q_number === 2:
      //     this.one_question = true;
      //     this.two_question = false;
      //     this.three_question = false;
      //     break;
      //   case this.Q_number === 3:
      //     this.one_question = true;
      //     this.two_question = false;
      //     this.three_question = false;
      //     this.four_question = false;
      //     this.five_question = false;
      //     this.six_question = false;
      //     break;
      //   case this.Q_number === 4:
      //     this.one_question = true;
      //     break;
      //   case this.Q_number === 5:
      //     this.one_question = true;
      //     break;
      //   case this.Q_number === 6:
      //     this.one_question = true;
      //     break;
      //   case this.Q_number === 7:
      //     this.one_question = true;
      //     this.two_question = true;
      //     this.three_question = true;
      //     this.four_question = true;
      //     this.five_question = true;
      //     this.result_question = false;
      //     break;
      //   case this.Q_number === 8:
      //     this.one_question = false;
      //     this.two_question = false;
      //     this.three_question = false;
      //     this.four_question = false;
      //     this.five_question = false;
      //     this.result_question = true;
      //      break;
      // }
     
    },
    diminishNumber() {
      if(this.Q_number >= 1 && this.Q_number <= 7){
        this.Q_number--;
        this.get_question();
      }
    },
    updateValue(e){
      let val
      val = e.target.value;

        // if (this.Q_number === 2) {
        //   if (e.target.value === "lease") {
        //     console.log(e.target.value + "1")
        //     this.two_question = true;
        //     this.three_question = true;
        //   } else if (e.target.value === "sale") {
        //     console.log(e.target.value + "2");
        //     this.two_question = false;
        //     this.three_question = false;
        //   }
        // }

        // if (this.Q_number === 3) {
        //   console.log("value: " + val)
        // }
    },
    get1(){
      axios.get('http://localhost:4500/' + this.Q_number) 
      .then((res)=>{
        //console.log(data.res);
        //console.log(this.Q_number)
      })
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

