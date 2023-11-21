<template>
  <div class="flex min-h-screen bg-gray50">
    <nav
      class="flex flex-col items-center p-6 pl-8 pr-8 w-1/5 border-r border-gray3 bg-white"
    >
      <img src="@/assets/imgs/logo_black.svg" alt="Culqui" class="mt-8 mb-8" />

      <ul class="flex flex-col gap-4 self-start mt-4">
        <li
          class="flex font-bold text-gray9"
          :class="{ 'text-primaryGreen300': matchRoute('/') }"
        >
          <i
            class="material-icons mr-2.5 text-gray5"
            :class="{ 'text-primaryGreen300': matchRoute('/') }"
            >people</i
          >
          Empleados
        </li>
        <li
          class="flex font-bold text-gray9"
          :class="{ 'text-primaryGreen300': matchRoute('/reclutamiento') }"
        >
          <i
            class="material-icons mr-2.5 text-gray5"
            :class="{ 'text-primaryGreen300': matchRoute('/reclutamiento') }"
            >business_center</i
          >
          Reclutamiento
        </li>
      </ul>

      <button
        :onclick="logout"
        class="mt-auto rounded-lg border border-gray9 w-full text-gray-9 font-bold py-3"
      >
        Salir
      </button>
    </nav>

    <div class="w-4/5 min-h-screen">
      <header
        class="flex justify-end items-center py-8 border-b border-gray3 px-8 gap-2 bg-white"
      >
        <p class="text-white bg-orangePrimary rounded-full font-bold p-1.5">
          {{ firstLetters }}
        </p>
        <p class="font-bold text-gray9">
          {{ user?.nombre }}
        </p>
      </header>

      <div class="pt-8 px-6 pb-8">
        <div class="rounded-2xl bg-white p-6">
          <div class="flex justify-between items-center">
            <div class="flex flex-col gap-2">
              <h2 class="font-bold text-2xl">Empleados</h2>
              <p class="font-medium text-gray6">Gestiona tus empleados</p>
            </div>

            <div class="flex items-center gap-5">
              <button
                class="flex mt-auto rounded-lg border border-gray9 w-full text-gray-9 font-bold py-4 px-5"
              >
                <i class="material-icons mr-2">file_download</i>
                Descargar
              </button>
              <button
                class="flex mt-auto rounded-lg border bg-gray9 border-gray9 w-full text-white font-bold py-4 px-5"
              >
                <i class="material-icons mr-2">add</i> Nuevo
              </button>
            </div>
          </div>

          <div v-if="loading" class="mt-14 mb-12">
            <SkeletonRow v-for="index in 10" :key="index" />
          </div>

          <table v-else class="w-full mt-6">
            <tr class="bg-gray-50">
              <th
                class="font-bold text-gray6 text-xs px-4 py-5 text-left rounded-l-xl w-1/6"
              >
                Nombre
              </th>
              <th class="font-bold text-gray6 text-xs px-4 py-5 w-1/6 text-left">
                Nombre cargo
              </th>
              <th class="font-bold text-gray6 text-xs px-4 py-5 w-1/6 text-left">
                Departamento
              </th>
              <th class="font-bold text-gray6 text-xs px-4 py-5 w-1/6 text-left">
                Oficina
              </th>
              <th class="font-bold text-gray6 text-xs px-4 py-5 w-1/6 text-left">
                Cuenta
              </th>
              <th
                class="font-bold text-gray6 text-xs px-4 py-5 text-right rounded-r-xl w-1/6"
              >
                Acciones
              </th>
            </tr>

            <tr
              class="border-b border-gray2"
              v-for="empleado in empleados"
              :key="empleado.id"
            >
              <td class="py-4 px-4 text-left w-1/6">
                <p class="font-medium text-xs text-gray9">{{ empleado.nombre }}</p>
                <p class="font-normal text-xxs text-gray5">{{ empleado.correo }}</p>
              </td>
              <td class="font-normal text-xs w-1/6 px-4">{{ empleado.cargo }}</td>
              <td class="font-normal text-xs w-1/6 px-4">{{ empleado.departamento }}</td>
              <td class="font-normal text-xs w-1/6 px-4">{{ empleado.oficina }}</td>
              <td class="font-normal text-xs w-1/6 px-4">{{ empleado.estadoCuenta }}</td>
              <td class="font-normal text-xs text-right px-4 w-1/6 gap-2.5">
                <i
                  class="material-icons bg-primarybase text-white rounded-lg p-1.5 cursor-pointer"
                  >visibility</i
                >
                <i
                  class="material-icons bg-blue text-white rounded-lg p-1.5 mx-2.5 cursor-pointer"
                  >edit</i
                >
                <i
                  class="material-icons bg-red text-white rounded-lg p-1.5 cursor-pointer"
                  >delete_outline</i
                >
              </td>
            </tr>
            <tr class="flex mt-4">
              <i
                class="cursor-pointer material-icons border border-gray2 rounded-lg p-2.5 mr-6"
                :class="{ 'cursor-not-allowed text-gray2': currentPage === 1 }"
                @click="prevPage"
                >chevron_left</i
              >
              <span v-for="page in visiblePages" :key="page" class="flex gap-4">
                <span
                  class="cursor-pointer p-2.5 px-4 rounded-lg font-medium"
                  :class="{ 'bg-gray2': page === currentPage }"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </span>
              </span>

              <span
                class="self-center"
                v-if="visiblePages[visiblePages.length - 1] < totalPagesComputed"
              >
                ...
              </span>

              <span
                v-if="visiblePages[visiblePages.length - 1] < totalPagesComputed"
                class="cursor-pointer p-2.5 rounded-lg font-medium"
                :class="{ 'bg-gray2': totalPagesComputed === currentPage }"
                @click="goToPage(totalPagesComputed)"
              >
                {{ totalPagesComputed }}
              </span>
              <i
                class="cursor-pointer material-icons border border-gray2 rounded-lg p-2.5 ml-6"
                :class="{
                  'cursor-not-allowed text-gray2': currentPage === totalPagesComputed
                }"
                @click="nextPage"
                >chevron_right</i
              >
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/store/useAuthStore'
import { getEmpleados } from '@/api/services/empleadosService'
import type { Empleado } from '@/api/types/Empleados'
import { usePagination } from '@/hooks/usePagination'
import SkeletonRow from '@/components/Skeleton/SkeletonRow.vue'

const authStore = useAuthStore()
const user = authStore.user
const empleados = ref<Empleado[]>([])
const loading = ref(false)
const {
  currentPage,
  goToPage,
  nextPage,
  prevPage,
  visiblePages,
  totalItems,
  totalPagesComputed
} = usePagination()
console.log(visiblePages.value)

const firstLetters = user?.nombre
  .split(' ')
  .map((word) => word[0])
  .join('')

const logout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}

const fetchEmpleados = async (currentPage?: number) => {
  try {
    loading.value = true
    const { data, total } = await getEmpleados(currentPage ?? 1)
    empleados.value = data
    totalItems.value = total
    console.log(data)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEmpleados()
})

watch(currentPage, () => {
  fetchEmpleados(currentPage.value)
})

const matchRoute = (route: string) => {
  return route === router.currentRoute.value.path
}
</script>
