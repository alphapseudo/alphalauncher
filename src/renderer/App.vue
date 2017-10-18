<template lang="pug">
  section.section#app
    .columns.is-mobile
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
      .column.is-two-thirds
        router-view#view
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
  @import "~font-awesome/css/font-awesome.min.css";

  $text: $white;
  $text-light: $grey-lighter;
  $text-strong: $white;
  $background: $grey;
  $body-background-color: $grey-darker;
  
  $title-color: $white;
  $subtitle-color: $white-ter;
  
  $section-padding: 1.5rem;

  $button-static-background-color: $grey-darker;

  $menu-item-color: $white;
  $menu-item-active-color: $black;
  $menu-item-active-background-color: $white-bis;

  $label-color: $white-ter;

  html, body {
    height: 100%;
  }
  html {
    overflow-y: hidden;
  }
  body {
    -webkit-app-region: drag;
    -webkit-user-select: none;
  }
  a, input, label {
    -webkit-app-region: no-drag;
  }
  .columns { height: 100% }
  .navigation {
    border-right: 1px solid $grey;
  }
  #app { 
    height: 100vh;
    ::-webkit-input-placeholder {
      color: $grey-light;
    }
    input {
      background: $black-ter;
      border: 1px solid $black-ter;
      color: $white;
      &:active, &:focus {
        border: 1px solid $blue;
      }
    }
  }
  #view {
    height: 100vh;
  }
  #review {
    height: 50vh;
    border-top: 1px solid $grey;
  }

  @import "~bulma";
  @import "~bulma-switch/switch.sass";
  @import "~bulma-divider/divider.sass";  
</style>
