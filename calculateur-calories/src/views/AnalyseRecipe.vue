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
    },
    exportToCsv() {
    const headers = ['ReceiptName', 'totalCalories', 'Date']; // Ajouter les entêtes des colonnes CSV
    const rows = [[this.analyse.ReceiptName, this.analyse.totalCalories, this.analyse.Date]]; // Ajouter les données de l'analyse
    let csvContent = "data:text/csv;charset=utf-8,";

    // Ajouter les entêtes
    csvContent += headers.join(";") + "\r\n";

    // Ajouter les données
    rows.forEach(function(row) {
      csvContent += row.join(";") + "\r\n";
    });

    // Télécharger le fichier CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "analyse.csv");
    document.body.appendChild(link); // Nécessaire pour certains navigateurs
    link.click();
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
      <button class="button button--primary" @click="exportToCsv">Exporter en CSV</button>
     </div>
  </main>
</template>

<style lang="scss">


</style>