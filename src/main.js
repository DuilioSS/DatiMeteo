import { createApp } from 'vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Importa le icone

const vuetify = createVuetify({
  components,
  directives,
})

import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts";

createApp(App).use(router).use(VueApexCharts).use(vuetify).mount('#app')
