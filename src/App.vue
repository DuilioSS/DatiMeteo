<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" color="#2c3e50">
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" link :to="item.route" @click="closeDrawer">
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#2c3e50" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">SotoMeteo</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { text: 'Tabella Temperatura Media', icon: 'mdi-table', route: '/tabellatemp' },
        { text: 'Tabella Precipitazioni', icon: 'mdi-table', route: '/tabellapreci' },
        { text: 'Grafico Temperatura Media', icon: 'mdi-chart-line', route: '/graficotemp' },
        { text: 'Grafico Precipitazioni', icon: 'mdi-chart-line', route: '/graficopreci' },
      ]
    }
  },
  methods: {
    closeDrawer() {
      this.drawer = false;
    }
  }
}
</script>

<style scoped>
.v-navigation-drawer {
  background-color: #2c3e50 !important;
}

.v-list-item-title, .v-icon {
  color: white !important;
}

.v-app-bar {
  background-color: #2c3e50 !important;
}

.v-toolbar-title {
  color: white !important;
}

.v-app-bar-nav-icon {
  color: white !important;
}
</style>
