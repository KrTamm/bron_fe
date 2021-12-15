<template>
  <v-container style="background-color: gold; border-radius: 10px">
    <br>
    <h1 style="text-align: center; color: white">KINNITA OMA BRONEERING</h1>
    <br>
    <div class="text-center align-center justify-space-around grey lighten-5"
         style="max-width: 500px; margin-left: auto; margin-right: auto; border-radius: 10px; font-size: small ">

      <table style="border: 1px solid black; border-radius: 10px" width="100%">
        <tr>
          <th>Kangelane</th>
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
<br>
      <v-text-field
          v-model="userEmail"
          style="font-size: medium"
          label="Sisesta oma e-mail. Sinuga võetakse ühendust."
          required
      ></v-text-field>

      <v-btn
          color="#162CA2"
          text
          @click="teeUusAeg(); saadaMeil()"
      >Reserveeri Aeg
      </v-btn>
    </div>
  </v-container>
</template>


<script>
import router from "../router";

export default {
  data: () => ({
    uusAeg: "",
    id: "",
    userEmail: "",
    doctor: [],
  }),


  methods: {
    teeUusAeg() {
      let body = {
        "userEmail": this.userEmail
      }
      this.$http.put("api/public/project/makeBron/" + this.$route.params.id, body)
          .then(response => {
            this.uusAeg = response.data
          })
    },
    saadaMeil() {
      this.$http.get("api/public/test/" + this.$route.params.id)
      alert('Broneerimine edukas!')
      router.push({name: 'Broneerimine'})
    }
  },
  mounted() {
    this.$http.get("api/public/project/bronInfo/" + this.$route.params.id)
        .then(response => this.doctor = response.data)
  }

}
</script>