<script>
import { useRoute } from "vue-router";
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth.store'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'AnalyseRecipe',
  data() {
    return {
      user:'',
      analyse:{} 
    }
  },
  mounted() {
    const route = useRoute();
     console.log(route.params);
      const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);
    console.log(authUser);
    this.user = authUser;
    console.log(this.user.user)
    this.getAnalyse(route.params.receiptId,this.user.user.userId)
  },
  methods: {
    getAnalyse(receiptId,userId) {
      fetch(`http://localhost:8080/api/analyse-receipt/${receiptId}/user/${userId}`, {
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
          console.log(data);
          this.analyse = data
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
     <h1>Analyse</h1>
     <div class="card">
     <h3>{{ analyse.ReceiptName }}</h3>
     <p>Total calories : {{ analyse.totalCalories }}</p>
     <p>Date d'analyse : {{ analyse.Date }}</p>
     </div>
  </main>
</template>

<style lang="scss">


</style>