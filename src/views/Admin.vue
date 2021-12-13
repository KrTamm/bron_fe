<template>
  <div>
    <div v-if="token">
      <br>
      <h1 style="text-align: center">ADMINI TEGEVUSED:</h1> <br>
      <div class="text-center align-center justify-space-around">
        <v-btn
            elevation="2"
            outlined
            v-on:click="goToDoc()"
        >Lisa uus arst andmebaasi
        </v-btn>
        <br><br>
        <v-btn
            elevation="2"
            outlined
            v-on:click="goToNewDate()"
        >Lisa uus arstiaeg andmebaasi
        </v-btn>
        <br><br>
        <v-btn
            elevation="2"
            outlined
            v-on:click="goToOverall()"
        >Halda vabu aegu ja broneeringuid
        </v-btn>
      </div>
    </div>


    <v-container>
      kasutajanimi: <input v-model="user.kasutajaNimi">
      Parool: <input v-model="user.password">
      <v-btn v-on:click="login">Login</v-btn>
      <v-btn v-on:click="getData">Get Data</v-btn>
      <v-btn v-on:click="logout">Logout</v-btn>
    </v-container>

  </div>
</template>


<script>
import router from "../router";

export default {
  data: () => ({
    docFirstName: '',
    docLastName: '',
    docProfession: '',
    docArea: '',
    docLicense: '',
    newDoc: {},
    doctorAdd: {},
    nameRules: [
      v => !!v || 'Name is required'
    ],
    user: {},
    token: ''
  }),

  methods: {
    goToDoc: function () {
      router.push({name: 'AddDoc'});
    },
    goToNewDate: function () {
      router.push({name: 'AddDate'});
    },
    goToOverall: function () {
      router.push({name: 'ResOverall'});
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
}
</script>