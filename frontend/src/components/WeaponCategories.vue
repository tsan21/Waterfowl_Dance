<template>
  <v-sheet rounded="lg" elevation="3">
    <v-card flat>
      <v-card-text class="pa-0">
        <v-container fluid>
          <v-row dense no-gutters>
            <v-col v-for="cat in categories" :key="cat" cols="6" sm="3" md="2">
              <v-checkbox
                dense
                :label="cat"
                v-model="selected"
                :value="cat"
                color="primary"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
    
    <script>
export default {
  name: "WeaponCategories",

  components: {},

  mounted() {},

  data: () => ({
    selected: [],
    categories: [
      "Axes",
      "Ballistae",
      "Bows",
      "Claws",
      "Colossal Swords",
      "Colossal Weapons",
      "Crossbows",
      "Curved Greatswords",
      "Curved Swords",
      "Daggers",
      "Fists",
      "Flails",
      "Glintstone Staffs",
      "Greataxes",
      "Greatbows",
      "Great Spears",
      "Greatswords",
      "Halberds",
      "Hammers",
      "Heavy Thrusting Swords",
      "Katanas",
      "Light Bows",
      "Reapers",
      "Sacred Seals",
      "Spears",
      "Straight Swords",
      "Thrusting Swords",
      "Torchs",
      "Twinblades",
      "Warhammers",
      "Whips",
    ],
  }),

  methods: {},
};
</script>