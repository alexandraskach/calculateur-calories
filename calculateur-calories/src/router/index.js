import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recipes from '../views/Recipes.vue'
import Recipe from '../views/Recipe.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import AddRecipe from '../views/AddRecipe.vue'

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
      path: '/recipes/add-new',
      name: 'add-recipe',
      component: AddRecipe
    },
    {
      path: '/recipe/:recipeId',
      name: 'recipe',
      component: Recipe
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
