<script setup lang="ts">
import { ref } from 'vue';
import type { IUser } from '@/types/Users';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps<{
  showModal: boolean
}>();

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create', user: IUser): void
}>();

const modalItem = ref<IUser>({} as IUser);

const HandleCreate = () => {
  emit('create', modalItem.value);
}

const HandleCancel = () => {
  modalItem.value = {} as IUser;
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Crear Usuario" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg" @update:visible="HandleCancel">
    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Nombre</label>
      <InputText v-model="modalItem.name" placeholder="Ej: Juan" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Correo Electrónico</label>
      <InputText v-model="modalItem.email" placeholder="Ej: ejemplo@mail.com" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Contraseña</label>
      <InputText v-model="modalItem.password" type="password" placeholder="Contraseña" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Confirmar Contraseña</label>
      <InputText v-model="modalItem.confirmPassword" type="password" placeholder="Confirmar Contraseña" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Rol</label>
      <InputText v-model="modalItem.rol" placeholder="Ej: Admin" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block text-gray-600 text-lg font-medium">Estatus</label>
      <InputText v-model="modalItem.estatusUsuario" placeholder="Ej: Activo" class="w-full" required />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Crear" severity="success" @click="HandleCreate" />
    </template>
  </Dialog>
</template>
