<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title>📝 Encuestas Completadas</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <div class="gauge-container">
          <svg width="200" height="120">
            <path d="M 20 100 A 80 80 0 0 1 180 100" stroke="#e0e0e0" stroke-width="10" fill="none"/>
            <path :d="gaugePath" stroke="#8B5CF6" stroke-width="10" fill="none"/>
            <text x="100" y="80" text-anchor="middle" font-size="24">{{ average.toFixed(1) }}</text>
          </svg>
          <p>Promedio mensual por usuario</p>
        </div>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script setup lang="ts">
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
  import { computed } from 'vue';
  
  const data = [3, 3.5, 3.7, 4.5, 5, 4.7];
  const average = computed(() => data.reduce((a, b) => a + b, 0) / data.length);
  const gaugePath = computed(() => {
    const angle = (average.value / 5) * 180;
    const radians = (angle * Math.PI) / 180;
    const x = 100 + 80 * Math.cos(radians);
    const y = 100 - 80 * Math.sin(radians);
    return `M 20 100 A 80 80 0 0 1 ${x} ${y}`;
  });
  </script>
  
  <style scoped>
  .gauge-container {
    text-align: center;
    margin-top: 10px;
  }
  </style>