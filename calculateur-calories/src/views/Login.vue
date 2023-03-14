<script>
// eslint-disable-next-line vue/no-export-in-script-setup
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    return {
      Email: '',
      MotDePasse: ''
    }
  },
  methods: {
    onReset() {
      this.Email = ''
      this.MotDePasse = ''
    },
    onSubmit(e) {
      e.preventDefault()
      console.log(this.Email, this.MotDePasse)
      if (!this.formValid) {
        return
      }
      // if (!localStorage.getItem("messages")) {
      //   localStorage.setItem("messages", JSON.stringify([]));
      // }
      // const messages = JSON.parse(localStorage.getItem("messages"));
      // const { name, email, message } = this;
      // messages.push({
      //   name,
      //   email,
      //   message,
      // });
      // localStorage.setItem("messages", JSON.stringify(messages));
      this.onReset()
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
          <input type="text" v-model="Email" name="Email" placeholder="Entrez votre mail" />
        </div>
        <div class="form-control">
          <label>Mot de passe</label>
          <input
            type="password"
            v-model="MotDePasse"
            name="mdp"
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
