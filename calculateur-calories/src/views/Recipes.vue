<script>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth.store'
import router from '../router';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Recipes',
  data() {
    return {
      recettes: Array,
      user: ''
    }
  },
  created() {
     const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);
    console.log(authUser);
    this.user = authUser;
    console.log(this.user.user)
    this.getAllRecipes(this.user.user.userId)
  },
  methods: {
    deleteRecipe(receiptId) {
      console.log(receiptId)
      fetch(`http://localhost:8080/api/delete-receipt/${receiptId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getAllRecipes(userId) {
      fetch(`http://localhost:8080/api/get-all-receipt-by-iduser/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((data) => {
          console.log(data)
          this.recettes = data
          console.log('this.recettes', this.recettes)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<template>
  <main class="container">
    <div class="title-container">
      <h1>Mes recettes</h1>
      <router-link
          :to="{
            name: 'add-recipe',
          }"
          >
          <input  type="button" value="Ajouter une recette" class="button button--black button-recette" />
          </router-link> 
    </div>
     <div class="card-container">
    <div v-if="recettes.length === 0">C'est vide pour l'instant 😿</div>
    <div v-for="recette in recettes" :key="recette.receiptId">
      <div class="card card__recette">
        <div class="title-container">
          <h2 class="body-semibold">{{ recette.receiptName }}</h2>
          <div>
           <router-link
           class="icon"
          :to="{
            name: 'edit-recipe',
            params: {
              receiptId: recette.receiptId
            }
          }"
          >🖊</router-link
        >
          <a  class="icon" @click="deleteRecipe(recette.receiptId)">🗑</a>
          </div>
        </div>
        <p>{{ recette.receiptDescription }}</p>
        <router-link
          :to="{
            name: 'recipe',
            params: {
              receiptId: recette.receiptId,
            },
          }"
          >Voir plus</router-link
        >
        <router-link
          :to="{
            name: 'analyse-recipe',
            params: {
              receiptId: recette.receiptId
            }
          }"
          >Analyser</router-link
        >
      </div>
    </div>
    </div>
  </main>
</template>

<style lang="scss">
.button-recette {
  max-width: 173px;
  margin-left: 2rem!important;
}

.title-container {
  display: flex;
  align-items: center;
}

.container {
  padding: 1rem;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.icon{
  font-size: 2rem;
  padding: 0.5rem;
}

.card-container {
      gap: 107px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card-links {
  margin-top: 1rem;
}

.card-links a {
  margin-right: 1rem;
}

.card-links a:hover {
  text-decoration: underline;
}

.card-links router-link:hover {
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  .card {
    width: 100%;
  }
}
</style>
