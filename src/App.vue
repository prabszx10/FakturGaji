<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Overpass:wght@200;400;600&display=swap');

h1 {
  font-family: "Overpass", sans-serif;
  font-weight: 600;
  margin: 0;
  padding: 1vh 0;
}
html,
body {
  font-family: "Overpass", sans-serif;
  background-color:#f2f5f7;
  margin: 0;
  padding: 0;
}
</style>
