<template lang="pug">
  #app
    section#configuration.section
      .columns
        .column.is-one-third.navigation
          h1.title AlphaLauncher
          aside.menu
            .menu-label Configuration
              ul.menu-list
                li
                  router-link(to="/general") General
                li
                  router-link(to="/difficulty") Difficulty
                li
                  router-link(to="/missions") Missions
                li
                  router-link(to="/mods") Mods
                li
                  router-link(to="/logging") Logging
                li
                  router-link(to="/scripting") Scripting
        .column
          router-view
    section#review.section
      review
</template>

<script>
  import Review from '@/components/Review';

  export default {
    name: 'AlphaLauncher',
    components: { Review }
  };
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/initial-variables";

  $text: $white;
  $text-light: $grey-lighter;
  $text-strong: $white;
  $background: $grey;
  
  $title-color: $white;
  $subtitle-color: $white-ter;
  
  $section-padding: 1.5rem;

  $menu-item-color: $white;
  $menu-item-active-color: $black;
  $menu-item-active-background-color: $white-bis;

  html, body {
    height: 100%;
  }
  html {
    overflow-y: hidden;
  }
  body {
    -webkit-app-region: drag;
    background: $grey-darker;
    -webkit-user-select: none;
  }
  a {
    -webkit-app-region: no-drag;
  }
  .columns {
    height: 100%;
  }
  .navigation {
    border-right: 1px solid $grey;
  }
  #configuration {
    height: 50vh;
  }
  #review {
    border-top: 1px solid $grey;
  }

  @import "~bulma";
</style>
