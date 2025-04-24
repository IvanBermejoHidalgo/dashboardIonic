<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title style="color: white">🗓️ Uso de Calendario</ion-card-title>
      </ion-card-header>
      <ion-card-content style="position: relative; height: 300px; padding: 16px;">
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
  
  onMounted(() => {
    if (chart.value) {
      chartInstance = new Chart(chart.value, {
        type: 'radar',
        data: {
          labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
          datasets: [{
            label: 'Consultas',
            data: [4, 6, 3, 6],
            backgroundColor: 'rgba(234, 179, 8, 0.2)',
            borderColor: '#EAB308',
            borderWidth: 2,
            pointBackgroundColor: '#EAB308',
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#666',
                font: {
                  size: 12
                }
              }
            }
          },
          scales: {
            r: {
              angleLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
              },
              suggestedMin: 0,
              suggestedMax: 8,
              ticks: {
                stepSize: 2,
                color: '#666',
                backdropColor: 'transparent'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              pointLabels: {
                color: '#666',
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    }
  });
  
  onUnmounted(() => {
    chartInstance?.destroy();
  });
  </script>