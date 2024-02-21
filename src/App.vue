<template>
  <header class="fixed h-20 w-full z-10 shadow-md flex justify-start bg-white">
    <img alt="Vue logo" class="ml-4 mr-16 my-auto" src="./assets/logo.svg" width="50" height="50" />

    <div class="my-auto">
      <h1 class="text-xl font-bold">Devices storage</h1>
    </div>

    <Button class="ml-auto mr-4 my-auto" label="Přidej" @click="showForm = true" />
  </header>

  <main class="min-h-screen pt-24 bg-gray-200">
    <Card class="xl:mx-64 lg:mx-16 mx-4">
      <template #content>
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
      </template>
    </Card>

    <Dialog v-model:visible="showForm" header="Přidat zařízení" :style="{ width: '50%' }" :modal="true" :draggable="false">
      <DeviceForm @reload-table="reloadTable" />
    </Dialog>
  </main>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
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