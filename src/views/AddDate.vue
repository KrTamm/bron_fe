q
<template>
  <div>
    <br>
    <h1 style="text-align: center; color: white">SISESTA VABA AJASLOT</h1>
    <h1 style="text-align: center; color: white">{{ heroName.docLastName }}</h1>
    <div id="doctorentryform" style="width: 400px; margin-left: auto; margin-right: auto"><br><br>
      <v-text-field
          v-model="this.$route.params.id"
          label="Kangelase ID"
          required
          color="white"
      ></v-text-field>
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
                v-model="newBronTimeADate.bookingDate"
                label="Kuupäev"
                color="white"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="newBronTimeADate.bookingDate = parseDate(dateFormatted)"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="newBronTimeADate.bookingDate"
              no-title
              @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col
          cols="12"
          sm="12"
      >
        <v-menu
            ref="menu"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="newBronTimeADate.bookingTime"
                label="Kellaaeg"
                color="white"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
              v-if="menu2"
              v-model="newBronTimeADate.bookingTime"
              full-width
              @click:minute="$refs.menu.save(time)"
              format="24hr"
              class="mt-4"
              min="9:30"
              max="19:30"
              scrollable
              :allowed-hours="allowedHours"
              :allowed-minutes="allowedMinutes"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-btn
          block
          elevation="2"
          @click="addDateToDatabase"
          style="background-color: gold"
      >Lisa
      </v-btn>
      <br>
      <v-alert
          v-if="this.show"
          text
          border="left"
          dense
          dismissible
          type="success"
          @input="onclose"
          color="white"
          style="text-align: center"
      >Uus aeg lisatud!
      </v-alert>
    </div>
  </div>
</template>


<script>
export default {
  data: vm => ({
    time: null,
    menu2: false,
    modal2: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    menu1: false,
    newBronTimeADate: {},
    docId: '',
    bookingDate: '',
    bookingTime: '',
    bronAdd: {},
    show: false,
    heroName: []
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
    allowedHours: v => v === 9 || v === 11 || v === 13 || v === 15 || v === 17 || v === 19,
    allowedMinutes: v => v === 30 || v === 0,
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
    addDateToDatabase: function () {
      this.$http.post('/api/protected/project/createNewBron/' + this.$route.params.id, this.newBronTimeADate)
          .then(response => {
            this.bronAdd = response.data
          })
      this.show = true
    },
    onclose: function () {
      this.show = false
    },
  },
  mounted() {
    this.$http.get('/api/public/heroDetails/' + this.$route.params.id)
        .then(response => this.heroName = response.data)
  }
}
</script>