<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay" class="custom-menu-width">
        <ion-content>
          <ion-list id="inbox-list">
            <div class="logo-container">
              <img src="/src/assets/logo.png" alt="Motorsport News Logo" class="menu-logo">
            </div>
            <ion-note>Motorsport News</ion-note>

            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import { ref } from 'vue';
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from 'ionicons/icons';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Técnico',
    url: '/folder/tecnico',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: 'Negocio',
    url: '/folder/negocio',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: 'KPI Técnico',
    url: '/folder/KPITecnico',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'KPI Negocio',
    url: '/folder/KPINegocio',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'Archived',
    url: '/folder/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: 'Trash',
    url: '/folder/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: 'Spam',
    url: '/folder/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  },
];

const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}
</script>

<style scoped>

.dark-theme {
  --background: var(--ion-color-dark);
  --ion-text-color: var(--ion-color-primary-contrast);
}

.dark-theme ion-content {
  --background: var(--ion-color-dark);
}

.dark-theme ion-item {
  --background: var(--ion-color-dark-shade);
  --color: var(--ion-color-primary-contrast);
}

.dark-theme ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.2);
  --color: var(--ion-color-primary);
}

.dark-theme ion-note {
  color: var(--ion-color-medium);
}

/* Estilos para el logo */
.logo-container {
  padding: 10px 0 1px 16px; /* Alineado con el padding de los items */
  margin-left: -8px; /* Compensa el padding del ion-content */
}

.menu-logo {
  height: 130px; /* Tamaño ajustado */
  width: auto;
  max-width: 180px; /* Máximo ancho permitido */
}

/* Estilo para el texto debajo del logo */
.app-note {
  display: block;
  padding-left: 16px; /* Mismo alineamiento que el logo */
  margin-left: -8px; /* Compensa el padding del ion-content */
  font-size: 14px;
  color: var(--ion-color-medium);
  padding-bottom: 15px;
}

/* Ajustes del menú */
.custom-menu-width {
  --width: 200px;
  min-width: 200px;
  max-width: 200px;
}

/* Mantén todos tus otros estilos existentes */
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

/* Corrección específica para iOS */
ion-menu.ios .logo-container,
ion-menu.ios .app-note {
  padding-left: 16px;
  margin-left: 0;
}

/* Corrección para Material Design */
ion-menu.md .logo-container,
ion-menu.md .app-note {
  padding-left: 10px;
  margin-left: -2px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-background-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 50;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

.card-dashboard {
  background: rgba(20, 20, 20, 0.8);
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
}

</style>
