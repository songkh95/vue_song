<template>
  <div id="menu">
  <div class="menu">
        <img :src="require(`../assets/xerox_logo.png`)" alt="xerox_logo">
        <ul>
          <li><a href="http://localhost:8080">홈</a></li>
          <li><a href="http://localhost:8080/Curation">큐레이션</a></li>
          <li><a href="#">모든 제품</a></li>
          <li><a href="http://localhost:8080/Notice">공지사항</a></li>
        </ul>
      </div>

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

<style>
.menu img{
  width: 10vw;
  display: inline-block;
  margin: 1vh 0 0 8vw;
}

.menu ul{
  display: block;
  float: right;
  margin-top:2vh;
  margin-right: 10vw;
}

ul li{
  list-style: none;
  float: left;
}

ul li a{
  position: relative;
  display: inline-block;
  margin-left: 25px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000000;
  font-weight: bold;
  transition: .5s;
  font-size: 16px;
}
ul li a:hover{
  color: rgb(255, 255, 255);
}

ul li a:before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top: 1px solid rgb(0, 0, 0);
  border-bottom: 1px solid rgb(0, 0, 0);
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
  background: rgb(0, 0, 0);
  transform: scale(0);
  transition: .5s;
  z-index: -1;
}

ul li a:hover:after{
  transform: scale(1);
}
</style>
