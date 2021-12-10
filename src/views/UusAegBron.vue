<template>
  <div>
    <br>
    <h1 style="text-align: center">KINNITA OMA BRONEERING</h1>
    <br>
    <div class="text-center align-center justify-space-around"
         style="max-width: 300px; margin-left: auto; margin-right: auto">

      <v-text-field
          v-model="userEmail"
          label="Sisesta oma e-mail"
          required
      ></v-text-field>


      <v-btn
          color="deep-purple lighten-2"
          text
          @click="teeUusAeg"
      >Reserveeri Aeg
      </v-btn>
    </div>
  </div>
</template>


<script>
import router from "../router";

export default {
  data: () => ({
    uusAeg: "",
    id: "",
    userEmail: ""
  }),


  methods: {
    teeUusAeg() {
      let body = {
        "userEmail": this.userEmail
      }
      this.$http.put("api/project/makeBron/" + this.$route.params.id, body)
          .then(response => {
            this.uusAeg = response.data
          })
    }
  },


}
</script>