<script>
// eslint-disable-next-line vue/no-export-in-script-setup
import { router } from '../router/index.js'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  data() {
    return {
      email: '',
      name: '',
      password: ''
    }
  },
  computed: {
    formValid() {
      const { email, name, password } = this
      return name.length > 0 && /(.+)@(.+){2,}.(.+){2,}/.test(email) && password.length > 0
    }
  },
  methods: {
    onReset() {
      this.email = ''
      this.name = ''
      this.password = ''
    },
    onSubmit(e) {
      e.preventDefault()
      console.log(this.email, this.name, this.password)
      if (!this.formValid) {
        return
      }
        let body = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          console.log(response)
          router.push('/');
        })
        .catch((err) => {
          console.log(err)
        })
      this.onReset()
    }
  }
}
</script>

<template>
  <main class="container center">
    <div class="form-container">
      <div class="title-center"><h2>Créer un compte</h2></div>
      <form v-on:submit="onSubmit">
        <div class="form-control">
          <label>Email</label>
          <input type="text" v-model="email" name="Email" placeholder="Entrez votre mail" />
        </div>
        <div class="form-control">
          <label>Nom</label>
          <input type="text" v-model="name" name="name" placeholder="Entrez votre nom" />
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
        <p className="small m-0">
          Vous avez déjà un compte ? <router-link to="/login"> Se connecter</router-link>
        </p>
      </div>
    </div>
  </main>
</template>

<style lang="scss"></style>
