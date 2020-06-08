<template>
  <div id="Home">
    <!-- 상단 메뉴 -->
    <header>
      <Menu />
    </header>



    <!-- 왼쪽 내용 -->
    <section class="section_left">
      <div class="content">
        <h1>크린솔루션</h1>

        <p>
          orem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          <br>#제록스대리점 #정품 #복합기 #프린터 #소모품 #임대 #판매   
        </p>

        <a href="http://localhost:8080/Curation" title="Start Curation" class="btn_Start_Curation">Start Curation</a>
        <a href="#" class="btn_All_Products"> ▶ All products</a>

      </div>
    </section>

    <!-- <div>
        <span class="Clean_Solution">Clean<br> Solution</span>
      </div> -->

    <!-- 오른쪽 내용 -->
    <section class="section_right">
      <div class="products">
        <form :submit="curation_result_img" class="products_form">
          <carousel class="carousel" 
          :perPage="2" 
          :autoplay="true" 
          :navigationEnabled="true" 
          navigationNextLabel="▶" 
          navigationPrevLabel="◀" 
          :loop="loop" 
          paginationActiveColor="rgb(248, 70, 70)"
          paginationColor="#555555"
          :paginationPadding="2"
          :paginationSize="10"
          :autoplayTimeout="4000"
          >
            <slide v-for="result of this.result_img" :key="result.value" class="slide">
              <img class="products_img" :src="require(`../assets/${result.name}.png`)" alt="상품 이미지" /><br>
              <div class="products_content">
                <h2>{{result.name}}</h2>
                <h3>{{result.color == "color" ?  "칼라복합기" : "흑백복합기"}}</h3>
                <p>
                  분당 프린트 속도: {{result.print_speed}}매 / {{result.print_speed_level}} 등급<br>
                  분당 스캔 속도: {{result.scan_speed }}매<br>
                  임대: 협의 가능 <br>
                  판매가: {{result.sale}} <br>
                </p>
                <button class="btn_estimate">문의하기</button>
              </div>
            </slide>
          </carousel>
        </form>
      </div>
      
    </section>

    <!-- 하단 정보 -->
    <footer>
      
      <div class="information">
        <div class="information_left">
          <h3>크린솔루션</h3>
          <p>
            한국후지제록스주식회사 | 대표: 송윤식 | 사업자등록번호: 119-13-45830 | 2006년 - 2020년 <br>
            150-909 서울특별시 영등포구 시흥대로 173길 13 (대림동, 신대림자이상가 101동 107-5호) <br>
          </p>
        </div>
        <div class="information_right">
          <h3>문의 및 제휴</h3>
          <p>
            월 ~ 금 | 09시 ~ 18시 | 전화 및 채팅 상담 문의해주세요. <br>
            TEL: 02) 877 - 4300 | FAX: 02) 877 - 4319 | Mobile: 010 - 5223 - 7540 | E-mail: krc017501@fxk.co.kr <br>
          </p>
        </div>
      </div>

    </footer>


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
  name: 'Home',
  components: {
    Carousel,
    Slide,
    Menu
  },
  data: function() {
    return {
      result_img: null,
      loop: true
    }
  },
  created(){
    this.curation_result_img();
  },
  methods: {
    curation_result_img() {
        axios.get('http://localhost:8081/c_products/img/', {
         timeout: 2000
        })
          .then((res) => {
              this.color_products = res.data;
              this.result_img = res.data; 
              this.result_name = res.data.name;
              this.color =  res.data.color;
              console.log(this.result_img)
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
body{
  font-family: sans-serif;
  background: #ffffff;
  height: 100%;
    
}

header{
  top: 0;
  background: #ffffff;
}

.section_left{
  float: left;
  height: 100%;
  width: 50%;
  background: #ffffff;
}

.section_right{
  float: left;
  height: 100%;
  width: 50%;
  z-index: -1;
  background: #ffffff;
}

footer{
  bottom: 10px;
  height: 10%;
  width: 100%;
  position: fixed;
  background: #ffffff;
}


/* .Clean_Solution {
  position: absolute;
  bottom: 100px;
  left: 3vw;
  font-size: 16vw;
  z-index: -2;
  font-weight: 400;
	font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
	font-size: 15rem;
	letter-spacing: 10px;
	text-align: left;
	color: #ffffff;
  opacity: 0.15;
  line-height: 230px;
	background-image: -webkit-linear-gradient(92deg, #000dff, #ffffff);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-animation: hue 10s infinite linear;
}

@-webkit-keyframes hue {
  from {
    -webkit-filter: hue-rotate(0deg);
  }
  to {
    -webkit-filter: hue-rotate(-360deg);
  }
} */

.content{
  position: relative;
  
  left: 8vw;
  margin-top: 20%;
  text-align: left;
}


.content h1{
  font-size: 60px;
  color:rgb(0, 0, 0);
  margin: 0;
}
.content p{
  width: 37vw;
  margin-top: 25px;
  color: rgb(105, 105, 105);
  font-size: 15px;
}

.content .btn_Start_Curation{
  top: 2vh;
  font-size: 20px;
  font-family: Arial;
  text-decoration: none;
  text-transform: uppercase;
  transform-style: preserve-3d;
  position: relative;
  transition: .5s;
}
.content .btn_All_Products{
  top: 24px;
  left: 110px;
  font-size: 16px;
  font-family: Arial;
  text-decoration: none;
  text-transform: uppercase;
  transform-style: preserve-3d;
  position: relative;
  transition: .5s;
    font-weight: bold;
  color: rgb(248, 70, 70);
;
}

.content .btn_All_Products:hover{
  color: rgb(0, 0, 0);
}

.content .btn_Start_Curation:before{
  width: 150px;
  height: 15px;
  font-size: 17px;
  content: attr(title);
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px 40px;
  background: #fff;
  color: #000;
  border: 1px solid rgb(0, 0, 0);
  transition: .5s;
  transform-origin: right;
  font-weight: bold;
  transform: translateX(-100%) rotateY(90deg);
}

.content .btn_Start_Curation::after{
  width: 150px;
  height: 15px;
  font-size: 17px;
  content: attr(title);
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px 40px;
  background: #000;
  color: #fff;
  border: 1px solid rgb(0, 0, 0);
  transition: .5s;
  transform-origin: left;
  transform: translateX(0) rotateY(0deg);
}

.content .btn_Start_Curation:hover:before{
  transform: translateX(0) rotateY(0deg);
}

.content .btn_Start_Curation:hover:after{
  transform: translateX(100%) rotateY(90deg);
}

.products{
  position: relative;
  right: 0;
  width: 53%;
  
  /* background: #010c27; */
  /* clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%); */
}

.products_content h1{
  margin: 0;
}
.VueCarousel-pagination{
  width: 30px;
}
.carousel{
  width: 36vw;
  height: 50%;
  top: 7vh;
  left: 4vw;
  padding-top: 3vh;
  border-radius: 20px;
  background: #f3f3f3;
  box-shadow:  48px 48px 96px #d0d0d0, 
              -48px -48px 96px #ffffff;
             
}
.products_img{
  width: 45%;
  left: 5vw;
  position: relative;
}
.products_content{
  width: 70%;
  height: 30%;
  color: rgb(0, 0, 0);
  text-align: left;
  font-size: 0.3em;
  margin-top: 5vh;
  margin-left: 3vw;
}

.products_content h2{
  font-size: 5em;
}

.products_content h3{
  font-size: 3.5em;
  color: #424242;
}

.products_content p{
  margin-top: 10px;
  font-size: 2.5em;
}

.products_content .btn_estimate{
  margin-top: 10px;
  
}
.carousel .VueCarousel-pagination{
  height: 5vh;
  width: 100%;
}
/* .carousel .VueCarousel-dot-container{
} */

.information{
  position: relative;
  left: 8vw;
  bottom: -2vh;
  text-align: left;
  font-size: 12px;
}

.information h3{
  color:rgb(0, 0, 0);
  font-weight: bold;
}

.information_left{
  float: left;
  color:rgb(97, 97, 97);
}

.information_right{
  float: left;
  color:rgb(97, 97, 97);
  margin-left: 20px;
}
</style>

