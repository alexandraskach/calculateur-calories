<script>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth.store'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'AddRecipe',
  data() {
    console.log('hello')
    return {
      receiptName: '',
      receiptDescription: '',
      ingredientsName: '',
      ingredientsCount: Number,
      ingredientsWeight: Number,
      unity: '',
      ingredientIsAdded: false,
      ingredientsList: Array,
      selectedIngredients: Array,
      user: ''
    }
  },
  created() {
    const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);
    console.log(authUser);
    this.user = authUser;
    console.log(this.user.user)
    this.getAllIngredients(this.user.user.userId)
  
  },
  computed() {
    // formValid() {
    //   const { receiptName, receiptDescription,ingredientsName, ingredientsCount,ingredientsWeight, unity } = this;
    //   return (
    //     receiptName.length > 0 &&
    //     receiptDescription.length > 0 &&
    //     ingredientsName.length > 0 &&
    //     ingredientsCount.length > 0 &&
    //     ingredientsWeight.length > 0 &&
    //     unity.length > 0
    //   );
    // },
  },
  methods: {
    onReset() {
      ;(this.receiptName = ''),
        (this.receiptDescription = ''),
        (this.ingredientsName = ''),
        (this.ingredientsCount = ''),
        (this.ingredientsWeight = ''),
        (this.unity = '')
    },
    onSubmitRecette(e) {
      console.log('hello')
      e.preventDefault()
      console.log(this.receiptName, this.receiptDescription, this.selectedIngredients)
      let body = {
        receiptName: this.receiptName,
        receiptDescription: this.receiptDescription,
        user: this.user.user,
        ingredients: this.selectedIngredients
      }
      fetch('http://localhost:8080/api/create-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
      this.onReset()
    },
    onSubmitIngredient(e) {
      console.log('hello')
      e.preventDefault()
      console.log(this.ingredientsName, this.ingredientsCount, this.ingredientsWeight, this.unity)
      let body = {
        ingredientsName: this.ingredientsName,
        ingredientsCount: this.ingredientsCount,
        ingredientsWeight: this.ingredientsWeight,
        idUser: this.user.user.userId,
        unity: this.unity
      }
      fetch('http://localhost:8080/api/create-ingredient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          console.log(response)
          this.ingredientIsAdded = true
          this.getAllIngredients(this.user.user.userId)
        })
        .catch((err) => {
          console.log(err)
        })
      this.onReset()
    },
    getAllIngredients(userId) {
      fetch(`http://localhost:8080/api/get-all-ingredients-by-iduser/${userId}`, {
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
          this.ingredientsList = data
          console.log('this.ingredientsList', this.ingredientsList)
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
    <h1>Création d'une recette</h1>
    <h2>Etape 1 - Ajouter des ingrédients</h2>
    <div class="form-container">
      <form v-on:submit="onSubmitIngredient">
        <div class="form-control">
          <label>Ingredient - nom</label>
          <input
            type="text"
            v-model="ingredientsName"
            name="ingredientsName"
            placeholder="Entrez le nom de l'engredient"
          />
        </div>
        <div class="form-control">
          <label>Ingredient - quantité</label>
          <input
            type="number"
            v-model="ingredientsCount"
            name="ingredientsCount"
            placeholder="Entrez la quantité de l'engredient"
          />
        </div>
        <div class="form-control">
          <label>Ingredient - poids</label>
          <input
            type="number"
            v-model="ingredientsWeight"
            name="ingredientsWeight"
            placeholder="Entrez le poids de l'engredient"
          />
        </div>
        <div class="form-control">
          <label>Ingredient - l'unité de mesure</label>
          <select
            type="text"
            v-model="unity"
            name="unity"
            placeholder="Choisir l'unité de mesure de poids"
          >
            <option value="gr">gr</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="cl">cl</option>
            <option value="l">l</option>
          </select>
        </div>
        <input type="submit" value="Ajouter" class="button button--primary" />
        <input
          type="button"
          @click="ingredientIsAdded = true"
          value="Passez l'étape"
          class="button button--outline"
        />
        <input
          type="button"
          value="Voir la liste des ingrédients dispo"
          class="button button--outline"
        />
      </form>
    </div>

    <div v-if="ingredientIsAdded">
      <h2>Etape 2 - Ajouter une recette</h2>
      <div class="form-container">
        <form v-on:submit="onSubmitRecette">
          <div class="form-control">
            <label>Nom de recette</label>
            <input
              type="text"
              v-model="receiptName"
              name="receiptName"
              placeholder="Entrez le nom de la recette"
            />
          </div>
          <div class="form-control">
            <label>Description</label>
            <textarea
              v-model="receiptDescription"
              name="receiptDescription"
              placeholder="Entrez la description de la recette"
              rows="3"
              cols="5"
            ></textarea>
            <div class="form-control">
              <label>Ingrédients</label>
              <select multiple name="ingredients" v-model="selectedIngredients">
                <option
                  v-for="ingredient in ingredientsList"
                  :key="ingredient.ingredientsId"
                  :value="ingredient"
                >
                  {{ ingredient.ingredientsName }}
                </option>
              </select>
            </div>
          </div>
          <input type="submit" value="Envoyer" class="button button--primary" />
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss"></style>
