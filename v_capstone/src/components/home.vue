<template>
  <div id="Home">
    <!-- 상단 메뉴 -->
    <header>
      <Menu />
    </header>




    <!-- 오른쪽 내용 -->
    <section class="section">

      <div class="content">
        <h3>후지제록스 관악대리점</h3>

        <h1>크린솔루션</h1><br>

        <div class="content_icon">
          <img :src="require(`../assets/urban.png`)" alt="상품 이미지" /> <br>
          <label>후지제록스 <br> 정식 대리점</label>
        </div>
        <div class="content_icon">
          <img :src="require(`../assets/gear.png`)" alt="상품 이미지" /><br>
          <label>신속하고 정확한 <br> 서비스</label>
        </div>
        <div class="content_icon">
          <img :src="require(`../assets/remote-access.png`)" alt="상품 이미지" /><br>
          <label>원격 <br>소모품 확인</label>
        </div>
        <div class="content_curation">
          
          <p>
            사용자의 비지니스 확대는 새로운 ApeosPort 시리즈의 강력한 성능을 발휘하게 합니다.
            전반적으로 생산성 향상이 필요한 환경에 대해 클라우드 서비스와 연동시킨 기기들의 통합,
            스마트폰과의 원활한 연결과 같이
          </p>
          <a href="http://localhost:8080/Curation" title="Start Curation" class="btn_Start_Curation"> Start Curation</a>
        </div>
      </div>
      <div class="gradation">
        <div class="products">
          <form :submit="curation_result_img" class="products_form">
            <carousel class="carousel" :perPage="1" :autoplay="true" :loop="loop" :paginationEnabled="true"
            paginationPosition="bottom"
              :autoplayTimeout="5000" paginationActiveColor="rgb(248, 70, 70)" paginationColor="#555555"
              :paginationPadding="2" :paginationSize="5">
              <slide v-for="result of this.result_img" :key="result.value" class="slide">
                <img class="products_img" :src="require(`../assets/best_new_products/${result.name}.png`)" alt="상품 이미지" /><br>
                <div class="products_content">
                  <!-- :navigationEnabled="true" navigationNextLabel="<i class='btn_next'> </i>" avigationPrevLabel="<i class='btn_before'> </i>" -->

                  <h2>{{result.color == "color" ?  "칼라복합기" : "흑백복합기"}}</h2>
                  <h1>{{result.name}}</h1>
                  <hr>

                  <h3 class="products_content_h3">콤팩트한 크기와 강력한 기능을 갖춘 컬러 복합기!</h3>
                  <!-- <p class="products_content_boast">


                    사용자의 비지니스 확대는 새로운 ApeosPort <br>시리즈의 강력한 성능을 발휘하게 합니다.<br>
                    전반적으로 생산성 향상이 필요한 환경에 대해 <br>클라우드 서비스와 연동시킨 기기들의 통합,<br>
                    스마트폰과의 원활한 연결과 같이<br>최적의 수준으러 확장이 가능해집니다.<br><br><br>
                  </p> -->
                  <div class="products_content_Performance">
                    <div class="products_content_border">
                      <h3><strong>분당 프린트 속도</strong></h3>
                      <h4>&nbsp;{{result.print_speed}}매 / {{result.print_speed_level}} 급</h4>
                    </div>

                    <div class="products_content_border">
                      <h3> <strong>분당 스캔 속도</strong> </h3>
                      <h4>&nbsp;{{result.scan_speed}}매</h4>
                    </div>

                    <div class="products_content_border">
                      <h3><strong>출력 해상도</strong></h3>
                      <h4>&nbsp;{{result.dpi}}</h4>
                    </div>

                    <div>
                      <h3><strong>팩스</strong></h3>
                      <h4>&nbsp;Super G3 Fax</h4>
                    </div>
                  </div>
                  <!-- <p class="products_content_pay"><br><br><br><br>
                    렌탈 - 월 15만원 흑백/칼라 3000/300<br>
                    구매 - ₩ {{result.sale}}
                  </p> -->

                  <button class="btn_estimate" @click="click_btn_estimate">
                    <img :src="require('../assets/estimate.png')" alt="문의하기 아이콘"> 문의하기
                  </button>
                  <button class="btn_estimate" :value="result.name" @click="click_product_name">
                    <img :src="require('../assets/plus.png')" alt="문의하기 아이콘"> 상품상세
                  </button>
                </div>
              </slide>
            </carousel>
          </form>
        </div>

      </div>
      </section>

    <div class="Estimate_div" v-show="estimate">
      <button class="cancel" @click="btn_close">
        <img :src="require(`../assets/close.png`)" alt="상품 이미지" /><br>
      </button>
      <Estimate class="Estimate" :home="home" />
    </div>


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
        <div class="information_icon">
          <img :src="require('../assets/kakao-talk.png')" alt="카카오 아이콘">
          <img :src="require('../assets/instagram.png')" alt="인스타 아이콘">
          <img :src="require('../assets/facebook.png')" alt="인스타 아이콘">
        </div>
      </div>
      
    </footer>


  </div>
</template>

<script>
  import axios from "axios"
  import Menu from './Menu'
  import Estimate from './Estimate'
  import {
    Carousel,
    Slide
  } from 'vue-carousel';

  export default {
    name: 'Home',
    components: {
      Carousel,
      Slide,
      Menu,
      Estimate
    },
    data: function () {
      return {
        result_img: null,
        loop: true,
        estimate: false,
        home: "home"
      }
    },
    created() {
      this.curation_result_img();
    },
    methods: {
      curation_result_img() {
        axios.get('http://localhost:8081/best_new_products/img/', {
            timeout: 2000
          })
          .then((res) => {
            this.result_img = res.data;
            this.result_name = res.data.name;
            this.color = res.data.color;
            console.log(this.result_name)
          })
          .catch((err) => {
            console.log(err);
          })
      },
      click_btn_estimate(e) {
        this.estimate = true;
        e.preventDefault()
      },
      btn_close() {
        this.estimate = false;
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

<style scoped src="./Home.css">

</style>