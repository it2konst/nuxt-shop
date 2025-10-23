<script setup lang="ts">
function openAbout() {
  navigateTo({ path: "/about" });
}
useSeoMeta({
  title: "Главная магазина",
  description: "Магазин Shoppe с ювелирными изделиями.",
  ogDescription: "Магазин Shoppe с ювелирными изделиями.",
});
</script>

<template>
  <div>
    Index
    <NuxtLink to="/about">About</NuxtLink>
    <button @click="openAbout">Перейти</button>
    <InputField variant="black" placeholder="Введите ваш email для подписки" />
  </div>
</template>