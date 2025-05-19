<template>
  <ion-card class="card-dashboard">
    <ion-card-header>
      <ion-card-title style="color: white">📈 Ventas mensuales (en miles)</ion-card-title>
    </ion-card-header>
    <ion-card-content style="height: 300px; padding: 0; position: relative;">
      <div ref="chart" style="height: 100%; width: 100%;"></div>
      <div class="kpi-badge" :class="{ 'kpi-achieved': isKpiAchieved }">
        KPI: {{ kpiTarget }} {{ isKpiAchieved ? '✅' : '🟡' }}
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import ApexCharts from 'apexcharts';

const chart = ref<HTMLElement>();
let apexChart: ApexCharts | null = null;

// Datos de ejemplo: ventas mensuales en miles
const salesData = [10, 15, 12, 18, 20, 25];
const kpiTarget = 18;

// Comprueba si algún dato cumple o supera el KPI
const isKpiAchieved = computed(() => {
  return salesData.some(value => value >= kpiTarget);
});

onMounted(() => {
  if (chart.value) {
    chart.value.style.minHeight = '300px';

    apexChart = new ApexCharts(chart.value, {
      series: [{
        name: 'Ventas',
        data: salesData
      }],
      chart: {
        type: 'bar',
        height: '100%',
        width: '100%',
        animations: { enabled: true },
        toolbar: { show: false },
        parentHeightOffset: 0,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%',
          colors: {
            ranges: [{
              from: kpiTarget,
              to: Math.max(...salesData, kpiTarget),
              color: '#00FF00'  // Verde si cumple KPI
            }]
          }
        }
      },
      colors: ['#FF4500'],  // Rojo para ventas bajo KPI
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
            style: { color: '#fff', background: 'rgba(0,0,0,0.7)' },
            text: `KPI: ${kpiTarget}`
          }
        }]
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        labels: { style: { colors: 'white' } }
      },
      yaxis: {
        min: 0,
        max: Math.max(...salesData, kpiTarget) + 5,
        labels: {
          style: { colors: 'white' },
          formatter: (val: number) => val === kpiTarget ? `KPI: ${val}` : `${val}`
        }
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val: number) => val >= kpiTarget ? `✅ ${val}k` : `⚠️ ${val}k`
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

.card-dashboard {
  background: rgba(20, 20, 20, 0.8);
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
}
</style>
