<template>
  <div class="broneerimine">
    <br>
    <h1 style="text-align: center">VALI KUUPÄEV</h1>
    <br>
    <v-container style="text-align: center">
      <v-row>
        <v-col
            cols="12"
            lg="12"
        >
          <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="dateFormatted"
                  label="Date"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                no-title
                @input="menu1 = false"
                @click:date="getInfoForDocCard"
            ></v-date-picker>
          </v-menu>
          <strong>Valitud kuupäev: {{ formatDate(date) }}</strong>
          <br>
        </v-col>

      </v-row>
    </v-container>
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
            <v-card-text style="padding-top: 1px">
              <v-row style="font-size: 1em; font-weight: 600; padding-bottom: 5px; padding-top: 5px; margin-left: auto; margin-right: auto">visiidi valik
              </v-row>
              <br>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left">
                      Päev
                    </th>
                    <th class="text-left">
                      Vabad Ajad
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>

<!--                      :key="item.name"-->

                    <td>{{ row.bookingDate }}</td>
                    <td v-for="rida in row.bookingTime"><v-chip>{{ rida }}</v-chip></td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <!--              <v-chip-group-->
              <!--                  v-model="row.selection"-->
              <!--                  active-class="deep-purple accent-4 white&#45;&#45;text"-->
              <!--                  column-->
              <!--              >-->
              <!--                <v-chip v-for="rida in row.bookingTime">{{ rida }}</v-chip>-->
              <!--              </v-chip-group>-->
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
    day: [
      {
        name: 'päev',
      }],
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
    getInfoForDocCard() {
      this.$http.get('api/project/getInfoForDocDate/' + this.date)
          .then(response => {
            this.InfoForDocCard = response.data
          })
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

  },
  mounted() {
    this.getInfoForDocCard();
  }
}
</script>