import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/tecnico'
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/DashboardTecnico.vue')
  },
  {
    path: '/folder/tecnico',
    component: () => import('../views/DashboardTecnico.vue') // Nueva vista para "Técnico"
  },
  {
    path: '/folder/negocio',
    component: () => import('../views/DashboardNegocio.vue') // Nueva vista para "Negocio"
  },
  {
    path: '/folder/KPITecnico',
    component: () => import('../views/DashboardKPITecnico.vue') // Nueva vista para "Negocio"
  },
  {
    path: '/folder/KPINegocio',
    component: () => import('../views/DashboardKPINegocio.vue') // Nueva vista para "Negocio"
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;
