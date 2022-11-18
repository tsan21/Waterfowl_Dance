<template>
  <v-sheet rounded="lg" elevation="3">
    <v-list color="transparent">
      <br />
      <v-list-item v-for="stat in stats" :key="stat.name">
        <v-text-field
          color="primary"
          type="number"
          outlined
          dense
          :min="baseLevel"
          :max="maxLevel"
          :label="stat.name"
          v-model="stat.level"
          @change="
            stat.level < baseLevel
              ? (stat.level = baseLevel)
              : stat.level > maxLevel
              ? (stat.level = maxLevel)
              : (stat.level = $event)
          "
        ></v-text-field>
      </v-list-item>

      <v-list-item style="justify-content: center">
        <span class="v-label theme--light left-gap2">1 Hand</span>
        <v-switch
          class="left-gap"
          v-model="twoHanded"
          label="2 Hand"
        ></v-switch>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item color="grey lighten-4">
        <v-btn @click="setStats" width="100%" text color="primary">Reset</v-btn>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>


<script>
export default {
  name: "StatsOverview",

  components: {},

  mounted() {
    this.setStats();
  },

  data: () => ({
    baseLevel: 10,
    maxLevel: 99,
    stats: [
      { name: "Strength", level: null },
      { name: "Dexterity", level: null },
      { name: "Intelligence", level: null },
      { name: "Faith", level: null },
      { name: "Arcane", level: null },
    ],
    twoHanded: false,
  }),

  methods: {
    setStats() {
      for (let stat of this.stats) {
        stat.level = this.baseLevel;
      }
    },
  },
};
</script>


<style>
.left-gap {
  margin-left: 10px;
}

.left-gap2 {
  margin-left: -5px;
}
</style>