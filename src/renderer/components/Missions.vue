<template lang="pug">
  #missions
    .columns
      .column
        p.title.is-5 Missions
        p.subtitle.is-6 Create server mission rotation
      .column.is-narrow
        p.is-size-7 Selected #[b {{ selectedCount }}] of #[b {{ missionCount }}] missions
    .columns.no-margin-bottom
      .column
        .field.has-addons
          p.control
            a.button.is-small.is-info(@click="selectAll" :disabled="!hasMissions")
              span.icon
                i.fa.fa-check-square-o
              span.text Select
          p.control
            a.button.is-small.is-info(@click="deselectAll" :disabled="!hasMissions")
              span.icon
                i.fa.fa-square-o
              span.text Deselect
          p.control
            a.button.is-small.is-info(@click="invert" :disabled="!hasMissions")
              span.icon
                i.fa.fa-adjust
              span.text Invert
          p.control
            a.button.is-small.is-success(@click="refresh")
              span.icon(v-tippy="{delay: 500}" title="Refresh mission list")
                i.fa.fa-refresh(:class="{'fa-spin': isRefreshing}")
      .column.is-narrow
        .field
          p.control.has-icons-left
            input.input.is-small(type="text" placeholder="Search..." v-model.trim="search" :disabled="!hasMissions")
            span.icon.is-small.is-left
              i.fa.fa-search
    table.table.is-fullwidth(v-if="hasMissions")
      thead
        tr
          th
          th Mission
          th Map
          th Difficulty
      draggable.table-list(v-model="missions" :options="options" element="tbody")
        tr(
          v-for="(mission, index) in missions"
          :key="mission.name"
          :class="{isHidden: missesSearch(mission.name)}"
        )
          td
            span.drag-handle
              i.fa.fa-bars
          td
            input.is-checkbox.is-white.is-small(
              type="checkbox"
              :checked="mission.enabled"
            )
            label(@click="toggleMission(index)")
              | {{ mission.name | decode }}
          td {{ mission.level }}
          td
            .select.is-small
              select(:value="mission.difficulty" @change="changeDifficulty(index, $event)")
                option(value="recruit") Recruit
                option(value="regular") Regular
                option(value="veteran") Veteran
                option(value="custom") Custom
    .centered-placeholder(v-else)
      p.title.is-6 No Missions Found
      p.subtitle.is-7 Add missions to your #[b MPMissions] directory
    .columns
      .column
        p.hint
          | Use #[i.fa.fa-bars] to change the order of the list.
          br
          | Click on a mission #[i.fa.fa-check] to include it in the rotation.
      .column.is-narrow
          p.difficulty.is-size-7 Set Global Difficulty
          .field.has-addons
            p.control
              a.button.is-small.is-warning.is-outlined(
                @click="globalDifficulty('recruit')"
                :disabled="!hasMissions"
              )
                | Recruit
            p.control
              a.button.is-small.is-warning.is-outlined(
                @click="globalDifficulty('regular')"
                :disabled="!hasMissions"
              )
                | Regular
            p.control
              a.button.is-small.is-warning.is-outlined(
                @click="globalDifficulty('veteran')"
                :disabled="!hasMissions"
              )
                | Veteran
            p.control
              a.button.is-small.is-warning.is-outlined(
                @click="globalDifficulty('custom')"
                :disabled="!hasMissions"  
              )
                | Custom
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
        isRefreshing: false,
        options: {
          handle: '.drag-handle',
          ghostClass: 'ghost',
          animation: 0
        }
      };
    },
    computed: {
      missions: {
        get() {
          return this.$store.state.missions.available;
        },
        set(missions) {
          this.$store.commit('REORDER_MISSIONS', missions);
        }
      },
      missionCount() {
        return this.missions.length;
      },
      selectedCount() {
        return this.missions.reduce((count, mission) => {
          if (mission.enabled) count += 1;
          return count;
        }, 0);
      },
      hasMissions() {
        return this.missionCount > 0;
      }
    },
    methods: {
      toggleMission(i) {
        this.$store.commit('TOGGLE_MISSION', i);
      },
      selectAll() {
        this.$store.commit('TOGGLE_ALL_MISSIONS', true);
      },
      deselectAll() {
        this.$store.commit('TOGGLE_ALL_MISSIONS', false);
      },
      invert() {
        this.$store.commit('INVERT_MISSIONS');
      },
      changeDifficulty(index, e) {
        this.$store.commit('CHANGE_DIFFICULTY', { index, value: e.target.value });
      },
      globalDifficulty(value) {
        this.$store.commit('CHANGE_ALL_DIFFICULTY', value);
      },
      missesSearch(name) {
        if (this.search === '') return false;
        const re = new RegExp(this.search, 'ig');
        return !name.match(re);
      },
      async refresh() {
        try {
          this.isRefreshing = true;
          await this.$store.dispatch('REFRESH_MISSIONS');
          this.$toasted.success('Missions Successfully Refreshed');
        } catch (e) {
          this.$toasted.error('Error reading \'MPMissions\'. Please check permissions');
        }

        setTimeout(() => {
          this.isRefreshing = false;
        }, 500);
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

  #missions {
    select { 
      background: rgba(240, 248, 255, 0);
      border: 0;
      option { background: $black-ter }
      &:focus { box-shadow: none }
    }
  }
  td:nth-child(1) { width: 5% }
  td:nth-child(2) { width: 85% }
  td:nth-child(3) { width: 5% }
  td:nth-child(4) { width: 5% }
  .is-checkbox[type="checkbox"].is-white:checked + label::after {
    border-color: $check-green !important;
  }
  .button .text { margin-bottom: 1px }
  .difficulty { margin-bottom: 0.2rem }
</style>

