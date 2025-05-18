<template>
  <ion-card class="card-dashboard">
    <ion-card-header>
      <ion-card-title>🏁 Porcentaje de donde llegan los usuarios</ion-card-title>
    </ion-card-header>

    <ion-card-content style="height: 400px; padding: 0; position: relative; color: white;">
      <!-- Lista de KPIs secundarios -->
      <div class="kpi-list">
        <div 
          v-for="(kpi, index) in kpiTargets" 
          :key="index" 
          class="kpi-item"
          :class="kpi.achieved ? 'kpi-achieved' : 'kpi-not-achieved'"
        >
          {{ kpi.name }}: {{ kpi.value }}%
        </div>
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

const data = [
  { value: 50, name: 'Redes' },
  { value: 30, name: 'Publicidad' },
  { value: 20, name: 'Búsqueda' }
];

// KPI Principal es el primero (Redes)
const mainKpiTarget = 50;
const mainKpiAchieved = computed(() => data[0].value >= mainKpiTarget);

// KPIs secundarios (objetivos) con nombre, valor y estado (logrado o no)
const kpiTargets = data.map(item => ({
  name: item.name,
  value: item.value,
  achieved: item.value >= mainKpiTarget
}));

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
        name: 'Origen usuarios',
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
        data,
        color: ['#b91c1c', '#f59e0b', '#e0e0e0']
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
  overflow: hidden;
}

/* KPI Principal */
.kpi-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #FFFF00;
  z-index: 10;
  user-select: none;
}

/* Lista de KPIs secundarios */
.kpi-list {
  position: absolute;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 150px;
  z-index: 10;
  font-weight: 600;
}

.kpi-item {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 14px;
  user-select: none;
  border: 2px solid transparent;
}

.kpi-achieved {
  border-color: #00FF00;
  background: rgba(0, 255, 0, 0.1);
  color: #00FF00;
}

.kpi-not-achieved {
  border-color: #FF5555;
  background-color: rgba(255, 0, 0, 0.1);
  color: #FF5555;
}
</style>
