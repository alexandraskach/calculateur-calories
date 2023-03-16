<script>
import { useAuthStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia'
// eslint-disable-next-line vue/no-export-in-script-setup
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data() {
    return {
     user:''
    } 
  },
  mounted(){
  const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);
    console.log(authUser);
    this.user = authUser;
    console.log(this.user.user)
  },
  methods: {
    Logout() {
    const authStore = useAuthStore();
    return authStore.logout()
 
  }
}
}
</script>
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
      <li class="nav__item" v-if="!user.user">
        <router-link to="/register" class="nav-link">S'inscrire</router-link>
      </li>
      <li class="nav__item" v-if="!user.user">
        <router-link to="/login" class="nav-link">Se connecter</router-link>
      </li>
        <li class="nav__item" v-if="user.user">
        <a @click="Logout()" class="nav-link">Deconnexion</a>
      </li>
    </nav>
</template>
