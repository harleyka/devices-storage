<template>
  <div>
      <Message v-if="success" severity="success" :life="1000">Zařízení bylo úspěšně přidáno.</Message>
      <Message v-if="error" severity="error">{{ error }}</Message>

      <form id="device-form" class="flex flex-col gap-2" @submit="saveForm" ref="deviceForm">
        <div class="flex flex-col gap-2">
          <label for="username">Hostname</label>
          <InputText id="username" v-model="formData.hostname" :disabled="success" :invalid="suiteResult?.hasErrors('hostname')" />
          <p class="text-sm p-error" v-if="suiteResult?.hasErrors('hostname')">{{ suiteResult?.getError('hostname') }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <label for="deviceType">Typ zařízení</label>
          <Dropdown id="deviceType" v-model="formData.device_type" :options="deviceTypes" :disabled="success" :invalid="suiteResult?.hasErrors('device_type')" />
          <p class="text-sm p-error" v-if="suiteResult?.hasErrors('device_type')">{{ suiteResult?.getError('device_type') }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <label for="osType">Typ OS</label>
          <Dropdown id="osType" v-model="formData.os_type" :options="osTypes" :disabled="success" :invalid="suiteResult?.hasErrors('os_type')" />
          <p class="text-sm p-error" v-if="suiteResult?.hasErrors('os_type')">{{ suiteResult?.getError('os_type') }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <label for="owner">Vlastník</label>
          <InputText id="owner" v-model="formData.owner_name" :disabled="success" :invalid="suiteResult?.hasErrors('owner_name')" />
          <p class="text-sm p-error" v-if="suiteResult?.hasErrors('owner_name')">{{ suiteResult?.getError('owner_name') }}</p>
        </div>
        <Button class="mx-auto" label="Uložit" @click="saveForm" :disabled="success" />
      </form>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import {reactive, ref} from "vue";
import {useFetch} from "@/composables/useFetch";
import { deviceFormSuite } from "@/suites/deviceFormSuite";
import type {SuiteResult} from "vest";

const deviceTypes: DeviceType[] = ['pc', 'laptop', 'mobile'];
const osTypes: OSType[] = ['win', 'lin', 'macOS', 'iOS', 'android'];

const emit = defineEmits<{
  (e: 'reloadTable'): void
}>();

const deviceForm = ref<HTMLFormElement>();

const formData = reactive<Device>({
  hostname: '',
  device_type: 'pc',
  os_type: 'win',
  owner_name: ''
})

const suiteResult = ref<SuiteResult>();
const error = ref<string>();
const success = ref<boolean>(false);

const saveForm = async () => {
  suiteResult.value = deviceFormSuite(formData);

  if (!suiteResult.value?.isValid()) {
    return;
  }

  const { hasError, errorMessage } = await useFetch('http://127.0.0.1:8081/save', { method: 'POST', data: formData });

  if (!hasError.value) {
    success.value = true;
    emit('reloadTable');
  } else {
    error.value = errorMessage.value;
  }
}
</script>