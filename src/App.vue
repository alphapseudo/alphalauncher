<template lang="pug">
  section.section#app(@click="blur")
    .modal(:class="{'is-active': showProfileModal}")
      .modal-background(@click="closeProfileModal")
      .modal-card
        header.modal-card-head
          p.modal-card-title Enter Profile Name
          button.delete(@click="closeProfileModal" aria-label='close')
        section.modal-card-body
            .field
              input.input.is-small(
                ref="profileInput" 
                type="text" 
                maxlength="255" 
                placeholder="Profile Name (e.g. Primary)" 
                v-model.lazy="inputProfile" 
                :class="{'is-danger': isDuplicateProfile}"
                @keyup.enter="createNewProfile"
              )
              p.help.is-danger(v-if="isDuplicateProfile")
                | Profile already exists - please choose another name
        footer.modal-card-foot
          button.button.is-success(@click="createNewProfile") Create
          button.button.is-light(@click="closeProfileModal") Cancel
    transition(name="fade" mode="out-in" appear)
      template(v-if="!isLoading")
        .columns.is-mobile
            .column.is-one-third.navigation
              h3.title.brand
                span
                  img(src="../static/images/alpha.png")
                | AlphaLauncher
              p.subtitle.version v{{ version }}
              aside.menu
                .menu-label Configuration
                ul.menu-list(:class="{'is-disabled': !appPath}")
                  li
                    router-link(to="/general")
                      span #[i.fa.fa-fw.fa-desktop]
                      | General
                  li
                    router-link(to="/difficulty")
                      span #[i.fa.fa-fw.fa-sliders]
                      | Difficulty
                  li
                    router-link(to="/missions")
                      span #[i.fa.fa-fw.fa-map-marker]
                      | Missions
                  li
                    router-link(to="/mods")
                      span #[i.fa.fa-fw.fa-cubes]
                      | Mods
                  li
                    router-link(to="/logging")
                      span #[i.fa.fa-fw.fa-history]
                      | Logging
                  li
                    router-link(to="/scripting")
                      span #[i.fa.fa-fw.fa-terminal]
                      | Scripting
              .controls
                p.control
                  a.button.is-warning.is-medium.is-outlined.is-fullwidth(
                    :disabled="!appPath"
                    @click="launch"
                    :class="{'is-loading': isRunning}"
                  ) LAUNCH
                .sub-controls.field.has-addons.is-pulled-right
                  p.control
                    router-link(
                      to="/settings"
                      v-tippy="{delay: 500}" title="Launcher Settings"
                    ).button.is-transparent
                      span.icon
                        i.fa.fa-gear
                  p.control
                    a.button.is-transparent(
                      v-tippy="{delay: 500}" title="Restore Defaults"
                      @click="reset"
                      :disabled="!appPath"
                    )
                      span.icon
                        i.fa.fa-undo
                  p.control
                    a.button.is-transparent(
                      v-tippy="{delay: 500}" title="Save Profile"
                      @click="save"
                      :disabled="!appPath"
                    )
                      span.icon
                        i.fa.fa-save
            .column.is-two-thirds.configuration
              transition(name="fade-fast" mode="out-in")
                router-view
      spinner.spinner(
        size="large"
        line-bg-color="#363636"
        line-fg-color="#ffdd57"
        text-fg-color="#fff"
        message="Loading..."
        v-else
      )
    .fixed-controls.field.has-addons
      p.control(v-if="!isLoading")
        a.dropdown.is-right(ref="profiles" :class="{'is-active': isChangingProfiles}")
          .dropdown-trigger
            button.button.is-transparent(
              @click="manageProfiles" 
              aria-haspopup='true'
              aria-controls='dropdown-menu'
              title="Profile Management"
            )
              span.icon
                i.fa.fa-user
              span {{ active }}
              span.icon.is-small
                i.fa.fa-angle-down(aria-hidden='true')
          #dropdown-menu.dropdown-menu(role='menu')
            .dropdown-content
              .dropdown-selection
                a.dropdown-item(
                  v-for="name in profiles"
                  :class="{'is-active': active === name}"
                  :key="name"
                  @click="changeProfile(name)"
                )
                  | {{ name }}
                  span.icon(v-if="name !== 'Default'" @click="deleteProfile($event, name)")
                    i.fa.fa-trash
              hr.dropdown-divider
              a.dropdown-item(@click="openProfileModal")
                span.icon
                  i.fa.fa-user-plus
                | Create New Profile
      p.control
        a.button.is-transparent(@click="minimize" title="Minimize")
          span.icon
            i.fa.fa-minus
      p.control
        a.button.is-transparent.is-danger(@click="close" title="Close")
          span.icon
            i.fa.fa-close
</template>

