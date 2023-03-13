import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recipes from '../views/Recipes.vue'
import Recipe from '../views/Recipe.vue'
import Auth from '../views/Auth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    },
    {
      path: '/recipe/:recipeId',
      name: 'recipe',
      component: Recipe
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})

export default router
