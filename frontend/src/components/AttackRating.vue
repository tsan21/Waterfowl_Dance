<template>
  <v-card rounded="lg">
    <v-app-bar dark elevation="1" color="main" dense> Attack Rating </v-app-bar>

    <v-card-text
      v-for="item in attackRatings"
      :key="item.dmgType"
      style="display: flex; justify-content: space-between"
    >
      <div>{{ item.dmgType }}</div>
      <div>{{ calcAttackRatingFor(item.dmgType) }}</div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text style="display: flex; justify-content: space-between">
      <b>Total:</b>
      <b>{{ calcTotalAttackRating() }}</b>
    </v-card-text>
  </v-card>
</template>
  
  
<script>
import { EventBus } from "@/services/eventBus";
import CalcCorrectGraph from "@/services/calcCorrectGraph";
import AttackElementCorrectParam from "@/services/attackElementCorrectParam";

const calcCorrect = new CalcCorrectGraph();
const attackElementCorrectParam = new AttackElementCorrectParam();

export default {
  name: "AttackRating",

  inject: ["provided"],

  components: {},

  created() {
    // Change to get from parent
    EventBus.$on("RESET_ATTACK_RATINGS", () => {
      for (let item of this.attackRatings) {
        item.attackRating = 0;
      }
    });

    EventBus.$on("IS_TWO_HANDED", (val) => {
      this.twoHanded = val;
    });
  },

  data: () => ({
    calcCorrectGraph: {},
    attackRatings: [
      { dmgType: "Physical", attackRating: 0 },
      { dmgType: "Magic", attackRating: 0 },
      { dmgType: "Fire", attackRating: 0 },
      { dmgType: "Lightning", attackRating: 0 },
      { dmgType: "Holy", attackRating: 0 },
    ],
    twoHanded: null,
  }),

  methods: {
    findStatLevelBy(abbrev) {
      const stat = this.provided.stats.find((s) => s.name.includes(abbrev));
      return stat.level;
    },

    findCalcCorrectGraphIdBy(damageType) {
      let calcCorrectGraphId = {};

      for (const [key, val] of Object.entries(this.calcCorrectGraph)) {
        if (key.includes(damageType)) {
          calcCorrectGraphId = val;
        }
      }
      return calcCorrectGraphId;
    },

    calcAttackRatingFor(dmgType) {
      let baseDmg = 0;
      let totalDmg = 0;
      let totalBonusDmg = 0;
      let list = this.getScalingStatsPerDmgType[dmgType];

      if (list) {
        for (const cC of list) {
          baseDmg = cC.baseDmg;
          // Todo: handle cC.scaling==undefined elsewhere
          if (cC.scaling) {
            let statLevel = this.findStatLevelBy(cC.scalesWith);

            if (this.twoHanded) {
              statLevel = Math.floor((statLevel *= 1.5));
            }

            const calcCorrectGraphId = this.findCalcCorrectGraphIdBy(
              cC.dmgType
            );
            const calcCorrectOutput = calcCorrect.calcCorrectFormula(
              statLevel,
              calcCorrectGraphId
            );
            let bonusDmg =
              cC.baseDmg * (cC.scaling / 100) * (calcCorrectOutput / 100);

            // Math.floor(bonusDmg)

            totalBonusDmg += bonusDmg;
          }
        }

        totalDmg = totalDmg + baseDmg + totalBonusDmg;

        const item = this.attackRatings.find((x) => x.dmgType == dmgType);
        item.attackRating = totalDmg;
      }
      return Math.floor(baseDmg) + " + " + Math.floor(totalBonusDmg);
    },

    calcTotalAttackRating() {
      let totalAR = 0;
      for (let item of this.attackRatings) {
        totalAR += item.attackRating;
      }
      return Math.floor(totalAR);
    },

    groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        const curGroup = acc[key] ?? [];
        return { ...acc, [key]: [...curGroup, obj] };
      }, {});
    },
  },

  computed: {
    getCalcCorrectGraphId() {
      let calcCorrectGraphId = {};

      if (Object.keys(this.provided.finalWeapon).length > 0) {
        calcCorrectGraphId = calcCorrect.getCalcCorrectGraphId(
          this.provided.finalWeapon
        );
      }
      return calcCorrectGraphId;
    },

    getAttackElementCorrectParam() {
      let data = {};

      if (Object.keys(this.provided.finalWeapon).length > 0) {
        let id = this.provided.finalWeapon["Attack Element Correct ID"];
        data = attackElementCorrectParam.get(id);
      }
      return data;
    },

    getWeaponAttackTypes() {
      let attackTypes = {};

      if (Object.keys(this.provided.weaponAttackAndScaling).length > 0) {
        let weaponAttackAndScaling = Object.entries(
          this.provided.weaponAttackAndScaling
        );

        for (const [key, value] of weaponAttackAndScaling) {
          if (key.includes("Attack") && key != "Stamina Attack" && value > 0) {
            const newKey = key.split(" ")[0];
            attackTypes[newKey] = value;
          }
        }
      }
      return attackTypes;
    },

    getWeaponScaling() {
      let attackTypes = {};

      if (Object.keys(this.provided.weaponAttackAndScaling).length > 0) {
        let weaponAttackAndScaling = Object.entries(
          this.provided.weaponAttackAndScaling
        );

        for (const [key, value] of weaponAttackAndScaling) {
          if (key.includes("Scaling") && value > 0) {
            const newKey = key.split(" ")[0];
            attackTypes[newKey] = value;
          }
        }
      }
      return attackTypes;
    },

    // Todo: obj.scaling is sometimes undefined
    getScalingStatsPerDmgType() {
      let data = [];

      for (const [key1, val1] of Object.entries(this.getWeaponAttackTypes)) {
        for (const [key2] of Object.entries(
          this.getAttackElementCorrectParam
        )) {
          if (key2.includes(key1)) {
            // Capitalize first letter, lowercase the rest
            let stat = key2.split(": ")[1];
            stat = stat.charAt(0) + stat.substring(1).toLowerCase();

            let obj = {
              dmgType: key1,
              baseDmg: val1,
              scalesWith: stat,
              scaling: this.getWeaponScaling[stat],
            };

            data.push(obj);
          }
        }
      }
      return this.groupBy(data, "dmgType");
    },

    weaponAttAndScaling() {
      return this.provided.weaponAttackAndScaling;
    },
  },

  watch: {
    getCalcCorrectGraphId(val) {
      if (Object.keys(val).length > 0) {
        this.calcCorrectGraph = calcCorrect.getCalcCorrectGraph(val);
      } else {
        this.calcCorrectGraph = {};
      }
    },

    // provided: {
    //   handler(selected) {
    //     if (Object.keys(selected.finalWeapon).length == 0) {
    //       console.log(selected.finalWeapon);

    //       for (let item of this.attackRatings) {
    //         item.attackRating = 0;
    //       }
    //     }
    //   },
    //   deep: true,
    // },
  },
};
</script>
  
  
<style>
</style>