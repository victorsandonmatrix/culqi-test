import { computed, ref } from 'vue'

export const usePagination = () => {
  const currentPage = ref(1)
  const totalItems = ref(0)

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const totalPagesComputed = computed(() => Math.ceil(totalItems.value / 10))

  const visiblePages = computed(() => {
    const maxVisiblePages = 3 // Número máximo de páginas visibles a la vez

    if (totalPagesComputed.value <= maxVisiblePages) {
      return range(1, totalPagesComputed.value)
    }

    const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPagesComputed.value, startPage + maxVisiblePages - 1)

    // Ajuste para mostrar solo los 3 más cercanos y el último
    if (endPage - startPage >= maxVisiblePages) {
      return range(startPage - 1, startPage + 1)
    }

    return range(startPage, endPage)
  })

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPagesComputed.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPagesComputed.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  return {
    currentPage,
    visiblePages,
    goToPage,
    nextPage,
    prevPage,
    totalItems,
    totalPagesComputed
  }
}
