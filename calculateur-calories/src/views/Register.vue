<script>

// eslint-disable-next-line vue/no-export-in-script-setup
export default{
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return {
      Email: "",
      Name: "",
      MotDePasse: ""
    };
  },
  computed: {
    formValid() {
      const { Email, Name, MotDePasse } = this;
      return (
        Name.length > 0 &&
        /(.+)@(.+){2,}.(.+){2,}/.test(Email) &&
        MotDePasse.length > 0
      );
    },
  },
  methods: {
    onReset() {
      this.Email = "";
      this.Name = "";
      this.MotDePasse = "";
    },
  onSubmit(e){
    e.preventDefault()
    console.log(this.Email,this.Name, this.MotDePasse)
    if (!this.formValid) {
        return;
      }
      this.onReset()
    }
  }
}
</script>

<template>
  <main class="container">
    <h2>Créer un compte</h2>
    <div class="form-container">
    <form v-on:submit="onSubmit">
    <div class="form-control">
      <label>Email</label>
      <input type="text" v-model="Email" name="Email" placeholder="Entrez votre mail" />
    </div>
    <div class="form-control">
      <label>Nom</label>
      <input
        type="text"
        v-model="DisplayName"
        name="DisplayName"
        placeholder="Entrez votre nom"
      />
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
        <p className="small m-0">Vous avez déjà un compte ? <router-link to="/login"> Se connecter</router-link></p>
      </div>
  </div>
  </main>
</template>

<style lang="scss">

</style>
