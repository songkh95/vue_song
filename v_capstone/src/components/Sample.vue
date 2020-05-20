<template>
  <div id='sample'>
    <h1>{{title}} {{Q_number}}</h1>
    this is sample {{text}}
  </div>
</template>

<script>
export default {
  name: 'Sample',
  props: {
    title: String,
    Q_number: Number
  },
  data: function() {
    return {
      text: 'hello'
    }
  }
}
</script>

<style>

</style>