<template>
  <div id="other_products">
    <!-- 다른 상품 -->
    <div class="Curation_img">
      <!-- <img :src="require(`../assets/${plus_result_name}.png`)" alt="다른 이미지" /><br> -->
      <br><br><br>
      상품명: {{plus_result_name}}<br>
      기능/장점: {{answer["6"]}}<br>
      기본 계약기간: <br>
      원가 월 임대료: <br>
      할인 월 임대료:
      <select v-model="lease_selects">
        <option>월 10만원 - 흑백 1000장 / 칼라 100장</option>
        <option>월 12만원 - 흑백 3000장 / 칼라 200장</option>
        <option>월 15만원 - 흑백 5000장 / 칼라 300장</option>
      </select><br>
      옵션:
      <select v-model="optin_selects">
        <option>4Tray</option>
        <option>Fax kit</option>
        <option>Side tray</option>
        <option>Finisher-A1</option>
      </select><br><br>
      <div>
        구매 금액 / 할인 금액 / 설명(a/s 출장비, 소모품)
      </div>
      수량: <input type="text" value="수량" placeholder="개수를 입력하세요." /> <br>
    </div>

<!-- 버튼 -->
    <div class="other_results_btn">
      <form v-on:submit.prevent="curation_result_img">
        <div>
          
          <input type="submit" value="이전"  @click="diminish_img" placeholder="이전">
          <input type="submit" value="다음"  @click="increase_img" placeholder="다음">
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'Other_products',
  props: {
    Q_number:Number,
    answer: Object,
    result_id: String,
    result_name: String,
    result_img_name: String
  },
  data: function() {
    return {
      lease_selects: "",
      optin_selects: "" ,

      result_img: null,
      plus_result_id: null,
      plus_result_name: null,

    }
  },
  // created(){

  // },
  methods:{
    increase_img(){
      this.plus_result_id++;
      this.curation_result_img();

      if(this.plus_result_id >= 3){
        this.plus_result_id = 1;
      } else {
        this.plus_result_id++;
      }
    },
    diminish_img(){
      if(this.plus_result_id >= 1){
        this.plus_result_id--;
        if(this.plus_result_id == 0){
          this.plus_result_id = 2;
        }
      }
    },
    curation_result_img(){
      if (this.answer["1"] == 'black') {
        axios.get('http://localhost:8081/b_products/img/', {
           params: {
            plus_result_id: this.plus_result_id
           }
          })
          .then((res) => {
            if (this.Q_number == 8) {
              this.result_img = res.data; //결과
              this.plus_result_name = res.data.name; //상품 이름
              this.plus_result_id = res.data._id; //상품 ID
            }
          })
      } else if(this.answer["1"] == 'color'){
         axios.get('http://localhost:8081/c_products/img/', {
            params: {
            plus_result_id: this.plus_result_id
           }
          })
          .then((res) => {
            if (this.Q_number == 8) {
              this.result_img = res.data; //결과
              this.plus_result_name = res.data.name; //상품 이름
              this.plus_result_id = res.data._id; //상품 ID
            }
          })
      }
    }
  }
}
</script>

<style>

</style>