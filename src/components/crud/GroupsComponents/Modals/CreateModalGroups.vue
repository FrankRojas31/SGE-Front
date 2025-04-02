<script lang="ts" setup>
import { ref, computed } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Select from 'primevue/select';
import type { Groups } from '@/types/Groups';
import { useUserStore } from '@/stores/userStore.ts'
import type { IAuthUser } from '@/types/Auth/Users.ts'

const modalItem = ref<Groups>({} as Groups);
const errors = ref<Record<string, string>>({});
const userStore = useUserStore();
const selectedUser = ref<IAuthUser | null>(null);

const props = defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'create', group: Groups): void;
}>();

const formattedUsers = computed(() => {
  return userStore.usersList.map((user) => ({
    ...user,
    username: `${user.name}`
  }));
});

const validateFields = () => {
  errors.value = {};
  let isValid = true;

  if (!modalItem.value.nombre?.trim()) {
    errors.value.nombre = 'El nombre es requerido';
    isValid = false;
  }
  if (!modalItem.value.descripcion?.trim()) {
    errors.value.descripcion = 'La descripción es requerida';
    isValid = false;
  }
  if (!selectedUser.value) {
    errors.value.persona = 'Debe seleccionar una persona';
    isValid = false;
  }

  return isValid;
};

const HandleCreate = () => {
  if (validateFields()) {
    if (selectedUser.value) {
      modalItem.value.idUsuario = selectedUser.value!.id || "";
    }
    emit('create', modalItem.value);
    modalItem.value = {} as Groups;
    selectedUser.value = null;
    errors.value = {};
  }
};

const HandleCancel = () => {
  modalItem.value = {} as Groups;
  selectedUser.value = null;
  errors.value = {};
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Grupo" modal :style="{ width: '30rem' }"
          class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre del Grupo</label>
      <InputText v-model="modalItem.nombre" placeholder="Ingresa el nombre del grupo" class="w-full"
                 :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="modalItem.descripcion" placeholder="Ingresa la descripción del grupo" class="w-full"
                 :class="{ 'p-invalid': errors.descripcion }" />
      <small v-if="errors.descripcion" class="text-red-500 text-sm mt-1">{{ errors.descripcion }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Profesor</label>
      <Select v-model="selectedUser" :options="formattedUsers" optionLabel="username"
              placeholder="Selecciona un profesor" class="w-full" filter :class="{ 'p-invalid': errors.persona }" />
      <small v-if="errors.persona" class="text-red-500 text-sm mt-1">{{ errors.persona }}</small>
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>
