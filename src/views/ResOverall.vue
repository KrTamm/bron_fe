<template>
  <div style="margin-left: auto; margin-right: auto">
    <br>
    <h1 style="text-align: center; color: white">VABADE AEGADE JA BRONNIDE HALDUS</h1>
    <br>
    <v-card style="max-width: 1200px;margin-left: auto; margin-right: auto; background-color: gold">
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
          dense
          :headers="headers"
          :items="allBookings"
          :search="search"
          :items-per-page="15"
          style="background-color: gold"
      >
        <template v-slot:item.controls="props">
          <v-btn v-if="props.item.userEmail" @click="cancelButton(props.item.bookingId)"
                 class="ma-2"
                 dark
                 hint="Lisa uus aeg kangelasele"
          >
            <v-icon
                dark
                centre>
              mdi-minus
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:item.controls2="props2">
          <v-btn @click="deleteButton(props2.item.bookingId)"
                 dark
                 class="ma-2"
          >
            <v-icon
                dark
                centre>
              mdi-delete
            </v-icon>
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
      deleteTime: "",
      allBookings: [],
      search: '',
      headers: [
        {text: 'Bron number', align: 'start', filterable: false, value: 'bookingId'},
        {text: 'ID', value: 'docId'},
        {text: 'Kangelane', value: 'docLastName'},
        {text: 'Kliendi e-mail', value: 'userEmail'},
        {text: 'Bron kuupäev', value: 'bookingDate'},
        {text: 'Bron kellaaeg', value: 'bookingTime'},
        {text: 'Probleemi kirjeldus', value: 'kirjeldus'},
        {text: 'Tühista aeg', sortable: false, filterable: false, value: 'controls', align: 'center'},
        {text: 'Kustuta aeg', sortable: false, filterable: false, value: 'controls2', align: 'center'},
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
    },
    deleteButton(id) {
      this.$http.delete('/api/protected/project/deleteTime/' + id)
          .then(response => {
            this.deleteTime = response.data
            this.populateBronTable();
          })
    }
  },
  mounted() {
    this.populateBronTable();
  }
}
</script>