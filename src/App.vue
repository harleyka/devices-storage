<template>
  <div class="flex flex-col justify-between h-screen">
    <header class="fixed h-20 w-full z-10 shadow-md flex  bg-white">
      <img alt="Vue logo" class="ml-4 flex-0 my-auto" src="./assets/logo.svg" width="50" height="50" />

      <div class="flex-1 my-auto text-center">
        <h1 class="text-xl font-bold">{{ $t('devices-storage') }}</h1>
      </div>

      <Button class="flex-0 mr-4 my-auto" :label="$t('add')" @click="showForm = true" />
    </header>

    <main class="flex flex-col flex-1 w-full mt-20 pt-4 bg-gray-200">
      <Card class="xl:mx-64 lg:mx-16 mx-4">
        <template #content>
          <Suspense>
            <template #default>
              <DeviceTable :key="tableKey" />
            </template>
            <template #fallback>
              <DataTable :value="[{}, {}, {}, {}]" stripedRows tableStyle="min-width: 50rem">
                <Column class="w-1/4" field="hostname" :header="$t('hostname')">
                  <template #body>
                    <Skeleton height="2rem"></Skeleton>
                  </template>
                </Column>
                <Column class="w-1/4" field="device_type" :header="$t('device-type')">
                  <template #body>
                    <Skeleton height="2rem"></Skeleton>
                  </template>
                </Column>
                <Column class="w-1/4" field="os_type" :header="$t('os-type')">
                  <template #body>
                    <Skeleton height="2rem"></Skeleton>
                  </template>
                </Column>
                <Column class="w-1/4" field="owner" :header="$t('owner')">
                  <template #body>
                    <Skeleton height="2rem"></Skeleton>
                  </template>
                </Column>
              </DataTable>
            </template>
          </Suspense>
        </template>
      </Card>

      <Dialog v-model:visible="showForm" :header="$t('add-device')" :style="{ width: '50%' }" :modal="true" :draggable="false">
        <DeviceForm @reload-table="reloadTable" />
      </Dialog>
    </main>
  </div>
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