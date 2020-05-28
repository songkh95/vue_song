<template>
  <div id="other_products">
    <form v-on:submit.prevent="curation_result_img">
      <input class="btn_before" type="submit" value="다른 상품" @click="click_curation_result_img"
        v-show="btn_curation_result_img">
    </form>

    <a href="#">같은 종류의 다른 상품</a>
    <carousel v-show="btn_slide" class="slide">
      <slide v-for="result of this.result_img" :key="result.value">
        <img :src="require(`../assets/${result.name}.png`)" alt="상품 이미지" /><br>
        상품명: {{result.name}} <br>
        기기 종류: {{result.color}} <br>
        분당 프린트 속도: {{result.print_speed}} <br>
        분당 스캔 속도: {{result.scan_speed}}<br>
        <br>
        문의 항목에 추가<input type="checkbox" v-model="val" :value="result.name" @change="checkbox_estimate"> <br>
      </slide>
    </carousel>
  </div>
</template>

<script>
import axios from "axios"
import {
  Carousel,
  Slide
} from 'vue-carousel';

export default {
  name: 'Other_products',
  components: {
    Carousel,
    Slide
  },
  props: {
    Q_number: Number,
    answer: Object,
    result_id: String
  },
  data: function () {
    return {
      val: [],

      result_img: null,
      result_name: null,
      btn_curation_result_img: true,
      btn_slide: false,
      products_img: null,
      result_value: null,
      asd: null
    }
  },
  methods: {
    curation_result_img() {
      if (this.answer["1"] == 'black') {
        axios.get('http://localhost:8081/b_products/img/', {
         timeout: 2000
        })
          .then((res) => {
            if (this.Q_number == 8) {
              this.black_products = res.data;
              this.result_img = res.data; //결과
              this.result_name = res.data.name; //상품 이름
              this.color =  res.data.color;
            }
          })
          .catch((err) => {
            console.log(err);
          })
      } else if (this.answer["1"] == 'color') {
        axios.get('http://localhost:8081/c_products/img/', {
         timeout: 2000
        })
          .then((res) => {
            if (this.Q_number == 8) {
              this.color_products = res.data;
              this.result_img = res.data; //결과
              this.result_name = res.data.name;
              this.color =  res.data.color;
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    click_curation_result_img(){
      this.btn_slide = !this.btn_slide;
    },
    checkbox_estimate(){
      localStorage.setItem("estimate", JSON.stringify(this.val))
      this.asd = localStorage.getItem("estimate");
    }
  }
}
</script>

<style>
.slide{
  margin-left: 40px;
  text-align: left;
}
.slide img{
  width: 200px;
  height: 200px;
}

.btn_before{
  position: relative;
  width: 90px;
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
</style>