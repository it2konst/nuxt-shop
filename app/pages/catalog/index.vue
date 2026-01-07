<script setup lang="ts">
  import type { GetCategoriesResponse } from "~/interfaces/category.interface";
  
  const config = useRuntimeConfig();
  const API_URL = config.public.apiurl;

  const { data, error } = await useFetch<GetCategoriesResponse>(`${API_URL}/api/categories.json`);
  console.log(data.value);
  console.log(error.value);

  // try {
  //   const data = await $fetch<GetCategoriesResponse>(API_URL + '/api/categories');
  //   console.log(data);
  // } catch (error) {
  //   console.log(error);
  // }
</script>

<template>
  <div>catalog</div>
</template>


