<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <stats-overview></stats-overview>
      </v-col>

      <v-col>
        <weapon-categories></weapon-categories>
        <calculator-content class="top-gap"></calculator-content>
      </v-col>
    </v-row>
    <br />
  </v-container>
</template>

<script>
import StatsOverview from "@/components/StatsOverview.vue";
import CalculatorContent from "@/components/CalculatorContent.vue";
import WeaponCategories from "@/components/WeaponCategories.vue";

export default {
  name: "HomeView",

  components: {
    StatsOverview,
    CalculatorContent,
    WeaponCategories,
  },

  mounted() {},

  data: () => ({}),

  methods: {},
};
</script>

<style>
.top-gap{
  margin-top: 10px;
}
</style>