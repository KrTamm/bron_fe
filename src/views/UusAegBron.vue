<template>
  <v-container style="background-color: gold; border-radius: 10px">
    <br>
    <h1 style="text-align: center; color: #162CA2">KINNITA OMA BRONEERING</h1>
    <br>
    <div
        style="max-width: 500px; margin-left: auto; margin-right: auto; border-radius: 10px; font-size: small">

      <h2 style="text-align: center; color: #162CA2">{{ doctor.docLastName }}
        <br>{{ formatDate(doctor.bookingDate) }} kell {{ formatTime(doctor.bookingTime) }} <br>Juhised saabuvad
        e-mailiga. Ole valmis! </h2>
      <br>
      <v-text-field
          v-model="userEmail"
          style="font-size: medium"
          label="Sisesta oma e-mail"
          required
      ></v-text-field>
      <br>

      <v-container fluid>
        <v-textarea
            name="input-7-1"
            filled
            label="Kirjelda lühidalt oma probleemi"
            auto-grow
            v-model="kirjeldus"
            required
        ></v-textarea>
      </v-container>

      <div style="text-align: center">
        <v-btn
            color="black"
            text
            @click="teeUusAeg(); saadaMeil()"
            style="border: 1px solid; background-color: #EC2004"
        >Broneeri Aeg
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
    kirjeldus: ""
  }),

  methods: {
    teeUusAeg() {
      let body = {
        "userEmail": this.userEmail,
        "kirjeldus": this.kirjeldus
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
      return `${day}.${month}.${year}`
    },

    formatTime(time) {
      if (!time) return null
      const [hour, minute] = time.split(':')
      return `${hour}:${minute}`
    }
  },
  mounted() {
    this.$http.get("api/public/project/bronInfo/" + this.$route.params.id)
        .then(response => this.doctor = response.data)
  }
}
</script>