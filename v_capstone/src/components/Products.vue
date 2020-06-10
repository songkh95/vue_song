<template>
  <div id="Products">
    <!-- 메뉴 -->
      <header>
          <Menu />
      </header>
      <section class="section_top">
        <!-- 상품 이미지 -->
          <div class="products_img">
              <img :src="require(`../assets/DC V 2265.png`)" alt="상품 이미지" />
          </div>
          <!-- 상품 내용 -->
          <div class="Products_content">
              
              
              <p>
                사용자의 비지니스 확대는 새로운 ApeosPort 시리즈의 강력한 성능을 발휘하게 합니다.
                전반적으로 생산성 향상이 필요한 환경에 대해 클라우드 서비스와 연동시킨 기기들의 통합,
                스마트폰과의 원활한 연결과 같이 최적의 수준으로 확장이 가능해집니다. <br><br>

                분당 프린트 속도: 매 / 등급<br>
                분당 스캔 속도: 매 <br>
                프린트 해상도:  <br><br>

                무선랜 지원 | 모바일 지원 | 클라우드 인터랙티브 <br>
                배송안내 : 무료배송 <br><br>

                구입: <br><br>
                
                <button> 견적 문의 </button>
              </p>
          </div>
      </section>
      <!-- 참고 -->
      <section class="section_mid">
          asd<br><br><br><br><br>
      </section>
      <!-- 제품 상세설명 -->
      <section class="section_bottom">
          asd<br><br><br><br><br>
      </section>
      <!-- 밑 -->
      <footer>
            {{this.$store.state.product_content}}<br><br><br><br><br>
            
      </footer>
  </div>
</template>

<script>
import Menu from './Menu'
import axios from "axios"
import { mapMutations } from 'vuex'
export default {
  name: 'Products',
   components: {
    Menu
  },
  data: function() {
    return {

    }
  },
  methods: {
    ...mapMutations(['product_intro']),
  },
  created(){

  }
}
</script>

<style>
header{
    background: #00d4d4;
}
.section_top{
    background: #2000ad;
}
.products_img{
    position: relative;
    float: left;
    width: 50%;
    background: #ebffbd;
}

.products_img img{
    position: relative;

    width: 50%;
    background: #fcffcd;
}

.Products_content{
    position: relative;
    float: left;
    width: 50%;
    background: #ebffb6;
}
.section_mid{
    position: relative;
    float: left;
    width: 100%;
    background: #145463;
}
.section_bottom{
    position: relative;
    float: left;
    width: 100%;
    background: #6fcf00;
}
footer{
    position: relative;
    float: left;
    width: 100%;
    bottom: 0;
    background: #dfc800;
}
</style>