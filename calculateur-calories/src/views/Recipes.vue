<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Recipes',
  data() {
    return {
      recettes: Array
    }
  },
  created() {
    this.getAllRecipes()
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
    getAllRecipes() {
      fetch('http://localhost:8080/api/get-all-receipt-by-iduser/2', {
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
    <div v-for="recette in recettes" :key="recette.receiptId">
      <div class="card">
        <h2 class="body-semibold">{{ recette.receiptName }}</h2>
        <p>{{ recette.receiptDescription }}</p>
        <router-link
          :to="{
            name: 'recipe',
            params: {
              receiptId: recette.receiptId
            }
          }"
          >Voir plus</router-link
        >
        <a @click="deleteRecipe(recette.receiptId)">Supprimer</a>
        <router-link
          :to="{
            name: 'edit-recipe',
            params: {
              receiptId: recette.receiptId
            }
          }"
          >Editer</router-link
        >
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
</style>
