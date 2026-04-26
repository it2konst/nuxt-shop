<template>
  <div class="footer">
    <hr />
    <div class="footer__top">
      <ul>
        <li><NuxtLink to="/about">О проекте</NuxtLink></li>
        <li><NuxtLink to="/catalog">Каталог</NuxtLink></li>
        <li><NuxtLink to="/account">Аккаунт</NuxtLink></li>
      </ul>
      <div class="footer__form">
        <InputField
          placeholder="Введите email для новостей и акций"
          variant="black"
        />
        <button class="footer__subscribe">
          <Icon name="icons:arrow-right" size="8px" />
        </button>
      </div>
    </div>
    <div class="footer__bottom">
      <div>© {{ new Date().getFullYear() }} Shoppe</div>
      <div class="footer__social">
        <NuxtLink to="#" aria-label="Квадрат">
          <Icon name="icons:shape-square" size="30px" />
        </NuxtLink>
        <NuxtLink to="#" aria-label="Круг">
          <Icon name="icons:shape-circle" size="30px" />
        </NuxtLink>
        <NuxtLink to="#" aria-label="Треугольник">
          <Icon name="icons:shape-triangle" size="30px" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1248px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.footer hr {
  border: none;
  border-bottom: 1px solid var(--color-gray);
  height: 1px;
}
.footer__top {
  display: flex;
  justify-content: space-between;
}

.footer__top ul {
  list-style: none;
  display: flex;
  padding: 0;
  gap: 30px;
  flex-wrap: wrap;
}

.footer__top ul a {
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-dark-gray);
  text-decoration: none;
}

.footer__top ul a:hover {
  color: var(--color-black);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.footer__social {
  display: flex;
  gap: 20px;
}

.footer__social a {
  color: var(--color-dark-gray);
  border: 1px solid var(--color-gray);
  border-radius: 999px;
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
}

.footer__social a:hover {
  color: var(--color-dark);
  border-color: var(--color-black);
  transform: translateY(-1px);
}
.footer__form {
  position: relative;
}

.footer__form input {
  min-width: 380px;
}
.footer__subscribe {
  position: absolute;
  right: 0;
  top: 10px;
  background: none;
  border: none;
}

@media (max-width: 1024px) {
  .footer__top {
    flex-direction: column;
    gap: 20px;
  }

  .footer__form input {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .footer {
    gap: 28px;
  }

  .footer__top ul {
    gap: 14px;
  }

  .footer__top ul a {
    font-size: 14px;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
