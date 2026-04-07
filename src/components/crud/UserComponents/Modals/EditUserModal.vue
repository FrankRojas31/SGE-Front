<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import type { IUser } from '@/types/Users';
import { ref, watch } from 'vue';

const props = defineProps<{
  showModal: boolean;
  modalItem: IUser;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update', user: IUser): void;
}>();

const HandleUpdate = () => {
  emit('update', props.modalItem);
};

const HandleCancel = () => {
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Editar Usuario" modal :style="{ width: '30rem' }">
    <div class="mb-4">
      <label class="block">Nombre de Usuario</label>
      <InputText v-model="props.modalItem.username" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block">Correo Electrónico</label>
      <InputText v-model="props.modalItem.email" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block">Contraseña</label>
      <InputText v-model="props.modalItem.password" type="password" class="w-full" required />
    </div>

    <div class="mb-4">
      <label class="block">Rol</label>
      <InputText v-model="props.modalItem.rol" class="w-full" required />
    </div>

    <template #footer>
      <Button label="Cancelar" severity="secondary" @click="HandleCancel" />
      <Button label="Guardar" severity="success" @click="HandleUpdate" />
    </template>
  </Dialog>
</template>
