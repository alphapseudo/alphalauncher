<template lang="pug">
  #app
    section.section
      .columns
        .column.is-one-third
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
</template>

<script>
  export default {
    name: 'AlphaLauncher'
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

  @import "~bulma";
</style>
