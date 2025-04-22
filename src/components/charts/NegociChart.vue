<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>⏱️ Tiempo de Sesión</ion-card-title>
    </ion-card-header>
    <ion-card-content style="position: relative; height: 300px;">
      <canvas 
        ref="chart" 
        style="width: 100%; height: 100%; display: block;"
      ></canvas>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import Chart from 'chart.js/auto';

const chart = ref<HTMLCanvasElement>();
let chartInstance: Chart | null = null;

const createChart = () => {
  if (chart.value) {
    // Destruye el gráfico anterior si existe
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Crea el nuevo gráfico
    chartInstance = new Chart(chart.value, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Minutos por usuario',
          data: [5, 7.5, 7, 9, 8.7, 10],
          borderColor: 'var(--ion-color-primary)', // Línea roja
          backgroundColor: 'rgba(255, 58, 48, 0.1)', // Fondo rojo claro
          pointBackgroundColor: 'var(--ion-color-primary)', // Puntos rojos
          borderWidth: 2,
          pointRadius: 4,
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 14 },
            bodyFont: { size: 14 },
            padding: 12
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#666' }
          },
          y: {
            min: 0,
            max: 12,
            ticks: { 
              color: 'var(--ion-text-color)' // Texto blanco
            },
            grid: { 
              color: 'rgba(255, 255, 255, 0.1)' // Grid claro
            }
          }
        }
      }
    });
  }
};

onMounted(() => {
  createChart();

  // Observador para redimensionamiento
  const resizeObserver = new ResizeObserver(() => {
    if (chartInstance) {
      chartInstance.resize();
    }
  });

  if (chart.value?.parentElement) {
    resizeObserver.observe(chart.value.parentElement);
  }

  onUnmounted(() => {
    resizeObserver.disconnect();
    if (chartInstance) {
      chartInstance.destroy();
    }
  });
});
</script>