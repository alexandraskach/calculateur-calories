<script setup>
import Recipes from './Recipes.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();
const { user : authUser } = storeToRefs(authStore);
console.log(authUser)
</script>
<style lang="scss">
body{

}
</style>

<template>
  <main>
    <h1>Hello {{authUser?.user.name}}! 👋</h1>
    <Recipes />
  </main>
</template>
