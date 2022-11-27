<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <stats-overview @setStats="setStats"></stats-overview>
      </v-col>

      <v-col>
        <weapon-categories
          @setSelectedWeaponCategories="setSelectedWeaponCategories"
        ></weapon-categories>

        <calculator-content class="top-gap"></calculator-content>
      </v-col>
    </v-row>
    <br />
  </v-container>
</template>


<script>
import { EventBus } from "@/services/eventBus";
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

  provide() {
    const provided = {};

    Object.defineProperty(provided, "weaponCategories", {
      enumerable: true,
      get: () => this.selectedWeaponCategories,
    });
    Object.defineProperty(provided, "stats", {
      enumerable: true,
      get: () => this.stats,
    });

    return { provided };
  },

  created() {
    EventBus.$on("WEAPON_ATTACK_AND_SCALING", (data) => {
      this.weaponAttackAndScaling = data;
    });
  },

  mounted() {},

  data: () => ({
    selectedWeaponCategories: [],
    stats: [],
    weaponAttackAndScaling: {},
    attackElementCorrectId: "",
  }),

  methods: {
    setSelectedWeaponCategories(val) {
      this.selectedWeaponCategories = val;
    },

    setStats(val) {
      this.stats = val;
    },
  },

  computed: {},

  watch: {},
};
</script>


<style>
.top-gap {
  margin-top: 10px;
}
</style>