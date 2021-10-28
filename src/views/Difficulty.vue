<template lang="pug">
  #difficulty
    p.title.is-5 Difficulty
    p.subtitle.is-6 Select a preset or define custom below
    .field.is-grouped
      p.control
        a.button.is-warning(
          :class="{ 'is-outlined': !isActive('recruit')}"
          @click="setDifficulty('recruit')"
        ) Recruit
      p.control
        a.button.is-warning(
          :class="{ 'is-outlined': !isActive('regular')}"
          @click="setDifficulty('regular')"
        ) Regular
      p.control
        a.button.is-warning(
          :class="{ 'is-outlined': !isActive('veteran')}"
          @click="setDifficulty('veteran')"
        ) Veteran
      p.control
        a.button.is-warning(
          :class="{ 'is-outlined': !isActive('custom')}"
          @click="setDifficulty('custom')"
        ) Custom
    hr
    p.title.is-5 Simulation
    .field.is-horizontal
      .field-label.is-small
        label.label.is-small AI Preset
      .field-body
        .field
          .control
            .select.is-small
              select(v-model="aiPreset" :disabled="!isActive('custom')")
                option(:value=0) Low
                option(:value=1) Normal
                option(:value=2) High
                option(:value=3) Custom
        .field
          .control
            input#rd.switch.is-success.is-small(type="checkbox" v-model="reducedDamage" :disabled="!isActive('custom')")
            label.label.is-small(for="rd") Reduced Damage
    .field.is-horizontal
      .field-label.is-small
        label.label AI Skill
      .field-body
        .field
          .control
            input.slider.is-fullwidth.is-warning.has-output(
              step="1"
              min="0"
              max="100"
              type="range"
              v-model="skill"
              :disabled="!isActive('custom') || aiPreset !== 3"
            )
            output.output {{ skill }}
    .field.is-horizontal
      .field-label.is-small
        label.label AI Precision
      .field-body
        .field
          .control
            input.slider.is-fullwidth.is-warning.has-output(
              step="1"
              min="0"
              max="100"
              type="range"
              v-model="precision"
              :disabled="!isActive('custom') || aiPreset !== 3"
            )
            output.output {{ precision }}

    hr
    p.title.is-5 Situational Awareness
    .columns.fix-fields
      .column
        .field.is-horizontal
          .field-label.is-small
            label.label Group&nbsp;Indicators
          .field-body
            .field
              .control
                .select.is-small
                  select(v-model="group" :disabled="!isActive('custom')")
                    option(:value=0) Hide
                    option(:value=1) Limited Distance
                    option(:value=2) Show
        .field.is-horizontal
          .field-label.is-small
            label.label Friendly&nbsp;Name&nbsp;Tags
          .field-body
            .field
              .control
                .select.is-small
                  select(v-model="fTags" :disabled="!isActive('custom')")
                    option(:value=0) Hide
                    option(:value=1) Limited Distance
                    option(:value=2) Show
        .field.is-horizontal
          .field-label.is-small
            label.label Enemy&nbsp;Name&nbsp;Tags
          .field-body
            .field
              .control
                .select.is-small
                  select(v-model="eTags" :disabled="!isActive('custom')")
                    option(:value=0) Hide
                    option(:value=1) Limited Distance
                    option(:value=2) Show
        .field.is-horizontal
          .field-label.is-small
            label.label(for="ping") Tactical Ping
          .field-body
            .field
              .control
                input#ping.switch.is-success.is-small(type="checkbox" v-model="ping" :disabled="!isActive('custom')")
                label(for="ping")
      .column
        .field.is-horizontal
          .field-label.is-small
            label.label Detect&nbsp;Mines
          .field-body
            .field
              .control
                .select.is-small
                  select(v-model="mines" :disabled="!isActive('custom')")
                    option(:value=0) Hidden
                    option(:value=1) Limited Distance
                    option(:value=2) Show
        .field.is-horizontal
          .field-label.is-small
            label.label Commands
          .field-body
            .field
              .control
                .select.is-small
                  select(v-model="commands" :disabled="!isActive('custom')")
                    option(:value=0) Hide
                    option(:value=1) Fade out
                    option(:value=2) Show
        .field.is-horizontal
          .field-label.is-small
            label.label Waypoints
          .field-body
            .field
              .control
                .select.is-small
                  select(v-model="waypoints" :disabled="!isActive('custom')")
                    option(:value=0) Hide
                    option(:value=1) Fade out
                    option(:value=2) Show
    hr
    p.title.is-5 Personal Awareness
    .columns.fix-fields
      .column
        .field.is-horizontal
          .field-label.is-small
            label.label Weapon&nbsp;Information
          .field-body
            .field
              .control
                .select.is-small
                  select(v-model="weapon" :disabled="!isActive('custom')")
                    option(:value=0) Hide
                    option(:value=1) Fade out
                    option(:value=2) Show
        .field.is-horizontal
          .field-label.is-small
            label.label Stance&nbsp;Indicator
          .field-body
            .field
              .control
                .select.is-small
                  select(v-model="stance" :disabled="!isActive('custom')")
                    option(:value=0) Hide
                    option(:value=1) Fade out
                    option(:value=2) Show
        .field.is-horizontal
          .field-label.is-small
            label.label(for="vision") Vision Aid
          .field-body
            .field
              .control
                input#vision.switch.is-success.is-small(type="checkbox" v-model="vision" :disabled="!isActive('custom')")
                label(for="vision")
      .column
        .field.is-horizontal
          .field-label.is-small
            label.label(for="stamina") Stamina Bar
          .field-body
            .field
              .control
                input#stamina.switch.is-success.is-small(type="checkbox" v-model="stamina" :disabled="!isActive('custom')")
                label(for="stamina")
        .field.is-horizontal
          .field-label.is-small
            label.label(for="crosshair") Crosshair
          .field-body
            .field
              .control
                input#crosshair.switch.is-success.is-small(type="checkbox" v-model="crosshair" :disabled="!isActive('custom')")
                label(for="crosshair")
    hr
    .columns.fix-fields
      .column
        p.title.is-5 View
        .field.is-horizontal
          .field-label.is-small
            label.label(for="thirdperson") 3rd&nbsp;Person&nbsp;View
          .field-body
            .field
              .control
                input#thirdperson.switch.is-success.is-small(type="checkbox" v-model="thirdperson" :disabled="!isActive('custom')")
                label(for="thirdperson")
        .field.is-horizontal
          .field-label.is-small
            label.label(for="shake") Camera&nbsp;Shake
          .field-body
            .field
              .control
                input#shake.switch.is-success.is-small(type="checkbox" v-model="shake" :disabled="!isActive('custom')")
                label(for="shake")
      .column
        p.title.is-5 Multiplayer
        .field.is-horizontal
          .field-label.is-small
            label.label(for="score") Score&nbsp;Table
          .field-body
            .field
              .control
                input#score.switch.is-success.is-small(type="checkbox" v-model="score" :disabled="!isActive('custom')")
                label(for="score")
        .field.is-horizontal
          .field-label.is-small
            label.label(for="death") Death&nbsp;Messages
          .field-body
            .field
              .control
                input#death.switch.is-success.is-small(type="checkbox" v-model="death" :disabled="!isActive('custom')")
                label(for="death")
        .field.is-horizontal
          .field-label.is-small
            label.label(for="vonid") VON&nbsp;ID
          .field-body
            .field
              .control
                input#vonid.switch.is-success.is-small(type="checkbox" v-model="vonid" :disabled="!isActive('custom')")
                label(for="vonid")
    hr
    p.title.is-5 Miscellaneous
    .columns.fix-fields
      .column
        .field.is-horizontal
          .field-label.is-small
            label.label(for="mapcontent") Map&nbsp;Content
          .field-body
            .field
              .control
                input#mapcontent.switch.is-success.is-small(type="checkbox" v-model="mapcontent" :disabled="!isActive('custom')")
                label(for="mapcontent")
        .field.is-horizontal
          .field-label.is-small
            label.label(for="autoreport") Auto&nbsp;Reporting
          .field-body
            .field
              .control
                input#autoreport.switch.is-success.is-small(type="checkbox" v-model="autoreport" :disabled="!isActive('custom')")
                label(for="autoreport")
      .column
        .field.is-horizontal
          .field-label.is-small
            label.label(for="saves") Multiple&nbsp;Saves
          .field-body
            .field
              .control
                input#saves.switch.is-success.is-small(type="checkbox" v-model="saves" :disabled="!isActive('custom')")
                label(for="saves")
