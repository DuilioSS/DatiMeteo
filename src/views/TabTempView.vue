<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-typography variant="h4" class="my-4">
          Tabella Temperature Medie
        </v-typography>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-simple-table v-if="tableData.length">
          <thead>
            <tr>
              <th v-for="(value, key) in tableData[0]" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in tableData" :key="index">
              <td v-for="(value, key) in row" :key="key">{{ value }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'TemperatureTableView',
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.fetchExcelData();
  },
  methods: {
    async fetchExcelData() {
      try {
        const response = await fetch(new URL('@/assets/TemperaturaMedia.xlsx', import.meta.url));
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        let json = XLSX.utils.sheet_to_json(worksheet);

        // Rimuovi intestazioni vuote
        json = json.filter(row => Object.values(row).some(value => value !== ''));

        this.tableData = json;

        // Visualizza array di elementi nella console
        console.log('Array di elementi:', this.tableData);
      } catch (error) {
        console.error('Errore nel caricamento del file Excel:', error);
      }
    }
  }
};
</script>

<style scoped>
.v-container {
  background-color: #f5f5dc; /* Beige */
  padding: 20px;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff; /* Bianco */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
}

th {
  background-color: #2c3e50; /* Blu scuro */
  color: white;
  text-align: left;
  font-weight: bold;
}

td {
  text-align: left;
  color: #2c3e50; /* Blu scuro */
}

.v-simple-table {
  margin-top: 20px;
}
</style>
