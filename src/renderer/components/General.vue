<template lang="pug">
  mixin tooltip(text)
    span.icon.has-text-warning(
      title=text
      v-tippy="true"
    )
      i.fa.fa-info-circle

  #general
    p.title.is-5 General
    p.subtitle.is-6 Configure general server settings
    .field.is-horizontal
      .field-body
        .field.is-expanded
          .control
            label.label.is-small Server Name
            input.input.is-small(type="text" maxlength="255" placeholder="Hostname" v-model.lazy="hostname")
        .field.is-narrow
          .control
            label.label.is-small Port
            input.input.is-small(type="number" placeholder="Port" min="1" max="65535" maxlength="5" v-model.number="port")
        .field.is-narrow
          .control
            label.label.is-small Max Players
            input.input.is-small(type="number" min="1" v-model.number="maxPlayers")
        .field.is-narrow(style="align-self: flex-end")
          .control
            input#upnp.switch.is-success.is-small(type="checkbox" v-model="upnp")
            label.label.is-small(for="upnp") UPNP
              +tooltip(`Automatically create a port mapping on an UPNP/IGD enabled router. 
                This option allows you to create a server behind NAT (your router must have public IP and support UPNP/IGD protocol).`
              )
        .field(style="align-self: flex-end")
          .control
            input#lan.switch.is-success.is-small(type="checkbox" v-model="lan")
            label.label.is-small(for="lan") LAN
              +tooltip('Force server to be hosted on a LAN only')
    .field.is-horizontal
      .field-body
        .field
          .control
            label.label.is-small Server Password
            input.input.is-small(type="password" placeholder="Client connection password" v-model.lazy="sPass")
        .field
          .control
            label.label.is-small Admin Password
            input.input.is-small(type="password" placeholder="Server admin password" v-model.lazy="aPass")
    .field.is-horizontal
      .field-body
        .field
          .control
            label.label.is-small Message of the Day (MOTD)
              +tooltip("Server welcome message on connect. Each newline (pressing enter) will be added as a message")
            textarea.textarea.is-small(rows="3" placeholder="The message of the day to display" v-model.lazy="motd")
        .field.is-narrow
          .control
            label.label.is-small Message Interval
              +tooltip("Time (in seconds) between each message displayed")
            input.input.is-small(type="number" min="1" v-model.number="mInterval")
    hr
    .columns
      .column
        h5.title.is-5 Settings
        .field
          input#battleye.switch.is-success.is-small(type="checkbox" v-model="be")
          label.label.is-small(for="battleye") Battleye
            +tooltip('Enable anti-cheat system')
        .field
          input#persistent.switch.is-success.is-small(type="checkbox" v-model="persistent")
          label.label.is-small(for="persistent") Persistent
            +tooltip('Mission will continue running when all clients disconnect.')
        .field
          input#drawing.switch.is-success.is-small(type="checkbox" v-model="drawing")
          label.label.is-small(for="drawing") Map Drawing
        .field
          label.label.is-small Advanced Flight Model
            +tooltip(`Enforce a Flight Model for the Server's clients`)
          .select.is-small
            select(v-model="afm")
              option(:value=0) Either
              option(:value=1) Force AFM
              option(:value=2) Force SFM
      .column
        h5.title.is-5 Voting
        .field
          .control
            label.label.is-small Mission Players
              +tooltip('Minimum number of players connected to show mission selection')
            input.input.is-small(type="number" min="1" v-model.number="vMissionPlayers")
        .field
          .control
            label.label.is-small Vote Threshold (%)
              +tooltip('Percentage needed for vote to succeed')
            input.input.is-small(type="number" min="1" v-model.number="vThreshold")
      .column
        h5.title.is-5 Voice
        .field
          input#useVon.switch.is-success.is-small(type="checkbox" v-model="von")
          label.label.is-small(for="useVon") Allow VoN
        .field
          label.label.is-small Codec
          .select.is-small
            select(:disabled="!von" v-model.number="codec")
              option(value=0) SPEEX
              option(value=1) OPUS
        .field
          .control
            label.label.is-small Codec Quality
              +tooltip('Quality of VoN codec. Range from 1-20')
            input.input.is-small(type="number" min="1" max="20" :disabled="!von" v-model.number="vonQuality")
    hr
    h5.title.is-5 Rules
    .columns
      .column.is-narrow
        .field
          label.label.is-small Verify Signatures
            +tooltip(`Enables or disables the signature verification for addons.`)
          .select.is-small
            select(v-model="verifySig")
              option(:value=0) Default
              option(:value=1) Weak
              option(:value=2) Full
        .field
          label.label.is-small Allowed File Patching
            +tooltip(`Prevent or allow file patching for the clients`)
          .select.is-small
            select(v-model="filePatch")
              option(:value=0) None
              option(:value=1) Headless Only
              option(:value=2) All
        .field
          input#kickdupes.switch.is-success.is-small(type="checkbox" v-model="kickDupes")
          label.label.is-small(for="kickdupes") Kick Duplicates
            +tooltip('Do not allow duplicate game IDs. Another player with an existing ID will be kicked.')
      .column.is-narrow
        .field
          .control
            label.label.is-small
              input(type="checkbox" v-model="buildEnabled")
              | Required Build
              +tooltip("Clients must have the required build to connect")
            input.input.is-small(type="number" min="0" :disabled="!buildEnabled" v-model.number="build")
        .field
          .control
            label.label.is-small 
              input(type="checkbox" v-model="pingEnabled")
              | Max Ping (ms)
            input.input.is-small(type="number" min="0" :disabled="!pingEnabled" v-model.number="ping")
        .field
          .control
            label.label.is-small 
              input(type="checkbox" v-model="disconnectEnabled")
              | Disconnect Timeout (s)
            input.input.is-small(type="number" min="0" :disabled="!disconnectEnabled" v-model.number="disconnect")
      .column.is-narrow
        .field
          .control
            label.label.is-small
              input(type="checkbox" v-model="desyncEnabled")
              | Max Desync
            input.input.is-small(type="number" min="0" :disabled="!desyncEnabled" v-model.number="desync")
        .field
          .control
            label.label.is-small 
              input(type="checkbox" v-model="packetEnabled")
              | Max Packet Loss (%)
            input.input.is-small(type="number" min="0" :disabled="!packetEnabled" v-model.number="packet")
    hr
    .columns
      .column
        h5.title.is-5 Headless Clients  
          +tooltip("Headless clients are used to offload AI calculations from the server")
        .field
          .control
            label.label.is-small Remote Clients
              +tooltip("Clients that are remotely connnected as headless")
            textarea.textarea.is-small(rows="2" placeholder="One remote IP address per line" v-model.lazy="rClients")
        .field
          .control
            label.label.is-small Local Clients
              +tooltip("Clients with unlimited bandwidth and virtually no latency")
            textarea.textarea.is-small(rows="2" placeholder="One local IP address per line" v-model.lazy="lClients")
      .column
        h5.title.is-5 Administration
        .field
          .control
            label.label.is-small Admins
              +tooltip("Player UID whitelist for admin privileges")
            textarea.textarea.is-small(rows="7" placeholder="One player UID per line" v-model.lazy="admins")
