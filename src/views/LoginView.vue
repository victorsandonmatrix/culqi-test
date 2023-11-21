<template>
  <body class="flex w-screen min-h-screen">
    <div class="w-1/2 min-h-screen max-h-screen">
      <img src="../assets/imgs/Photo.png" class="w-full object-cover h-2/3" />

      <div
        class="flex flex-col p-12 items-start bg-gray9 h-1/3 justify-center gap-6 border-t-8 border-primarybase"
      >
        <img src="../assets/imgs/logo_white.svg" />
        <h2 class="text-5xl text-white font-bold">
          Dale más power ⚡ a tus empleados hoy 💪
        </h2>
        <p class="text-white text-lg font-normal">
          Te ayudamos a gestionarlos de manera más sencilla
        </p>
      </div>
    </div>

    <div class="flex flex-col items-center min-h-screen max-h-screen w-1/2">
      <form
        @submit.prevent="login"
        class="flex flex-col w-2/3 items-center justify-center gap-6 flex-grow"
      >
        <h1 class="text-2xl text-gray9 font-bold">Inicia sesión</h1>

        <InputItem
          v-model:value="email"
          label="Correo electrónico"
          placeholder="Ingresa el correo electrónico"
          type="email"
        />

        <InputItem
          label="Contraseña"
          placeholder="Contraseña"
          type="password"
          v-model:value="password"
        />

        <p
          v-if="isError"
          class="text-red my-2 flex self-start items-center gap-2 font-light text-xs"
        >
          <i class="material-icons text-red">error_outline</i> Correo o contraseña
          incorrectos
        </p>

        <button
          type="submit"
          :disabled="isLoading"
          class="bg-gray9 text-white font-bold text-md w-full p-4 rounded-xl disabled:bg-gray-500"
        >
          {{ isLoading ? '... Cargando' : 'Iniciar sesión' }}
        </button>

        <p class="text-gray5 font-light text-sm">
          ¿Eres nuevo aquí?
          <router-link to="/" class="text-primaryGreen300"
            >Crea una cuenta</router-link
          >
        </p>
      </form>

      <p class="mt-auto font-medium text-gray5 mb-6">
        © {{ year }} Culqi . Todos los derechos reservados
      </p>
    </div>
  </body>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { postLogin } from '@/api/services/loginService'
import InputItem from '@/components/InputItem/InputItem.vue'
import { useAuthStore } from '@/store/useAuthStore'
import router from '@/router'

const year = new Date().getFullYear()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const isError = ref(false)

async function login() {
  try {
    isLoading.value = true

    const { data } = await postLogin(email.value, password.value)
    useAuthStore().setAuth(data.token, data.user)
    router.push({ name: 'empleados' })
  } catch (error) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (useAuthStore().token) {
    router.push({ name: 'empleados' })
  }
})
</script>
