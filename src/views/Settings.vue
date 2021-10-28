<template lang="pug">
  mixin tooltip(text)
    span.icon.has-text-warning(
      title=text
      v-tippy="true"
    )
      i.fa.fa-info-circle

  #settings
    p.title.is-5 Settings
    p.subtitle.is-6 Modify launcher settings
    label.label.is-small Application Path
      +tooltip(`
        Path to directory where <b>arma3server</b> exists
        <br>
        (e.g. C:\\Steam\\steamapps\\common\\Arma 3)
      `)
    .field.has-addons
      .control.is-expanded
        input.input.is-small(
          :class="[appPath ? 'is-success' : 'is-danger']"
          type="text"
          maxlength="255"
          placeholder="Server Directory Path"
          v-model.lazy="appPath"
          readonly
        )
      .control
        a.button.is-small.is-info(@click="pickAppLocation")
          span.icon.is-small
            i.fa.fa-ellipsis-h
    p.help.is-danger(v-if="!appPath")
      | You must select a path to your application directory
</template>

<script>
  import { remote } from 'electron';

  export default {
    name: 'settings',
    computed: {
      appPath() { return this.$store.state.app.appLocation; }
    },
    methods: {
      pickAppLocation() {
        remote.dialog.showOpenDialog({
          title: 'Select Application Directory',
          buttonLabel: 'Choose',
          properties: [
            'openDirectory'
          ]
        }, async (response) => {
          if (!response) return;
          const [path = null] = response;
          const result = await this.$store.dispatch('UPDATE_APP_DIRECTORY', path);
          if (result) {
            this.$toasted.success('Application Path Valid');
          } else {
            this.$toasted.error('Server executable not found, please check permissions and path');
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .field.has-addons {
    margin-bottom: 0;
  }
</style>
