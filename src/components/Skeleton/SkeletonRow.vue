<template>
  <div class="skeleton-row">
    <div class="skeleton-cell"></div>
    <div class="skeleton-cell"></div>
    <div class="skeleton-cell"></div>
    <div class="skeleton-cell"></div>
    <div class="skeleton-cell"></div>
    <div class="skeleton-cell"></div>
  </div>
</template>

<style scoped>
.skeleton-row {
  display: flex;
  margin-top: 28px;
  width: 100%;
  justify-content: space-between;
}

.skeleton-cell {
  height: 30px;
  width: 150px;
  background-color: #ddd;
  animation: loading 1.5s infinite ease-in-out;
  margin-right: 8px;
  border-radius: 16px;
  padding: 12px;
}

@keyframes loading {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
</style>
