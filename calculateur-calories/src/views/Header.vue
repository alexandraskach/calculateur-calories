<script setup></script>
<style lang="scss"></style>

<template>
    <nav class="nav">
      <li class="nav__item">
        <router-link to="/" class="navbar-brand">Accueil</router-link>
      </li>
      <li class="nav__item">
        <router-link to="/recipes" class="nav-link">Mes recettes</router-link>
      </li>
      <li class="nav__item">
        <router-link to="/recipes/add-new" class="nav-link">Ajouter une recette</router-link>
      </li>
      <li class="nav__item">
        <router-link to="/register" class="nav-link">S'inscrire</router-link>
      </li>
      <li class="nav__item">
        <router-link to="/login" class="nav-link">Se connecter</router-link>
      </li>
    </nav>
</template>
