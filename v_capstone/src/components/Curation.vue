<template>
  <div class="home">
    <header class="curation_header">
      <!-- 상단 메뉴 -->
      <Menu />
    </header>
    
    <section class="curation_section">

        <form v-on:submit.prevent="curation_result">
      <div class="Curation_form">
          <div class="first_question">
            <!-- 시작 질문 -->
            <div v-show="start_question">
              <h1>제품 견적 큐레이션</h1>
              <img class="curation_question_img" :src="require(`../assets/At the office-pana.png`)" alt="상품 이미지" />
              <p class="first_question_p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specim.<br><br>
                고객님에게 필요한 제품을 알려드리며 쉽고 빠르게 견적서를 받을 수 있습니다.
              </p>
              
            </div>

            <!-- 다시 시작 질문 -->
            <div v-show="restart_question">
              <h1>제품 견적 큐레이션</h1>
              <img class="curation_question_img" :src="require(`../assets/At the office-pana.png`)" alt="상품 이미지" />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specime.<br><br>
                고객님께 추천드리는 상품은 {{result_name}} 입니다.
              </p>
              
            </div>
          </div>


          <!-- 질문 -->
          <div class="question">
            <div v-if="question">
              <h5>{{Q_number}}/7</h5>
              <h3>{{question.title}}</h3>
                <img class="curation_question_img" :src="require(`../assets/At the office-pana.png`)" alt="상품 이미지" />
                <div class="question_option" v-for="select of question.selects" :key="select.value">
                  <input type="radio" name="one_radio_question"  :value="select.value" v-model="answer[Q_number]" :id="select.value">
                  <label :for="select.value">{{select.text}}</label>
              </div>
            </div>

            <div v-if="subquestions.length > 0" class="subquestion_content">
              <div v-for="(subquestion, index) in subquestions" :key="subquestion.title">
                <h4>- {{subquestion.title}}</h4>
                  <div class="question_option" v-for="select of subquestion.selects" :key="select.value" >
                    <input type="radio" :value="select.value" v-model="answer[`${Q_number}-${index+1}`]" :id="select.value">
                    <label :for="select.value">{{select.text}}</label>
                  </div>
              </div>
            </div>
          </div>

          <div class="question_result">
              <!-- 결과 감사 소개-->
            <div class="result_Explanation" v-show="result_Explanation">
              <h1>제품 큐레이션 완료!</h1>
              <h5>지금까지 큐레이션 사용횟수: {{view_count}}</h5><br>
              <p>
                제품 큐레이션을 이용해주셔서 감사합니다! <br><br>

                7개의 질문을 통해 고객님의 사용환경에 맞는 제품을 추천해드며<br>
                쉽고 빠르게 크린솔루션의 제품 견적서를 받으실 수 있으십니다. <br><br>

                7개의 질문을 통해 고객님의 사용환경에 맞는 제품을 추천해드며<br>
                쉽고 빠르게 크린솔루션의 제품 견적서를 받으실 수 있으십니다. <br><br>
                "문의하기" 버튼을 클릭하시면 저희 회사에 큐레이션 결과가 전송되어 당일에 고객님께 연락드립니다.<br><br>

              </p>
            </div>

            <!-- 문의하기 -->
            <Estimate :first_results="first_results" :option_select="option_select" v-show="customer_service" class="Curation_result" />

            <!-- 질문자 결과 -->
            <!-- <question_result :answer="answer" v-show="question_result" class="Curation_result" /> -->
          </div>
           <!-- 질문 버튼들-->
           <input type="submit" class="btn_return" v-show="curation_restart" value="다시하기" @click="curation_restart_click">
          <div class="Curation_btn">
            <input type="submit" class="btn_before" v-show="btn_before" value="Before" @click="diminishNumber" placeholder="이전">
            <input type="submit" class="btn_before" v-show="btn_after" value="Next" @click="increaseNumber" placeholder="다음">
          </div>
         
            <!-- <button class="btn_before" @click="click_question_result" v-show="btn_question_result">질문지 결과</button> -->
          </div>

        </form>
 
    </section>

    <nav class="curation_nav">
        <!-- 추천 상품 -->
        <div v-show="Curation_img" class="Curation_img">
          <div v-if="first_results_img">
            <img :src="require(`../assets/product_img/${result_name}.png`)" alt="상품 이미지" /><br>
            <div class="Curation_img_content">
              <h4>{{result_color == "color" ?  "칼라복합기" : "흑백복합기"}}</h4>
              <h2>{{result_name}}</h2>
              
              <p>
                희망 임대료: {{answer["2-1"]}}<br>
                희망 계약기간: {{answer["2-2"]}} <br>
                옵션:
                <select v-model="option_select">
                  <option disabled value="">optipn</option>
                  <option>A4 용지 1Box</option>
                  <option>A3 용지 1Box</option>
                </select> <br>
                기본 매수: <br><br>
                <!-- 견적문의하기<input type="checkbox" v-model="val" :value="`${result_name}`" @change="checkbox_estimate"> -->
                <button class="btn_before" v-show="send_btn" @click="customer_service_btn">문의 하기</button>
                 <button  class="btn_before" :value="result_name" @click="click_product_name">더 자세히</button>
              </p>
            </div>
          </div>
        </div>
        
    </nav>
    
    <footer class="curation_footer">
       
      <!-- 제품 다른 추천 -->
      <OtherProducts class="OtherProducts" v-show="curation_products_result" :Q_number="Q_number" :answer="answer" />
    </footer>

  </div>
