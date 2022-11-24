<template>
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

    <v-card-text v-if="Object.keys(selectedWeapon).length > 0">
      <v-card>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th><!-- Headers --></th>
                <th class="text-left">STR</th>
                <th class="text-left">DEX</th>
                <th class="text-left">INT</th>
                <th class="text-left">FAI</th>
                <th class="text-left">ARC</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Reqs.</td>
                <td
                  v-for="(item, index) in tableData"
                  :key="item.reqStat"
                  :class="
                    getStatColor(item.reqStat, provided.stats[index].level)
                  "
                >
                  {{ selectedWeapon[item.reqStat] }}
                </td>
              </tr>

              <tr>
                <td>Scaling</td>
                <td
                  v-for="(item, index) in tableData"
                  :key="item.reqStat"
                  :class="
                    getStatColor(item.reqStat, provided.stats[index].level)
                  "
                >
                  {{ selectedWeapon[item.scaling] }}
                </td>
              </tr>

              <tr>
                <td><!-- Scaling letters --></td>
                <td
                  v-for="item, index in tableData"
                  :key="item.reqStat"
                  :class="
                    getStatColor(item.reqStat, provided.stats[index].level)
                  "
                >
                  {{ getScalingLetter(item.scalingStat) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  name: "WeaponDetails",

  inject: ["provided"],

  components: {},

  mounted() {
    this.weaponData = require("@/assets/TarnishedSpreadsheet/uniqueWeapons.json");
    this.scalingLetters = require("@/assets/TarnishedSpreadsheet/Scaling_Letters.json");
  },

  data: () => ({
    weaponData: [],
    scalingLetters: [],
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
    tableData: [
      { reqStat: "Required (Str)", scaling: "Str Scaling", scalingStat: "Str" },
      { reqStat: "Required (Dex)", scaling: "Dex Scaling", scalingStat: "Dex" },
      { reqStat: "Required (Int)", scaling: "Int Scaling", scalingStat: "Int" },
      { reqStat: "Required (Fai)", scaling: "Fai Scaling", scalingStat: "Fai" },
      { reqStat: "Required (Arc)", scaling: "Arc Scaling", scalingStat: "Arc" },
    ],
  }),

  methods: {
    getStatColor(reqStat, myStatLvl) {
      const statName = this.selectedWeapon[reqStat];

      if (Number(statName) == 0) {
        return "";
      } else if (myStatLvl >= Number(statName)) {
        return "sufficient-stat-req";
      } else {
        return "insufficient-stat-req";
      }
    },

    getScalingLetter(scalingStat) {
      let letter = "";

      for (let obj of this.scalingLetters) {
        let weaponName = "";

        if (this.selectedInfusion == "Standard") {
          weaponName = this.selectedWeapon.Name;
          if (obj.Name == weaponName) {
            if (this.upgradeLevel == 0) {
              letter = obj[scalingStat];
            } else {
              letter = obj[scalingStat + " +" + this.upgradeLevel];
            }
          }
        } else {
          weaponName = this.selectedInfusion + " " + this.selectedWeapon.Name;
          if (obj.Name == weaponName) {
            if (this.upgradeLevel == 0) {
              letter = obj[scalingStat];
            } else {
              letter = obj[scalingStat + " +" + this.upgradeLevel];
            }
          }
        }
      }

      return letter;
    },

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

    displayRequiredStat(stat) {
      return this.selectedWeapon[stat];
    },
  },

  computed: {
    weapons() {
      let weapons = [];
      for (let cat of this.provided.weaponCategories) {
        const found = this.weaponData.filter((w) => w["Weapon Type"] == cat);
        weapons.push(found);
      }
      return weapons.flat();
    },
  },

  watch: {
    provided: {
      handler(obj) {
        if (obj.weaponCategories.length == 0) {
          this.clearSelectedValues();
        }
      },
      deep: true,
    },
  },
};
</script>


<style>
.sufficient-stat-req {
  font-weight: bold;
  color: var(--v-success-base);
}

.insufficient-stat-req {
  font-weight: bold;
  color: var(--v-error-base);
}
</style>