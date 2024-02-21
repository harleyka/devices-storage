<template>
  <div>
    <DataTable :value="devices" stripedRows tableStyle="min-width: 50rem">
      <Column field="hostname" header="Hostname"></Column>
      <Column field="device_type" header="Typ zařízení"></Column>
      <Column field="os_type" header="Typ OS"></Column>
      <Column field="owner" header="Vlastník"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';
import { ref } from "vue";

const devices = ref<Device[]>([]);

const response = await axios.get('http://127.0.0.1:8081/list');
devices.value = response.data;
</script>