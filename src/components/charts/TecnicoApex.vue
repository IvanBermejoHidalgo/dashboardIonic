<template>
  <ion-card class="card-dashboard">
    <ion-card-header>
      <ion-card-title style="color: white">📰 Cantidad de encuestas completadas por usuario</ion-card-title>
    </ion-card-header>
    <ion-card-content style="height: 300px; padding: 0; position: relative;">
      <div ref="chart" style="height: 100%; width: 100%;"></div>
      <div class="kpi-badge" :class="{ 'kpi-achieved': isKpiAchieved }">
        KPI: 8 {{ isKpiAchieved ? '✅' : '🟡' }}
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import ApexCharts from 'apexcharts';

const chart = ref<HTMLElement>();
let apexChart: ApexCharts | null = null;
const newsData = [4, 4.4, 7, 6.8, 9, 10];
const kpiTarget = 8;

// Comprueba si se ha alcanzado el KPI
const isKpiAchieved = computed(() => {
  return newsData.some(value => value >= kpiTarget);
});

onMounted(() => {
  if (chart.value) {
    // Asegúrate que el contenedor tenga tamaño
    chart.value.style.minHeight = '300px';
    
    apexChart = new ApexCharts(chart.value, {
      series: [{ 
        name: 'Noticias', 
        data: newsData 
      }],
      chart: { 
        type: 'bar',
        height: '100%',
        width: '100%',
        animations: { enabled: true },
        toolbar: { show: false },
        parentHeightOffset: 0,
        events: {
          mounted: function(chartContext: any, _config: any) {
            const series = chartContext?.w?.globals?.series[0] as number[];

            series?.forEach((value: number, index: number) => {
              if (value >= kpiTarget) {
                chartContext.updateOptions({
                  fill: {
                    colors: function(params: { value: number; seriesIndex: number; w: any }) {
                      return params.value >= kpiTarget ? '#00FF00' : '#FF0000';
                    }
                  }
                }, false, false, false);
              }
            });
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '70%',
          colors: {
            ranges: [{
              from: kpiTarget,
              to: Math.max(...newsData, kpiTarget),
              color: '#00FF00'
            }]
          }
        }
      },
      colors: ['#FF0000'], // Color base rojo
      grid: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      markers: {
        size: 0
      },
      annotations: {
        yaxis: [{
          y: kpiTarget,
          borderColor: '#FFFF00',
          strokeDashArray: 5,
          label: {
            borderColor: '#FFFF00',
            style: {
              color: '#fff',
              background: 'rgba(0, 0, 0, 0.7)'
            },
            text: 'KPI: 8'
          }
        }]
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        labels: {
          style: {
            colors: 'white'
          }
        }
      },
      yaxis: {
        min: 0,
        max: Math.max(...newsData, kpiTarget) + 2,
        labels: {
          style: {
            colors: 'white'
          },
          formatter: function(value: number) {
            if (value === kpiTarget) {
              return 'KPI: ' + value;
            }
            return value;
          }
        }
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: function(value: number) {
            const kpiStatus = value >= kpiTarget ? '✅' : '⚠️';
            return `${kpiStatus} ${value} (KPI: ${kpiTarget})`;
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

<style scoped>
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
  border: 2px solid #FFFF00;
  z-index: 10;
}

.kpi-achieved {
  border-color: #00FF00;
  background: rgba(0, 255, 0, 0.1);
}

/* estilos.css o App.vue <style> */
.card-dashboard {
  background: rgba(20, 20, 20, 0.8);
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
}

</style>