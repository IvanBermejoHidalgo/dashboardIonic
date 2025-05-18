<template>
  <ion-card class="card-dashboard">
    <ion-card-header>
      <ion-card-title style="color: white">💰 Ingresos por publicidad mensuales</ion-card-title>
    </ion-card-header>
    <ion-card-content style="height: 300px; padding: 0; position: relative;">
      <div ref="chart" style="height: 100%; width: 100%;"></div>
      <div class="kpi-badge" :class="{ 'kpi-achieved': isKpiAchieved }">
        KPI: 2000€ {{ isKpiAchieved ? '✅' : '🟡' }}
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

const revenueData = [1500, 1800, 2200, 2100, 2500, 1700]; // Ingresos mensuales
const kpiTarget = 2000;

// Comprueba si se ha alcanzado el KPI en al menos un mes
const isKpiAchieved = computed(() => {
  return revenueData.some(value => value >= kpiTarget);
});

onMounted(() => {
  if (chart.value) {
    chart.value.style.minHeight = '300px';

    apexChart = new ApexCharts(chart.value, {
      series: [{
        name: 'Ingresos (€)',
        data: revenueData
      }],
      chart: {
        type: 'bar',
        height: '100%',
        animations: { enabled: true },
        toolbar: { show: false },
        parentHeightOffset: 0,
        events: {
          mounted: (chartContext: any) => {
            const series = chartContext?.w?.globals?.series[0] as number[];
            series?.forEach(value => {
              if (value >= kpiTarget) {
                chartContext.updateOptions({
                  fill: {
                    colors: ({ value }) => value >= kpiTarget ? '#00FF00' : '#FF0000'
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
          columnWidth: '65%',
          colors: {
            ranges: [{
              from: kpiTarget,
              to: Math.max(...revenueData, kpiTarget),
              color: '#00FF00'
            }]
          }
        }
      },
      colors: ['#FF0000'], // Color base rojo
      grid: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        yaxis: { lines: { show: true } }
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
            text: 'KPI: 2000€'
          }
        }]
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        labels: {
          style: { colors: 'white' }
        }
      },
      yaxis: {
        min: 0,
        max: Math.max(...revenueData, kpiTarget) + 500,
        labels: {
          style: { colors: 'white' },
          formatter: val => val === kpiTarget ? `KPI: ${val}€` : `${val}€`
        }
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: val => `${val >= kpiTarget ? '✅' : '⚠️'} ${val}€ (KPI: ${kpiTarget}€)`
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
.card-dashboard {
  background: rgba(20, 20, 20, 0.8);
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
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
  border: 2px solid #FFFF00;
  z-index: 10;
}

.kpi-achieved {
  border-color: #00FF00;
  background: rgba(0, 255, 0, 0.1);
}
</style>
