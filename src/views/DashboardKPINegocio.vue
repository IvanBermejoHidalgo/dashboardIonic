<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>📊 Motorsports | Dashboard Negocio</ion-title>
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
    titulo: "⬇️ Descargas de la aplicación por mes",
    objetivo: "Alcanzar 1000 descargas por mes.",
    s: "Número de descargas mensuales.",
    m: "Seguir el número de descargas cada mes.",
    a: "Implementar estrategias de marketing para aumentar la visibilidad de la aplicación.",
    r: "Considerar el interés y la competencia en el mercado de aplicaciones.",
    t: "Lograr esta cifra de enero a junio."
  },
  {
    titulo: "💰 Ingresos por publicidad mensuales",
    objetivo: "Alcanzar ingresos de 2000 euros mensuales.",
    s: "Ingresos mensuales por publicidad.",
    m: "Seguir la evolución mensual de los ingresos por publicidad.",
    a: "Implementar estrategias para aumentar la monetización de la aplicación.",
    r: "Considerar el crecimiento histórico de los ingresos y el potencial de la aplicación.",
    t: "Lograr este objetivo en los próximos 6 meses."
  },
  {
    titulo: "🏁 Porcentaje de donde llegan los usuarios",
    objetivo: "Usuarios: Redes Sociales 50%, Publicidad 40%, Búsqueda 10%.",
    s: "Porcentaje de usuarios por origen.",
    m: "Medir el porcentaje de usuarios provenientes de cada origen.",
    a: "Implementar estrategias para aumentar en redes sociales y la efectividad de la publicidad.",
    r: "Considerar la distribución actual de usuarios por origen.",
    t: "Lograr esta distribución en los próximos 6 meses."
  },
  {
    titulo: "🧠 Valoración de la aplicación",
    objetivo: "Lograr una valoración de 5 en junio.",
    s: "Valoración de la aplicación.",
    m: "Monitorear la valoración en la tienda de aplicaciones.",
    a: "Mejorar la experiencia del usuario y responder a sus comentarios.",
    r: "Considerar las opiniones de los usuarios y realizar mejoras en consecuencia.",
    t: "Alcanzar esta valoración en el próximo mes de junio."
  },
  {
    titulo: "🧠 Test",
    objetivo: "Lograr una valoración de 5 en junio.",
    s: "Valoración de la aplicación.",
    m: "Monitorear la valoración en la tienda de aplicaciones.",
    a: "Mejorar la experiencia del usuario y responder a sus comentarios.",
    r: "Considerar las opiniones de los usuarios y realizar mejoras en consecuencia.",
    t: "Alcanzar esta valoración en el próximo mes de junio."
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

.static-card {
  background: rgba(20, 20, 20, 0.8);
  color: white;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: none;
  box-shadow: none;
  min-width: 400px;  /* más ancha */
  max-width: 480px;  /* más ancha */
  margin: 0 auto;
  font-size: 1.1rem; /* texto un poco más grande */
  padding: 16px;     /* un poco más de padding para que respire */
}

.static-card ion-card-title {
  color: #ffffff;
  font-size: 1.3rem; /* título un poco más grande */
}
</style>
