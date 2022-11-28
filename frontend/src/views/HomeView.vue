<template>
  <v-container style="background-color: ;">
    <v-row style="display: flex">
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

    Object.defineProperties(provided, {
      weaponCategories: {
        enumerable: true,
        get: () => this.selectedWeaponCategories,
      },
      stats: {
        enumerable: true,
        get: () => this.stats,
      },
      finalWeapon: {
        get: () => this.finalWeapon,
      },
    });
    return { provided };
  },

  created() {
    EventBus.$on("WEAPON_ATTACK_AND_SCALING", (data) => {
      this.weaponAttackAndScaling = data;
    });

    EventBus.$on("SET_FINAL_WEAPON", (weapon) => {
      this.finalWeapon = weapon;
    });
  },

  mounted() {},

  data: () => ({
    selectedWeaponCategories: [],
    stats: [],
    weaponAttackAndScaling: {},
    attackElementCorrectId: "",
    finalWeapon: {},
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