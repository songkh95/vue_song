<template>
  <div id="All_products">

    <!-- header -->
    <div class="header">
      <Menu />
    </div>

    <!--container-->
    <div class="container">
      <!-- content -->
      <div class="content">

        <!-- 슬라이드 -->
        <div class="ppl">
          <carousel class="slide"
          :perPage="1"
          :loop="loop"
          :autoplay="true"
          :navigationEnabled="true"
          navigationNextLabel="<i class='btn_next'> </i>"
          navigationPrevLabel="<i class='btn_before'> </i>"
          paginationActiveColor="rgb(248, 70, 70)"
          paginationColor="#555555"
          :paginationPadding="5"
          :paginationSize="6"
          :autoplayTimeout="4000">
            <slide>
              <img :src="require(`../assets/PPL1.jpg`)" alt="PPL 이미지" />
            </slide>
            <slide>
              <img :src="require(`../assets/PPL2.jpg`)" alt="PPL 이미지" />
            </slide>
            <slide>
              <img :src="require(`../assets/PPL3.jpg`)" alt="PPL 이미지" />
            </slide>
          </carousel>
        </div>

        <div class="product_menu">
        <!-- 제품종류 -->
        <div class="type">
          <div class="type_list">
           <input type="submit"  @click="click_black_products" value="흑백복합기" v-model="black_products">
           <input type="submit"  @click="click_color_products" value="컬러복합기" v-model="color_products">
           <input type="submit"   value="프린터" v-model="print_products">
          </div>
        </div>
        <!-- 정렬 -->
        <div class="sortGroup">
          <div class="sortList">
            <button type="button">신상품순</button>
            <button type="button">추천순</button>
            <button type="button">낮은가격순</button>
            <button type="button">높은가격순</button>
          </div>
        </div>

        </div>

        <!-- 제품 -->
        <div class="product">
          <div class="product_div" v-show="show_black_products" v-for="product of this.products" :key="product.value">
              <div><img :src="require(`../assets/product_img/${product.name}.png`)" alt="PPL 이미지" /></div>
              <div><h2>{{product.name}}</h2></div>
              <div><p>
                분당 프린트 속도: {{product.print_speed}}매 / {{product.print_speed_level}} 등급<br>
                분당 스캔 속도: {{product.scan_speed }}매
              </p></div>
              <div><button  :value="product.name" @click="click_product_name">더 자세히</button></div>
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="footer">
      <p class="copyright">&copy;copy</p>
    </div>

  </div>
</template>

<script>
import axios from "axios"
import Menu from './Menu'
import {
  Carousel,
  Slide
} from 'vue-carousel';

export default {
  name: 'All_products',
    components: {
    Carousel,
    Slide,
    Menu
  },
  data: function() {
    return {
     product_name:"",
     loop: true,
     products: [],
     show_black_products: false,
     black_products: "흑백복합기",
     color_products: "컬러복합기",
     print_products: "프린터"
    }
  },
  methods:{
    click_black_products(){
        this.show_black_products = true;
        axios.get('http://localhost:8081/b_products/img/',{
          timeout: 2000
        })
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    click_color_products(){
        this.show_black_products = true;
        axios.get('http://localhost:8081/c_products/img/',{
          timeout: 2000
        })
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
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

*{
  margin: 0;
  padding: 0;
}

body{
  font-family: sans-serif;
  font-size: 14px;
  background: #ffffff;
  height: 100%;
}

.header {
  top: 0;
  position: relative;
}

.container {
  display:flex;
  background-color: #ffffff;
  justify-content: center;
  margin-top: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 82%;
  background: none;
}

.ppl{
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: auto;
  background: #fff;
  padding-top: 25px;
}

.slide{
  position: relative;
  float: left;
  width: 35%;
}

.slide img{
  position: relative;
  width: 100%;
  height: 35vh;
}

.VueCarousel-dot-container{
  position: relative;
  top: -10px;
  left: 5px;
  z-index: 2;
}
.VueCarousel-pagination{
  height: 0;
}
.btn_next{
  content:url("../assets/right-arrow.png" );
  position: relative;
  float: left;
  width: 2vw;
}
.btn_before{
  content:url("../assets/back.png" );
  position: relative;
  float: left;
  width: 2vw;
}

.product_menu{
  position: relative;
  width: 100%;
}
.type{
  position: relative;
  float: left;
  left:3vw;
  /* height: 27px; */
  /* border-bottom: 1px solid #000; */
  margin: 20px 0px 0px 0px;
}

.type_list input{
  position: relative;
  margin: 0px 25px 0px 0px;
  background: none;
  cursor: pointer;
  font-size: 16px;
  border: 0;
}

.sortGroup {
    position: relative;
    float: right;
    right: 3vw;
    /* height: 27px; */
    /* border-bottom: 1px solid #000; */
    margin: 20px 0px 0px 0px;
}

.sortGroup .sortList button {
    position: relative;
    float: right;
    background: none;
    color: #555;
    font-size: 14px;
    cursor: pointer;
    padding: 0px 5px 0px 10px;
    border: 0;
}

.sortGroup .sortList button ~ button {
    padding-left: 11px;
}

.sortGroup .sortList button ~ button:after {
    width: 1px;
    height: 16px;
    background: #707070;
    position: absolute;
    top: 2px;
    right: 0;
    margin: 0px -3px 0px 0px;
    content: "";
}

.product{
  position: relative;
  float: left;
  width: 100%;
  background-color: #fff;
}
.product_div{
  position: relative;
  float: left;
  width: 18vw;
  top: 2vw;
  margin: 10px;
}
.product div{
  text-align: center;
}
.product_div img{
  position: relative;
  height: 210px;
}
.product h2{
  font-size: 22px;
  text-align: center;
}
.product p{
  font-size: 15px;
}
.product button{
  position: relative;
  border: 1px solid #000;
  margin-top: 1vh;
  padding: 3px 20px;
  background: #FFF;
}

.footer {
  text-align: center;
  border-top: 1px solid #aaa;
  margin-top:5vh;
}

</style>
