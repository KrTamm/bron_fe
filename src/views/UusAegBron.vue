<template>
  <v-container style="background-color: gold; border-radius: 10px">
    <br>
    <h1 style="text-align: center; color: #162CA2">KINNITA OMA BRONEERING</h1>
    <br>
    <div
        style="max-width: 500px; margin-left: auto; margin-right: auto; border-radius: 10px; font-size: small">

      <!--      <table style="border: 1px solid black; border-radius: 10px" width="100%">-->
      <!--        <tr>-->
      <!--          <th>Kangelane</th>-->
      <!--          <th>Amet</th>-->
      <!--          <th>Address</th>-->
      <!--          <th>Kuupäev</th>-->
      <!--          <th>Kellaaeg</th>-->
      <!--        </tr>-->
      <!--        <tr>-->
      <!--          <td>{{ doctor.docFirstName }} {{ doctor.docLastName }}</td>-->
      <!--          <td>{{ doctor.docProfession }}</td>-->
      <!--          <td>{{ doctor.docArea }}</td>-->
      <!--          <td>{{ doctor.bookingDate }}</td>-->
      <!--          <td>{{ doctor.bookingTime }}</td>-->
      <!--        </tr>-->
      <!--      </table>-->
      <h2 style="text-align: center; color: #162CA2">{{ doctor.docFirstName }} {{ doctor.docLastName }}
        <br>{{ formatDate(doctor.bookingDate) }} kell {{ formatTime(doctor.bookingTime) }} <br>Juhised saabuvad
        emailiga. Ole valmis. </h2>
      <br>
      <v-text-field
          v-model="userEmail"
          style="font-size: medium"
          label="Sisesta oma e-mail."
          required
      ></v-text-field>

      <div style="text-align: center">
        <v-btn
            color="black"
            text
            @click="teeUusAeg(); saadaMeil()"
            style="border: 1px solid; background-color: #EC2004"
        >Reserveeri Aeg
        </v-btn>
      </div>
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
    },

    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      // return `${month}/${day}/${year}`
      return `${day}.${month}.${year}`
    },

    formatTime(time) {
      if (!time) return null
      const [hour, minute, second] = time.split(':')
      // return `${month}/${day}/${year}`
      return `${hour}:${minute}`
    }
  },
  mounted() {
    this.$http.get("api/public/project/bronInfo/" + this.$route.params.id)
        .then(response => this.doctor = response.data)
  }
}
</script>