</template>

<script>
  export default {
    name: 'general',
    computed: {
      hostname: {
        get() { return this.$store.state.config.hostname; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['hostname', v]); }
      },
      port: {
        get() { return this.$store.state.params.port; },
        set(v) { this.$store.commit('UPDATE_PARAMS', ['port', v]); }
      },
      maxPlayers: {
        get() { return this.$store.state.config.maxPlayers; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['maxPlayers', v]); }
      },
      upnp: {
        get() { return this.$store.state.config.upnp; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['upnp', v]); }
      },
      lan: {
        get() { return this.$store.state.config.loopback; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['loopback', v]); }
      },
      sPass: {
        get() { return this.$store.state.config.password; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['password', v]); }
      },
      aPass: {
        get() { return this.$store.state.config.passwordAdmin; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['passwordAdmin', v]); }
      },
      motd: {
        get() { return this.$store.state.config.motd.join('\n'); },
        set(v) {
          let messages = v.split('\n');
          if (messages[0] === '' && messages.length === 1) {
            messages = [];
          }
          this.$store.commit('UPDATE_CONFIG', ['motd', messages]);
        }
      },
      mInterval: {
        get() { return this.$store.state.config.motdInterval; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['motdInterval', v]); }
      },
      be: {
        get() { return this.$store.state.config.BattlEye; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['BattlEye', v]); }
      },
      persistent: {
        get() { return this.$store.state.config.persistent; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['persistent', v]); }
      },
      drawing: {
        get() { return this.$store.state.config.drawingInMap; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['drawingInMap', v]); }
      },
      afm: {
        get() { return this.$store.state.config.forceRotorLibSimulation; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['forceRotorLibSimulation', v]); }
      },
      vThreshold: {
        get() { return this.$store.state.config.voteThreshold * 100; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['voteThreshold', v / 100]); }
      },
      vMissionPlayers: {
        get() { return this.$store.state.config.voteMissionPlayers; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['voteMissionPlayers', v]); }
      },
      von: {
        get() { return !this.$store.state.config.disableVoN; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['disableVoN', !v]); }
      },
      codec: {
        get() { return this.$store.state.config.vonCodec; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['vonCodec', v]); }
      },
      vonQuality: {
        get() { return this.$store.state.config.vonCodecQuality; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['vonCodecQuality', v]); }
      },
      verifySig: {
        get() { return this.$store.state.config.verifySignatures; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['verifySignatures', v]); }
      },
      filePatch: {
        get() { return this.$store.state.config.allowedFilePatching; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['allowedFilePatching', v]); }
      },
      kickDupes: {
        get() { return this.$store.state.config.kickDuplicate; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['kickDuplicate', v]); }
      },
      build: {
        get() { return this.$store.state.config.requiredBuild.value; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['requiredBuild.value', v]); }
      },
      buildEnabled: {
        get() { return this.$store.state.config.requiredBuild.enabled; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['requiredBuild.enabled', v]); }
      },
      ping: {
        get() { return this.$store.state.config.maxPing.value; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['maxPing.value', v]); }
      },
      pingEnabled: {
        get() { return this.$store.state.config.maxPing.enabled; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['maxPing.enabled', v]); }
      },
      disconnect: {
        get() { return this.$store.state.config.disconnectTimeout.value; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['disconnectTimeout.value', v]); }
      },
      disconnectEnabled: {
        get() { return this.$store.state.config.disconnectTimeout.enabled; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['disconnectTimeout.enabled', v]); }
      },
      desync: {
        get() { return this.$store.state.config.maxDesync.value; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['maxDesync.value', v]); }
      },
      desyncEnabled: {
        get() { return this.$store.state.config.maxDesync.enabled; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['maxDesync.enabled', v]); }
      },
      packet: {
        get() { return this.$store.state.config.maxPacketLoss.value; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['maxPacketLoss.value', v]); }
      },
      packetEnabled: {
        get() { return this.$store.state.config.maxPacketLoss.enabled; },
        set(v) { this.$store.commit('UPDATE_CONFIG', ['maxPacketLoss.enabled', v]); }
      },
      rClients: {
        get() { return this.$store.state.config.headlessClients.join('\n'); },
        set(v) {
          let clients = v.split('\n');
          if (clients[0] === '' && clients.length === 1) {
            clients = [];
          }
          this.$store.commit('UPDATE_CONFIG', ['headlessClients', clients]);
        }
      },
      lClients: {
        get() { return this.$store.state.config.localClient.join('\n'); },
        set(v) {
          let clients = v.split('\n');
          if (clients[0] === '' && clients.length === 1) {
            clients = [];
          }
          this.$store.commit('UPDATE_CONFIG', ['localClient', clients]);
        }
      },
      admins: {
        get() { return this.$store.state.config.admins.join('\n'); },
        set(v) {
          let admins = v.split('\n');
          if (admins[0] === '' && admins.length === 1) {
            admins = [];
          }
          this.$store.commit('UPDATE_CONFIG', ['admins', admins]);
        }
      }
    }
  };
</script>
