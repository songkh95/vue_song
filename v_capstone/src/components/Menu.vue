<template>
  <div id="menu">
  <div class="menu">
        <a href="http://localhost:8080"><img :src="require(`../assets/xerox_logo.png`)"  alt="xerox_logo"></a>

        <ul>
          <li><a href="http://localhost:8080">홈</a></li>
          <li><a href="http://localhost:8080/Curation">큐레이션</a></li>
          <li><a href="http://localhost:8080/All_products">제품</a></li>
          <li><a href="http://localhost:8080/Notice">고객지원</a></li>
        </ul>
      </div>
  <hr>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data: function() {
    return {
    }
  },

  
}
</script>

<style scoped>
hr{
  position: relative;
  top: 2vh;
  width: 83%;
  border: 1px solid #ababab;
  border-bottom: 0;
  border-right: 0;
  border-left: 0;
}
.menu img{
  width: 8vw;
  position: relative;
  float: left;
  left: 8.5vw;
  margin-top: 0.7vh;
}

.menu ul{
  display: block;
  float: right;
  margin-top:2vh;
  margin-right: 9vw;
}
ul li{
  list-style: none;
  float: left;
}
ul li a{
  position: relative;
  display: inline-block;
  margin-left: 60px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000000;
  font-weight: bold;
  transition: .5s;
  font-size: 16px;
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
  /* border-top: 1px solid rgb(0, 0, 0); */
  border-bottom: 1px solid rgb(0, 0, 0);
  transform: scaleY(2);
  opacity: 0;
  transition: .5s;
  z-index: 1;
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
  /* background: #000; */
  transform: scale(0);
  transition: .5s;
  z-index: -1;
}
ul li a:hover:after{
  transform: scale(1);
}
</style>
