import { createRouter, createWebHistory } from 'vue-router'
import tabellatempView from '../views/TabTempView.vue'
import tabellapreciView from '../views/TabPreciView.vue'
import graficotempView from '../views/GraficoTempView.vue'
import graficopreciView from '../views/GraficoPreciView.vue'

const routes = [
  {
    path: '/tabellatemp',
    name: 'tabellatemp',
    component: tabellatempView
  },
  {
    path: '/tabellapreci',
    name: 'tabellapreci',
    component: tabellapreciView
  },
  {
    path: '/graficotemp',
    name: 'graficotemp',
    component: graficotempView
  },
  {
    path: '/graficopreci',
    name: 'graficopreci',
    component: graficopreciView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
