<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'EditRecipe',
  data() {
    return {
      receiptName: '',
      receiptDescription: '',
      ingredientsName: '',
      ingredientsCount: Number,
      ingredientsWeight: Number,
      unity: '',
      ingredientIsAdded: false,
      ingredientsList: Array,
      selectedIngredients: Array
    }
  },
  created() {
    this.getAllIngredients()
  },
  //   computed: {
  //     formValid() {
  //       const { receiptName, receiptDescription,ingredientsName, ingredientsCount,ingredientsWeight, unity } = this;
  //       return (
  //         receiptName.length > 0 &&
  //         receiptDescription.length > 0 &&
  //         ingredientsName.length > 0 &&
  //         ingredientsCount.length > 0 &&
  //         ingredientsWeight.length > 0 &&
  //         unity.length > 0
  //       );
  //     },
  //   },
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
        user: {
          userId: 2,
          username: 'johndoe',
          email: 'johndoe@example.com',
          firstName: 'John',
          lastName: 'Doe'
        },
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
        idUser: 2,
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
        })
        .catch((err) => {
          console.log(err)
        })
      this.onReset()
    },
    getAllIngredients() {
      fetch('http://localhost:8080/api/get-all-ingredients-by-iduser/3', {
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
   
  </main>
</template>

<style lang="scss"></style>
