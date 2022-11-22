<template>
  <v-sheet rounded="lg" elevation="3">
    <v-card flat>
      <v-card-text class="pa-0">
        <v-container fluid>
          <v-row dense no-gutters>
            <v-col v-for="cat in categories" :key="cat" cols="6" sm="3" md="2">
              <v-checkbox
                dense
                :label="getPlural(cat)"
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

  mounted() {
    // let a = require("@/assets/TarnishedSpreadsheet/Raw_Data.json");
    // let cats = [];
    // for (let b of a.filter(
    //   (val1, index, arr) =>
    //     arr.findIndex((val2) => val2["Weapon Type"] === val1["Weapon Type"]) ===
    //     index
    // )) {
    //   cats.push(b["Weapon Type"]);
    // }
    // console.log(cats);
  },

  data: () => ({
    selected: [],
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
      "Great Hammer",
      "Great Spear",
      "Greataxe",
      "Greatbow",
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
      "Whip",
    ],
  }),

  methods: {
    setSelectedWeaponCategories() {
      this.$emit("setSelectedWeaponCategories", this.selected);
    },

    getPlural(weaponCategory) {
      let plural = "";

      if (weaponCategory == "Ballista") {
        plural = "Ballistae";
      } else if (weaponCategory == "Glintstone Staff") {
        plural = "Glintstone Staves";
      } else if (weaponCategory == "Torch") {
        plural = "Torches";
      } else {
        plural = weaponCategory + "s";
      }

      return plural;
    },
  },

  computed: {},

  watch: {
    selected(weaponCategories) {
      this.setSelectedWeaponCategories(weaponCategories);
    },
  },
};
</script>