<template>
  <div style="margin-left: auto; margin-right: auto">
    <br>
    <h1 style="text-align: center">ARSTIDE ANDMEBAAS</h1>
    <br>
    <div class="text-center align-center justify-space-around">
    <v-btn
        elevation="2"
        outlined
        v-on:click="goToDoc()"
    >Lisa uus arst andmebaasi
    </v-btn>
    </div>
    <br><br>
    <v-card style="max-width: 1200px;margin-left: auto; margin-right: auto">
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
          :items="allDoctors"
          :search="search"
          :items-per-page="15"
      >
        <template v-slot:item.controls2="props2">
          <v-btn @click="deleteButton(props2.item.docId)">
            <v-icon style="font-size: small">delete doc</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>


<script>
import router from "@/router";

export default {
  data() {
    return {
      deleteDoc: "",
      allDoctors: [],
      search: '',
      headers: [
        {text: 'Doc ID', value: 'docId'},
        {text: 'License', value: 'docLicense'},
        {text: 'Eesnimi', value: 'docFirstName'},
        {text: 'Perenimi', value: 'docLastName'},
        {text: 'Amet', value: 'docProfession'},
        {text: 'Asukoht', value: 'docArea'},
        {text: 'Kustutamine', sortable: false, filterable: false, value: 'controls2', align: 'center'},
      ],
    }
  },

  methods: {
    goToDoc: function () {
      router.push({name: 'AddDoc'});
    },
    populateDocTable() {
      this.$http.get('api/public/project/getDocList')
          .then(response => {
            this.allDoctors = response.data
          })
    },
    deleteButton(id) {
      this.$http.delete('/api/protected/project/deleteDoc/' + id)
          .then(response => {
            this.deleteDoc = response.data
            this.populateDocTable();
          })
    }
  },
  mounted() {
    this.populateDocTable();
  }
}
</script>