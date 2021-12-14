<template>

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

  },
  mounted() {
    this.token = localStorage.getItem('user-token')
  }
}
</script>