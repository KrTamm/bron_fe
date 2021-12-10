<template>
  <div class="broneerimine">
    <h1 style="text-align: center">Siia tekib uue aja broneerimine</h1>
    <div class="text-center align-center justify-space-around">

      <v-text-field
          v-model="userMail"
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
    userMail: ""
  }),



  methods: {
    teeUusAeg() {
      let body= {
        "userMail" : this.userMail
      }
      this.$http.put("api/project/makeBron/" + this.$route.params.id, body)
          .then(response => {
            this.uusAeg = response.data
          })
    }
  },


}
</script>