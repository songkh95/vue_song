<template>
  <div class="disqus" >
    <section class="disqus_section">
      <div id="disqus_thread"></div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Notice',
  data: function () {
    return {
    }
  },
  methods: {
  },
  mounted(){
    (function () {
      var d = document
      var s = d.createElement('script')
      s.src = 'https://noticetest.disqus.com/embed.js'
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s)
    })()
  }
}
</script>

<style scoped>
  .disqus_section{
    display: flex;
    justify-content: center;
  }
  #disqus_thread {
    width: 74%;
  }
</style>