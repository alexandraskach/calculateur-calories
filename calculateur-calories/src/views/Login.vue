<script>
import { useAuthStore } from '../stores/auth.store';
// eslint-disable-next-line vue/no-export-in-script-setup
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  // https://www.bezkoder.com/vue-3-authentication-jwt/
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onReset() {
      this.email = ''
      this.password = ''
    },
    onSubmit(e) {
      e.preventDefault()
    const authStore = useAuthStore();
    return authStore.login(this.email, this.password)
        .catch(error => console.log(error));
 
  }
}
}
</script>

<template>
  <main class="container">
    <h2>Connexion</h2>
    <div class="form-container">
      <form v-on:submit="onSubmit">
        <div class="form-control">
          <label>Email</label>
          <input type="text" v-model="email" name="email" placeholder="Entrez votre mail" />
        </div>
        <div class="form-control">
          <label>Mot de passe</label>
          <input
            type="password"
            v-model="password"
            name="password"
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <input type="submit" value="Envoyer" class="button button--primary" />
      </form>
      <div className="color-gray">
        <p className="small m-0">Vous n'avez pas de compte ?<router-link to="/register"> Créer un compte</router-link></p>
      </div>
    </div>
  </main>
</template>

<style lang="scss"></style>
