<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>🏎️ Motorsports | Dashboard Técnico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="card-grid">
        <ion-card v-for="(card, index) in cards" :key="index" class="static-card">
          <ion-card-header>
            <ion-card-title>{{ card.titulo }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p><strong>Objetivo:</strong> {{ card.objetivo }}</p>
            <p><strong>S:</strong> {{ card.s }}</p>
            <p><strong>M:</strong> {{ card.m }}</p>
            <p><strong>A:</strong> {{ card.a }}</p>
            <p><strong>R:</strong> {{ card.r }}</p>
            <p><strong>T:</strong> {{ card.t }}</p>
            <div class="kpi">{{ card.kpi }}</div>
          </ion-card-content>
        </ion-card>
      </div>
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue';

const cards = [
  {
    titulo: "⏱️ Tiempo medio de sesión",
    objetivo: "Alcanzar 10 minutos por sesión.",
    s: "Tiempo promedio por sesión.",
    m: "Medición en minutos.",
    a: "Mejorar el promedio.",
    r: "Depende del interés del usuario.",
    t: "De enero a junio.",
    kpi: "KPI: 10 min"
  },
  {
    titulo: "📰 Encuestas completadas",
    objetivo: "4 encuestas por usuario.",
    s: "Número mensual.",
    m: "Contador mensual.",
    a: "Ofrecer encuestas atractivas.",
    r: "Depende de la participación.",
    t: "Cada mes.",
    kpi: "KPI: 4 encuestas"
  },
  {
    titulo: "🏁 Usuarios MotoGP y F1",
    objetivo: "50% interés en ambas.",
    s: "Porcentaje combinado.",
    m: "Usuarios que eligen ambas.",
    a: "Equilibrar el contenido.",
    r: "Depende del interés general.",
    t: "Cada trimestre.",
    kpi: "KPI: 50% doble interés"
  },
  {
    titulo: "🧠 Uso de CPU",
    objetivo: "Mantener < 45%.",
    s: "Consumo durante el uso.",
    m: "Monitoreo en tiempo real.",
    a: "Optimizar rendimiento.",
    r: "Depende de la app.",
    t: "En cada versión.",
    kpi: "KPI: <45% CPU"
  },
  {
    titulo: "🎯 Funcionalidades más usadas",
    objetivo: "Noticias 6, Encuestas 4, Perfil 2 usos.",
    s: "Número de usos.",
    m: "Conteo de clics.",
    a: "Promover funcionalidades poco usadas.",
    r: "Depende del interés.",
    t: "Incrementar 20% de enero a junio.",
    kpi: "KPI: +20% uso"
  }
];
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /* tarjetas más grandes */
  gap: 8px; /* menos espacio entre tarjetas */
  justify-content: center;
}

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /* tarjetas más grandes */
  gap: 8px; /* menos espacio entre tarjetas */
  justify-content: center;
}

.static-card {
  background: rgba(20, 20, 20, 0.8);
  color: white;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: none;
  box-shadow: none;
  min-width: 400px;
  max-width: 480px;
  margin: 0 auto;
  font-size: 1.1rem;
  padding: 16px;
}

.static-card ion-card-title {
  color: #ffffff;
  font-size: 1.3rem;
}

/* KPI estilo negocio */
.kpi {
  margin-top: 12px;
  font-weight: 600;
  color: white;
}
</style>
