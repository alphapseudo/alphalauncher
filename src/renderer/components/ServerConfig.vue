<template lang="pug">
  #general
    h2.subtitle General
    .field.is-horizontal
      .field-body
        .field.is-expanded
          p.control
            label.label.is-small Server
            input.input.is-small(type="text" maxlength="255" placeholder="Hostname")
        .field.is-narrow
          p.control
            label.label.is-small Port
            input.input.is-small(type="number" value="2302" placeholder="Port")
        .field
          p.control
            label.label.is-small Max Players
            input.input.is-small(type="number" value="8" min="1")
    .field.is-horizontal
      .field-body
        .field
          p.control
            label.label.is-small Server Password
            input.input.is-small(type="password" placeholder="Client connection password")
        .field
          p.control
            label.label.is-small Admin Password
            input.input.is-small(type="password" placeholder="Server admin password")
    .field
      input#useVon.switch.is-success.is-small(type="checkbox" name="von" checked)
      label.label.is-small(for="useVon") Allow VON
    
</template>

<script>
  export default {
    name: 'server-config'
  };
</script>

<style>
</style>
