<template>
    <div class="home">
      <div v-if="QQQ" class="Curation_form">
      <form v-on:submit.prevent="postpost">

        <div v-if="Q_number === 1">
          <h1>제품 견적 큐레이션</h1>
            <p>고객님에게 필요한 제품을 알려드리며 쉽고 빠르게 견적서를 받을 수 있습니다.</p>
        </div>
      
          <!-- 첫번째 질문 -->
          <div v-else-if="Q_number === 2">
            <h3>1/7</h3>
            <h1>#1 어떤 제품을 원하십니까?</h1>

            <div class="Que_list">
              <input type="radio" v-model="que1" value="black" ref="que1"><label> 흑백 복합기</label><br>
              <input type="radio" v-model="que1" value="color" ref="que2"><label> 칼라 복합기</label><br>
            </div>

          </div>   
          <!-- 두번째 질문 -->
          <div v-else-if="Q_number === 3">
            <h3>2/7</h3>
            <h1>#2 임대 & 구매?</h1>

            <div class="Que_list">
              <input type="radio" v-model="que2" value="lease" @click="Q2_L_btn"><label> 임대</label><br>
              <input type="radio" v-model="que2" value="sale" @click="Q2_S_btn"><label> 구매</label><br>

              <div v-show="Q2_L">
                <p>-. 계약 기간</p>
                <input type="radio" v-model="que2_1" value="3년"><label> 3년 </label><br>
                <input type="radio" v-model="que2_1" value="2년"><label> 2년</label><br>
                <input type="radio" v-model="que2_1" value="단기계약"><label> 단기계약</label><br>
                <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기타:</label>
                <input type="text" v-model="que2_1" placeholder="계약기간을 적어주세요"><br>

                <p>-. 생각하는 임대 금액은 어떻게 되십니까?</p>
                <input type="radio" v-model="que2_2" value="10만원"><label> 월 10만원 - 흑백 1000장 / 칼라
                  100장</label><br>
                <input type="radio" v-model="que2_2" value="12만원"><label> 월 12만원 - 흑백 3000장 / 칼라
                  200장</label><br>
                <input type="radio" v-model="que2_2" value="15만원"><label> 월 15만원 - 흑백 5000장 / 칼라
                  300장</label><br>
              </div>
            </div>
          </div>
          <!-- 세번째 질문 -->
          <div v-else-if="Q_number === 4">
            <h3>3/7</h3>
            <h1>#3 출력 속도, 스캔 속도는 어떻게 되십니까?</h1>

            <p>1. 분당 최대 출력(프린터) 속도 (1분당 A4용지 기준 / 흑백,칼라 포함하여서)<br>
            (등급기준은 출력 속도 기준을 쉽게 표현하기 위함이며 복합기의 퀄리티가 아닙니다.)</p> <br><br>
            <div class="Que_list">
              <input type="radio" v-model="que3" value="L" @click="Q3_L()"><label> 분당 20매 이하 (Low 등급) (*칼라 기계만
                해당*)</label><br>
              <input type="radio" v-model="que3" value="M" @click="Q3_M()"><label> 분당 20매~45매 (Middle 등급)</label><br>
              <input type="radio" v-model="que3" value="H" @click="Q3_H()"><label> 분당 45매~75매 (High 등급)</label><br>
              <input type="radio" v-model="que3" value="W" @click="Q3_W()"><label> 모르겠다</label><br><br>

              <!-- 흑백기 스캔 속도 -->
              <div>
                <div v-show="Q3_B_M_answer">
                  <p>- 흑백기 Middle등급 분당 최대 스캔 속도</p>
                  <input type="radio" v-model="que3_1" value="25"><label> 흑백 25매, 칼라 25매</label><br>
                  <input type="radio" v-model="que3_1" value="28"><label> 흑백 28매, 칼라 28매</label><br>
                  <input type="radio" v-model="que3_1" value="55"><label> 흑백 55매, 칼라 55매</label><br>
                </div>
                <div v-show="Q3_B_H_answer">
                  <p>- 흑백기 High등급 분당 최대 스캔 속도</p>
                  <input type="radio" v-model="que3_1" value="140"><label> 흑백 140매, 칼라 140매</label><br>
                  <input type="radio" v-model="que3_1" value="200"><label> 흑백 200매, 칼라 200매</label><br>
                </div>
              </div>

              <!-- 칼라기 스캔 속도 -->
              <div>
                <div v-show="Q3_C_L_answer">
                  <p>- 칼라기 Low등급 분당 최대 스캔 속도</p>
                  <input type="radio" v-model="que3_1" value="20"><label> 흑백 20매, 칼라 20매</label><br>
                  <input type="radio" v-model="que3_1" value="24"><label> 흑백 24매, 칼라 19매</label><br>
                  <input type="radio" v-model="que3_1" value="55"><label> 흑백 55매, 칼라 55매</label><br>
                </div>
                <div v-show="Q3_C_M_answer">
                  <p>- 칼라기 Middle등급 분당 최대 스캔 속도</p>
                  <input type="radio" v-model="que3_1" value="40"><label> 흑백 40매, 칼라 40매</label><br>
                  <input type="radio" v-model="que3_1" value="55"><label> 흑백 55매, 칼라 55매</label><br>
                  <input type="radio" v-model="que3_1" value="80"><label> 흑백 80매, 칼라 80매</label><br>
                  <input type="radio" v-model="que3_1" value="154"><label> 흑백 154매, 칼라 154매</label><br>
                </div>
                <div v-show="Q3_C_H_answer">
                  <p>- 칼라기 High등급 분당 최대 스캔 속도</p>
                  <input type="radio" v-model="que3_1" value="80"><label> 흑백 80매, 칼라 80매</label><br>
                  <input type="radio" v-model="que3_1" value="135"><label> 흑백 135매, 칼라 135매</label><br>
                  <input type="radio" v-model="que3_1" value="154"><label> 흑백 154매, 칼라 154매</label><br>
                  <input type="radio" v-model="que3_1" value="200"><label> 흑백 200매, 칼라 200매</label><br>
                  <input type="radio" v-model="que3_1" value="270"><label> 흑백 270매, 칼라 270매</label><br>
                </div>
              </div>
            </div>
          </div>
          <!-- 네 번째 질문 -->
          <div v-else-if="Q_number === 5">
            <h3>4/7</h3>
            <h1>#4 희망하는 프린트 해상도</h1>

            <div class="Que_list">
              <input type="radio" v-model="que4" value="600*600"><label> 600 x 600 dpi</label><br>
              <input type="radio" v-model="que4" value="1200*1200"><label> 1200 x 1200 dpi</label><br>
              <input type="radio" v-model="que4" value="1200*2400"><label> 1200 x 2400 dpi</label><br>
              <input type="radio" v-model="que4" value="2400*2400"><label> 2400 x 2400 dpi</label><br>
            </div>
          </div>
          <!-- 다섯 번째 질문 -->
          <div v-else-if="Q_number === 6">
            <h3>5/7</h3>
            <h1>#5 필요한 옵션</h1>
            <p>(기본 트레이는 2Tray입니다.)</p>

            <div class="Que_list">
              <input type="radio" v-model="que5" value="4Tray"><label> 4Tray</label><br>
              <input type="radio" v-model="que5" value="Fax kit"><label> Fax kit</label><br>
              <input type="radio" v-model="que5" value="Side tray"><label> Side tray</label><br>
              <input type="radio" v-model="que5" value="Finisher-A1"><label> Finisher-A1</label><br>
            </div>
          </div>
          <!-- 여섯 번째 질문 -->
          <div v-else-if="Q_number === 7">
            <h3>6/7</h3>
            <h1>#6 가장 희망하는 기기의 장점</h1>
            <div class="Que_list">
              <input type="radio" v-model="que6" value="A그룹"><label>A그룹</label><br>
              <input type="radio" v-model="que6" value="A그룹"><label>B그룹</label><br>
              <input type="radio" v-model="que6" value="C그룹"><label>C그룹</label><br>
              <input type="radio" v-model="que6" value="D그룹"><label>D그룹</label><br>
            </div>
          </div>
          <!-- 일곱 번째 질문 -->
          <div v-else-if="Q_number === 8">
            <h3>7/7</h3>
            <h1>#7 어떤 사무환경에서 사용하십니까?</h1>

            <div class="Que_list">
              <p>- 몇 명이서 사용하십니까?</p>
              <input type="radio" v-model="que7" value="소규모"><label> 1명 ~ 10명 (소규모)</label><br>
              <input type="radio" v-model="que7" value="중규모"><label> 10명 ~ 20명 (중규모)</label><br>
              <input type="radio" v-model="que7" value="대규모"><label> 20명 ~ 30명 (대규모)</label><br><br>

              <p>- 출력 용지의 종류는 어떻게 되십니까?</p>
              <input type="radio" v-model="que7_1" value="일반 용지"><label> 일반 용지</label><br>
              <input type="radio" v-model="que7_1" value="UPM지"><label> UPM지 </label><br>
              <input type="radio" v-model="que7_1" value="특수지"><label> 특수지 </label><br>
              <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기타: </label>
              <input type="text" v-model="que7_1" placeholder="기타"><br>

              <p>- 주로 어떤 출력물을 사용하시나요?</p>
              <input type="radio" v-model="que7_2" value="일반문서"><label> 일반 문서 (A4, A3) </label><br>
              <input type="radio" v-model="que7_2" value="디자인"><label> 디자인 출력물 </label><br>
              <input type="radio" v-model="que7_2" value="설계도"><label> 설계도 </label><br>
              <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기타: </label>
              <input type="text" v-model="que7_2" placeholder="기타"><br><br>

              <p>- 한달 평균 사용량은 어떻게되십니까? (A4 기준)</p>
                <input type="radio" v-model="que7_3" value="2500"><label> A4 - 1BOX(2500장) 이하 </label><br>
                <input type="radio" v-model="que7_3" value="5000"><label> A4 - 2BOX(5000장) 이하</label><br>
                <input type="radio" v-model="que7_3" value="7500"><label> A4 - 3BOX(7500장) 이하</label><br>
                <input type="radio" v-model="que7_3" value="10000"><label> A4 - 4BOX(10000장) 이상</label><br>
            </div>
          </div>
          <!-- 결과 보기 -->
          <div v-else-if="Q_number === 9">
            <div v-show="RRR"  class="Curation_result">
              <h1>- 질문지 결과</h1>
                <p>
                  #1 희망하시는 기기: {{que1 =='black'?'흑백':'칼라'}}<br><br>

                  #2 구매 방법: {{que2 == 'lease'?'임대':'판매'}}<br>
                  #2_1 계약기간: {{que2_1}}<br>
                  #2_2 고객이 생각하는 임대 금액: {{que2_2}}<br><br>
                  
                  #3 스캔 속도: {{que3_1}}<br><br>
                  
                  #4 프린트 해상도: {{que4}}<br><br>

                  #5 옵션: {{que5}}<br><br>
                  #6 장점: {{que6}}<br><br>

                  #7 사용 인원: {{que7}}<br>
                  #7_1 출력물 종류: {{que7_1}}<br>
                  #7_2 한달 평균 사용량: {{que7_2}}<br>
                  #7_3 한달 평균 용지 사용량: {{que7_3}}<br>
                </p>
            </div>
          </div>

          <br><br><br>
          <div class="Curation_btn">
            <input type="button" v-show="btn_before" value="이전" @click="diminishNumber" placeholder="이전">
            <input type="submit" v-show="btn_after" value="다음" @click="increaseNumber" placeholder="다음">
          </div><br><br>

        </form>
      </div>
      <div>
        <form v-on:submit.prevent="get2">
          <input type="submit" value="특정 ID 조회">
        </form>
      </div>
      <div>
        <form v-on:submit.prevent="get1">
          <input type="submit" value="전체 조회">
        </form>
      </div>
      <div>
        <router-link to="/result">다른 페이지 이동</router-link>
      </div>
      <router-view />
    </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'home',
  data: function() {
    return {
      QQQ: true,
      RRR: false,
      que1: "black",
      que2:"",
      que2_1: "",
      que2_2: "",
      que2_3: "",
      que3: "",
      que3_1: "",
      que4: "",
      que5:"",
      que6:"",
      que7:"",
      que7_1:"",
      que7_2:"",
      que7_3:"",
      btn_result: false,
      btn_before: false,
      btn_after: true,
      Q_number: 1,
      Q2_L: false,
      Q3_B_M_answer: false,
      Q3_B_H_answer: false,
      Q3_C_L_answer: false,
      Q3_C_M_answer: false,
      Q3_C_H_answer: false
    }
  },
  methods: {
    Q2_L_btn(){
      this.Q2_L = !this.Q2_L;
    },
    Q2_S_btn(){
      this.Q2_L = false;
    },
    increaseNumber() {
      this.Q_number++;
      if(this.Q_number === 2){
        this.btn_before = true;
      }
     
    
      if(this.Q_number === 9){
        this.RRR = true;  //결과 화면
        this.btn_after = false; //다음 버튼
        this.btn_before = true; //이전 버튼
      }
    },
    diminishNumber() {
      this.Q_number--;
      if(this.Q_number === 2){
        this.btn_before = false;
      }
      if(this.Q_number < 9){
        this.btn_after = true;
      }
    },
    Q3_L() {
      console.log(this.que1)
      if (this.que1 == "black") {
        console.log("흑백기는 Low급이 없습니다.");
        this.Q3_B_M_answer = false;
        this.Q3_B_H_answer = false;
        this.Q3_C_L_answer = false;
        this.Q3_C_M_answer = false;
        this.Q3_C_H_answer = false;
      }else if (this.que1 == "color") {
        console.log("칼라 LOW급");
        this.Q3_B_M_answer = false;
        this.Q3_B_H_answer = false;
        this.Q3_C_L_answer = true;
        this.Q3_C_M_answer = false;
        this.Q3_C_H_answer = false;
      }
    },
    Q3_M() {
      if (this.que1 == "black") {
        console.log("흑백 MIDDLE급");
        this.Q3_B_M_answer = true;
        this.Q3_B_H_answer = false;
        this.Q3_C_L_answer = false;
        this.Q3_C_M_answer = false;
        this.Q3_C_H_answer = false;
      } else if (this.que1 == "color") {
        console.log("칼라 MIDDLE급");
        this.Q3_B_M_answer = false;
        this.Q3_B_H_answer = false;
        this.Q3_C_L_answer = false;
        this.Q3_C_M_answer = true;
        this.Q3_C_H_answer = false;
      }
    },
    Q3_H(){
      if (this.que1 == "black") {
        console.log("흑백 HIGH급");
        this.Q3_B_M_answer = false;
        this.Q3_B_H_answer = true;
        this.Q3_C_L_answer = false;
        this.Q3_C_M_answer = false;
        this.Q3_C_H_answer = false;
      } else if (this.que1 == "color") {
        console.log("칼라 HIGH급");
        this.Q3_B_M_answer = false;
        this.Q3_B_H_answer = false;
        this.Q3_C_L_answer = false;
        this.Q3_C_M_answer = false;
        this.Q3_C_H_answer = true;
      }
    },
    Q3_W(){
      console.log("모르겠음을 선택함")
        this.Q3_B_M_answer = false;
        this.Q3_B_H_answer = false;
        this.Q3_C_L_answer = false;
        this.Q3_C_M_answer = false;
        this.Q3_C_H_answer = false;
    },
    postpost(){
      let que1 = this.que1;
      let que3 = this.que3;
      let que3_1 = this.que3_1;
      let que4 = this.que4;
      let que6 = this.que6;

      axios.post('http://localhost:8081/todos/products', {
        que1: que1,
        que3: que3,
        que3_1: que3_1,
        que4: que4,
        que6: que6
      });
    },
    get1(){
     axios.get('http://localhost:8081/todos/qqq').then(res => { 
       console.log(res.data) 
       })
    },
    get2(){
     axios.get('http://localhost:8081/todos?color=color').then(res => { 
       console.log(res.data) 
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


//  get2(){
//      axios.get('http://localhost:8081/todos/color/color').then(res => { 
//        console.log(res.data) 
//        })
//     }

// get2 () {
//   axios.get('http://localhost:8081/todos/color', {
//     params: {color: 'color'}
//   }).then(res => {
//     console.log(res.data)
//   })
// }