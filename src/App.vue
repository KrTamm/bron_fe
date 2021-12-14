<template>
  <v-app>
    <v-app-bar
        app
        color="lightgray"
    >

      <div id="nav" style="text-align: left">
        <v-btn><router-link to="/kasutaja/bron">Home</router-link></v-btn> |
        <v-btn><router-link v-on:click.native="showtrue" to="/admin">Admin login</router-link></v-btn>
      </div>

      <div style="font-style: italic; font-size: medium; font-weight: bold; margin-left: 20px; color: green">SINUARSTID.ee</div>

      <v-container v-if="this.show" style="text-align: right; padding: 0px; margin: 0px">
        kasutajanimi: <input v-model="user.kasutajaNimi" style="width: 100px">
        Parool: <input v-model="user.password" style="width: 100px">
        <v-btn v-on:click="login">Login</v-btn>
<!--        <v-btn v-on:click="getData">Get Data</v-btn>-->
        <v-btn v-on:click="logout">Logout</v-btn>
      </v-container>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

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
          });
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
</style>
