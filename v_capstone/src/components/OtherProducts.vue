<template>
  <div id="other_products">

    <form v-on:submit.prevent="curation_result_img">
      <input type="submit" value="다른 상품" @click="click_curation_result_img" v-show="btn_curation_result_img">
    </form>
 
    
    <carousel  v-show="btn_slide">
      <slide v-for="result of this.result_img" :key="result.value">
        <img :src="require(`../assets/${result.name}.png`)" alt="상품 이미지" /><br>
        상품명: {{result.name}} <br>
        기기 종류: {{result.color}} <br>
        분당 프린트 속도: {{result.print_speed}} <br>
        분당 스캔 속도: {{result.scan_speed}}<br>

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
      result_img: null,
      result_name: null,
      btn_curation_result_img: true,
      btn_slide: false,
      products_img: null
    }
  },
  methods: {
    curation_result_img() {
      if (this.answer["1"] == 'black') {
        axios.get('http://localhost:8081/b_products/img/')
          .then((res) => {
            if (this.Q_number == 8) {
              this.result_img = res.data; //결과
              this.result_name = res.data.name; //상품 이름
            }
          })
          .catch((err) => {
            console.log(err);
          })
      } else if (this.answer["1"] == 'color') {
        axios.get('http://localhost:8081/c_products/img/')
          .then((res) => {
            if (this.Q_number == 8) {
              this.result_img = res.data; //결과
              this.result_name = res.data.name; //상품 이름
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    click_curation_result_img(){
      this.btn_slide = !this.btn_slide;
    }
  }
}

</script>

<style>

</style>