<template>
  <div class="broneerimine">
    <h1 style="text-align: center">Vali Arst ja Aeg</h1>
    <v-container class="grey lighten-5">
      <v-row class="justify-center">
        <v-col
            v-for="row in InfoForDocCard"
            :key="row"
            cols="auto"

        >
          <v-card
              class="pa-5 rounded-lg"
              elevation="6"
              max-width="350"
              min-width="300"
          >
            <v-img
                height="75"
                width="75"
                src="../assets/logo.png"
            ></v-img>
            <br>
            <v-card-text>
              <v-row style="font-size: 1.4em; font-weight: 600; padding-bottom: 5px; padding-top: 8px">
                {{ row.docFirstName }}
                {{ row.docLastName }}
              </v-row>
              <v-row>{{ row.docProfession }}</v-row>
              <v-row>Litsentsi nr: {{ row.docLicense }}</v-row>
              <v-row>Aadress: {{ row.docArea }}</v-row>
            </v-card-text>
            <br>
            <v-divider class="mx-4"></v-divider>
            <br>
            <v-card-text>
              <v-row style="font-size: 1.4em; font-weight: 600; padding-bottom: 5px; padding-top: 8px">Vabad Ajad
              </v-row>
              <br>
              <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-4 white--text"
                  column
              >
                <v-chip v-for="rida in row.bookingTime">{{ rida }}</v-chip>
              </v-chip-group>
            </v-card-text>
            <v-card-actions style="padding: 0px">
              <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="reserve"
              >Reserveeri Aeg
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  data: () => ({
    loading: false,
    selection: 0,
    allDoctors: {},
    allBookings: {},
    InfoForDocCard: {}
  }),

  methods: {
    reserve() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },

    getAllDoctors() {
      this.$http.get('api/project/getDocList')
          .then(response => {
            this.allDoctors = response.data
          })
    },
    getAllBookings() {
      this.$http.get('api/project/getBookingsList')
          .then(response => {
            this.allBookings = response.data
          })
    },
    getInfoForDocCard() {
      this.$http.get('api/project/getInfoForDocCard')
          .then(response => {
            this.InfoForDocCard = response.data
          })
    }
  },
  mounted() {
    this.getInfoForDocCard();
  }
}
</script>