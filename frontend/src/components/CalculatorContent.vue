<template>
  <!--remove elevation later -->
  <v-sheet min-height="70vh" rounded="lg" elevation="" class="grey lighten-3 calc-content">
    <div style="width: 40%">
      <weapon-details></weapon-details>
    </div>
    <div style="width: 40%">
      <attack-rating></attack-rating>
    </div>
  </v-sheet>
</template>
  

<script>
import WeaponDetails from "@/components/WeaponDetails.vue";
import AttackRating from "@/components/AttackRating.vue";

export default {
  name: "CalculatorContent",

  components: {
    WeaponDetails,
    AttackRating,
  },

  mounted() {},

  data: () => ({}),

  methods: {},

  computed: {},

  watch: {},
};
</script>

<style>
.calc-content {
  display: flex;
  justify-content: space-evenly;
}
</style>