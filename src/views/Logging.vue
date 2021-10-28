<template lang="pug">
  mixin tooltip(text)
    span.icon.has-text-warning(
      title=text
      v-tippy="true"
    )
      i.fa.fa-info-circle

  #logging
    p.title.is-5 Logging
    p.subtitle.is-6 Change server logging options
    .columns
      .column
        label.label.is-small Server Console Log
        .field.has-addons
          .control.is-expanded
            input.input.is-small(type="text" maxlength="255" placeholder="Server Output Location" readonly v-model.lazy="console")
          .control
            a.button.is-small.is-success(@click="pickConsole")
              span.icon.is-small
                i.fa.fa-save
          .control
            a.button.is-small.is-danger(@click="clearConsole")
              span.icon.is-small
                i.fa.fa-close
        label.label.is-small Ranking File
          +tooltip('File to output player stats and ranking information')
        .field.has-addons
          .control.is-expanded
            input.input.is-small(type="text" maxlength="255" placeholder="Ranking Output Location" readonly v-model.lazy="ranking")
          .control
            a.button.is-small.is-success(@click="pickRanking")
              span.icon.is-small
                i.fa.fa-save
          .control
            a.button.is-small.is-danger(@click="clearRanking")
              span.icon.is-small
                i.fa.fa-close
        label.label.is-small PID File
          +tooltip('Output file containing the server\'s process ID (PID). The file is removed automatically on server close.')
        .field.has-addons
          .control.is-expanded
            input.input.is-small(type="text" maxlength="255" placeholder="PID File Location" readonly v-model.lazy="pid")
          .control
            a.button.is-small.is-success(@click="pickPID")
              span.icon.is-small
                i.fa.fa-save
          .control
            a.button.is-small.is-danger(@click="clearPID")
              span.icon.is-small
                i.fa.fa-close
      .column.is-narrow
        .field
          label.label.is-small(for="netlog") Netlog
          .control
            input#netlog.switch.is-success.is-small(type="checkbox" v-model="netlog")
            label(for="netlog")
              +tooltip('Enables multiplayer network traffic logging. This affects performance')
        .field
          label.label.is-small Timestamp Format
            +tooltip(`Set the timestamp format used on each report line in server-side RPT file.`)
          .select.is-small
            select(v-model="timestamp")
              option(value='none') None
              option(value='short') Short
              option(value='full') Full
</template>

<script>
  import { remote } from 'electron';

  export default {
    name: 'logging',
    computed: {
      console() { return this.$store.state.config.logfile; },
      ranking() { return this.$store.state.params.ranking; },
      pid() { return this.$store.state.params.pid; },
      netlog: {
        get() { return this.$store.state.params.netlog; },
        set(v) { this.$store.commit('UPDATE_PARAMS', ['netlog', v]); }
      },
      timestamp: {
        get() { return this.$store.state.config.timestamp; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['timestamp', v]); }
      }
    },
    methods: {
      async pickConsole() {
        const result = await remote.dialog.showSaveDialog({
          defaultPath: 'server.log',
          filters: [
            { name: 'Log file (*.log)', extensions: ['log'] }
          ]
        });

        const { filePath: path } = result;
        this.$store.commit('UPDATE_CONFIG', ['logfile', path]);
      },
      clearConsole() {
        this.$store.commit('UPDATE_CONFIG', ['logfile', null]);
      },
      async pickRanking() {
        const result = await remote.dialog.showSaveDialog({
          defaultPath: 'ranking.log',
          filters: [
            { name: 'Log file (*.log)', extensions: ['log'] }
          ]
        });

        const { filePath: path } = result;
        this.$store.commit('UPDATE_PARAMS', ['ranking', path]);
      },
      clearRanking() {
        this.$store.commit('UPDATE_PARAMS', ['ranking', null]);
      },
      async pickPID() {
        const result = await remote.dialog.showSaveDialog({
          defaultPath: 'pid.log',
          filters: [
            { name: 'Log file (*.log)', extensions: ['log'] }
          ]
        });

        const { filePath: path } = result;
        this.$store.commit('UPDATE_PARAMS', ['pid', path]);
      },
      clearPID() {
        this.$store.commit('UPDATE_PARAMS', ['pid', null]);
      }
    }
  };
</script>
