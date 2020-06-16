<template>
  <div id="Products">
    <!-- 메뉴 -->
    <header>
      <Menu />
    </header>

    <section class="section_top">
      <div>
        <img :src="require('../assets/product_img/' + $store.state.product_content.name + '.png')" alt="PPL 이미지" />
      </div>
      <div class="Products_content">
        <h2>{{$store.state.product_content.color == "color" ?  "칼라복합기" : "흑백복합기"}}</h2>
        <h1>{{$store.state.product_content.name}}</h1>
        <hr>

        <h3 class="Products_content_subheading">{{$store.state.product_content.subheading}}</h3>
        <p>
          {{$store.state.product_content.content}}
        </p>
          <div class="products_content_Performance">
            <div class="products_content_border">
              <h3><strong>분당 프린트 속도</strong></h3>
              <h4>{{$store.state.product_content.print_speed}}매 / {{$store.state.product_content.print_speed_level}} 급
              </h4>
            </div>
            <div class="products_content_border">
              <h3> <strong>분당 스캔 속도</strong> </h3>
              <h4>{{$store.state.product_content.scan_speed}}매</h4>
            </div>
            <div class="products_content_border">
              <h3><strong>출력 해상도</strong></h3>
              <h4>{{$store.state.product_content.dpi}}</h4>
            </div>
            <div>
              <h3><strong>팩스</strong></h3>
              <h4>{{$store.state.product_content.fax_kit}}</h4>
            </div>
          </div><br>
          <div class="products_content_support">
            {{$store.state.product_content.support}}<br>
          
            배송안내 : 무료배송 <br>

            금액: {{$store.state.product_content.sale}} <br>
          </div>
          
          <button class="btn_estimate"> 견적 문의 </button>
      </div>
    </section>
    <!-- 참고 -->
    <section class="section_mid">
      asd<br><br><br><br><br>
    </section>
    <!-- 제품 상세설명 -->
    <section class="section_bottom">
      <img :src="require('../assets/product_detail/' + $store.state.product_content.name +'.jpg')" alt="상품 상세내용 이미지" />
    </section>
    <!-- 밑 -->
    <footer>

      <br><br><br><br><br>
    </footer>
  </div>
</template>

<script scoped>
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

<style scoped>
header{
   position: relative;
   top:0;
}
.section_top{
  position: relative;
  left:21vw;
  height: 30vh;
  margin-top: 10vh;
  margin-bottom: 50vh;
}

.section_top img{
    position: relative;
    float: left;
    width: 18vw;
}

.Products_content{
    position: relative;
    float: left;
    left: 5vw;
    top: 5vh;
    width: 42%;
}
.Products_content h1{
  margin-bottom: -20px;
  font-size: 60px;
  font-weight: 300;
}
.Products_content h2{
  font-size: 2.5vh;
  color: #424242;
  font-weight: 300;
}

.Products_content hr{
  width: 66%;
  margin-top: 2.5vh;
}
.Products_content_subheading{
  position: relative;
  margin-top: 2vh;
}
.Products_content h3{
 position: relative;
 
}

.Products_content p{
  position: relative;
  margin-top: 2vh;
  width: 500px;
}

.products_content_border{
  border-right: 1px solid #9c9c9c;
  margin-right: 10px;
  margin-bottom: 10px;
}
.products_content_Performance strong{
  color: rgb(29, 51, 93);
}
.products_content_Performance h4{
  color: rgb(0, 0, 0);
}

.products_content_Performance{
  position: relative;
  top: 5vh;
  height: 13vh;
}
.products_content_Performance h3{
  margin-bottom: 10px;
}

.products_content_Performance div{
  position: relative;
  float: left;
  text-align: center;
  padding-right: 10px;
}
.products_content_border{
  position: relative;
  border-right: 1px solid #9c9c9c;
  margin-right: 10px;
  margin-bottom: 10px;
}
.products_content_support{
  line-height: 30px;
  position: relative;
  float: left;
  width: 100%;
}
.btn_estimate{
  position: relative;
  float: left;
  top: 5vh;
  border: none;
  background: rgb(29, 51, 93);
  /* padding-bottom: 2px;
  padding-left: 3px; */
  width:15vw;
  height: 6vh;
  font-size: 15px;
  color: #fff;
  font-weight: 100;
  border-radius: 0px;
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
.section_mid{
    position: relative;
    float: left;
    width: 100%;
    background: #145463;
}
footer{
    position: relative;
    float: left;
    width: 100%;
    bottom: 0;
    background: #dfc800;
}
</style>