<template>
  <v-card rounded="lg" height="500px">
    <v-app-bar dark elevation="1" color="main" dense> Attack Rating </v-app-bar>

    <v-card-text> fsdfsdfds </v-card-text>
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
  }),

  methods: {
    findScalingFor(skill) {
      let scaling = "";

      for (const [key, val] of Object.entries(this.getWeaponScaling)) {
        if (skill.toLowerCase() == key.toLowerCase()) {
          scaling = val;
        }
      }
      return scaling;
    },

    // loop this
    calcAttackRating(baseAR, scaling, calcCorrectOutput) {
      let attackRating = baseAR * (scaling / 100) * (calcCorrectOutput / 100);
      return attackRating;
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
          if (key.includes("Scaling") && key && value > 0) {
            const newKey = key.split(" ")[0];
            attackTypes[newKey] = value;
          }
        }
      }
      return attackTypes;
    },

    calcCorrectFormulaData() {
      let data = [];

      for (const [key1, val1] of Object.entries(this.getWeaponAttackTypes)) {
        for (const [key2] of Object.entries(
          this.getAttackElementCorrectParam
        )) {
          if (key2.includes(key1)) {
            const skill = key2.split(": ")[1];
            let obj = {
              attackType: key1,
              attack: val1,
              scalesWith: skill,
              scaling: this.findScalingFor(skill),
            };

            data.push(obj);
          }
        }
      }
      return data;
    },

    // change values
    calcCorrectFormula() {
      let output = 0;

      if (Object.keys(this.calcCorrectGraph).length > 0) {
        output = calcCorrect.calcCorrectFormula(
          14,
          this.calcCorrectGraph["CalcCorrectGraph ID (Physical)"]
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