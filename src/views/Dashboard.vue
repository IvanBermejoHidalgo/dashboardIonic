<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>🏎️ Dashboard Motorsports</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <!-- Sección Negocio -->
        <ion-row>
          <ion-col size="12">
            <ion-text color="primary">
              <h2>Métricas de Negocio</h2>
            </ion-text>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="4" v-for="(chart, index) in businessCharts" :key="'b-'+index">
            <component :is="chart"/>
          </ion-col>
        </ion-row>

        <!-- Sección Técnica -->
        <ion-row>
          <ion-col size="12">
            <ion-text color="primary">
              <h2>Métricas Técnicas</h2>
            </ion-text>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="4" v-for="(chart, index) in techCharts" :key="'t-'+index">
            <component :is="chart"/>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/vue';

// Importar gráficos de negocio
// import BusinessChart1 from '@/components/charts/BusinessChart1.vue';
// import BusinessChart2 from '@/components/charts/BusinessChart2.vue';
// import BusinessChart3 from '@/components/charts/BusinessChart3.vue';
// import BusinessChart4 from '@/components/charts/BusinessChart4.vue';
// import BusinessChart5 from '@/components/charts/BusinessChart5.vue';

  // Importar componentes de gráficos
  import NegociChart from '@/components/charts/NegociChart.vue';
  import NegociApex from '@/components/charts/NegociApex.vue';
  import NegociEcharts from '@/components/charts/NegociEcharts.vue';
  import NegociCustom from '@/components/charts/NegociCustom.vue';
  import NegociTiempoReal from '@/components/charts/NegociTiempoReal.vue';
  // import NegociApex from '../components/charts/NegociApex.vue';
  // ... importar los demás componentes
  
  // const businessCharts = ref([
  //   { component: NegociChart, data: {}, options: {} },
  //   { component: NegociApex, data: {}, options: {} },
  //   // ... otros gráficos de negocio
  // ]);

// Importar gráficos técnicos
// import TechChart1 from '@/components/charts/TechChart1.vue';
// import TechChart2 from '@/components/charts/TechChart2.vue';
// import TechChart3 from '@/components/charts/TechChart3.vue';
// import TechChart4 from '@/components/charts/TechChart4.vue';
// import TechChart5 from '@/components/charts/TechChart5.vue';

const businessCharts = [NegociChart, NegociApex, NegociEcharts, NegociCustom, NegociTiempoReal];
// const businessCharts = [BusinessChart1, BusinessChart2, BusinessChart3, BusinessChart4, BusinessChart5];
// const techCharts = [TechChart1, TechChart2, TechChart3, TechChart4, TechChart5];
</script>

<style scoped>
ion-col {
  margin-bottom: 16px;
}

ion-card {
  --background: var(--ion-card-background);
  color: var(--ion-text-color);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

ion-card-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

ion-card-title {
  color: var(--ion-color-primary);
}

ion-col {
  margin-bottom: 16px;
}

h2 {
  color: var(--ion-color-primary);
}
</style>