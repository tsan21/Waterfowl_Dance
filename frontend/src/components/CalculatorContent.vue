<template>
  <v-sheet min-height="70vh" rounded="lg" elevation="3">
    <weapon-details
    ></weapon-details>
  </v-sheet>
</template>
  

<script>
import WeaponDetails from "@/components/WeaponDetails.vue";

export default {
  name: "CalculatorContent",

  components: {
    WeaponDetails,
  },

  mounted() {},

  data: () => ({}),

  methods: {},

  computed: {},

  watch: {},
};
</script>