<template lang="pug">
  mixin tooltip(text)
    span.icon.has-text-warning(
      title=text
      v-tippy="true"
    )
      i.fa.fa-info-circle

  #logging
    p.title.is-5 Scripting
    p.subtitle.is-6 Apply server-side scripting
    label.label.is-small Server Command Password
    .field.has-addons
      .control
        input.input.is-small(:type="showScript ? 'text' : 'password'" maxlength="255" placeholder="Password" v-model.lazy="commandPass")
      .control
        a.button.is-small.is-info(@click="toggleScriptPassword" v-tippy :title="`${showScript ? 'Hide' : 'Reveal'} Password`")
          span.icon.is-small
            i.fa(:class="showScript ? 'fa-eye-slash' : 'fa-eye'")
    hr
    .columns
      .column
        .field
          .control
            label.label.is-small Double ID Detected
            input.input.is-small(type="text" placeholder="User with same ID detected" v-model.lazy="doubleId")
        .field
          .control
            label.label.is-small User Connected
            input.input.is-small(type="text" placeholder="User has connected" v-model.lazy="userCon")
        .field
          .control
            label.label.is-small User Disconnected
            input.input.is-small(type="text" placeholder="User has disconnected" v-model.lazy="userDisc")
        .field
          .control
            label.label.is-small Hacked Data
            input.input.is-small(type="text" placeholder="Signed .pbo modification detected" v-model.lazy="hacked")
      .column
        .field
          .control
            label.label.is-small Different Data
            input.input.is-small(type="text" placeholder="Signed .pbo version differs from server" v-model.lazy="different")
        .field
          .control
            label.label.is-small Unsigned Data
            input.input.is-small(type="text" placeholder="Unisigned data detected" v-model.lazy="unsigned")
        .field
          .control
            label.label.is-small Regular Check
            input.input.is-small(type="text" placeholder="Periodically called for each user" v-model.lazy="regular")
        
</template>

<script>
  export default {
    name: 'logging',
    data() {
      return {
        showScript: false
      };
    },
    methods: {
      toggleScriptPassword() {
        this.showScript = !this.showScript;
      }
    },
    computed: {
      commandPass: {
        get() { return this.$store.state.config.serverCommandPassword; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['serverCommandPassword', v]); }
      },
      doubleId: {
        get() { return this.$store.state.config.doubleIdDetected; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['doubleIdDetected', v]); }
      },
      userCon: {
        get() { return this.$store.state.config.onUserConnected; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['onUserConnected', v]); }
      },
      userDisc: {
        get() { return this.$store.state.config.onUserDisconnected; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['onUserDisconnected', v]); }
      },
      hacked: {
        get() { return this.$store.state.config.onHackedData; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['onHackedData', v]); }
      },
      different: {
        get() { return this.$store.state.config.onDifferentData; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['onDifferentData', v]); }
      },
      unsigned: {
        get() { return this.$store.state.config.onUnsignedData; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['onUnsignedData', v]); }
      },
      regular: {
        get() { return this.$store.state.config.regularCheck; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['regularCheck', v]); }
      }
    }
  };
</script>
