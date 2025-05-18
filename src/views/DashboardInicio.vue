<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Dashboard de Inicio</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-card>
          <ion-card-header>
            <ion-card-title style="color: #3880ff;">Bienvenido al Dashboard</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              Este es el inicio de los dashboards. Aquí puedes acceder a dos tipos de dashboards:
            </p>
            <ul>
              <li><strong>Técnico:</strong> Accede a las métricas y estadísticas técnicas del sistema.</li>
              <li><strong>Negocio:</strong> Visualiza datos relacionados con el rendimiento del negocio y sus KPIs.</li>
            </ul>
            <p>Selecciona el dashboard que deseas consultar desde el menú.</p>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
  </script>
  
  <style scoped>
  ion-card {
    margin: 20px;
    background: rgba(0, 0, 0, 0.1);
  }
  
  ion-card-header {
    background-color: #3880ff;
    color: white;
  }
  
  ion-card-title {
    text-align: center;
    font-size: 1.5em;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  ul li {
    font-size: 1.1em;
    margin-bottom: 10px;
  }
  </style>
  