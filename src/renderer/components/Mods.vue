<template lang="pug">
  #missions
    .columns
      .column
        p.title.is-5 Mods
        p.subtitle.is-6 Manage server modifications
      .column.is-narrow
        p.is-size-7 Selected #[b {{ selectedCount }}] of #[b {{ modCount }}] mods
    .columns.no-margin-bottom
      .column
        .field.has-addons
          p.control
            a.button.is-small.is-info(@click="selectAll")
              span.icon
                i.fa.fa-check-square-o
              span.text Select All
          p.control
            a.button.is-small.is-info(@click="deselectAll")
              span.icon
                i.fa.fa-square-o
              span.text Deselect All
          p.control
            a.button.is-small.is-info(@click="invert")
              span.icon
                i.fa.fa-adjust
              span.text Invert
      .column.is-narrow
        .field
          p.control.has-icons-left
            input.input.is-small(type="text" placeholder="Search..." v-model.trim="search")
            span.icon.is-small.is-left
              i.fa.fa-search
    table.table.is-fullwidth
      thead
        tr
          th
          th Mod
          th Steam
      draggable.table-list(v-model="mods" :options="options" element="tbody")
        tr(
          v-for="(mod, index) in mods"
          :key="mod.name"
          :class="{isHidden: missesSearch(mod.name)}"
        )
          td
            span.drag-handle
              i.fa.fa-bars
          td
            input.is-checkbox.is-white.is-small(
              type="checkbox"
              :checked="mod.enabled"
            )
            label(@click="toggleMod(index)")
              | {{ mod.name | decode }}
          td
            i.fa.fa-steam(v-if="mod.isSteam")
    .columns
      .column
        p.hint
          | Use #[i.fa.fa-bars] to change the load order of the mods.
          br
          | Click on a mod #[i.fa.fa-check] to enable / disable.
          br
          | #[i.fa.fa-steam] denotes a Steam Workshop modification.
</template>

<script>
  import Draggable from 'vuedraggable';
  
  export default {
    name: 'missions',
    mounted() {
      const $table = $('table');
      const $bodyCells = $table.find('tbody tr:first').children();

      const colWidth = $bodyCells.map(function map() {
        return $(this).width();
      }).get();

      $table.find('thead tr').children().each((i, v) => {
        $(v).width(colWidth[i]);
      });
    },
    data() {
      return {
        search: '',
        options: {
          handle: '.drag-handle',
          ghostClass: 'ghost',
          animation: 0
        }
      };
    },
    computed: {
      mods: {
        get() {
          return this.$store.state.mods.available;
        },
        set(mods) {
          this.$store.commit('UPDATE_MODS', mods);
        }
      },
      modCount() {
        return this.mods.length;
      },
      selectedCount() {
        return this.mods.reduce((count, mod) => {
          if (mod.enabled) count += 1;
          return count;
        }, 0);
      }
    },
    methods: {
      toggleMod(i) {
        this.$store.commit('TOGGLE_MOD', i);
      },
      selectAll() {
        this.$store.commit('TOGGLE_ALL_MODS', true);
      },
      deselectAll() {
        this.$store.commit('TOGGLE_ALL_MODS', false);
      },
      invert() {
        this.$store.commit('INVERT_MODS');
      },
      missesSearch(name) {
        if (this.search === '') return false;
        const re = new RegExp(this.search, 'ig');
        return !name.match(re);
      }
    },
    filters: {
      decode(name) {
        return decodeURIComponent(name);
      }
    },
    components: { Draggable }
  };
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/initial-variables";
  
  $check-green: #2fff78;

  td:nth-child(1) { width: 5% }
  td:nth-child(2) { width: 85% }
  td:nth-child(3) { width: 10% }
  .is-checkbox[type="checkbox"].is-white:checked + label::after {
    border-color: $check-green !important;
  }
  .button .text { margin-bottom: 1px }
</style>

