<template>
  <v-sheet min-height="20vh" rounded="lg" elevation="3">
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                label="red"
                color="red"
                value="red"
                hide-details
              ></v-checkbox>
              <v-checkbox
                label="red darken-3"
                color="red darken-3"
                value="red darken-3"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                label="indigo"
                color="indigo"
                value="indigo"
                hide-details
              ></v-checkbox>
              <v-checkbox
                label="indigo darken-3"
                color="indigo darken-3"
                value="indigo darken-3"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                label="orange"
                color="orange"
                value="orange"
                hide-details
              ></v-checkbox>
              <v-checkbox
                label="orange darken-3"
                color="orange darken-3"
                value="orange darken-3"
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
    categories: [
      "Axe",
      "Ballista",
      "Bow",
      "Claw",
      "Colossal Sword",
      "Colossal Weapon",
      "Crossbow",
      "Curved Greatsword",
      "Curved Sword",
      "Dagger",
      "Fist",
      "Flail",
      "Glintstone Staff",
      "Greataxe",
      "Greatbow",
      "Great Spear",
      "Greatsword",
      "Halberd",
      "Hammer",
      "Heavy Thrusting Sword",
      "Katana",
      "Light Bow",
      "Reaper",
      "Sacred Seal",
      "Spear",
      "Straight Sword",
      "Thrusting Sword",
      "Torch",
      "Twinblade",
      "Warhammer",
      "Whip",
    ],
  }),

  methods: {},
};
</script>