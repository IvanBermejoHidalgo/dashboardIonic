<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title style="color: white">📲 Porcentaje de participación de los usuarios</ion-card-title>
    </ion-card-header>
    <ion-card-content style="position: relative; height: 300px;">
      <div class="donut-container">
        <svg :width="svgWidth" :height="svgHeight" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          <!-- Fondo círculo -->
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="#444"
            stroke-width="20"
            fill="none"
          />
          <!-- Progreso círculo -->
          <circle
            cx="100"
            cy="100"
            r="80"
            :stroke="color"
            stroke-width="20"
            fill="none"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
            style="transition: stroke-dashoffset 0.6s ease, stroke 0.6s ease;"
            transform="rotate(-90 100 100)"
          />
          <!-- Texto valor -->
          <text
            x="100"
            y="115"
            text-anchor="middle"
            font-size="32"
            fill="white"
            font-weight="bold"
            font-family="Arial, sans-serif"
          >
            {{ value }}%
          </text>
        </svg>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const value = ref(0);
const max = 100;
const radius = 80;
const circumference = 2 * Math.PI * radius;

// Colores según nivel de participación
const color = computed(() => {
  if (value.value < 30) return '#f44336';      // rojo: bajo engagement
  else if (value.value < 70) return '#ffeb3b'; // amarillo: medio
  else return '#4caf50';                        // verde: alto
});

const dashOffset = computed(() => {
  return circumference * (1 - value.value / max);
});

let intervalId: number | undefined;

const updateValue = () => {
  // Simula valores: notificaciones recibidas y las que tuvieron interacción
  const total = 1000; // simulamos que 1000 usuarios recibieron notificaciones
  const interacted = Math.floor(100 + Math.random() * 700); // entre 100 y 800 interacciones
  value.value = Math.round((interacted / total) * 100);
};

onMounted(() => {
  updateValue();
  intervalId = window.setInterval(updateValue, 2000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

const svgWidth = '100%';
const svgHeight = '100%';
</script>

<style scoped>
.donut-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

ion-card {
  background: rgba(20, 20, 20, 0.8);
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
}
</style>
