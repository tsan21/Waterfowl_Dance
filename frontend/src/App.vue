<template>
  <v-app>
    <v-app-bar app color="main" elevation="3">
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" size="36" color="grey lighten-3">
          <!-- <v-img :src="require('../src/assets/bonfire.png')"> </v-img> -->
          WD
        </v-avatar>

        <v-btn v-for="link in links" :key="link" text>
          <span style="font-weight: bold; color: #eeeeee">{{ link }}</span>
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            class="grey lighten-3"
            dense
            dark
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3" style="margin-top: 10px">
      <home-view></home-view>
    </v-main>

    <v-footer padless color="main2" style="z-index: 10">
      <v-col class="text-center" cols="12">
        <span class="white--text text-center"
          >&copy; Waterfowl Dance — Tsan Yip Wong</span
        >
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import HomeView from "./views/HomeView.vue";

export default {
  name: "App",

  components: {
    HomeView,
  },

  data: () => ({
    links: ["Home", "Presets"],
  }),
};
</script>
