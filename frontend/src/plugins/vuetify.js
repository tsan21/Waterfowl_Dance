import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      options: { customProperties: true },
      themes: {
        light: {
          main: "#2b3245",
          main2: "#212634",
        }
      },
    },
  });
  