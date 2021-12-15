<template>
  <v-app>
    <v-app-bar
        app
        color="#EC2004"
    >

      <v-container style="text-align: left">
      <div id="nav">

        <router-link to="/" style="text-decoration: none; color: inherit;">
          <div  id="pealkiri" style="color: black; font-size: larger">
            SINUKANGELASED.ee
          </div>
        </router-link>
      </div>
      </v-container>

      <v-container style="text-align: right; padding: 0px; margin: 0px">
        <div v-if="!token">
          Kasutajanimi: <input v-model="user.kasutajaNimi" style="width: 100px">
          Parool: <input @keyup.enter="login" v-model="user.password" style="width: 100px">
          <v-btn v-on:click="login" style="background-color: gold">Login</v-btn>
        </div>
        <div v-if="token">
          Admin sisselogitud
          <v-btn v-on:click="logout" style="background-color: gold">Logout</v-btn>
          <v-btn style="background-color: gold; margin: 1px">
            <router-link style="text-decoration: none; color: inherit"
                         to="/admin" >Admin</router-link>
          </v-btn>
        </div>
      </v-container>


    </v-app-bar>

    <v-main style="background-color: #162CA2">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import router from "./router";

export default {
  name: 'App',

  data: () => ({
    user: {},
    token: '',
    show: false
  }),
  methods: {
    showtrue() {
      this.show = true
    },
    login() {
      this.$http.post('api/public/login', this.user)
          .then(result => {
            this.token = result.data
            localStorage.setItem(('user-token'), this.token)
            this.$http.defaults.headers.common['Authorization'] = "Bearer " + this.token
            router.push({name: 'Admin'})
            location.reload();
          })


    }, getData() {
      this.$http.get('api/protected')
          .then(result => {
            alert("päring õnnestus " + result.data)
          })
          .catch(result => {
            alert("juhtus viga")
          })
    }, logout() {
      this.token = '';
      localStorage.removeItem('user-token');
      alert("You have been logged out")
      location.reload();
    }
  },
  mounted() {
    this.token = localStorage.getItem('user-token')
  }
};
</script>

<style>
* {
  font-family: Verdana;
  font-weight: lighter;
}

#nav {
  color: white;
  text-align: center;
}

#pealkiri {
  font-style: italic;
  font-size: medium;
  font-weight: bold;
  margin-left: 20px;
  color: green;
  text-decoration: none;
  text-align: left;
}
</style>