</template>

<script>
import axios from "axios"
import Question_result from './Question_result'
import Menu from './Menu'
import OtherProducts from './OtherProducts'
import Estimate from './Estimate'

export default {
  name: 'home',
  components: {
    Question_result,
    OtherProducts,
    Estimate,
    Menu
  },
  data: function() {
    return {
      val: [],
      Q_number: 0,
      answer: {},
      question: null,
      title:"",
      selects:[],

      btn_before: false, //질문 다음 버튼
      btn_after: true,  //질문 이전 버튼
     
      start_question: false,     //시작 질문
      restart_question: false,   //다시 시작 질문 
      result_Explanation: false, //감사 인사

      first_results_img: false,  // 맞춤 추천 이미지
      first_results: null,       // 맞춤 추천 결과 
      result_name: null,         //맞춤 추천 결과 이름
      result_id: "",             //맞춤 추천 결과 ID
      result_color: "",          //맞춤 추천 결과 기종
      
      curation_products_result: false,   //슬라드쇼 제품 components
      question_result: false,            //질문결과
      btn_question_result: false,        //질문 결과 버튼
      customer_service: false,           //문의하기 폼
      send_btn: false,                   //문의하기 버튼

      view_count: null,                  //사용횟수
      view_count_check: false,           //사용횟수 체크
      option_select: "",                  //맞춤 설정 옵션

      Curation_img: false                //맞춤 추천 div
    }
  },
  created(){
    this.get_question();
    this.result_name = localStorage.getItem('product_name');
    
    if(this.Q_number == 0){
        this.start_question = true;
        this.btn_before = false;

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
            // return this.question.subquestions
            if(this.answer["1"] == 'black'){
              return this.question.subquestions.filter(function (item) {
              return item._id === "2-1" || item._id === "2-2"
              })
            } else if(this.answer["1"] == 'color'){
              return this.question.subquestions.filter(function (item) {
              return item._id === "2-1" || item._id === "2-3"
              })
            }
          } else if(this.answer["2"] == "sale"){
            return this.question.subquestions.filter(function (item) {
              return item._id === "2-3";
            })
          }
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
    //맞춤 추천
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
          },
          timeout: 2000
       }) 
       .then((res)=>{
            this.first_results = JSON.stringify(res.data);
            this.result_name = res.data.name;
            this.result_id = res.data._id;
            this.result_color = res.data.color;
            localStorage.setItem("curation_result", JSON.stringify(this.first_results))
            localStorage.setItem("product_name", JSON.stringify(this.result_name))
      })
      } else if(this.answer["1"] == 'color'){
        axios.get('http://localhost:8081/c_products/search/', {   
          params: {
            que1: que1,
            que2: que2,
            que3: que3,
            que4: que4,
            que5: que5
         },
         timeout: 2000
       }) 
       .then((res)=>{
            this.first_results = JSON.stringify(res.data);
            this.result_name = res.data.name;
            this.result_id = res.data._id;
            this.result_color = res.data.color;
            localStorage.setItem("curation_result", JSON.stringify(this.first_results))
            localStorage.setItem("product_name", JSON.stringify(this.result_name))
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
    //다음 질문 버튼
    increaseNumber(){
        if (this.Q_number >= 0 && this.Q_number <= 7) {
          if (this.Q_number == 1 && this.answer["1"] == null) {
            alert("필수항목입니다!")
          } else {
            this.Q_number++;
            this.get_question();
          }
        }
          
        if(this.Q_number >= 1 && this.Q_number <= 7){
          this.start_question = false;
          this.btn_before = true;
          this.curation_restart = false;
        }

        if(this.Q_number >= 8){
          this.send_btn = true;
          this.result_Explanation = true;
          this.btn_question_result = true;
          this.first_results_img = true;
          
          this.curation_products_result = true;
          this.curation_restart = true;

          this.btn_after = false;
          this.customer_service = false;
          this.view_count_check = true;
          this.btn_before = false;
          this.Curation_img = true;

          this.result_save();
          this.count();
          this.$store.state.cencle_check = false;
        }
    },
    //이전 질문 버튼
    diminishNumber() {
      if(this.Q_number >= 1 && this.Q_number < 8){
        this.Q_number--;
        this.get_question();
        this.curation_restart= false;
        this.btn_before = true;
        if(this.Q_number == 0){
          this.start_question = true;
          this.btn_before = false;
        }
      } else if(this.Q_number = 2 ){
        this.start_question = false;
        this.btn_before = false;
      }
      
      if(this.Q_number <= 7){
        this.send_btn = false;
        this.other_results = false;
        this.btn_after = true;
        this.result_Explanation = false;
        this.btn_question_result = false;
        this.first_results_img = false;
        this.curation_products_result = false;
        this.customer_service = false;
        this.Curation_img = false;
        this.view_count_check = false;
        this.curation_restart = false;
        }
    },
    //문의하기 버튼
    customer_service_btn(){
      this.customer_service = !this.customer_service;
      this.question_result = false;
      if(this.customer_service == false){
        this.result_Explanation = true;
      } else {
        this.result_Explanation = false;
      }
      console.log(this.$store.state.cencle_check)
    },
    //큐레이션 다시시작하기 버튼
    curation_restart_click(){
      localStorage.removeItem("curation_result"); 
      localStorage.removeItem("product_name")
      localStorage.removeItem("estimate")
      if(this.Q_number == 0){
        this.Q_number++;
        this.get_question();
        
        this.start_question = false;
        this.restart_question = false;
        this.curation_restart = false;
        this.btn_after = true;
        this.btn_before = true;
      }
      
      if(this.Q_number == 8){
        localStorage.removeItem("curation_result"); 
        localStorage.removeItem("product_name");
        location.reload();
      }
    },
    //질문지 결과 버튼
    click_question_result(){
      this.question_result = !this.question_result;
      this.result_Explanation = false;
      this.customer_service = false;
      if(this.question_result == false){
        this.result_Explanation = true;
      } else {
        this.result_Explanation = false;
      }
    },
    //질문 결과 저장
    result_save(){
       let answer1 = this.answer["1"];
       let answer2 = this.answer["2"];
       let answer2_1 = this.answer["2-1"];
       let answer2_2 = this.answer["2-2"];
       let answer3 = this.answer["3"];
       let answer3_1 = this.answer["3-1"];
       let answer4 = this.answer["4"];
       let answer5 = this.answer["5"];
       let answer6 = this.answer["6"];
       let answer7 = this.answer["7"];
       let answer7_1 = this.answer["7-1"];
       let answer7_2 = this.answer["7-2"];
       let answer7_3 = this.answer["7-3"];
       let option_select = this.option_select;

      axios.get('http://localhost:8081/result_save/save', {   
          params: {
            answer1: answer1,
            answer2: answer2,
            answer2_1: answer2_1,
            answer2_2: answer2_2,
            answer3: answer3,
            answer3_1: answer3_1,
            answer4: answer4,
            answer5: answer5,
            answer6: answer6,
            answer7: answer7,
            answer7_1: answer7_1,
            answer7_2: answer7_2,
            answer7_3: answer7_3,
            option_select: option_select
          }
       })  
      .then((res)=>{
        console.log("질문결과 저장 완료")
      })
    },
    //사용횟수
    count() {
      if (this.view_count_check == true) {
        axios.get('http://localhost:8081/result_save/count')
          .then((res) => {
            this.view_count = res.data.length;
          })
      }
    },
    // checkbox_estimate() {
    //   console.log(this.val)
    //   let estimate = this.val[0]
    //   this.$store.dispatch('checkbox_estimate', estimate);
    // },
    click_product_name(e){
      e.preventDefault()
      console.log(e.target.value)
      let asd = e.target.value;
      this.$store.dispatch('product_intro', asd);
      this.$router.push({
        path: '/Products'
      })
    }
  }
}
</script>

<style scoped src="./Curation.css">


</style>

