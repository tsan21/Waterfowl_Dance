<template>
  <v-card rounded="lg" height="500px">
    <v-app-bar dark elevation="1" color="main" dense>
      Attack Rating
    </v-app-bar>

    <v-card-text>
      vsdfvdsf
    </v-card-text>
  </v-card>
</template>
  
  
<script>
import CalcCorrectGraph from "@/services/calcCorrectGraph";
const calcCorrect = new CalcCorrectGraph();

export default {
  name: "AttackRating",

  inject: ["provided"],

  components: {},

  mounted() {},

  data: () => ({
    calcCorrectGraph: {},
  }),

  methods: {},

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

    getAttackElementCorrectParamId() {
      let id = "";

      if (Object.keys(this.provided.finalWeapon).length > 0) {
        id = this.provided.finalWeapon["Attack Element Correct ID"];
      }
      return id;
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