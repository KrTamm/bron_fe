<template>
  <v-container style="margin-left: auto; margin-right: auto">
    <br>
    <h1 style="text-align: center; color: white">KANGELASTE ANDMEBAAS</h1>
    <br>
    <div class="text-center align-center justify-space-around">
      <v-btn
          elevation="2"
          outlined
          v-on:click="goToDoc()"
          style="background-color: gold"
      >Lisa uus kangelane andmebaasi
      </v-btn>
    </div>
    <br><br>
    <v-card style="max-width: 1200px;margin-left: auto; margin-right: auto; background-color: gold">
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Otsing"
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
          style="background-color: gold"
      >
        <template v-slot:item.controls2="props2">
            <v-btn @click="deleteButton(props2.item.docId)"
                class="ma-2"
                color="red"
                dark>
              <v-icon
                  dark
                  centre
                  hint="Kustuta kangelane andmebaasist"
              >
                mdi-cancel
              </v-icon>
            </v-btn>
        </template>
        <template v-slot:item.controls3="props3">
            <v-btn @click="goToAddDate(props3.item.docId)"
                   class="ma-2"
                   color="green"
                   dark
                   hint="Lisa uus aeg kangelasele"
            >
              <v-icon
                  dark
                  centre>
                mdi-plus
              </v-icon>
            </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
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
        {text: 'ID', value: 'docId'},
        {text: 'Kuuluvus', value: 'docLicense'},
        {text: 'Kangelane', value: 'docLastName'},
        {text: 'Amet', value: 'docProfession'},
        {text: 'Asukoht', value: 'docArea'},
        {text: 'Vaba aja lisamine', sortable: false, filterable: false, value: 'controls3', align: 'center'},
        {text: 'Kangelase kustutamine', sortable: false, filterable: false, value: 'controls2', align: 'center'},
      ],
    }
  },

  methods: {
    goToDoc: function () {
      router.push({name: 'AddDoc'});
    },
    goToAddDate: function (id) {
      router.push({name: 'AddDate', params: {id: id}});
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