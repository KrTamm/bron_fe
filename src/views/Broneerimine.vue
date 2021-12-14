<template>
  <div class="broneerimine">
    <br>
    <h1 style="text-align: center">VABAD AJAD</h1>
    <br>
    <!--    <v-container style="text-align: center">-->
    <!--      <v-row>-->
    <!--        <v-col-->
    <!--            cols="12"-->
    <!--            lg="12"-->
    <!--        >-->
    <!--          <v-menu-->
    <!--              ref="menu1"-->
    <!--              v-model="menu1"-->
    <!--              :close-on-content-click="false"-->
    <!--              transition="scale-transition"-->
    <!--              offset-y-->
    <!--              max-width="290px"-->
    <!--              min-width="auto"-->
    <!--          >-->
    <!--            <template v-slot:activator="{ on, attrs }">-->
    <!--              <v-text-field-->
    <!--                  v-model="dateFormatted"-->
    <!--                  label="Date"-->
    <!--                  hint="MM/DD/YYYY format"-->
    <!--                  persistent-hint-->
    <!--                  prepend-icon="mdi-calendar"-->
    <!--                  v-bind="attrs"-->
    <!--                  @blur="date = parseDate(dateFormatted)"-->
    <!--                  v-on="on"-->
    <!--              ></v-text-field>-->
    <!--            </template>-->
    <!--            <v-date-picker-->
    <!--                v-model="date"-->
    <!--                no-title-->
    <!--                @input="menu1 = false">-->
    <!--              @click:date="getInfoForDocard"-->
    <!--            </v-date-picker>-->
    <!--          </v-menu>-->
    <!--          <strong>Valitud kuupäev: {{ formatDate(date) }}</strong>-->
    <!--          <br>-->
    <!--        </v-col>-->

    <!--      </v-row>-->
    <!--    </v-container>-->

    <v-container class="grey lighten-5">
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
          >
            <div style="display: inline-flex">
              <v-img
                  height="75"
                  width="75"
                  src="../assets/logo.png"
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
                  style="font-size: 1em; font-weight: 600; padding-bottom: 5px; padding-top: 5px; margin-left: auto; margin-right: auto">
                visiidi valik
              </v-row>
              <br>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                  <tr style="background-color: lightgrey">
                    <th class="text-left">
                      Päev
                    </th>
                    <th class="text-left">
                      Ajad
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="rida in row.bookingTimes">
                    <td style="background-color: lightgrey">
                      {{ formatDate(rida.date) }}
                    </td>
                    <td>

                      <v-chip-group
                          v-model="rida.selection"
                          active-class="deep-purple accent-4 white--text"
                          column
                      >
                        <v-chip v-for="time in rida.timeList" @click="goToNewBron(time.bookingId)">
                          {{ formatTime(time.bookingTime) }}
                        </v-chip>
                      </v-chip-group>
                      <!--                      InfoForDocCard[0].bookingTimes[0].timeList[0].bookingId-->
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-card-actions style="padding: 0px">
              <!--              <v-btn-->
              <!--                  color="deep-purple lighten-2"-->
              <!--                  text-->
              <!--                  @click="goToNewBron(selection)"-->
              <!--              >Reserveeri Aeg-->
              <!--              </v-btn>-->
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
    rida: ""
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
      this.$http.get('api/public/project/getInfoForDocCard/'/*+ this.date*/)
          .then(response => {
            this.InfoForDocCard = response.data
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

    parseDate(date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    goToNewBron: function (id) {
      router.push({
        name: 'UusAegBron', params: {
          id: id
        }
      });
    }

  },
  mounted() {
    this.getInfoForDocCard();
  }
}
</script>