</template>

<script>
  export default {
    name: 'difficulty',
    computed: {
      difficulty() {
        return this.$store.state.difficulty.current;
      },
      skill: {
        get() { return Math.round(this.$store.state.difficulty.skill * 100); },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['skill', v / 100]); }
      },
      precision: {
        get() { return Math.round(this.$store.state.difficulty.precision * 100); },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['precision', v / 100]); }
      },
      aiPreset: {
        get() { return this.$store.state.difficulty.aiPreset; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['aiPreset', v]); }
      },
      reducedDamage: {
        get() { return this.$store.state.difficulty.reducedDamage; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['reducedDamage', v]); }
      },
      group: {
        get() { return this.$store.state.difficulty.groupIndicators; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['groupIndicators', v]); }
      },
      fTags: {
        get() { return this.$store.state.difficulty.friendlyTags; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['friendlyTags', v]); }
      },
      eTags: {
        get() { return this.$store.state.difficulty.enemyTags; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['enemyTags', v]); }
      },
      mines: {
        get() { return this.$store.state.difficulty.detectedMines; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['detectedMines', v]); }
      },
      commands: {
        get() { return this.$store.state.difficulty.commands; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['commands', v]); }
      },
      waypoints: {
        get() { return this.$store.state.difficulty.waypoints; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['waypoints', v]); }
      },
      ping: {
        get() { return this.$store.state.difficulty.tacticalPing; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['tacticalPing', v]); }
      },
      weapon: {
        get() { return this.$store.state.difficulty.weaponInfo; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['weaponInfo', v]); }
      },
      stance: {
        get() { return this.$store.state.difficulty.stanceIndicator; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['stanceIndicator', v]); }
      },
      vision: {
        get() { return this.$store.state.difficulty.visionAid; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['visionAid', v]); }
      },
      stamina: {
        get() { return this.$store.state.difficulty.staminaBar; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['staminaBar', v]); }
      },
      crosshair: {
        get() { return this.$store.state.difficulty.weaponCrosshair; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['weaponCrosshair', v]); }
      },
      thirdperson: {
        get() { return this.$store.state.difficulty.thirdPersonView; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['thirdPersonView', v]); }
      },
      shake: {
        get() { return this.$store.state.difficulty.cameraShake; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['cameraShake', v]); }
      },
      score: {
        get() { return this.$store.state.difficulty.scoreTable; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['scoreTable', v]); }
      },
      death: {
        get() { return this.$store.state.difficulty.deathMessages; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['deathMessages', v]); }
      },
      vonid: {
        get() { return this.$store.state.difficulty.vonID; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['vonID', v]); }
      },
      mapcontent: {
        get() { return this.$store.state.difficulty.mapContent; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['mapContent', v]); }
      },
      autoreport: {
        get() { return this.$store.state.difficulty.autoReport; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['autoReport', v]); }
      },
      saves: {
        get() { return this.$store.state.difficulty.multipleSaves; },
        set(v) { this.$store.commit('UPDATE_DIFFICULTY', ['multipleSaves', v]); }
      }
    },
    methods: {
      isActive(difficulty) {
        return this.difficulty === difficulty;
      },
      setDifficulty(difficulty) {
        if (this.difficulty === difficulty) return;
        this.$store.commit('UPDATE_DIFFICULTY', ['current', difficulty]);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .field.is-horizontal {
    align-items: baseline;
  }
  .output {
    background-color: #4a4a4a !important;
    color: inherit !important;
    margin-left: .75rem !important;
    top: 0.3rem !important;
  }
  .columns.fix-fields .field-body {
    flex-grow: 1;
  }
</style>

