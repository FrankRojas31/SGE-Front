<script lang="ts" setup>
import Button from 'primevue/button';

</script>

<template>
  <div class="mt-20 relative min-h-[400rem] lg:min-h-0 bg-gray-50 flex lg:flex-row flex-col">
    <div class="flex lg:flex lg:flex-row flex-col justify-center md:justify-normal h-full flex-1">
      <div class="relative flex-1 z-20 flex items-center justify-center">
        <div class="flex items-center justify-center h-full">
          <div class="w-full max-w-2xl px-6 py-12 lg:p-12 xl:p-16 text-center lg:text-left">
            <h1
              class="text-4xl xl:text-5xl font-bold text-surface-0 lg:text-surface-900 dark:text-surface-0 mb-6 !leading-tight">
              <span class="block">Bienvenido al</span>
              <span class="block text-[#10b981]">Sistema Gestor Escolar</span>
            </h1>

            <p
              class="text-surface-0/90 lg:text-surface-700 dark:text-surface-200 text-xl leading-normal mb-8 max-w-xl lg:max-w-none">
              Optimiza la gestión académica de tu institución con nuestra plataforma. Administra alumnos, Materias y
              calificaciones de manera eficiente y segura.
            </p>

            <ul
              class="text-surface-0/90 lg:text-surface-700 dark:text-surface-200 text-lg leading-relaxed mb-8 list-disc list-inside">
              <li>Registro y gestión de docentes.</li>
              <li>Control de calificaciones y materias.</li>
              <li>Interfaz intuitiva y segura.</li>
            </ul>

            <div class="flex items-center gap-4 justify-center lg:justify-start">
              <Button label="Explorar Funciones" type="button" />
              <Button label="Solicitar Demo" type="button" outlined />
            </div>
          </div>
        </div>
      </div>

      <div class="absolute lg:relative inset-0 lg:inset-auto flex-1">
        <div class="absolute lg:hidden inset-0 z-10"></div>
        <img src="/src/assets/images/background.jpg" alt="Sistema Gestor Escolar"
          class="h-full w-full object-cover xl:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]" />
      </div>
    </div>
  </div>
</template>
