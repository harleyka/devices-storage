<template>
  <Card>
    <template #title>Přidat zařízení</template>
    <template #content>
      <Message v-if="success" severity="success" :life="1000">Zařízení bylo úspěšně přidáno.</Message>
      <Message v-if="error" severity="error">{{ error }}</Message>
      <form id="device-form" class="flex flex-col gap-2" @submit="saveForm" ref="deviceForm">
        <div class="flex flex-col gap-2">
          <label for="username">Hostname</label>
          <InputText id="username" v-model="hostname" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="deviceType">Typ zařízení</label>
          <Dropdown id="deviceType" v-model="deviceType" :options="deviceTypes" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="osType">Typ OS</label>
          <Dropdown id="osType" v-model="osType" :options="osTypes" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="owner">Vlastník</label>
          <InputText id="owner" v-model="owner" />
        </div>
        <Button class="mx-auto" label="Uložit" @click="saveForm" />
      </form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import { ref } from "vue";
import axios, { AxiosError } from "axios";

const deviceTypes: DeviceType[] = ['pc', 'laptop', 'mobile'];
const osTypes: OSType[] = ['win', 'lin', 'macOS', 'iOS', 'android'];

const emit = defineEmits<{
  (e: 'reloadTable'): void
}>();

const deviceForm = ref<HTMLFormElement>();

const hostname = ref<string>('');
const deviceType = ref<DeviceType>('pc');
const osType = ref<OSType>('win');
const owner = ref<string>('');

const error = ref<string>();
const success = ref<boolean>(false);

const saveForm = async () => {
  error.value = '';

  try {
    const response = await axios.post('http://127.0.0.1:8081/save', {
      hostname: hostname.value,
      device_type: deviceType.value,
      os_type: osType.value,
      owner_name: owner.value
    });

    if (response.status === 200) {
      success.value = true;
      deviceForm.value?.reset();
      emit('reloadTable');
    }
  }
  catch (err: Error | AxiosError) {
    if ((err as AxiosError).response.status === 500) {
      error.value = 'Chyba na straně serveru.';
    } else {
      error.value = (err as AxiosError).response.data as string;
    }
  }
}
</script>