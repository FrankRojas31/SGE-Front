<script lang="ts" setup>
import AppLogo from '@/components/global/AppLogo.vue'
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/auth/AuthStore.ts'
import type { IRegisterUser } from '@/types/Auth/Users.ts'

const toast = useToast();
const auth = useAuthStore();

const formData = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const errors = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: ''
})

const router = useRouter()

const validateForm = () => {
  let isValid = true
  errors.value = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  }

  if (!formData.value.fullName.trim()) {
    errors.value.fullName = 'El nombre completo es requerido'
    isValid = false
  } else if (formData.value.fullName.length < 3) {
    errors.value.fullName = 'El nombre debe tener al menos 3 caracteres'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.value.email) {
    errors.value.email = 'El correo electrónico es requerido'
    isValid = false
  } else if (!emailRegex.test(formData.value.email)) {
    errors.value.email = 'Ingrese un correo electrónico válido'
    isValid = false
  }

  if (!formData.value.password) {
    errors.value.password = 'La contraseña es requerida'
    isValid = false
  } else {
    if (formData.value.password.length < 8) {
      errors.value.password = 'La contraseña debe tener al menos 8 caracteres'
      isValid = false
    }

    if (!/[A-Z]/.test(formData.value.password)) {
      errors.value.password = 'La contraseña debe contener al menos una letra mayúscula'
      isValid = false
    }

    if (!/[a-z]/.test(formData.value.password)) {
      errors.value.password = 'La contraseña debe contener al menos una letra minúscula'
      isValid = false
    }
    if (!/[0-9]/.test(formData.value.password)) {
      errors.value.password = 'La contraseña debe contener al menos un número'
      isValid = false
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.value.password)) {
      errors.value.password = 'La contraseña debe contener al menos un carácter especial'
      isValid = false
    }
  }

  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Confirme su contraseña'
    isValid = false
  } else if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
    isValid = false
  }

  if (!formData.value.terms) {
    errors.value.terms = 'Debe aceptar los términos y condiciones'
    isValid = false
  }

  return isValid
}

const onSubmit = async () => {
  if (validateForm()) {
    const userregister: IRegisterUser = {
      name: formData.value.fullName,
      password: formData.value.password,
      confirmPassword: formData.value.confirmPassword,
      email: formData.value.email,
      rol: "PROFESOR",
      estatusUsuario: "ACTIVO"
    };
    const response = await auth.RegisterStore(userregister);

    if (response?.success == false) {
      toast.add({ summary: response.message, severity: 'warn', life: 3000 });
    }
  }
}
</script>

<template>
  <Toast />
  <div class="font-sans">
    <div class="relative min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <div class="relative sm:max-w-sm w-full">
        <div class="rounded-xl px-6 py-4 shadow-2xl bg-white mt-3">
          <AppLogo :route="false" />
          <label class="block mt-2 text-md text-gray-800 text-center font-semibold uppercase">
            Registro
          </label>
          <form class="mt-2" @submit.prevent="onSubmit">
            <!-- Full Name -->
            <label class="block mb-2 text-sm font-medium">Nombre Completo</label>
            <div class="relative mb-4">
              <IconField iconPosition="left">
                <InputIcon class="pi pi-user text-gray-400" />
                <input v-model="formData.fullName" type="text"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Juan de Dios Salmeron Rivera" :class="{ 'border-red-500': errors.fullName }" />
              </IconField>
              <small v-if="errors.fullName" class="text-red-500 text-xs mt-1 block">{{
                errors.fullName
              }}</small>
            </div>

            <!-- Email -->
            <label class="block mb-2 text-sm font-medium">Correo Electrónico</label>
            <div class="relative mb-4">
              <IconField iconPosition="left">
                <InputIcon class="pi pi-envelope text-gray-400" />
                <input v-model="formData.email" type="email"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="ejemplo@gmail.com" :class="{ 'border-red-500': errors.email }" />
              </IconField>
              <small v-if="errors.email" class="text-red-500 text-xs mt-1 block">{{
                errors.email
              }}</small>
            </div>

            <!-- Password -->
            <label class="block mb-2 text-sm font-medium">Contraseña</label>
            <div class="relative mb-[28px]">
              <IconField iconPosition="left">
                <InputIcon class="pi pi-lock text-gray-400" />
                <input v-model="formData.password" type="password"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="••••••••" :class="{ 'border-red-500': errors.password }" />
              </IconField>
              <small v-if="errors.password" class="text-red-500 text-xs mt-1 block">{{
                errors.password
              }}</small>
            </div>

            <!-- Confirm Password -->
            <label class="block mb-2 text-sm font-medium">Confirmar Contraseña</label>
            <div class="relative mb-[28px]">
              <IconField iconPosition="left">
                <InputIcon class="pi pi-lock text-gray-400" />
                <input v-model="formData.confirmPassword" type="password"
                  class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="••••••••" :class="{ 'border-red-500': errors.confirmPassword }" />
              </IconField>
              <small v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1 block">{{
                errors.confirmPassword
              }}</small>
            </div>

            <!-- Terms Checkbox -->
            <div class="mt-5 flex">
              <label class="inline-flex items-center w-full cursor-pointer">
                <input v-model="formData.terms" type="checkbox" class="" name="terms"
                  :class="{ 'border-red-500': errors.terms }" />
                <span class="ml-1 text-sm text-gray-600">Acepto los términos y condiciones</span>
              </label>
            </div>
            <small v-if="errors.terms" class="text-red-500 text-xs mt-1 block">{{
              errors.terms
            }}</small>

            <!-- Submit Button -->
            <div class="mt-4">
              <Button type="submit" class="w-full py-3 rounded-md shadow-md">
                Registrarse
              </Button>
            </div>

            <div class="text-center w-full mt-3 mb-3">
              <label class="text-sm">¿Ya tienes cuenta?</label>
              <RouterLink to="/login" class="underline text-sm text-gray-600 hover:text-gray-900">
                Inicia Sesión
              </RouterLink>
            </div>
          </form>
        </div>
        <div class="text-center py-5">
          <p class="text-xs">Copyright © Sistema Gestor Escolar<br />
            Todos los derechos Reservados</p>
        </div>
      </div>
    </div>
  </div>
</template>
