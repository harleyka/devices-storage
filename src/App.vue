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
    </Suspense>
    <Divider />
    <Button class="mb-4" label="Přidej" @click="showForm = true" />
    <DeviceForm v-if="showForm" @reload-table="reloadTable" />
  </main>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Divider from 'primevue/divider';
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