<template>
  <div>
    <br>
    <h1 style="text-align: center">KINNITA OMA BRONEERING</h1>
    <br>
    <div class="text-center align-center justify-space-around"
         style="max-width: 500px; margin-left: auto; margin-right: auto">

      <table style="border: 1px solid black" width="100%">
        <tr>
          <th>Arsti nimi</th>
          <th>Amet</th>
          <th>Address</th>
          <th>Kuupäev</th>
          <th>Kellaaeg</th>
        </tr>
        <tr>
          <td>{{ doctor.docFirstName }} {{ doctor.docLastName }}</td>
          <td>{{ doctor.docProfession }}</td>
          <td>{{ doctor.docArea }}</td>
          <td>{{ doctor.bookingDate }}</td>
          <td>{{ doctor.bookingTime }}</td>
        </tr>
      </table>

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
    userEmail: "",
    doctor: []
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
  mounted() {
    this.$http.get("api/project/bronInfo/" + this.$route.params.id)
        .then(response => this.doctor = response.data)
  }

}
</script>