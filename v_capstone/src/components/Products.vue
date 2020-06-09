<template>
  <div id="products">
    
    <!-- header -->
    <div class="header">
      <Menu />
    </div>

    
    <div class="container">
      <!-- nav -->
      <div class="nav">
        <ul class="nav-list">
          <li class="nav-item"><a href="1.html" class="nav-link">흑백복합기</a></li>
          <li class="nav-item"><a href="" class="nav-link">컬러복합기</a></li>
          <li class="nav-item"><a href="" class="nav-link">프린터</a></li>
        </ul>
      </div>

      <!-- content -->
      <div class="content">
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
          :paginationSize="10" 
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




        <div class="menus">
          <div class="menu-list">
            <div class="menu-item"> <input type="submit"  @click="click_black_products" value="흑백복합기" v-model="black_products"> </div>
            <div class="menu-item"> <input type="submit"  @click="click_color_products" value="컬러복합기" v-model="color_products"></div>
            <div class="menu-item"> <input type="submit"   value="프린터" v-model="print_products"></div>
          </div>
        </div>
        <div class="product">
          <div class="product_div" v-show="show_black_products" v-for="product of this.products" :key="product.value">
            <a href="#">
              <img :src="require(`../assets/${product.name}.png`)" alt="PPL 이미지" />
              <h2>{{product.name}}</h2>
              <h3>{{product.color == "color" ?  "칼라복합기" : "흑백복합기"}}</h3>
              <p>
                분당 프린트 속도: {{product.print_speed}}매 / {{product.print_speed_level}} 등급<br>
                분당 스캔 속도: {{product.scan_speed }}매
              </p>
            </a>
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
  name: 'Products',
    components: {
    Carousel,
    Slide,
    Menu
  },
  data: function() {
    return {
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
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body {
  font:14px/1.8 Arial, Helvetica, sans-serif;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}



.header {
  top: 0;
  background: #eee;
  position: relative;

}

.container {
  position: relative;
  overflow: hidden;

}

.nav{
    position: relative;
  float: left;
  width: 10%;
  height: 100vh;
  background: #333;
  color: #fff;
  overflow: none;
}

.nav-list {
  display: block;
  position: relative;
  list-style: none;
  top: 5vh;
}

.nav-item {
  position: relative;
  margin-top: 20px;
}

.nav-link {
  position: relative;
  display: block;
  text-decoration: none;
  padding: 4px 0px;
  color: #fff;
}

.nav-link:hover {
  position: relative;
  background: #5457de;
}

.content {
  position: relative;
  float: left;
  width: 90%;
  background: #00da45;
}

.ppl{
  position: relative;
  width: 100%;
  background-color: #875894;
}
.slide{
  width: 80%;
  position: relative;
  left:10vw;
}
.slide img{
  margin: 0vh 0vw 0vw 35%;
  width: 20vw;
  height: 25vh;
}

.VueCarousel-dot-container{
  position: relative;
  top:-50px;
  z-index: 2;
}
.VueCarousel-pagination{
  height: 0;
}
.btn_next{
  content:url("../assets/right-arrow.png" );
  width: 2vw;
}
.btn_before{
  content:url("../assets/back.png" );
  width: 2vw;
}

.menus{
  position: relative;
  padding: 0px;
  width: 100vw;
  background-color: #d8dc00;
}

.menu-list {
  position: relative;
  padding: 0px;
  width: 100%;
  
}

.menu-item{
  position: relative;
  float: left;
  width: 100px;
  background-color: #547897;
}

.product{
  position: relative;
  
  width: 100%;
  background-color: red;
}
.product_div{
  position: relative;
  float: left;
  width: 20vw;
  margin: 20px;
}
.product_div img{
  width: 10vw;
}

.footer {
  position: relative;
  text-align: center;
  border-top: 1px solid #aaa;
  font-size: 12px;
  bottom: 0;
  left:0;
  right:0;
  background: #aeacac;
}

</style>
