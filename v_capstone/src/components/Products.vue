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
                <h1>{{$store.state.product_content.name}}</h1>
              
              <p>
                사용자의 비지니스 확대는 새로운 ApeosPort 시리즈의 강력한 성능을 발휘하게 합니다.<br>
                전반적으로 생산성 향상이 필요한 환경에 대해 클라우드 서비스와 연동시킨 기기들의 통합,<br>
                스마트폰과의 원활한 연결과 같이 최적의 수준으로 확장이 가능해집니다. <br><br>

                분당 프린트 속도: {{$store.state.product_content.print_speed}}매 / {{$store.state.product_content.print_speed_level}}등급<br>
                분당 스캔 속도: {{$store.state.product_content.scan_speed}}매 <br>
                프린트 해상도:  {{$store.state.product_content.dpi}}<br><br>

                무선랜 지원 | 모바일 지원 | 클라우드 인터랙티브 <br>
                배송안내 : 무료배송 <br><br>

                구입 금액: {{$store.state.product_content.sale}} <br><br>
                
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
        <img :src="require(`../assets/${$store.state.product_content.name}_detail.jpg`)" alt="상품 이미지" />
      </section>
      <!-- 밑 -->
      <footer>
           
            <br><br><br><br><br>
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
        product_content: ""
    }
  },
  methods: {
    ...mapMutations(['product_intro'])

    //   this.product_content = this.$store.state.product_content
    //   console.log('asd = ', this.$store.state.product_content)

    
  },
  mounted () {
      this.product_content = this.$store.state.product_content;
    //   console.log('asd = ', this.$store.state.product_content)
  },
  created(){

  }
}
</script>

<style>
header{
    background: #ffffff;
}
.section_top{
    background: #ffffff;
}
.products_img{
    position: relative;
    float: left;
    width: 50%;
    background: #ffffff;
}

.products_img img{
    position: relative;
    margin-left: 40%;
    width: 30%;
    background: #ffffff;
}

.Products_content{
    position: relative;
    float: left;
    width: 50%;
    background: #ffffff;
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
    background: #ffffff;
}
.section_bottom img{
    margin-left: 20%;
    width: 50%;
}
footer{
    position: relative;
    float: left;
    width: 100%;
    bottom: 0;
    background: #dfc800;
}
</style>