<template>
    <div class="home">
      <input type="submit" value="시작" placeholder="시작" @click="QQQ = !QQQ"><br><br>
      <div v-show="QQQ">
        <!-- 첫번째 질문 -->

        <div id="Q_1" v-if="Q_number === 1">
          <h3>1/5</h3>
          <h2>#1 어떤 제품을 원하십니까?</h2>

          <input type="radio" v-model="Que1_B" value="흑백" @click="Q1_radio"><label>1. 흑백 복합기</label><br>
          <input type="radio" v-model="Que1_C" value="칼라" @click="Q1_radio"><label>2. 칼라 복합기</label><br>
        </div>
        <!-- 두번째 질문 -->
        <div id="Q_2" v-else-if="Q_number === 2">
          <h3>2/5</h3>
          <h2>#2 어떤 업종에서 사용하십니까?</h2>

          <p>1. 회사명과 사용 환경을 적어주세요</p>
          <label>본인 이름: </label>
          <input type="text" v-model="Que2" value="" placeholder="본인 이름"><br>

          <label>회사명: </label>
          <input type="text" v-model="Que2_1" value="" placeholder="회사명"><br><br>

          <p>2. 몇 명이서 사용하십니까?</p>
          <input type="radio" v-model="Que2_2" value="소규모"><label>1. 1명 ~ 10명 (소규모)</label><br>
          <input type="radio" v-model="Que2_2" value="중규모"><label>2. 10명 ~ 20명 (중규모)</label><br>
          <input type="radio" v-model="Que2_2" value="대규모"><label>3. 20명 ~ 30명 (대규모)</label><br><br>

          <p>3. 주로 어떤 출력물을 사용하시나요?</p>
          <input type="radio" v-model="Que2_3" value="일반문서"><label>1. 일반 문서 (A4, A3) </label><br>
          <input type="radio" v-model="Que2_3" value="디자인"><label>2. 디자인 출력물 </label><br>
          <input type="radio" v-model="Que2_3" value="설계도"><label>3.설계도 </label><br>
          <label>4. 기타: </label>
          <input type="text" v-model="Que2_4" placeholder="기타"><br><br>
        </div>

        <!-- 세번째 질문 -->
        <div id="Q_3" v-else-if="Q_number === 3">
          <h2>3/5</h2>
          <h1>#3 임대 & 구매?</h1>
          <input type="radio" v-model="Que3" value="임대" @click="Q3_L = !Q3_L"><label>1. 임대</label><br>
          <input type="radio" v-model="Que3" value="구매"><label>2. 구매</label><br>

          <div v-show="Q3_L">
            <p>3-1. 계약 기간</p>
            <input type="radio" v-model="Que3_1" value="3년"><label>1. 3년 </label><br>
            <input type="radio" v-model="Que3_1" value="2년"><label>2. 2년</label><br>
            <input type="radio" v-model="Que3_1" value="단기계약"><label>3. 단기계약</label><br>
            <label>원하시는 계약기간을 적어주세요: </label>
            <input type="text" v-model="Que3_1" placeholder="계약 기간"><br>

            <p>3-2. 생각하는 임대 금액은 어떻게 되십니까?</p>
            <input type="radio" v-model="Que3_2" value="10만원"><label>1. 월 10만원 - 흑백 1000장 / 칼라
              100장</label><br>
            <input type="radio" v-model="Que3_2" value="12만원"><label>2. 월 12만원 - 흑백 3000장 / 칼라
              200장</label><br>
            <input type="radio" v-model="Que3_2" value="15만원"><label>3. 월 15만원 - 흑백 5000장 / 칼라
              300장</label><br>

            <p>3-3. 한달 평균 사용량은 어떻게되십니까? (A4 기준)</p>
            <input type="radio" v-model="Que3_3" value="2500"><label>1. A4 - 1BOX(2500장) 이하 </label><br>
            <input type="radio" v-model="Que3_3" value="5000"><label>2. A4 - 2BOX(5000장) 이하</label><br>
            <input type="radio" v-model="Que3_3" value="7500"><label>3. A4 - 3BOX(7500장) 이하</label><br>
            <input type="radio" v-model="Que3_3" value="10000"><label>4. A4 - 4BOX(10000장) 이하</label><br>
            <input type="radio" v-model="Que3_3" value="99999"><label>5. A4 - 4BOX(10000장) 이상</label><br>
          </div>
        </div>
        <!-- 네 번째 질문 -->
        <div id="Q_4" v-else-if="Q_number === 4">
          <h2>4/5</h2>
          <h1>#4 출력 속도, 스캔 속도는 어떻게 되십니까?</h1>

          <p>1. 분당 최대 출력(프린터) 속도 (1분당 A4용지 기준)</p>
          <small>(등급기준은 출력 속도 기준을 쉽게 표현하기 위함이며 복합기의 퀄리티가 아닙니다.)</small> <br><br>
          <input type="radio" v-model="Que4" value="L" id="Q4_L" @click="Q4_L()"><label>1. 분당 20매 이하 (Low 등급) (*칼라 기계만
            해당*)</label><br>
          <input type="radio" v-model="Que4" value="M" id="Q4_M" @click="Q4_M()"><label>2. 분당 20매~45매 (Middle
            등급)</label><br>
          <input type="radio" v-model="Que4" value="H" id="Q4_H" @click="Q4_H()"><label>3. 분당 45매~75매 (High 등급)</label><br>
          <input type="radio" v-model="Que4" value="W" id="Q4_W" @click="Q4_W()"><label>4. 모르겠다</label><br><br>

          <!-- 흑백기 스캔 속도 -->
          <div>
            <div v-show="Q4_B_M_answer">
              <p>2. 흑백기 Middle등급 분당 최대 스캔 속도</p>
              <input type="radio" v-model="Que4_1" value="25"><label>1. 흑백 25매, 칼라 25매</label><br>
              <input type="radio" v-model="Que4_1" value="28"><label>2. 흑백 28매, 칼라 28매</label><br>
              <input type="radio" v-model="Que4_1" value="55"><label>3. 흑백 55매, 칼라 55매</label><br>
            </div>
            <div v-show="Q4_B_H_answer">
              <p>2. 흑백기 High등급 분당 최대 스캔 속도</p>
              <input type="radio" v-model="Que4_1" value="140"><label>1. 흑백 140매, 칼라
                140매</label><br>
              <input type="radio" v-model="Que4_1" value="200"><label>2. 흑백 200매, 칼라
                200매</label><br>
            </div>
          </div>

          <!-- 칼라기 스캔 속도 -->
          <div id="scan_speed">
            <div v-show="Q4_C_L_answer">
              <p>2. 칼라기 Low등급 분당 최대 스캔 속도</p>
              <input type="radio" v-model="Que4_2" value="24"><label>1. 흑백 24매, 칼라 19매</label><br>
              <input type="radio" v-model="Que4_2" value="55"><label>2. 흑백 55매, 칼라 55매</label><br>
            </div>
            <div v-show="Q4_C_M_answer">
              <p>2. 칼라기 Middle등급 분당 최대 스캔 속도</p>
              <input type="radio" v-model="Que4_2" value="80"><label>1. 흑백 80매, 칼라 80매</label><br>
              <input type="radio" v-model="Que4_2" value="154"><label>2. 흑백 154매, 칼라
                154매</label><br>
            </div>
            <div v-show="Q4_C_H_answer">
              <p>2. 칼라기 High등급 분당 최대 스캔 속도</p>
              <input type="radio" v-model="Que4_2" value="154"><label>1. 흑백 154매, 칼라
                154매</label><br>
              <input type="radio" v-model="Que4_2" value="200"><label>2. 흑백 200매, 칼라
                200매</label><br>
              <input type="radio" v-model="Que4_2" value="270"><label>3. 흑백 270매, 칼라
                270매</label><br>
            </div>
          </div>
        </div>

        <br><br><br><br><br>
        <div>
          <input type="submit" value="이전" id="Q_brfore" @click="diminishNumber" placeholder="이전">
          <input type="submit" value="다음" id="Q_after" @click="increaseNumber" placeholder="다음">
        </div>
      </div>
      <div>
        <h1>질문지 결과</h1>
        <p>
          #1 희망하시는 기기: {{Que1_B}} {{Que1_C}}<br><br>
          #2 고객 성함: {{Que2}}<br>
          #2-1 고객 회사명: {{Que2_1}}<br>
          #2_2 사용 규묘: {{Que2_2}}<br>
          #2_3 출력물 종류: {{Que2_3}} {{Que2_4}}<br><br>
          #3 구매 방법: {{Que3}}<br>
          #3_1 계약기간: {{Que3_1}}<br>
          #3_2 고객이 생각하는 임대 금액: {{Que3_2}}<br>
          #3_4 한달 평균 사용량: {{Que3_3}}<br><br>
          #4 출력 속도: {{Que4}}<br>
          #4_1 스캔 속도: {{Que4_1}} {{Que4_2}}<br><br>
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'home',

  data: function() {
    return {
      QQQ: "",
      Que1_B: "",
      Que1_C: "",
      Que2: "",
      Que2_1: "",
      Que2_2: "",
      Que2_3: "",
      Que2_4: "",
      Que3: "",
      Que3_1: "",
      Que3_2: "",
      Que3_3: "",
      Que4: "",
      Que4_1: "",
      Que4_2: "",

      Q_number: 1,
      Q3_number: 1,
      Q3_L: false,

      Q4_B_M_answer: false,
      Q4_B_H_answer: false,
      Q4_C_L_answer: false,
      Q4_C_M_answer: false,
      Q4_C_H_answer: false,
    }
  },

  methods: {
    increaseNumber() {
      if(this.Q_number === 1){
        console.log("asd")
        if(this.Que1_B.checked){
          console.log("this.Que1_B.checked")
        }
      }
    this.Q_number++;
    },
    diminishNumber() {
      this.Q_number--;
    },
    Q1_radio(){

    },
    Q3_btn_show() {
      Q3_show: true;
    },
    Q4_L() {
      if (this.Que1_B) {
        console.log("흑백기는 Low급이 없습니다.");
        this.Q4_C_L_answer = false;
        this.Que1_B = false;
      }else if (this.Que1_C) {
        console.log("칼라 LOW급");
        this.Q4_C_L_answer = true
        this.Que1_C = false;
      }
    },
    Q4_M() {
      if (this.Que1_B) {
        console.log("Q1_B_checked");
        this.Q4_B_M_answer = true;
        this.Q4_C_M_answer = false;
      } else if (this.Que1_C) {
        console.log("Q1_C_checked");
        this.Q4_C_M_answer = true;
        this.Q4_B_M_answer = false;
      }
    },
    Q4_H(){
      if (this.Que1_B) {
        console.log("Q1_B_checked");
        this.Q4_B_H_answer = true;
        this.Q4_C_H_answer = false;
      } else if (this.Que1_C) {
        console.log("Q1_C_checked");
        this.Q4_C_H_answer = true;
        this.Q4_B_H_answer = false;
      }
    },
    Q4_W(){
      console.log("모르겠음을 선택함")
    }
  }
      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
