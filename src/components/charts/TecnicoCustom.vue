<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title style="color: white">🧠 Uso de CPU de la aplicación</ion-card-title>
    </ion-card-header>
    <ion-card-content style="position: relative; height: 300px;">
      <div class="gauge-container">
        <svg :width="svgWidth" :height="svgHeight" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
          <!-- Fondo del gauge -->
          <path d="M 20 100 A 80 80 0 0 1 180 100" stroke="#444" stroke-width="12" fill="none" stroke-linecap="round" />

          <!-- Barra de progreso -->
          <path :d="gaugePath" stroke="#FF0000" stroke-width="12" fill="none" stroke-linecap="round" />

          <!-- Línea KPI -->
          <path
            :d="kpiMarkerPath"
            stroke="white"
            stroke-width="3"
            stroke-dasharray="4, 4"
            fill="none"
          />

          <text x="100" y="75" text-anchor="middle" font-size="24" fill="white" font-weight="bold">
            {{ average.toFixed(0) }}%
          </text>

        </svg>
      </div>

      <!-- Badge KPI -->
      <div :class="['kpi-badge', isKpiAchieved ? 'kpi-achieved' : 'kpi-not-achieved']">
        🎯 KPI objetivo: {{ kpiTarget }}%
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';


const data = [55, 62, 58, 60, 63, 61]; // Simulación de CPU
const average = computed(() => data.reduce((a, b) => a + b, 0) / data.length);
const kpiTarget = 45;
const isKpiAchieved = computed(() => average.value <= kpiTarget);

// Gauge principal
const gaugePath = computed(() => {
  const clamped = Math.min((average.value / 100) * 180, 180);
  const radians = (clamped * Math.PI) / 180;
  const x = 100 + 80 * Math.cos(Math.PI - radians);
  const y = 100 - 80 * Math.sin(Math.PI - radians);
  return `M 20 100 A 80 80 0 0 1 ${x} ${y}`;
});

// Línea del KPI
const kpiMarkerPath = computed(() => {
  const angle = Math.min((kpiTarget / 100) * 180, 180);
  const radians = (angle * Math.PI) / 180;
  const x = 100 + 80 * Math.cos(Math.PI - radians);
  const y = 100 - 80 * Math.sin(Math.PI - radians);
  return `M ${x} ${y - 5} L ${x} ${y + 5}`;
});

const svgWidth = ref('100%');
const svgHeight = ref('100%');

const updateSize = () => {
  const container = document.querySelector('.gauge-container');
  if (container) {
    const width = Math.min(container.clientWidth, 350);
    svgWidth.value = `${width}px`;
    svgHeight.value = `${width * 0.6}px`;
  }
};

onMounted(() => {
  updateSize();
  window.addEventListener('resize', updateSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSize);
});
</script>

<style scoped>
.gauge-container {
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

.kpi-badge {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 12px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: bold;
  border: 2px solid;
  text-align: center;
}

.kpi-achieved {
  border-color: #00FF00;
  background-color: rgba(0, 255, 0, 0.15);
  color: #00FF00;
}

.kpi-not-achieved {
  border-color: #FF5555;
  background-color: rgba(255, 0, 0, 0.1);
  color: #FF5555;
}
</style>
