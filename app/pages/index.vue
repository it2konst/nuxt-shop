<script setup lang="ts">
import type { GetProductsResponse } from "~/interfaces/product.interface";

const config = useRuntimeConfig();
const API_URL = config.public.apiurl;

useSeoMeta({
  title: "Shoppe | Украшения на каждый день",
  description:
    "Подборка ювелирных изделий Shoppe: серьги, кольца, ожерелья и браслеты.",
  ogDescription:
    "Подборка ювелирных изделий Shoppe: серьги, кольца, ожерелья и браслеты.",
});

const { data: productsData } = await useFetch<GetProductsResponse>(
  `${API_URL}/api/products.json`,
  {
    key: "home-products",
  }
);

const featuredProducts = computed(() => productsData.value?.products.slice(0, 4) ?? []);

const highlights = [
  {
    title: "Бесплатная доставка",
    text: "Для заказов от $120 по всей стране.",
  },
  {
    title: "Упаковка в подарок",
    text: "Каждое украшение приходит в фирменной коробке.",
  },
  {
    title: "14 дней на возврат",
    text: "Если украшение не подошло, мы быстро поможем с обменом.",
  },
];

const categories = [
  { label: "Серьги", id: 1 },
  { label: "Кольца", id: 2 },
  { label: "Ожерелья", id: 3 },
  { label: "Браслеты", id: 4 },
];
</script>

<template>
  <div class="home">
    <section class="home__hero">
      <p class="home__eyebrow">Новая коллекция</p>
      <h1 class="left">Украшения, которые хочется носить каждый день</h1>
      <p class="home__lead">
        В Shoppe мы собрали лаконичные модели из серебра и золота: от базовых
        серег до акцентных колец.
      </p>
      <div class="home__actions">
        <NuxtLink to="/catalog" class="home__button home__button--primary">
          Перейти в каталог
        </NuxtLink>
        <NuxtLink to="/about" class="home__button home__button--ghost">
          О бренде
        </NuxtLink>
      </div>
    </section>

    <section class="home__highlights">
      <article v-for="item in highlights" :key="item.title" class="home__highlight-item">
        <h2>{{ item.title }}</h2>
        <p>{{ item.text }}</p>
      </article>
    </section>

    <section class="home__categories">
      <h2>Категории</h2>
      <div class="home__category-list">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/catalog?category_id=${category.id}`"
          class="home__category"
        >
          {{ category.label }}
        </NuxtLink>
      </div>
    </section>

    <section class="home__featured">
      <div class="home__section-title">
        <h2>Популярные товары</h2>
        <NuxtLink to="/catalog">Смотреть все</NuxtLink>
      </div>
      <div class="home__grid">
        <CatalogCard
          v-for="product in featuredProducts"
          :key="product.id"
          v-bind="product"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 72px;
}

.home__hero {
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  padding: 48px;
  background: linear-gradient(115deg, #f8f6f2 0%, #ffffff 55%, #efe8dc 100%);
}

.home__eyebrow {
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 16px;
}

.home__lead {
  margin-top: 16px;
  max-width: 620px;
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-dark-gray);
}

.home__actions {
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.home__button {
  text-decoration: none;
  border-radius: 6px;
  padding: 13px 18px;
  font-size: 15px;
  font-weight: 500;
  transition: 0.2s ease;
}

.home__button--primary {
  background: var(--color-black);
  color: var(--color-white-light);
}

.home__button--primary:hover {
  background: var(--color-black-hover);
}

.home__button--ghost {
  border: 1px solid var(--color-black);
  color: var(--color-black);
}

.home__button--ghost:hover {
  background: var(--color-black);
  color: var(--color-white-light);
}

.home__highlights {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.home__highlight-item {
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  padding: 22px;
}

.home__highlight-item h2 {
  font-size: 20px;
  margin-bottom: 10px;
  line-height: 1.3;
}

.home__highlight-item p {
  line-height: 1.5;
  color: var(--color-dark-gray);
}

.home__categories {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.home__categories h2 {
  font-size: 30px;
  font-weight: 500;
}

.home__category-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.home__category {
  text-decoration: none;
  color: var(--color-black);
  border: 1px solid var(--color-gray);
  border-radius: 999px;
  padding: 8px 14px;
}

.home__category:hover {
  border-color: var(--color-black);
}

.home__section-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 24px;
}

.home__section-title h2 {
  font-size: 30px;
  font-weight: 500;
}

.home__section-title a {
  text-decoration: none;
  color: var(--color-dark-gray);
}

.home__section-title a:hover {
  color: var(--color-black);
}

.home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px 12px;
}

@media (max-width: 1024px) {
  .home {
    gap: 48px;
  }

  .home__hero {
    padding: 32px;
  }

  .home__highlights {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .home__hero {
    padding: 24px;
  }

  .home__lead {
    font-size: 16px;
  }

  .home__highlights {
    grid-template-columns: 1fr;
  }

  .home__section-title {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
  }
}
</style>
