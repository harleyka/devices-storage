<template>
    <DataTable :value="devices" sortField="owner" :sortOrder="-1"  stripedRows tableStyle="min-width: 50rem" scrollHeight="80vh" scrollable>
      <Column class="w-1/4" field="hostname" :header="$t('hostname')" sortable></Column>
      <Column class="w-1/4" field="device_type" :header="$t('device-type')" sortable></Column>
      <Column class="w-1/4" field="os_type" :header="$t('os-type')" sortable></Column>
      <Column class="w-1/4" field="owner" :header="$t('owner')" sortable></Column>
    </DataTable>
</template>

<script setup lang="ts">
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { useFetch } from "@/composables/useFetch";

const { data: devices } = await useFetch<DeviceResponse[]>('/list');
</script>