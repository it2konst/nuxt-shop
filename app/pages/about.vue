<script setup lang="ts">
useSeoMeta({
  title: "О нас | Shoppe",
  description:
    "Shoppe - учебный проект интернет-магазина украшений с фокусом на лаконичный дизайн и удобный каталог.",
  ogDescription:
    "Shoppe - учебный проект интернет-магазина украшений с фокусом на лаконичный дизайн и удобный каталог.",
});

const principles = [
  {
    title: "Честные материалы",
    text: "Мы выбираем металл и вставки с проверяемым происхождением и понятным качеством.",
  },
  {
    title: "Вневременной дизайн",
    text: "Украшения не зависят от быстрых трендов и легко сочетаются между собой.",
  },
  {
    title: "Забота о клиенте",
    text: "Быстрые ответы, прозрачная доставка и удобный процесс возврата.",
  },
];

const timeline = [
  { year: "2024", text: "Запустили первый прототип и каталог." },
  { year: "2025", text: "Добавили фильтры и карточки товаров с акциями." },
  { year: "2026", text: "Обновили главную страницу и сделали визуал цельным." },
];
</script>

<template>
  <article class="about">
    <section class="about__hero">
      <p class="about__eyebrow">О проекте</p>
      <h1 class="left">Shoppe - аккуратный магазин украшений в формате учебного pet-проекта</h1>
      <p>
        Этот проект собран как полноценный front-end кейс на Nuxt: с маршрутизацией,
        каталогом, компонентной архитектурой и продуманной визуальной системой.
      </p>
      <NuxtLink to="/catalog">Перейти к каталогу</NuxtLink>
    </section>

    <section class="about__principles">
      <h2>Наши принципы</h2>
      <div class="about__grid">
        <article v-for="item in principles" :key="item.title" class="about__card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="about__timeline">
      <h2>Развитие проекта</h2>
      <ul>
        <li v-for="point in timeline" :key="point.year">
          <strong>{{ point.year }}</strong>
          <span>{{ point.text }}</span>
        </li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.about__hero {
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  padding: 42px;
  background: linear-gradient(90deg, #ffffff 0%, #f9f4ed 100%);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.about__eyebrow {
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.about__hero p {
  max-width: 760px;
  line-height: 1.6;
  color: var(--color-dark-gray);
}

.about__hero a {
  width: fit-content;
  text-decoration: none;
  color: var(--color-black);
  border: 1px solid var(--color-black);
  border-radius: 6px;
  padding: 10px 14px;
}

.about__hero a:hover {
  background: var(--color-black);
  color: var(--color-white-light);
}

.about__principles h2,
.about__timeline h2 {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 20px;
}

.about__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.about__card {
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  padding: 22px;
}

.about__card h3 {
  margin-bottom: 10px;
  font-size: 20px;
}

.about__card p {
  line-height: 1.6;
  color: var(--color-dark-gray);
}

.about__timeline ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
}

.about__timeline li {
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  gap: 20px;
  align-items: baseline;
}

.about__timeline strong {
  min-width: 56px;
  color: var(--color-accent);
}

@media (max-width: 1024px) {
  .about {
    gap: 44px;
  }

  .about__hero {
    padding: 28px;
  }

  .about__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about__timeline li {
    flex-direction: column;
    gap: 6px;
  }
}
</style>
