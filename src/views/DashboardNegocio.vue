<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button color="light"></ion-menu-button>
        </ion-buttons>
        <ion-title style="color: white">🏎️ Motorsports | Dashboard Negocio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <!-- Sección Negocio -->
        <ion-row>
          <!-- Primera fila: 2 gráficos -->
          <ion-col size="12" size-md="6" v-for="(chart, index) in businessCharts.slice(0, 2)" :key="'fila1-' + index">
            <component :is="chart" />
          </ion-col>

          <!-- Segunda fila: 3 gráficos -->
          <ion-col size="12" size-md="4" v-for="(chart, index) in businessCharts.slice(2, 5)" :key="'fila2-' + index">
            <component :is="chart" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText,
  IonButtons,
  IonMenuButton
} from '@ionic/vue';
import NegocioChart from '@/components/charts/NegocioChart.vue';
import NegocioApex from '@/components/charts/NegocioApex.vue';
import NegocioEcharts from '@/components/charts/NegocioEcharts.vue';
import NegocioCustom from '@/components/charts/NegocioCustom.vue';
import NegocioTiempoReal from '@/components/charts/NegocioTiempoReal.vue';

const businessCharts = [NegocioChart, NegocioApex, NegocioEcharts, NegocioCustom, NegocioTiempoReal];
</script>

<style scoped>
ion-col {
  margin-bottom: 16px;
  display: flex;
}

ion-card {
  --background: var(--ion-card-background);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 250px;
}

ion-card-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex: 0 0 auto;
}

ion-card-content {
  flex: 1;
  position: relative;
}

ion-card-title {
  color: white;
  font-size: 1.1rem;
}

h2 {
  color: white;
  margin-bottom: 20px;
  padding-left: 10px;
}

ion-menu-button {
  --color: white;
  display: block;
}

@media (max-width: 768px) {
  ion-col {
    padding: 8px;
  }
  
  ion-card {
    margin: 8px 0;
    min-height: 220px;
  }
}

@media (min-width: 992px) {
  ion-col[size-md="6"] {
    padding: 12px;
  }

  ion-col[size-md="4"] {
    padding: 12px;
  }

  ion-menu-button {
    display: none;
  }
}
</style>
