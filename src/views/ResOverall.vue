<template>
  <div style="margin-left: auto; margin-right: auto">
    <br>
    <h1 style="text-align: center">BRONEERINGUTE HALDUS</h1>
<!--    {{ allBookings }}-->
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
      ></v-data-table>
    </v-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      allBookings: [],
      search: '',
      headers: [
        {text: 'Booking ID', align: 'start', filterable: false, value: 'bookingId'},
        {text: 'Doc ID', value: 'docId'},
        // {text: 'Arsti nimi', value: 'docName'},
        {text: 'Patsiendi email', value: 'userEmail'},
        {text: 'Broneeringu kuupäev', value: 'bookingDate'},
        {text: 'Broneeringu kellaaaeg', value: 'bookingTime'},
      ],
    }
  },

  methods: {
    populateBronTable() {
      this.$http.get('api/project/getBookingsList')
          .then(response => {
            this.allBookings = response.data
          })
    }
  },
  mounted() {
    this.populateBronTable();
  }
}
</script>