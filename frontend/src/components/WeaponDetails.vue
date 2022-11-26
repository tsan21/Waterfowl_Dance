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
        v-model="baseWeapon"
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
        Object.keys(baseWeapon).length > 0 && baseWeapon['Infusable'] == 'Yes'
      "
    >
      <v-autocomplete
        label="Infusion"
        v-model="selectedInfusion"
        :items="infusions"
      >
      </v-autocomplete>
    </v-card-text>

    <v-card-text v-if="Object.keys(finalWeapon).length > 0">
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
                  {{ finalWeapon[item.reqStat] }}
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
                  {{ finalWeapon[item.scaling] }}
                </td>
              </tr>

              <tr>
                <td><!-- Scaling letters --></td>
                <td
                  v-for="(item, index) in tableData"
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
import Calculator from "@/services/calculator";
import ReinforceParamWeaponModel from "@/models/reinforceParamWeaponModel";

const calculator = new Calculator();

export default {
  name: "WeaponDetails",

  inject: ["provided"],

  components: {},

  mounted() {
    this.weaponData = require("@/assets/TarnishedSpreadsheet/uniqueWeapons.json");
    this.scalingLetters = require("@/assets/TarnishedSpreadsheet/Scaling_Letters.json");
    this.rawData = require("@/assets/TarnishedSpreadsheet/Raw_Data.json");

    calculator.test();
  },

  data: () => ({
    weaponData: [],
    scalingLetters: [],
    rawData: [],
    baseWeapon: {},
    finalWeapon: {},
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
      const requiredStat = this.finalWeapon[reqStat];

      if (Number(requiredStat) == 0) {
        return "";
      } else if (myStatLvl >= Number(requiredStat)) {
        return "sufficient-stat-req";
      } else {
        return "insufficient-stat-req";
      }
    },

    getScalingLetter(scalingStat) {
      let letter = "";
      let weaponName = "";

      if (this.selectedInfusion == "Standard") {
        weaponName = this.baseWeapon.Name;
      } else {
        weaponName = this.selectedInfusion + " " + this.baseWeapon.Name;
      }

      for (let obj of this.scalingLetters) {
        if (obj.Name == weaponName) {
          if (this.upgradeLevel == 0) {
            letter = obj[scalingStat];
          } else {
            letter = obj[scalingStat + " +" + this.upgradeLevel];
          }
        }
      }

      return letter;
    },

    getUpgradeLevels() {
      let levels = [];
      const prefix = "+ ";
      const maxUpgradeLevel = Number(this.baseWeapon["Max Upgrade"]) + 1;

      if (this.baseWeapon) {
        for (let i = 0; i < maxUpgradeLevel; i++) {
          levels.push({ prefix: prefix, value: i });
        }
      }
      return levels;
    },

    clearSelectedValues() {
      this.baseWeapon = {};
      this.finalWeapon = {};
      this.upgradeLevel = 0;
      this.selectedInfusion = "Standard";
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

    reinforceParamWeapon() {
      const reinforceParamWeaponModel = new ReinforceParamWeaponModel(
        this.finalWeapon["Reinforce Type ID"],
        this.finalWeapon["Physical Attack"],
        this.finalWeapon["Magic Attack"],
        this.finalWeapon["Fire Attack"],
        this.finalWeapon["Lightning Attack"],
        this.finalWeapon["Holy Attack"],
        this.finalWeapon["Stamina Attack"],
        this.finalWeapon["Str Scaling"],
        this.finalWeapon["Dex Scaling"],
        this.finalWeapon["Int Scaling"],
        this.finalWeapon["Fai Scaling"],
        this.finalWeapon["Arc Scaling"]
      );
      calculator.reinforceParamWeapon(reinforceParamWeaponModel, 123)
      return reinforceParamWeaponModel;
    },
  },

  watch: {
    provided: {
      handler(selected) {
        if (selected.weaponCategories.length == 0) {
          this.clearSelectedValues();
        }
      },
      deep: true,
    },

    baseWeapon(val) {
      this.selectedInfusion = "Standard";
      this.finalWeapon = val;
    },

    selectedInfusion(newInfusion) {
      let weaponName = "";

      if (newInfusion == "Standard") {
        weaponName = this.baseWeapon.Name;
      } else {
        weaponName = newInfusion + " " + this.baseWeapon.Name;
      }

      if (Object.keys(this.baseWeapon).length > 0) {
        this.finalWeapon = this.rawData.find((w) => w.Name == weaponName);
      }
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