<script>
  import Spinner from 'vue-simple-spinner';
  import { remote } from 'electron';

  export default {
    name: 'AlphaLauncher',
    data() {
      return {
        isLoading: true,
        isRunning: false,
        isChangingProfiles: false,
        showProfileModal: false,
        inputProfile: ''
      };
    },
    computed: {
      appPath() { return this.$store.state.app.appLocation; },
      version() { return remote.app.getVersion(); },
      active() { return this.$store.state.user.active; },
      profiles() { return this.$store.state.user.profiles; },
      isDuplicateProfile() {
        return this.$store.state.user.profiles.some(p => p.toLowerCase() === this.inputProfile.toLowerCase());
      }
    },
    async mounted() {
      await this.$store.dispatch('INITIALIZE_LAUNCHER');

      const pathValid = await this.$store.dispatch('VALIDATE_PATH');

      if (!pathValid) {
        this.$store.commit('SET_APP_PATH', null);
        this.$router.push('settings');
      }

      this.removeLoading();
    },
    methods: {
      removeLoading() {
        this.isLoading = false;
      },
      minimize() {
        remote.BrowserWindow.getFocusedWindow().minimize();
      },
      blur(event) {
        const dropdown = this.$refs.profiles;
        if (dropdown && !dropdown.contains(event.target)) {
          this.isChangingProfiles = false;
        }
      },
      manageProfiles() {
        this.isChangingProfiles = !this.isChangingProfiles;
      },
      async changeProfile(profile) {
        if (profile === this.active) {
          return;
        }

        this.isChangingProfiles = false;

        const result = await this.checkForChanges();

        if (result === 0) {
          await this.$store.dispatch('SAVE_PROFILE');
        }

        if (result === 2) return;

        await this.$store.dispatch('LOAD_PROFILE', profile);
        this.$toasted.success(`Profile Changed to '${profile}'`);
      },
      async deleteProfile(event, profile) {
        event.stopPropagation();

        const { response: answer } = await remote.dialog.showMessageBox(
          remote.getCurrentWindow(), {
            type: 'question',
            buttons: ['Yes', 'No'],
            title: 'AlphaLauncher',
            message: `Are you sure you want to delete '${profile}'?`,
            detail: 'This profile cannot be restored once deleted'
          }
        );

        if (answer === 0) {
          try {
            await this.$store.dispatch('DELETE_PROFILE', profile);
            this.$toasted.success('Profile Deleted Successfully');
          } catch (e) {
            this.$toasted.error(e);
          }
        }

        this.isChangingProfiles = false;
      },
      openProfileModal() {
        this.showProfileModal = true;
        this.isChangingProfiles = false;
        this.$nextTick(() => {
          this.$refs.profileInput.focus();
        });
      },
      closeProfileModal() {
        this.showProfileModal = false;
        this.inputProfile = '';
      },
      async createNewProfile() {
        if (this.isDuplicateProfile) return;

        const result = await this.checkForChanges();

        if (result === 0) {
          await this.$store.dispatch('SAVE_PROFILE');
        }

        if (result === 2) return;

        try {
          await this.$store.dispatch('CREATE_PROFILE', this.inputProfile);
          this.$toasted.success('Profile Created Successfully');
        } catch (e) {
          this.$toasted.error(e);
        }

        this.closeProfileModal();
      },
      async checkForChanges() {
        const changesDetected = await this.$store.dispatch('CHECK_FOR_CHANGES');

        if (changesDetected) {
          const { response: answer } = await remote.dialog.showMessageBox(
            remote.getCurrentWindow(), {
              type: 'warning',
              buttons: ['Save', 'Don\'t Save', 'Cancel'],
              title: 'AlphaLauncher',
              message: `Changes were made to the profile '${this.active}'. Save changes?`
            }
          );
          return answer;
        }

        return null;
      },
      async close() {
        const result = await this.checkForChanges();

        if (result === 0) {
          await this.$store.dispatch('SAVE_PROFILE');
        }

        if (result === 2) return;

        remote.BrowserWindow.getFocusedWindow().close();
      },
      async save() {
        if (!this.appPath) return;
        try {
          await this.$store.dispatch('SAVE_PROFILE');
          this.$toasted.success('Profile Saved Successfully');
        } catch (e) {
          this.$toasted.error(e);
        }
      },
      async launch() {
        this.isRunning = true;

        try {
          const app = await this.$store.dispatch('LAUNCH_SERVER');
          app.on('close', (code) => {
            if (code >= 1) {
              this.$toasted.error('Server Exited Unexpectedly');
            }
            this.isRunning = false;
          });
        } catch (e) {
          this.$toasted.error('Couldn\'t Launch Server. Please Try Again');
          this.isRunning = false;
        }
      },
      async reset() {
        if (!this.appPath) return;
        const { response: answer } = await remote.dialog.showMessageBox(
          remote.getCurrentWindow(), {
            type: 'question',
            buttons: ['Yes', 'No'],
            title: 'AlphaLauncher',
            message: 'Are you sure you want to reset to defaults?'
          }
        );

        if (answer === 0) {
          this.$store.dispatch('RESET_STORE');
          this.$toasted.success('Restored Settings to Defaults');
        }
      }
    },
    components: { spinner: Spinner }
  };
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/initial-variables";
  @import "~font-awesome/css/font-awesome.min.css";

  $text: $white;
  $text-light: $grey-lighter;
  $text-strong: $white;
  $body-background-color: $grey-darker;
  $background: $grey;
  
  $title-color: $white;
  $subtitle-color: $white-ter;
  
  $section-padding: 1.5rem;

  $button-static-background-color: $grey-darker;

  $menu-item-color: $white;
  $menu-item-active-color: $black;
  $menu-item-active-background-color: $white-bis;

  $modal-card-head-padding: 12px;
  $modal-card-title-size: 1.4rem;
  $modal-card-head-background-color: #3a4652;
  $modal-card-body-background-color: #3a4652;
  $modal-card-foot-border-top: 0;
  $modal-card-head-border-bottom: 0;

  $table-color: $white;
  $table-background-color: $black-ter;
  $table-striped-row-even-background-color: $grey-dark;

  $label-color: $white-ter;

  $scheme-main: $black-ter;

  $check-green: #2fff78;

  html, body {
    height: 100%;
    overflow: hidden !important;
    background: linear-gradient(to left, #485563, #29323c);
  }
  
  body {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    a, .modal, .navigation, .configuration { -webkit-app-region: no-drag }
  }

  // Brand
  .brand {
    display: flex;
    align-items: center;
    font-size: 1.9rem !important;
    img {
      width: 48px;
      margin-right: 10px;
    }
  }

  // Spinners
  .spinner {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  // Scrollbars
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
      border-radius: 100px;
    }
  }

  // Placeholders
  ::-webkit-input-placeholder {
    color: $grey-light !important;
  }

  // Tooltips
  .tippy-tooltip {
    border: 1px solid $grey;
  }

  .tippy-tooltip, [x-circle] { 
    background-color: $black-ter !important;
  }

  // Layout
  #app > .columns { height: 100% }

  .subtitle.version {
    font-size: 0.8em;
    color: $grey;
    text-align: right;
  }

  .column.is-one-third.navigation {
    border-right: 1px solid $grey;
    display: flex;
    flex-direction: column;
    aside.menu {
      flex: 1;
      span { margin-right: 0.5rem }
    }
  }

  .menu-list.is-disabled {
    cursor: not-allowed;
    li {
      pointer-events: none;
      opacity: .65; 
    }
  }

  .input[type="number"] { width: 6em }
  
  .configuration {
    overflow: auto;
    padding-top: 0 !important;
    margin-top: 0.85em;
  }

  // Helpers
  .no-grow { flex-grow: 0 !important }

  .switch+label { padding-top: 0 !important }

  .no-margin-bottom { margin-bottom: 0 !important }

  .isHidden { display: none }

  // General Theme Overrides
  #app {
    height: 100vh;
    padding: 2rem 1.5rem 1.5rem;
    .input, textarea, select {
      background: $black-ter;
      color: $white;
      &:not(.is-danger):not(.is-success) { 
        border: 1px solid $black-ter;
        &:active, &:focus {
        border: 1px solid $blue;
        }
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
  .fade-enter, .fade-leave-to,
  .fade-fast-enter, .fade-fast-leave-to {
    opacity: 0
  }
  .fade-fast-enter-active, .fade-fast-leave-active {
    transition: opacity .15s
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

  // Hint & Ghosts
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

  // Containers
  .centered-placeholder {
    display: flex;
    flex-direction: column;
    height: 18em;
    margin-bottom: 1em;
    background: $black-ter;
    align-items: center;
    justify-content: center;
  }

  // Toast Overrides
  .toasted-container.bottom-right {
    bottom: 5% !important;
  }

  // Controls & Buttons
  .button.is-transparent {
    background-color: transparent !important;
    border: 0;
    color: $white;
    &:hover {
      color: $grey-lighter;
      &.is-danger { color: $red }
    }
    &:focus:not(:active) { box-shadow: none }
    &.is-active { color: $yellow }
  }

  // Dropdown
  .dropdown {
    button:focus {
      color: $white;
    }

    .dropdown-item {
      display: flex;
      flex: 1 0 auto;
      justify-content: space-between;
      padding-right: 1rem;
      &.is-active {
        background-color: #ed3f46;
      }
      &:hover {
        color: #fafafa;
      }
    }

    .dropdown-selection {
      overflow: auto;
      max-height: 200px;
      .icon {
        color: $grey-light;
        &:hover {
          color: $white;
        }
      }
    }

    .dropdown-content {
      border: 1px solid $grey-light;
    }
  }

  .sub-controls {
    margin-bottom: -1.4em;
    a { padding: 0.75em 0.5em }
  }

  .fixed-controls {
    position: fixed;
    top: 0;
    right: 0.1em;
    z-index: 10;
  }

  @import "~bulma";
  @import "~bulma-switch";
  @import "~bulma-slider";
  @import "~bulma-checkradio";
</style>
