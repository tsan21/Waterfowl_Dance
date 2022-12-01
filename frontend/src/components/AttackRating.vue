<template>
  <v-card rounded="lg">
    <v-app-bar dark elevation="1" color="main" dense> Attack Rating </v-app-bar>

    <v-card-text
      v-for="ar in attackRatings"
      :key="ar.dmgType"
      style="display: flex; justify-content: space-between"
    >
      <div>{{ ar.dmgType }}</div>
      <div>{{ test(ar.dmgType) }}</div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text style="display: flex; justify-content: space-between">
      <b>Total:</b>
      <b>{{ calcAttackRating() }}</b>
    </v-card-text>
  </v-card>
</template>
  
  
<script>
import CalcCorrectGraph from "@/services/calcCorrectGraph";
import AttackElementCorrectParam from "@/services/attackElementCorrectParam";

const calcCorrect = new CalcCorrectGraph();
const attackElementCorrectParam = new AttackElementCorrectParam();

export default {
  name: "AttackRating",

  inject: ["provided"],

  components: {},

  mounted() {},

  data: () => ({
    calcCorrectGraph: {},
    attackRatings: [
      { dmgType: "Physical", attackRating: "N/A" },
      { dmgType: "Magic", attackRating: "N/A" },
      { dmgType: "Fire", attackRating: "N/A" },
      { dmgType: "Lightning", attackRating: "N/A" },
      { dmgType: "Holy", attackRating: "N/A" },
    ],
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

    test(dmgType) {
      let output = 0;

      for (const cC of this.getScalingStatsPerDmgType) {
        if (cC.dmgType == dmgType) {
          const statLevel = this.findStatLevelBy(cC.scalesWith);
          const calcCorrectGraphId = this.findCalcCorrectGraphIdBy(cC.dmgType);
          const calcCorrectOutput = calcCorrect.calcCorrectFormula(
            statLevel,
            calcCorrectGraphId
          );
          const bonusDmg =
            cC.baseDmg * (cC.scaling / 100) * (calcCorrectOutput / 100);

          output = output + cC.baseDmg + bonusDmg;
        }
      }
      return output;
    },

    calcAttackRating() {
      let totalAR = 0;

      for (let cC of this.getScalingStatsPerDmgType) {
        const statLevel = this.findStatLevelBy(cC.scalesWith);
        const calcCorrectGraphId = this.findCalcCorrectGraphIdBy(cC.dmgType);
        const calcCorrectOutput = calcCorrect.calcCorrectFormula(
          statLevel,
          calcCorrectGraphId
        );

        const bonusDmg =
          cC.baseDmg * (cC.scaling / 100) * (calcCorrectOutput / 100);

        totalAR = totalAR + cC.baseDmg + bonusDmg;
      }
      return totalAR;
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
      // Groupby dmgType
      return data;
    },

    // Test
    calcCorrectFormula() {
      let output = 0;

      if (Object.keys(this.calcCorrectGraph).length > 0) {
        output = calcCorrect.calcCorrectFormula(
          40,
          this.calcCorrectGraph["CalcCorrectGraph ID (Magic)"]
        );
      }
      return output;
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
  },
};
</script>
  
  
<style>
</style>