<template>
  <div style="margin-left: auto; margin-right: auto">
    <br>
    <h1 style="text-align: center">BRONEERINGUTE HALDUS</h1>
    <br>
    <v-card style="max-width: 1000px;margin-left: auto; margin-right: auto">
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="allBookings"
          :search="search"
          :items-per-page="15"
      >

        <template v-slot:item.controls="props">
          <v-btn @click="cancelButton(props.item.bookingId)">
            <v-icon style="font-size: small">cancel bron</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      bronCancel: "",
      allBookings: [],
      search: '',
      headers: [
        {text: 'Booking ID', align: 'start', filterable: false, value: 'bookingId'},
        {text: 'Doc ID', value: 'docId'},
        // {text: 'Arsti nimi', value: 'docName'},
        {text: 'Patsiendi email', value: 'userEmail'},
        {text: 'Broneeringu kuupäev', value: 'bookingDate'},
        {text: 'Broneeringu kellaaaeg', value: 'bookingTime'},
        {text: 'Tühistamine', sortable: false, filterable: false, value: 'controls', align: 'center'},
      ],
    }
  },

  methods: {
    populateBronTable() {
      this.$http.get('api/public/project/getBookingsList')
          .then(response => {
            this.allBookings = response.data
          })
    },
    cancelButton(id) {
      this.$http.put('/api/protected/project/cancelBron/' + id)
          .then(response => {
            this.bronCancel = response.data
            this.populateBronTable();
          })
    }
  },
  mounted() {
    this.populateBronTable();
  }
}
</script>