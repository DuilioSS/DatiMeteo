<template>
  <div class="chart-wrapper">
    <label for="city-dropdown" class="city-label">Scegli una città:</label>
    <select id="city-dropdown" v-model="currentCity" @change="refreshChart" class="city-select">
      <option value=""></option>
      <option v-for="city in cityList" :key="city" :value="city">{{ city }}</option>
    </select>
    <apexchart type="line" :options="chartConfig" :series="dataSeries" />
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartConfig: {
        chart: {
          id: 'temperature-chart'
        },
        xaxis: {
          categories: []
        },
        title: {
          text: 'Temperature Annuali'
        },
        yaxis: {
          title: {
            text: 'Temperatura (°C)'
          }
        },
        stroke: {
          curve: 'smooth',
          colors: ['#3498db'] // Imposta il colore della linea a blu
        }
      },
      dataSeries: [],
      excelData: [],
      cityList: [],
      currentCity: null
    };
  },
  mounted() {
    this.loadExcelData();
  },
  methods: {
    async loadExcelData() {
      try {
        const response = await fetch(new URL('@/assets/PrecipitazioneTotale.xlsx', import.meta.url));
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        jsonData = jsonData.slice(1); // Salta la prima riga

        const structuredData = jsonData.map(row => ({
          city: row[0],
          data: row.slice(1).map((value, index) => ({
            year: 2000 + index, // Assumi che i dati partano dall'anno 2000
            value
          })).filter(entry => entry.value !== null && entry.value !== undefined && entry.value !== '')
        })).filter(entry => entry.city && entry.data.length > 0);

        this.excelData = structuredData;
        this.cityList = this.excelData.map(entry => entry.city);

        if (this.cityList.length > 0) {
          this.currentCity = this.cityList[0];
          this.refreshChart();
        }
      } catch (error) {
        console.error('Errore nel caricamento del file Excel:', error);
      }
    },
    refreshChart() {
      if (!this.currentCity) return;

      const selectedData = this.excelData.find(entry => entry.city === this.currentCity);

      if (selectedData) {
        const temperatures = selectedData.data.map(data => data.value).filter(temp => temp < 50);
        const years = selectedData.data.map(data => data.year);

        this.chartConfig.xaxis.categories = years;
        this.dataSeries = [{
          name: 'Temperature',
          data: temperatures
        }];
      }
    }
  }
};
</script>

<style scoped>
.chart-wrapper {
  text-align: center;
  background-color: #f5f5dc; 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.city-label {
  font-size: 22px;
  color: black;  
  margin-bottom: 15px;
  display: block;
}

.city-select {
  width: 320px;
  height: 45px;
  font-size: 18px;
  margin-top: 15px;
  border-radius: 5px;
  border: 1px solid #bdc3c7;
  padding: 5px 10px;
  color: white; 
  background-color: #2c3e50;  
  transition: border-color 0.3s ease;
}

.city-select:focus {
  border-color: #e1ddc8;  
  outline: none;
}

</style>
