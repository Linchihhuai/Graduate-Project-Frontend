<template>
  <div class="section mt-4">
    <div class="container">
      <div class="row full-height justify-content-center">
        <div class="col-12 text-center align-self-center">
          <div class="section pb-5 pt-sm-2 text-center">
            <h6 class="mb-0 pb-3">
              <span>Connexion </span><span>Inscription</span>
            </h6>
            <input
              class="checkbox"
              type="checkbox"
              id="reg-log"
              name="reg-log"
            />
            <label for="reg-log"></label>
            <div class="card-3d-wrap mx-auto">
              <div class="card-3d-wrapper">
                <div class="card-front">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <error :error="error" />
                      <form @submit.prevent="handleSubmitLogin">
                        <h4 class="mb-4 pb-4">Connexion</h4>
                        <div class="form-group">
                          <input
                            type="email"
                            name="email"
                            class="form-style"
                            placeholder="Adresse e-mail"
                            id="email"
                            v-model="emailLogin"
                          />
                          <i class="input-icon fa fa-envelope"></i>
                        </div>
                        <div class="form-group mt-4">
                          <input
                            type="password"
                            name="password"
                            class="form-style"
                            placeholder="Mot de passe"
                            id="password"
                            v-model="mdpLogin"
                          />
                          <i class="input-icon fa fa-lock"></i>
                        </div>
                        <div class="form-group mt-4">
                          <input
                            class="btn mt-4"
                            type="submit"
                            value="Se connecter"
                          />
                        </div>
                        <p class="mb-5 mt-5 text-center">
                          <a class="link" href="/forgot"
                            >Mot de passe oublié ?</a
                          >
                        </p>
                      </form>
                    </div>
                  </div>
                </div>

                <div class="card-back">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <form @submit.prevent="handleSubmitRegister">
                        <error v-if="error" :error="error" />
                        <h4 class="mb-4 pb-3">Inscription</h4>
                        <div class="form-group">
                          <input
                            type="text"
                            name="nom"
                            class="form-style"
                            placeholder="Nom"
                            id="nom"
                            required
                            v-model="nomRegister"
                          />
                          <i class="input-icon fa fa-user"></i>
                        </div>
                        <div class="form-group mt-3">
                          <input
                            type="text"
                            name="prenom"
                            class="form-style"
                            placeholder="Prénom"
                            id="prenom"
                            required
                            v-model="prenomRegister"
                          />
                          <i class="input-icon fa fa-user"></i>
                        </div>
                        <div class="form-group mt-3">
                          <input
                            type="email"
                            name="email"
                            class="form-style"
                            placeholder="Adresse e-mail"
                            pattern="^[a-zA-Z]+@((student\.)?vinci\.be)"
                            title="student.vinci.be ou vinci.be "
                            v-model="emailRegister"
                            required
                          />
                          <i class="input-icon fa fa-envelope"></i>
                        </div>
                        <div class="form-group mt-3">
                          <input
                            type="password"
                            name="password"
                            class="form-style"
                            placeholder="Mot de passe"
                            v-model="mdpRegister"
                            required
                          />
                          <i class="input-icon fa fa-lock"></i>
                        </div>
                        <div class="form-group mt-3">
                          <select
                            name="campus"
                            id="campus"
                            class="form-style"
                            v-model="campusRegister"
                            required                          >
                            <option value="" disabled selected>
                              Sélectionne ton campus
                            </option>
                            <option value="1">Woluwe</option>
                            <option value="2">Ixelles</option>
                            <option value="3">Louvain-La-Neuve</option>
                          </select>
                          <i class="input-icon fa fa-map-marker"></i>
                        </div>

                        <input
                          class="btn mt-4"
                          type="submit"
                          value="S'inscrire"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import {URL} from "../config.js";

export default {
  name: "Login",

  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      prenomRegister: "",
      nomRegister: "",
      emailRegister: "",
      mdpRegister: "",
      campusRegister: "",
      emailLogin: "",
      error: "",
      mdpLogin: "",
    };
  },
  methods: {
    async handleSubmitRegister() {
      try {
        await fetch(URL+"register", {
          method: "POST",
          body: JSON.stringify({
            firstname: this.prenomRegister,
            lastname: this.nomRegister,
            email: this.emailRegister,
            password: this.mdpRegister,
            campus: this.campusRegister,
            moderator: "False",
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", response.user.id);
            this.$store.dispatch("user", response.user);

            // this.$parent.children[0].update()
            console.log((this.$parent.$children[0].user = response.user));
            console.log(this.$parent.$children[0]);
            this.$router.push("/");
            this.$router.go(0);
          });
      } catch (e) {
        this.$fire({title:"Votre compte est bien enrengistré",text:"", type: "success", timer: 2000
})
      }
    },
    async handleSubmitLogin() {
      try {
        console.log(URL)
        await fetch(URL+"login", {
          method: "POST",
          body: JSON.stringify({
            email: this.emailLogin,
            password: this.mdpLogin,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", response.user.id);
            this.$store.dispatch("user", response.user);
           // this.$parent.children[0].update()
           console.log(this.$parent.$children[0].user=response.user)
           console.log(this.$parent.$children[0])
            //  this.$router.push("/");
            window.location.href = '/';

          });
      } catch (e) {
           this.$fire({title:"Veuillez verifier votre mot de passe et votre adresse mail",text:"", type: "warning", timer: 2000
})
      }
    },
  },
};
</script>
<style scoped src="../assets/css/login.css"></style>
