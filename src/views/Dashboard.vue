<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button color="light"></ion-menu-button>
        </ion-buttons>
        <ion-title style="color: white">🏎️ Motorsports | Dashboard Técnico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <!-- Sección Negocio -->
        <ion-row>
          <!-- <ion-col size="12">
            <ion-text>
              <h2 style="color: white">Dashboard Técnico</h2>
            </ion-text>
          </ion-col> -->
          
          <!-- Primera fila: 2 diagramas -->
          <ion-col size="12" size-md="6" v-for="(chart, index) in businessCharts.slice(0, 2)" :key="'b1-'+index">
            <component :is="chart"/>
          </ion-col>
          
          <!-- Segunda fila: 2 diagramas -->
          <ion-col size="12" size-md="6" v-for="(chart, index) in businessCharts.slice(2, 4)" :key="'b2-'+index">
            <component :is="chart"/>
          </ion-col>
          
          <!-- Tercera fila: 1 diagrama (centrado) -->
          <ion-col size="12" size-md="6" offset-md="3" v-if="businessCharts.length > 4">
            <component :is="businessCharts[4]"/>
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
import NegociChart from '@/components/charts/NegociChart.vue';
import NegociApex from '@/components/charts/NegociApex.vue';
import NegociEcharts from '@/components/charts/NegociEcharts.vue';
import NegociCustom from '@/components/charts/NegociCustom.vue';
import NegociTiempoReal from '@/components/charts/NegociTiempoReal.vue';

const businessCharts = [NegociChart, NegociApex, NegociEcharts, NegociCustom, NegociTiempoReal];
</script>

<style scoped>
/* Estilos generales */
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
  min-height: 250px; /* Altura reducida */
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

/* Estilo para el botón de menú en móvil */
ion-menu-button {
  --color: white;
  display: block;
}

/* Responsividad adicional */
@media (max-width: 768px) {
  ion-col {
    padding: 8px;
  }
  
  ion-card {
    margin: 8px 0;
    min-height: 220px; /* Más compacto en móvil */
  }
}

@media (min-width: 992px) {
  ion-col[size-md="6"] {
    padding: 12px;
  }
  
  ion-menu-button {
    display: none;
  }
}
</style>