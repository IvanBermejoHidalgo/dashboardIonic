<template>
  <ion-card class="card-dashboard">
    <ion-card-header>
      <ion-card-title style="color: white">⏱️ Tiempo medio de sesión por usuario</ion-card-title>
    </ion-card-header>
    <ion-card-content style="position: relative; height: 300px;">
      <canvas 
        ref="chart" 
        style="width: 100%; height: 100%; display: block;"
      ></canvas>
      <!-- Indicador KPI -->
      <div class="kpi-indicator" :class="{ 'kpi-achieved': isKpiAchieved }">
        KPI: 10 min
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import Chart from 'chart.js/auto';
import ChartAnnotation from 'chartjs-plugin-annotation';
Chart.register(ChartAnnotation);

const chart = ref<HTMLCanvasElement>();
let chartInstance: Chart | null = null;
const sessionData = [5, 7.5, 7, 9, 8.7, 10];
const kpiTarget = 10;

// Comprueba si se ha alcanzado el KPI
const isKpiAchieved = computed(() => {
  return sessionData.some(value => value >= kpiTarget);
});

const createChart = () => {
  if (chart.value) {
    // Destruir gráfico anterior si existe
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Crear nuevo gráfico
    chartInstance = new Chart(chart.value, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Minutos por usuario',
            data: sessionData,
            borderColor: '#FF0000',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            pointBackgroundColor: '#FFFFFF',
            borderWidth: 3,
            pointRadius: 5,
            pointBorderColor: '#FF0000',
            pointBorderWidth: 1,
            fill: true,
            tension: 0.3
          },
          // Línea de KPI
          {
            label: 'Objetivo KPI',
            data: Array(sessionData.length).fill(kpiTarget),
            borderColor: isKpiAchieved.value ? '#00FF00' : '#FFFF00',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            display: true,
            labels: {
              color: 'white',
              font: {
                weight: 'bold'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 14, weight: 'bold' }, // Evita `color` aquí
            bodyFont: { size: 14, weight: 'bold' },  // Evita `color` aquí
            padding: 12,
            titleColor: 'white', // Aquí usamos titleColor y bodyColor
            bodyColor: 'white'   // Asegúrate de usar `bodyColor` también
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: kpiTarget,
                yMax: kpiTarget,
                borderColor: isKpiAchieved.value ? '#00FF00' : '#FFFF00',
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  content: 'KPI: 10 min',
                  display: true,
                  position: 'end',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white'
                }
              }
            }
          }
        },
        scales: {
          x: {
            grid: { 
              display: false,
              color: 'rgba(255, 255, 255, 0.1)' 
            },
            ticks: { 
              color: 'white',
              font: {
                weight: 'bold'
              }
            }
          },
          y: {
            min: 0,
            max: 12,
            ticks: { 
              color: 'white',
              font: {
                weight: 'bold'
              },
              callback: function(value) {
                if (value === kpiTarget) {
                  return 'KPI: ' + value;
                }
                return value;
              }
            },
            grid: { 
              color: 'rgba(255, 255, 255, 0.1)'
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

<style scoped>
.kpi-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid #FFFF00;
}

.kpi-achieved {
  border-color: #00FF00;
  background-color: rgba(0, 255, 0, 0.1);
}

/* estilos.css o App.vue <style> */
.card-dashboard {
  background: rgba(20, 20, 20, 0.8);
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
}

</style>