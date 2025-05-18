<template>
  <ion-card class="card-dashboard">
    <ion-card-header>
      <ion-card-title style="color: white">🎯 Funcionalidades más utilizadas por sesión</ion-card-title>
    </ion-card-header>
    <ion-card-content class="contenido-grafico">
      <div class="grafico-kpi-container">
        <canvas ref="chartCanvas" class="canvas-grafico"></canvas>
        <div class="kpis">
          <h3>🎯 Objetivo:</h3>
          <p>📰 Noticias: <strong>6</strong></p>
          <p>📋 Encuestas: <strong>4</strong></p>
          <p>🗓️ Calendario: <strong>2</strong></p>
          <p>👤 Editar perfil: <strong>2</strong></p>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;
let updateInterval: number;

const labels = ['Noticias', 'Encuestas', 'Calendario', 'Editar perfil'];

function generateRandomData() {
  return [
    Math.floor(Math.random() * 7), // Noticias
    Math.floor(Math.random() * 6), // Encuestas
    Math.floor(Math.random() * 4), // Calendario
    Math.floor(Math.random() * 4)  // Editar perfil
  ];
}

onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'Sesión actual',
          data: generateRandomData(),
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: '#38bdf8',
          pointBackgroundColor: '#38bdf8',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: 'white',
              font: {
                size: 13
              }
            },
            ticks: {
              backdropColor: 'transparent',
              color: '#ccc',
              stepSize: 1,
              beginAtZero: true,
              max: 7
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      }
    });

    updateInterval = setInterval(() => {
      if (chartInstance) {
        chartInstance.data.datasets[0].data = generateRandomData();
        chartInstance.update();
      }
    }, 2000);
  }
});

onUnmounted(() => {
  chartInstance?.destroy();
  clearInterval(updateInterval);
});
</script>

<style scoped>
.card-dashboard {
  background: rgba(20, 20, 20, 0.8);
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  position: relative;
}

.titulo-grafico {
  background-color: #b91c1c;
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  border-radius: 8px;
  text-align: center;
}

.contenido-grafico {
  height: 320px;
  padding: 16px;
}

.grafico-kpi-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  height: 100%;
  flex-wrap: wrap; /* Para móviles */
}

.canvas-grafico {
  flex: 1 1 65%;
  min-width: 250px;
  height: 300px;
}

.kpis {
  flex: 1 1 30%;
  min-width: 200px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.kpis h3 {
  margin-bottom: 8px;
  font-size: 15px;
}
</style>
