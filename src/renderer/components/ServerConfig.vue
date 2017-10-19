<template lang="pug">
  mixin tooltip(text)
    span.icon.has-text-warning(
      title=text
      v-tippy="true"
    )
      i.fa.fa-info-circle

  #general
    h5.title.is-5 General
    .field.is-horizontal
      .field-body
        .field.is-expanded
          .control
            label.label.is-small Server Name
            input.input.is-small(type="text" maxlength="255" placeholder="Hostname")
        .field.is-narrow
          .control
            label.label.is-small Port
            input.input.is-small(type="number" value="2302" placeholder="Port" min="1" max="65535" maxlength="5")
        .field.is-narrow
          .control
            label.label.is-small Max Players
            input.input.is-small(type="number" value="8" min="1")
        .field.is-narrow(style="align-self: flex-end")
          .control
            input#upnp.switch.is-success.is-small(type="checkbox" checked)
            label.label.is-small(for="upnp") UPNP
              +tooltip(`Automatically create a port mapping on an UPNP/IGD enabled router. 
                This option allows you to create a server behind NAT (your router must have public IP and support UPNP/IGD protocol).`
              )
        .field(style="align-self: flex-end")
          .control
            input#lan.switch.is-success.is-small(type="checkbox" checked)
            label.label.is-small(for="lan") LAN
              +tooltip('Force server to be hosted on a LAN only')
    .field.is-horizontal
      .field-body
        .field
          .control
            label.label.is-small Server Password
            input.input.is-small(type="password" placeholder="Client connection password")
        .field
          .control
            label.label.is-small Admin Password
            input.input.is-small(type="password" placeholder="Server admin password")
    .field.is-horizontal
      .field-body
        .field
          .control
            label.label.is-small Message of the Day (MOTD)
              +tooltip("Server welcome message on connect. Each newline (pressing enter) will be added as a message")
            textarea.textarea.is-small(rows="3" placeholder="The message of the day to display")
        .field.is-narrow
          .control
            label.label.is-small Message Interval
              +tooltip("Time (in seconds) between each message displayed")
            input.input.is-small(type="number" value="5" min="1")
    hr
    .columns
      .column
        h5.title.is-5 Settings
        .field
          input#battleye.switch.is-success.is-small(type="checkbox" checked)
          label.label.is-small(for="battleye") Battleye
            +tooltip('Enable anti-cheat system')
        .field
          input#persistent.switch.is-success.is-small(type="checkbox" checked)
          label.label.is-small(for="persistent") Persistent
            +tooltip('Mission will continue running when all clients disconnect.')
        .field
          input#persistent.switch.is-success.is-small(type="checkbox" checked)
          label.label.is-small(for="persistent") Map Drawing
        .field
          label.label.is-small Advanced Flight Model
            +tooltip(`Enforce a Flight Model for the Server's clients`)
          .select.is-small
            select
              option(value=0) Either
              option(value=1) Force AFM
              option(value=2) Force SFM
      .column
        h5.title.is-5 Voting
        .field
          .control
            input#voting.switch.is-success.is-small(type="checkbox" checked)
            label.label.is-small(for="voting") Voting
        .field
          .control
            label.label.is-small Mission Players
              +tooltip('Minimum number of players connected to show mission selection')
            input.input.is-small(type="number" value="1" min="1")
        .field
          .control
            label.label.is-small Vote Threshold (%)
              +tooltip('Percentage needed for vote to succeed')
            input.input.is-small(type="number" value="33" min="0")
      .column
        h5.title.is-5 Voice
        .field
          input#useVon.switch.is-success.is-small(type="checkbox" checked)
          label.label.is-small(for="useVon") Allow VoN
        .field
          label.label.is-small Codec
          .select.is-small
            select
              option(value=0) SPEEX
              option(value=1) OPUS
        .field
          .control
            label.label.is-small Codec Quality
              +tooltip('Quality of VoN codec. Range from 1-20')
            input.input.is-small(type="number" value="10" min="1" max="20")
    hr
    h5.title.is-5 Rules
    .columns
      .column.is-narrow
        .field
          label.label.is-small Verify Signatures
            +tooltip(`Enables or disables the signature verification for addons.`)
          .select.is-small
            select
              option(value=0) Default
              option(value=1) Weak
              option(value=2) Full
        .field
          label.label.is-small Allowed File Patching
            +tooltip(`Prevent or allow file patching for the clients`)
          .select.is-small
            select
              option(value=0) None
              option(value=1) Headless Only
              option(value=2) All
        .field
          input#kickdupes.switch.is-success.is-small(type="checkbox" checked)
          label.label.is-small(for="kickdupes") Kick Duplicates
            +tooltip('Do not allow duplicate game IDs. Another player with an existing ID will be kicked.')
      .column.is-narrow
        .field
          .control
            label.label.is-small
              input(type="checkbox")
              | Required Build
              +tooltip("Clients must have the required build to connect")
            input.input.is-small(type="number" value="0" min="0" disabled)
        .field
          .control
            label.label.is-small 
              input(type="checkbox")
              | Max Ping (ms)
            input.input.is-small(type="number" value="200" min="0" disabled)
        .field
          .control
            label.label.is-small 
              input(type="checkbox")
              | Disconnect Timeout (s)
            input.input.is-small(type="number" value="5" min="0" disabled)
      .column.is-narrow
        .field
          .control
            label.label.is-small
              input(type="checkbox")
              | Max Desync
            input.input.is-small(type="number" value="150" min="0" disabled)
        .field
          .control
            label.label.is-small 
              input(type="checkbox")
              | Max Packet Loss (%)
            input.input.is-small(type="number" value="50" min="0" disabled)
    hr
    .columns
      .column
        h5.title.is-5 Headless Clients  
          +tooltip("Headless clients are used to offload AI calculations from the server")
        .field
          .control
            label.label.is-small Remote Clients
              +tooltip("Clients that are remotely connnected as headless")
            textarea.textarea.is-small(rows="2" placeholder="One remote IP address per line")
        .field
          .control
            label.label.is-small Local Clients
              +tooltip("Clients with unlimited bandwidth and virtually no latency")
            textarea.textarea.is-small(rows="2" placeholder="One local IP address per line")
      .column
        h5.title.is-5 Administration
        .field
          .control
            label.label.is-small Admins
              +tooltip("Player UID whitelist for admin privileges")
            textarea.textarea.is-small(rows="7" placeholder="One player UID per line")
</template>

<script>
  export default {
    name: 'server-config'
  };
</script>
