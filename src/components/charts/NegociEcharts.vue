<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title style="color: white">🏁 Categorías Preferidas</ion-card-title>
      </ion-card-header>
      <ion-card-content style="height: 400px; padding: 0; position: relative;">
        <div ref="chart" style="width: 100%; height: 100%; min-height: 300px;"></div>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
  import * as echarts from 'echarts';
  
  const chart = ref<HTMLElement>();
  let myChart: echarts.ECharts | null = null;
  
  const initChart = () => {
    if (chart.value) {
      myChart = echarts.init(chart.value);
      
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}% ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 0,
          textStyle: { fontSize: 12 }
        },
        series: [{
          name: 'Preferencias',
          type: 'pie',
          radius: ['35%', '65%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            fontSize: 14,
            formatter: '{b}: {c}%'
          },
          labelLine: {
            length: 10,
            length2: 15
          },
          emphasis: {
            scale: true,
            scaleSize: 5,
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
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