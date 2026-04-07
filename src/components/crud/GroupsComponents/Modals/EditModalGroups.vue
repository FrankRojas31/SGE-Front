<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Select from 'primevue/select';
import type { Groups } from '@/types/Groups';
import { useUserStore } from '@/stores/userStore.ts';
import type { IAuthUser } from '@/types/Auth/Users.ts';

const props = defineProps<{
  showModal: boolean;
  modalItem: Groups;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', group: Groups): void;
}>();

const userStore = useUserStore();
const selectedUser = ref<IAuthUser | null>(null);
const errors = ref<Record<string, string>>({});

const formattedUsers = computed(() => {
  return userStore.usersList.map((user) => ({
    ...user,
    username: `${user.name}`
  }));
});

watch(() => props.showModal, (newVal) => {
  if (newVal) {
    selectedUser.value = formattedUsers.value.find(user => user.id === props.modalItem.idUsuario) || null;
    errors.value = {};
  }
}, { immediate: true });

const validateFields = () => {
  errors.value = {};
  let isValid = true;

  if (!props.modalItem.nombre?.trim()) {
    errors.value.nombre = 'El nombre es requerido';
    isValid = false;
  }
  if (!props.modalItem.descripcion?.trim()) {
    errors.value.descripcion = 'La descripción es requerida';
    isValid = false;
  }
  if (!selectedUser.value) {
    errors.value.persona = 'Debe seleccionar una persona';
    isValid = false;
  }

  return isValid;
};

const HandleUpdate = () => {
  if (validateFields()) {
    if (selectedUser.value) {
      props.modalItem.idUsuario = selectedUser.value.id || "";
    }
    emit('update', props.modalItem);
  }
};

const HandleCancel = () => {
  errors.value = {};
  selectedUser.value = null;
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Grupo" modal :style="{ width: '30rem' }"
          class="rounded-lg shadow-lg" @update:visible="HandleCancel">

    <!-- Nombre del Grupo -->
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre del Grupo</label>
      <InputText v-model="props.modalItem.nombre" placeholder="Ingresa el nombre del grupo" class="w-full"
                 :class="{ 'p-invalid': errors.nombre }" />
      <small v-if="errors.nombre" class="text-red-500 text-sm mt-1">{{ errors.nombre }}</small>
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Descripción</label>
      <InputText v-model="props.modalItem.descripcion" placeholder="Ingresa la descripción del grupo" class="w-full"
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
      <Button label="Actualizar" severity="success" @click="HandleUpdate" />
    </template>
  </Dialog>
</template>
