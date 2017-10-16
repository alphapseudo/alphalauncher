<template lang="pug">
  #app
    h2 AlphaLauncher
    router-view
</template>

<script>
  export default {
    name: 'AlphaLauncher',
  };
</script>

<style>
  body {
    -webkit-app-region: drag;
  }
</style>
