<template>
  <div id="other_products">

    <form v-on:submit.prevent="curation_result_img">
      <input class="btn_OtherProducts" type="submit" value="다른 상품" @click="click_curation_result_img"
        v-show="btn_curation_result_img">
    </form>

    <carousel v-show="btn_slide" class="slide" 
      :perPage="3" 
      :loop="loop" 
      :autoplay="true" 
      :navigationEnabled="true"
      navigationNextLabel="<i class='btn_next'> </i>" 
      navigationPrevLabel="<i class='btn_before'> </i>"
      paginationActiveColor="rgb(248, 70, 70)"
      paginationColor="#555555"
      :paginationPadding="2"
      :paginationSize="10"
      :autoplayTimeout="4000">
      <slide v-for="result of this.result_img" :key="result.value">
        <img :src="require(`../assets/${result.name}.png`)" alt="상품 이미지" /><br>
        <div class="slide_content">
          <h2>{{result.name}}</h2>
          <h3>{{result.color == "color" ?  "칼라복합기" : "흑백복합기"}}</h3>
          <p>
            분당 프린트 속도: {{result.print_speed}}매 / {{result.print_speed_level}} 등급<br>
            분당 스캔 속도: {{result.scan_speed }}매 <br>
            문의 항목에 추가<input type="checkbox" v-model="val" :value="result.name" @change="checkbox_estimate"> <br><br>
            <button  :value="result.name" @click="click_product_name">더 자세히</button>
          </p>
          
        </div>
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
      btn_slide: true,
      products_img: null,
      result_value: null,
      loop: true
    }
  },
  computed:{
    parentCounter(){
      return this.$store.state.counter
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
              this.color = res.data.color;
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
              this.color = res.data.color;
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    click_curation_result_img() {
      this.btn_slide = !this.btn_slide;
    },
    checkbox_estimate() {
      console.log(this.val)
      let estimate = this.val
      this.$store.dispatch('checkbox_estimate', estimate);
    },
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

<style scoped>

.btn_next{
  content:url("../assets/right-arrow.png" );
  width: 2vw;
}
.btn_before{
  content:url("../assets/back.png" );
  width: 2vw;
}
.slide{
  position: relative;
  width: 80%;
  margin: 20px;
  left:10vw;
}
.slide img{
  float: left;
  margin: 0vh 0vw 2vw 5vw;
  width: 6vw;
}
.slide_content{
  margin-top: 7vh;
  margin-left: 12vw;
}
.slide h2{
  font-size: 17px;
  margin: 0;
}

.slide h3{
  font-size: 15px;
  margin: 0;
}

.slide p{
  position: relative;
  float: left;
  margin: 0vh 0vw 0vw 0vh;
  width: 10vw;
  font-size: 11px;

}

.VueCarousel-pagination{
  height: 5vh;
  width: 100%;
}

.btn_OtherProducts{
  position: relative;
  left: 10vw;
  width: 65px;
  height: 20px;
  color: rgb(0, 0, 0);
  font-size: 13px;
  text-decoration: none;
  border: 2px none #09003b;
  overflow: hidden;
  transition: 0.6s all ease;
  background: rgb(255, 255, 255);
  
}
.btn_OtherProducts:hover{
  color:rgb(255, 0, 0)
  
}
</style>