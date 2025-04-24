<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title style="color: white">📰 Noticias por Sesión</ion-card-title>
      </ion-card-header>
      <ion-card-content style="height: 300px; padding: 0;">
        <div ref="chart" style="height: 100%; width: 100%;"></div>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
  import ApexCharts from 'apexcharts';
  
  const chart = ref<HTMLElement>();
  let apexChart: ApexCharts | null = null;
  
  onMounted(() => {
    if (chart.value) {
      // Asegúrate que el contenedor tenga tamaño
      chart.value.style.minHeight = '300px';
      
      apexChart = new ApexCharts(chart.value, {
        series: [{ 
          name: 'Noticias', 
          data: [4, 4.4, 7, 6.8, 9, 10] 
        }],
        chart: { 
          type: 'bar',
          height: '100%',
          width: '100%',
          animations: { enabled: true },
          toolbar: { show: false },
          parentHeightOffset: 0
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            columnWidth: '70%'
          }
        },
        colors: ['var(--ion-color-primary)'], // Usa el rojo definido
        grid: {
        borderColor: 'rgba(255, 255, 255, 0.1)'
        },
        xaxis: {
        labels: {
            style: {
            colors: 'var(--ion-text-color)'
            }
        }
        },
        yaxis: {
        labels: {
            style: {
            colors: 'var(--ion-text-color)'
            }
        }
        }
    });
      
      setTimeout(() => {
        apexChart?.render();
      }, 100);
    }
  });
  
  onUnmounted(() => {
    apexChart?.destroy();
  });
  </script>