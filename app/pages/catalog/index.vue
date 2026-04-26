<script setup lang="ts">
import type { GetCategoriesResponse } from "~/interfaces/category.interface";
import type { GetProductsResponse, Product } from "~/interfaces/product.interface";

useSeoMeta({
  title: "Каталог товаров",
  description: "Каталог товаров магазина Shoppe с ювелирными изделиями.",
  ogDescription: "Каталог товаров магазина Shoppe с ювелирными изделиями.",
});

const config = useRuntimeConfig();
const API_URL = config.public.apiurl;
const route = useRoute();
const router = useRouter();

const categoryId = ref(route.query.category_id?.toString() ?? "");
const search = ref(route.query.search?.toString() ?? "");
const sort = ref(route.query.sort?.toString() ?? "popular");

const { data: categoriesData } = await useFetch<GetCategoriesResponse>(
  `${API_URL}/api/categories.json`
);

const categoryDefault = { value: "", label: "Все категории" };
const categoriesSelect = computed(() => {
  const categoryOptions =
    categoriesData.value?.categories.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })) ?? [];

  return [categoryDefault, ...categoryOptions];
});

const sortOptions = [
  { value: "popular", label: "По умолчанию" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "name_asc", label: "Название: А-Я" },
  { value: "discount_desc", label: "Скидка: сначала больше" },
];

const { data: productsData } = await useFetch<GetProductsResponse>(
  `${API_URL}/api/products.json`,
  {
    key: "catalog-products",
  }
);

const normalizedSearch = computed(() => search.value.trim().toLowerCase());

const filteredProducts = computed<Product[]>(() => {
  const products = productsData.value?.products ?? [];

  const byCategory = products.filter((product) => {
    if (!categoryId.value) {
      return true;
    }
    return product.category_id.toString() === categoryId.value;
  });

  const bySearch = byCategory.filter((product) => {
    if (!normalizedSearch.value) {
      return true;
    }

    const name = product.name.toLowerCase();
    const shortDescription = product.short_description.toLowerCase();
    const categoryName = product.category.name.toLowerCase();

    return (
      name.includes(normalizedSearch.value) ||
      shortDescription.includes(normalizedSearch.value) ||
      categoryName.includes(normalizedSearch.value)
    );
  });

  const sorted = [...bySearch];

  if (sort.value === "price_asc") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (sort.value === "price_desc") {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (sort.value === "name_asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "ru"));
  }

  if (sort.value === "discount_desc") {
    sorted.sort((a, b) => b.discount - a.discount);
  }

  return sorted;
});

const productsCountText = computed(() => {
  const count = filteredProducts.value.length;
  if (count === 1) {
    return "1 товар";
  }
  if (count >= 2 && count <= 4) {
    return `${count} товара`;
  }
  return `${count} товаров`;
});

function resetFilters() {
  categoryId.value = "";
  search.value = "";
  sort.value = "popular";
}

watch([categoryId, search, sort], async () => {
  const query: Record<string, string> = {};

  if (categoryId.value) {
    query.category_id = categoryId.value;
  }
  if (search.value.trim()) {
    query.search = search.value.trim();
  }
  if (sort.value !== "popular") {
    query.sort = sort.value;
  }

  await router.replace({ query });
});

watch(
  () => route.query,
  (query) => {
    categoryId.value = query.category_id?.toString() ?? "";
    search.value = query.search?.toString() ?? "";
    sort.value = query.sort?.toString() ?? "popular";
  }
);
</script>

<template>
  <div>
    <h1 class="left">Каталог товаров</h1>
    <p class="catalog__count">Найдено: {{ productsCountText }}</p>

    <div class="catalog">
      <aside class="catalog__filter">
        <div class="catalog__search">
          <InputField v-model="search" variant="gray" placeholder="Поиск по каталогу..." />
          <Icon name="icons:search" size="18px" />
        </div>

        <SelectField v-model="categoryId" :options="categoriesSelect" />
        <SelectField v-model="sort" :options="sortOptions" />

        <button class="catalog__reset" type="button" @click="resetFilters">
          Сбросить фильтры
        </button>
      </aside>

      <div class="catalog__content">
        <div v-if="filteredProducts.length" class="catalog__grid">
          <CatalogCard
            v-for="product in filteredProducts"
            :key="product.id"
            v-bind="product"
          />
        </div>

        <div v-else class="catalog__empty">
          <h2>Ничего не найдено</h2>
          <p>Попробуйте изменить фильтр категории или поисковый запрос.</p>
          <button type="button" @click="resetFilters">Сбросить и показать все</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalog__count {
  margin-top: 12px;
  color: var(--color-dark-gray);
  font-size: 15px;
}

.catalog {
  display: flex;
  gap: 36px;
  margin-top: 20px;
}

.catalog__filter {
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex-shrink: 0;
}

.catalog__content {
  width: 100%;
  min-width: 0;
}

.catalog__grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 64px 12px;
}

.catalog__search {
  position: relative;
}

.catalog__search .iconify {
  position: absolute;
  top: 12px;
  right: 8px;
}

.catalog__reset {
  margin-top: 4px;
  border: 1px solid var(--color-gray);
  background: var(--color-white-light);
  border-radius: 6px;
  padding: 10px 12px;
  cursor: pointer;
  font-family: inherit;
}

.catalog__reset:hover {
  border-color: var(--color-black);
}

.catalog__empty {
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.catalog__empty h2 {
  font-size: 24px;
  font-weight: 500;
}

.catalog__empty p {
  color: var(--color-dark-gray);
  line-height: 1.5;
}

.catalog__empty button {
  width: fit-content;
  border: 1px solid var(--color-black);
  background: var(--color-black);
  color: var(--color-white-light);
  border-radius: 6px;
  padding: 10px 14px;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .catalog {
    flex-direction: column;
  }

  .catalog__filter {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .catalog__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
