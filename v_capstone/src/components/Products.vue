<template>
  <div id="Products">
    <!-- 메뉴 -->
    <header>
      <Menu />
    </header>

    <section class="section_top">

      <Estimate class="Estimate" v-show="estimate" :estimate="estimate"  @eee="estimate= !estimate"/>

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
          
          <button class="btn_estimate" @click="click_btn_estimate">
            <img :src="require('../assets/estimate.png')" alt="문의하기 아이콘"> 문의하기
          </button>

          
      </div>
    </section>
    <!-- 참고 -->
    <section class="section_mid">
      <OtherProducts class="OtherProducts" v-show="curation_products_result" :Q_number="Q_number" :answer="$store.state.product_content.color" />
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
  import Estimate from './Estimate'
  import OtherProducts from './OtherProducts'
export default {
  name: 'Products',
   components: {
    Menu,
    Estimate,
    OtherProducts
  },
  props:{
      cencle_check: false
  },
  data: function() {
    return {
        product_content: "",
        estimate: false,
        curation_products_result: false,
        Q_number: 8
    }
  },
  methods: {
    ...mapMutations(['product_intro']),

    //   this.product_content = this.$store.state.product_content
    //   console.log('asd = ', this.$store.state.product_content)

      click_btn_estimate(e) {
        e.preventDefault()
        this.estimate = true;
      },
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
.Estimate{
  position: absolute;
  height: 45vh;
  width: 36vw;
  padding: 2vw;
  border: 1px solid;
  top: 20%;
  left: 5%;
  background: #ffffff;
  z-index: 1;
}
.section_top{
  position: relative;
  left:23vw;
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
    left: 6vw;
    top: 0vh;
    width: 42%;
    padding-left: 6vw;
    border-left: 0.5px solid #cccccc;
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
  margin-top: 3.5vh;
    border: 1px solid #ababab;
  border-bottom: 0;
  border-right: 0;
  border-left: 0;
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
  z-index: 1;
}

.btn_estimate img{
  position: relative;
  top: 4px;
  left: 4vw;
  width: 2.5vh;
  
}
.OtherProducts{
  position: relative;
  top: 0vh;
  bottom: 0;
  height: 20vh;
  z-index: 1;
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
}
</style>