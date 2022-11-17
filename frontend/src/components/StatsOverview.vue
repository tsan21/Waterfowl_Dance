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
          :label="stat.name"
          v-model="stat.level"
        ></v-text-field>
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
    stats: [
      { name: "Strength", level: null },
      { name: "Dexterity", level: null },
      { name: "Intelligence", level: null },
      { name: "Faith", level: null },
      { name: "Arcane", level: null },
    ],
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