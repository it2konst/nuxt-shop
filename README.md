# Shoppe (Nuxt 3)

Учебный проект интернет-магазина украшений на Nuxt 3.

## Что уже реализовано

- Главная страница с подборкой товаров и CTA-блоками
- Каталог с фильтрацией по категориям и поиском
- Карточки товаров с бейджем скидки
- Страницы `about`, `cart`, `favorites`, `account`, `auth/*`
- Единый layout с шапкой и футером

## Технологии

- Nuxt 3
- Vue 3 (Composition API)
- TypeScript
- CSS (scoped + global)
- @nuxt/icon

## Запуск проекта

```bash
pnpm install
pnpm dev
```

Локально: `http://localhost:3000`

## Сборка

```bash
pnpm build
pnpm preview
```

## Структура

- `app/pages` - страницы
- `app/components` - переиспользуемые UI-компоненты
- `app/assets` - стили и иконки
- `public/api` - моковые данные каталога
- `public/images/jewelry` - изображения товаров
