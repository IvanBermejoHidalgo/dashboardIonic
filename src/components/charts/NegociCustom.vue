<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title style="color: white">📝 Encuestas Completadas</ion-card-title>
    </ion-card-header>
    <ion-card-content style="position: relative; height: 300px;">
      <div class="gauge-container">
        <svg :width="svgWidth" :height="svgHeight" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
          <!-- Fondo del gauge -->
          <path d="M 20 100 A 80 80 0 0 1 180 100" stroke="#333333" stroke-width="12" fill="none" stroke-linecap="round"/>
          <!-- Barra de progreso -->
          <path :d="gaugePath" stroke="#FF0000" stroke-width="12" fill="none" stroke-linecap="round"/>
          <!-- Marcador KPI -->
          <path d="M 20 100 A 80 80 0 0 1 180 100" stroke="rgba(255, 255, 0, 0.5)" stroke-width="12" fill="none" 
                stroke-dasharray="1, 3" transform="rotate(180, 100, 100)"/>
          <!-- Valor numérico -->
          <text x="100" y="75" text-anchor="middle" font-size="28" fill="white" font-weight="bold">{{ average.toFixed(1) }}</text>
          <!-- Etiqueta y KPI -->
          <text x="100" y="110" text-anchor="middle" font-size="14" fill="#AAAAAA">
            Promedio mensual | KPI: 5
          </text>
          <!-- Indicador KPI alcanzado -->
          <text x="100" y="40" text-anchor="middle" font-size="16" :fill="isKpiAchieved ? '#00FF00' : '#FFFF00'" font-weight="bold">
            {{ isKpiAchieved ? '✅ KPI Alcanzado' : '🟡 KPI: 5' }}
          </text>
        </svg>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { computed, ref, onMounted, onUnmounted } from 'vue';

const data = [3, 3.5, 3.7, 4.5, 5, 4.7];
const average = computed(() => data.reduce((a, b) => a + b, 0) / data.length);
const kpiTarget = 5;
const isKpiAchieved = computed(() => average.value >= kpiTarget);

const gaugePath = computed(() => {
  const angle = Math.min((average.value / kpiTarget) * 180, 180);
  const radians = (angle * Math.PI) / 180;
  const x = 100 + 80 * Math.cos(radians);
  const y = 100 - 80 * Math.sin(radians);
  return `M 20 100 A 80 80 0 0 1 ${x} ${y}`;
});

// Responsive SVG sizing
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
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
}

ion-card-content {
  flex: 1;
  padding: 10px;
  overflow: visible;
}

.kpi-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid;
}

.kpi-achieved {
  border-color: #00FF00;
  background: rgba(0, 255, 0, 0.1);
}

.kpi-not-achieved {
  border-color: #FFFF00;
}
</style>