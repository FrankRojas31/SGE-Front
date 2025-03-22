<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const props = defineProps<{
  showModal: boolean;
  id: number
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'delete', id: number): void;
}>();


const confirmDelete = () => {
  emit('delete', props.id);
};

</script>

<template>
  <Dialog v-model:visible="props.showModal" header="Confirmar Eliminación" modal :style="{ width: '30rem' }"
    class="rounded-lg shadow-lg border border-gray-200">
    <div class="p-4">
      <div class="text-center">
        <i class="pi pi-exclamation-triangle text-red-500 mr-3" style="font-size: 50px;" />
      </div>
      <div class="flex items-center mb-4">
        <p class="text-gray-700 text-lg">
          ¿Estás seguro de que deseas eliminar este registro?
        </p>
      </div>
      <p class="text-gray-500 text-sm text-center">Esta acción no se puede deshacer</p>
    </div>

    <div class="flex justify-center gap-3 p-4">
      <Button label="Cancelar" severity="secondary" @click="$emit('close')" />
      <Button label="Eliminar" severity="danger" @click="confirmDelete" />
    </div>
  </Dialog>
</template>

<style scoped>
/* Estilos adicionales para mejorar la apariencia */
.rounded-lg {
  border-radius: 12px;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>
