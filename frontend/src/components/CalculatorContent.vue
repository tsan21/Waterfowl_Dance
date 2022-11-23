<template>
  <v-sheet min-height="70vh" rounded="lg" elevation="3">
    <v-card width="600px" style="display: flex; justify-content: space-between">
      <div style="width: 400px">
        <v-card-text style="display: flex; align-items: center">
          <v-img
            :src="require('@/assets/weaponIcon.png')"
            style="margin-right: 10px"
            max-height="25px"
            max-width="25px"
          >
          </v-img>
          <v-autocomplete
            label="Weapon"
            :items="weapons"
            item-text="Name"
            return-object
            v-model="selectedWeapon"
          >
            <template v-slot:no-data>
              <div class="px-4">Please select weapon categories</div>
            </template>
          </v-autocomplete>
        </v-card-text>

        <v-card-text style="display: flex; align-items: center">
          <v-img
            :src="require('@/assets/smithingStone.png')"
            style="margin-right: 10px"
            max-height="25px"
            max-width="25px"
          >
          </v-img>
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
      </div>

      <v-card-text style="width: 200px">
        <v-img
          max-height="200px"
          max-width="200px"
          :src="
            Object.keys(selectedWeapon).length > 0
              ? require('@/assets/images/weapons/' +
                  `${selectedWeapon['Image ID']}` +
                  '.png')
              : require('@/assets/weaponPlaceholder.png')
          "
        >
        </v-img>
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
    this.weaponData = require("@/assets/TarnishedSpreadsheet/Raw_Data.json");

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
    upgradeLevel: 0,
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