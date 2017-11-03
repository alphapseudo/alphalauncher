<template lang="pug">
  section.section#app
    transition(name="fade" mode="out-in" appear)
      template(v-if="!isLoading")
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
              a.button.is-success
                i.fa.fa-wrench
            .column.is-two-thirds.configuration
              router-view
      spinner.spinner(
        size="large"
        line-bg-color="#363636"
        line-fg-color="#ffdd57"
        text-fg-color="#fff"
        message="Loading..."
        v-else
      )
</template>

<script>
  import Spinner from 'vue-simple-spinner';
  import System from './lib/system';

  export default {
    name: 'AlphaLauncher',
    data() {
      return {
        isLoading: true
      };
    },
    mounted() {
      System.getAppPath().then((path) => {
        console.log(path);
        setTimeout(() => {
          this.isLoading = false;
        }, 150);
      });
    },
    components: { spinner: Spinner }
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

  $table-color: $white;
  $table-background-color: $black-ter;
  $table-striped-row-even-background-color: $grey-dark;

  $label-color: $white-ter;

  $check-green: #2fff78;

  html, body {
    height: 100%;
    overflow: hidden !important;
  }
  
  body {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    a, .configuration { -webkit-app-region: no-drag }
  }

  .spinner {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(0,0,0,0);
    -webkit-border-radius: 100px;
    &:hover { background-color: rgba(0, 0, 0, 0.09) }
  }

  ::-webkit-scrollbar-thumb:vertical {
    background: rgba(180,180,180,0.5);
    -webkit-border-radius: 100px;
    &:active {
      background: rgba(180,180,180,0.61);
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

  .switch+label { padding-top: 0 !important }

  .no-margin-bottom { margin-bottom: 0 !important }

  .isHidden { display: none }

  #app { 
    height: 100vh;
    .input, textarea, select {
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

  // Animations
  .menu-list a { 
    transition: all 0.2s;
  }
  .button {
    transition: all 0.3s;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  // Table
  table.table { 
    margin-bottom: 1em;
    table-layout: fixed;
    font-size: 0.75rem;
    thead, tbody { display: block; }
    tbody {
      height: 45vh;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    thead th {
    padding: 0.5em 0.35em;
    }
    tbody td {
      word-wrap: break-word;
      max-width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 0.35em;
      border-bottom: 0;
      vertical-align: middle;
    }
  }
  .table-list {
    font-size: 0.75rem;
    .is-checkbox[type="checkbox"].is-small + label { padding: 0 0 0 1.5rem }
    .drag-handle {
      margin: 0 0.4rem;
      cursor: move;
      font-size: 1rem;
    }
  }

  .hint {
    font-size: 0.8rem;
    margin-top: 0.2rem;
    .fa { margin: 0 0.3rem }
    .fa-check { color: $check-green }
  }
  .ghost {
    background-color: $white-ter !important;
    color: $grey-darker !important;
    opacity: 0.5;
  }

  @import "~bulma";
  @import "~bulma-switch/switch.sass";
  @import "~bulma-slider/slider.sass";
  @import "~bulma-checkradio/checkradio.sass";
</style>
