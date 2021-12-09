<template>
  <div>
    <br>
    <h1 style="text-align: center">ADMINI TEGEVUSED:</h1> <br>
    <div class="text-center align-center justify-space-around">
      <v-btn
          elevation="2"
          outlined
          v-on:click="goToDoc()"
      >Add a new doctor
      </v-btn> <br><br>
      <v-btn
          elevation="2"
          outlined
          v-on:click="goToNewDate()"
      >Add new free date for doctor
      </v-btn>
      <br><br>
      <v-btn
          elevation="2"
          outlined
          v-on:click="goToOverall()"
      >View all reservatioons
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
  }),

  methods: {
    goToDoc: function () {
      router.push({name: 'AddDoc'});
    },
    goToNewDate: function () {
      router.push({name: 'AddDate'});
    },
    goToOverall: function () {
      router.push({name: 'DocOverall'});
    }
  },
}
</script>