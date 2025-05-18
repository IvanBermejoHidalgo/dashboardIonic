<template>
  <ion-card class="card-dashboard">
    <ion-card-header>
      <ion-card-title style="color: white">🏁 Usuarios que consultan noticias de MotoGP y Fórmula 1</ion-card-title>
    </ion-card-header>

    <ion-card-content style="height: 400px; padding: 0; position: relative; color: white;">
      <!-- Recuadro KPI -->
      <div class="kpi-badge" :class="kpiAchieved ? 'kpi-achieved' : 'kpi-not-achieved'">
        🔢 KPI: {{ kpiPercentage }}%
      </div>

      <!-- Gráfico -->
      <div ref="chart" style="width: 100%; height: 100%; min-height: 300px;"></div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import * as echarts from 'echarts';

const chart = ref<HTMLElement>();
let myChart: echarts.ECharts | null = null;

const kpiPercentage = 50; // Porcentaje del KPI
const kpiTarget = 50; // Valor objetivo del KPI
const kpiAchieved = computed(() => kpiPercentage >= kpiTarget); // Condición para verificar si se alcanzó el KPI

const initChart = () => {
  if (chart.value) {
    myChart = echarts.init(chart.value);

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}% ({d}%)',
        textStyle: { color: '#000' }
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      series: [{
        name: 'Preferencias',
        type: 'pie',
        radius: ['35%', '65%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          fontSize: 14,
          color: '#fff',
          formatter: '{b}: {c}%'
        },
        labelLine: {
          length: 10,
          length2: 15,
          lineStyle: {
            color: '#fff'
          }
        },
        emphasis: {
          scale: true,
          scaleSize: 5,
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff'
          }
        },
        data: [
          { value: 65, name: 'Fórmula 1' },
          { value: 35, name: 'MotoGP' }
        ],
        color: ['#EE4B2B', '#50C878']
      }]
    };

    myChart.setOption(option);
  }
};

onMounted(() => {
  initChart();
  const resizeObserver = new ResizeObserver(() => {
    myChart?.resize();
  });

  if (chart.value) {
    resizeObserver.observe(chart.value);
  }

  onUnmounted(() => {
    resizeObserver.disconnect();
    myChart?.dispose();
  });
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

.kpi-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  border: 2px solid #FFFF00;
  z-index: 10;
}

.kpi-achieved {
  border-color: #00FF00;
  background: rgba(0, 255, 0, 0.1);
}

.kpi-not-achieved {
  border-color: #FF5555;
  background-color: rgba(255, 0, 0, 0.1);
  color: #FF5555;
}
</style>
