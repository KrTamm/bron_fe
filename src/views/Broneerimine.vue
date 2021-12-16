<template>
  <div class="broneerimine">
    <br>
    <h1 style="text-align: center; color: white">VABAD AJAD</h1>
    <br>
    <v-container style="max-width: 400px; margin-left: auto; margin-right: auto">
      <v-select
          v-on:change="getInfoForDocCard"
          v-model="prof"
          v-bind:items="professionList"
          item-text="docLicense"
          menu-props="auto"
          label="Vali amet"
          hide-details
          single-line
      ></v-select>

    </v-container>
    <v-container style="background-color: #162CA2">
      <v-row class="justify-center">
        <v-col
            v-for="row in InfoForDocCard"
            cols="auto"
        >
          <v-card
              class="pa-5 rounded-lg"
              elevation="6"
              max-width="350"
              min-width="300"
              style="background-color: #EC2004"
          >
            <div style="display: inline-flex">
              <v-img
                  height="75"
                  width="75"
                  :src="row.photo"
                  style="margin-top: 20px"
              ></v-img>

              <v-card-text style="padding-left: 35px">
                <v-row style="font-size: 1.4em; font-weight: 600; padding-bottom: 5px; padding-top: 8px">
                  {{ row.docFirstName }} {{ row.docLastName }}
                </v-row>
                <v-row>{{ row.docProfession }}</v-row>
                <v-row>litsentsi nr: {{ row.docLicense }}</v-row>
                <v-row>aadress: {{ row.docArea }}</v-row>
              </v-card-text>
            </div>
            <br>
            <v-divider class="mx-4"></v-divider>
            <br>
            <v-card-text style="padding-top: 1px">
              <v-row
                  style="font-size: 1em; font-weight: 600; padding-bottom: 5px; padding-top: 5px; margin-left: auto; margin-right: auto; text-align: center">
                otsusta aeg
              </v-row>
              <br>
              <v-simple-table dense style="border-radius: 10px">
                <template v-slot:default>
                  <thead>
                  <tr style="background-color: gold">
                    <th class="text-left" style="border-top-left-radius: 10px">
                      Päev
                    </th>
                    <th class="text-left" style="border-top-right-radius: 10px">
                      Ajad
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="rida in row.bookingTimes">
                    <td style="background-color: white; border-radius: 10px">
                      {{ formatDate(rida.date) }}
                    </td>
                    <td>

                      <v-chip-group
                          v-model="rida.selection"
                          active-class="deep-purple accent-4 white--text"
                          column
                      >
                        <v-chip v-for="time in rida.timeList" @click="goToNewBron(time.bookingId)"
                                style="background-color: gold">
                          {{ formatTime(time.bookingTime) }}
                        </v-chip>
                      </v-chip-group>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-card-actions style="padding: 0px">
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import router from "../router";

export default {
  data: vm => ({
    selectedProfession: "",
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    loading: false,
    selection: 0,
    allDoctors: {},
    allBookings: {},
    InfoForDocCard: {},
    InfoForDocDate: {},
    bookingId: "",
    rida: "",
    professionList: [],
    prof: 'Kõik kangelased'
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },

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
      this.$http.get('api/public/project/getInfoForDocCard/' + this.prof)
          .then(response => {
            this.InfoForDocCard = response.data
          })
    },
    getProfessionList() {
      this.$http.get('api/public/professionList')
          .then(response => {
            this.professionList = response.data
            this.professionList.unshift({docLicense: 'Kõik kangelased'})
          })
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      // return `${month}/${day}/${year}`
      return `${day}.${month}`
    },

    formatTime(time) {
      if (!time) return null
      const [hour, minute, second] = time.split(':')
      // return `${month}/${day}/${year}`
      return `${hour}:${minute}`
    },

    goToNewBron: function (id) {
      router.push({name: 'UusAegBron', params: {id: id}});
    }

  },
  mounted() {
    this.getInfoForDocCard();
    this.getProfessionList();
  }
}
</script>