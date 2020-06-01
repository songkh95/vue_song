<template>
  <div id="Home">
    <!-- 상단 메뉴 -->
    <div class="menu">
      <img :src="require(`../assets/xerox_logo.png`)" alt="xerox_logo">
      <ul>
        <li><a href="#">홈</a></li>
        <li><a href="http://localhost:8080/Curation">큐레이션</a></li>
        <li><a href="#">모든 제품</a></li>
        <li><a href="#">공지사항</a></li>
      </ul>
    </div>


    <!-- 왼쪽 내용 -->
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
      </p>

      <a href="http://localhost:8080/Curation" title="Start Curation" class="btn_Start_Curation">Start Curation</a>
      <a href="#" class="btn_All_Products"> ▶ All products</a>
    </div>

    <!-- 오른쪽 내용 -->
    <div class="products">
      <form v-on:submit.prevent="curation_result_img">
        <carousel v-show="btn_slide" class="carousel" :perPage="1" :autoplay="true" :navigationEnabled="true"
          :navigationNextLabel="next" :navigationPrevLabel="before" indicators="hover">
          <slide v-for="result of this.result_img" :key="result.value" class="slide">
            <img class="products_img" :src="require(`../assets/${result.name}.png`)" alt="상품 이미지" /><br>
            <div class="products_content">
              상품명: {{result.name}} <br>
              기기 종류: {{result.color}} <br>
              분당 프린트 속도: {{result.print_speed}} <br>
              분당 스캔 속도: {{result.scan_speed}}<br>
            </div>
          </slide>


        </carousel>
      </form>
    </div>
    <!-- 하단 정보 -->
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


  </div>
</template>

<script>
import axios from "axios"
import {
  Carousel,
  Slide
} from 'vue-carousel';

export default {
  name: 'Home',
  components: {
    Carousel,
    Slide
  },
  data: function() {
    return {
      result_img: null,
      btn_slide: true,
      next: "▶",
      before: "◀"
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
body{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: #242424;
}
.menu img{
  width: 10vw;
  left: 20vw;
  float: left;
  margin: 1vh 0 0 8vw;
}

.menu ul{
  position: relative;
  float: left;
  left: 38vw;
  margin: 0;
  padding: 0;
  display: flex;
}

ul li{
  list-style: none;
}

ul li a{
  position: relative;
  display: block;
  padding: 10px 20px;
  margin: 20px 10px;
  text-decoration: none;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: bold;
  transition: .5s;
  font-size: 20px;
}
ul li a:hover{
  color: rgb(0, 0, 0);
}

ul li a:before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top: 1px solid rgb(255, 255, 255);
  border-bottom: 1px solid rgb(255, 255, 255);
  transform: scaleY(2);
  opacity: 0;
  transition: .5s;
  z-index: -1;
}

ul li a:hover:before{
  transform: scaleY(1.1);
  opacity: 1;
}

ul li a:after{
  content: "";
  position: absolute;
  top: 1px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  transform: scale(0);
  transition: .5s;
  z-index: -1;
}

ul li a:hover:after{
  transform: scale(1);
}
.content{
  position: absolute;
  left: 8vw;
  top: 25vh;
  text-align: left;
}

.content:before{
  content: "Clean";
  position: absolute;
  top: 11vh;
  left: -10vw;
  font-size: 16vw;
  z-index: -2;
  font-weight: 550;
  color: rgb(255, 255, 255);
  opacity: 0.03;
  letter-spacing:30px;
}
.content:after{
  content: "Solution";
  position: absolute;
  top: 36vh;
  left: -10vw;
  font-size: 18vw;
  z-index: -2;
  font-weight: 700;
  color: rgb(255, 255, 255);
  opacity: 0.03;
  letter-spacing:25px;
}

.content h1{
  font-size: 65px;
  color:rgb(255, 255, 255);
}
.content p{
  width: 30vw;
  margin-top: 10px;
  color: rgb(179, 179, 179);
  font-size: 16px;
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
  top: 33px;
  left: 110px;
  font-size: 16px;
  font-family: Arial;
  text-decoration: none;
  text-transform: uppercase;
  transform-style: preserve-3d;
  position: relative;
  transition: .5s;
  color: rgb(243, 103, 103);
;
}

.content .btn_All_Products:hover{
  color: rgb(255, 255, 255);
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
  border: 3px solid rgb(255, 255, 255);
  transition: .5s;
  transform-origin: right;
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
  border: 3px solid rgb(255, 255, 255);
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
  position: absolute;
  right: 0;
  width: 53%;
  height: 100%;
  z-index: -2;
  /* background: #010c27; */
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 5% 100%);
}

.carousel{
  width: 18vw;
  height: 60vh;
  position: relative;
  top: 17vh;
  left: 15vw;
  padding-top: 40px;
  border-radius: 50px;
  background: linear-gradient(145deg, #272727, #202020);
  box-shadow:  20px 20px 20px #1f1f1f, 
              -20px -20px 20px #292929;
}
/* .slide{
  
} */
.products_img{
  width: 10vw;
  left: 4vw;
  position: relative;
}
.products_content{
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 14px;
  margin-top: 2vh;
}
.information{
  position: absolute;
  left: 8vw;
  bottom: 3vh;
  text-align: left;
  font-size: 12px;
}

.information h3{
  color:rgb(255, 255, 255);
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

