<template>
    <DataTable :value="devices" sortMode="multiple" stripedRows tableStyle="min-width: 50rem" scrollHeight="80vh" scrollable>
      <Column class="w-1/4" field="hostname" header="Hostname"></Column>
      <Column class="w-1/4" field="device_type" header="Typ zařízení"></Column>
      <Column class="w-1/4" field="os_type" header="Typ OS"></Column>
      <Column class="w-1/4" field="owner" header="Vlastník"></Column>
    </DataTable>
</template>

<script setup lang="ts">
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { useFetch } from "@/composables/useFetch";

const { data: devices } = await useFetch<DeviceResponse[]>('http://127.0.0.1:8081/list');
</script>