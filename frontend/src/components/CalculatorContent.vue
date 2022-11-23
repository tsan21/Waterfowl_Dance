<template>
  <v-sheet min-height="70vh" rounded="lg" elevation="3">
    <v-card width="600px" rounded="lg">
      <v-app-bar dark elevation="1" color="main" dense>
        Weapon Details
      </v-app-bar>

      <v-card-text>
        <v-autocomplete
          label="Weapon"
          :items="weapons"
          item-text="Name"
          return-object
          v-model="selectedWeapon"
        >
          <template v-slot:no-data>
            <div class="px-4">Select at least 1 weapon category</div>
          </template>
        </v-autocomplete>
      </v-card-text>

      <v-card-text>
        <v-autocomplete
          label="Upgrade level"
          :items="getUpgradeLevels()"
          :item-text="(item) => item.prefix + item.value"
          item-value="value"
          v-model="upgradeLevel"
        >
          <template v-slot:no-data>
            <div class="px-4">Select a weapon</div>
          </template>
        </v-autocomplete>
      </v-card-text>

      <v-card-text
        v-if="
          Object.keys(selectedWeapon).length > 0 &&
          selectedWeapon['Infusable'] == 'Yes'
        "
      >
        <v-autocomplete
          label="Infusion"
          v-model="selectedInfusion"
          :items="infusions"
        >
        </v-autocomplete>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
  

<script>
export default {
  name: "CalculatorContent",

  props: {
    selectedWeaponCategories: Array,
  },

  components: {},

  mounted() {
    this.weaponData = require("@/assets/TarnishedSpreadsheet/uniqueWeapons.json");

    // for (let cat of this.selectedWeaponCategories) {
    //   const a = this.weaponsData.find((w) => w['Weapon Type'] == cat);
    //   if(a){
    //     console.log(a);
    //   }
    //   console.log(cat);
    // }
  },

  data: () => ({
    weaponData: [],
    selectedWeapon: {},
    selectedInfusion: "Standard",
    upgradeLevel: 0,
    infusions: [
      "Standard",
      "Heavy",
      "Keen",
      "Quality",
      "Fire",
      "Flame Art",
      "Lightning",
      "Sacred",
      "Magic",
      "Cold",
      "Poison",
      "Blood",
      "Occult",
    ],
  }),

  methods: {
    getUpgradeLevels() {
      let levels = [];
      const prefix = "+ ";
      const maxUpgradeLevel = Number(this.selectedWeapon["Max Upgrade"]) + 1;

      if (this.selectedWeapon) {
        for (let i = 0; i < maxUpgradeLevel; i++) {
          levels.push({ prefix: prefix, value: i });
        }
      }
      return levels;
    },

    clearSelectedValues() {
      this.selectedWeapon = {};
      this.upgradeLevel = 0;
    },
  },

  computed: {
    weapons() {
      let weapons = [];
      for (let cat of this.selectedWeaponCategories) {
        const found = this.weaponData.filter((w) => w["Weapon Type"] == cat);
        weapons.push(found);
      }
      return weapons.flat();
    },
  },

  watch: {
    selectedWeaponCategories(categories) {
      if (categories.length == 0) {
        this.clearSelectedValues();
      }
    },
  },
};
</script>


<style>
.select-weapon-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.weapon-img {
  width: 5%;
  margin-right: 10px;
}

.select-weapon-autocomplete {
  width: 90%;
}
</style>