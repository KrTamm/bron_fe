<template>

  <div v-if="token">
    <br>
    <h1 style="text-align: center; color: white">ADMINI TEGEVUSED</h1> <br>
    <div class="text-center align-center justify-space-around">
      <v-btn
          elevation="2"
          outlined
          v-on:click="goToDocBaas()"
          style="background-color: gold"
      >Kangelaste Andmebaas
      </v-btn>
      <br><br>
<!--      <v-btn-->
<!--          elevation="2"-->
<!--          outlined-->
<!--          v-on:click="goToNewDate()"-->
<!--          style="background-color: gold"-->
<!--      >Lisa uus arstiaeg andmebaasi-->
<!--      </v-btn>-->
<!--      <br><br>-->
      <v-btn
          elevation="2"
          outlined
          v-on:click="goToOverall()"
          style="background-color: gold"
      >Vabad ajad ja Broneeringud
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

    goToNewDate: function () {
      router.push({name: 'AddDate'});
    },
    goToOverall: function () {
      router.push({name: 'ResOverall'});
    },
    goToDocBaas: function () {
      router.push({name: 'ArstideBaas'});
    },

  },
  mounted() {
    this.token = localStorage.getItem('user-token')
  }
}
</script>