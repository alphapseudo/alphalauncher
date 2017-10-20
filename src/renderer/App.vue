<template lang="pug">
  section.section#app
    .columns.is-mobile
      .column.is-one-third.navigation
        h3.title.is-3 AlphaLauncher
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
      .column.is-two-thirds.configuration
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
  @import "~v-tippy/dist/tippy.css";

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
    overflow: hidden !important;
  }
  
  body {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    a, .configuration { -webkit-app-region: no-drag }
  }

  ::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(0,0,0,0);
    -webkit-border-radius: 100px;
    &:hover { background-color: rgba(0, 0, 0, 0.09) }
  }

  ::-webkit-scrollbar-thumb:vertical {
    background: rgba(0,0,0,0.5);
    -webkit-border-radius: 100px;
    &:active {
      background: rgba(0,0,0,0.61);
    -webkit-border-radius: 100px;
    }
  }

  ::-webkit-input-placeholder {
    color: $grey-light !important;
  }

  .tippy-tooltip {
    border: 1px solid $grey;
  }

  .tippy-tooltip, [x-circle] { 
    background-color: $black-ter !important;
  }

  #app > .columns { height: 100% }

  .navigation { border-right: 1px solid $grey }

  .input[type="number"] { width: 6em }
  
  .configuration { overflow: auto}

  .no-grow { flex-grow: 0 !important }

  #app { 
    height: 100vh;
    input, textarea, select {
      background: $black-ter;
      border: 1px solid $black-ter;
      color: $white;
      &:active, &:focus {
        border: 1px solid $blue;
      }
      &[disabled] {
        background-color: #7a7a7a;
        border-color: #7a7a7a;
        box-shadow: none;
        color: #dbdbdb;
      }
    }
    input[type="checkbox"] {
      vertical-align: sub;
      margin-right: 3px;
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
