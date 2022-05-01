<template>
  <div class="box">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    msg: String,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";

.box {
  @include box;
  padding: 2vh;
  text-align: center;

  h1{
    font-size: 4vh
  }
}
</style>