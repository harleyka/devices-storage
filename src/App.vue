<template>
  <header class="fixed h-16 w-full z-10 shadow-md flex justify-start">
    <img alt="Vue logo" class="ml-4 mr-16 my-auto" src="./assets/logo.svg" width="50" height="50" />

    <div class="my-auto">
      <h1 class="text-xl font-bold">Devices storage</h1>
    </div>
  </header>

  <main class="mx-32 pt-20">
    <Suspense>
      <template #default>
        <DeviceTable :key="tableKey" />
      </template>
      <template #fallback>
        <DataTable :value="[{}, {}, {}, {}]" stripedRows tableStyle="min-width: 50rem">
          <Column class="w-1/4" field="hostname" header="Hostname">
            <template #body>
              <Skeleton height="2rem"></Skeleton>
            </template>
          </Column>
          <Column class="w-1/4" field="device_type" header="Typ zařízení">
            <template #body>
              <Skeleton height="2rem"></Skeleton>
            </template>
          </Column>
          <Column class="w-1/4" field="os_type" header="Typ OS">
            <template #body>
              <Skeleton height="2rem"></Skeleton>
            </template>
          </Column>
          <Column class="w-1/4" field="owner" header="Vlastník">
            <template #body>
              <Skeleton height="2rem"></Skeleton>
            </template>
          </Column>
        </DataTable>
      </template>
    </Suspense>
    <Divider />
    <Button class="mb-4" label="Přidej" @click="showForm = true" />
    <DeviceForm v-if="showForm" @reload-table="reloadTable" />
  </main>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Divider from 'primevue/divider';
import Skeleton from 'primevue/skeleton';
import { ref } from "vue";
import DeviceForm from "@/components/DeviceForm.vue";
import DeviceTable from "@/components/DeviceTable.vue";

const showForm = ref(false);
const tableKey = ref(0);

const reloadTable = () => {
  tableKey.value += 1;
  setTimeout(() => {
    showForm.value = false;
  }, 1000);
}
</script>