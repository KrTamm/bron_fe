<template>
  <div>
    <br>
    <h1 style="text-align: center; color: white">LISA UUS KANGELANE</h1>
    <div id="doctorentryform" style="width: 400px; margin-left: auto; margin-right: auto">
      <br>
      <br>

      <v-text-field
          v-model="newDoc.docLastName"
          label="Kangelase nimi"
          color="white"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docProfession"
          label="Amet"
          color="white"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docArea"
          label="Asukoht"
          color="white"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docLicense"
          label="Kuuluvus"
          color="white"
          required
      ></v-text-field>

      <v-btn
          block
          elevation="2"
          @click="addDoc"
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
      >Uus kangelane on andmebaasi sisestatud!
      </v-alert>
    </div>
  </div>
</template>


<script>
export default {
  data: () => ({
    docFirstName: '',
    docLastName: '',
    docProfession: '',
    docArea: '',
    docLicense: '',
    newDoc: {},
    doctorAdd: {},
    show: false
  }),

  methods: {
    addDoc: function () {
      this.$http.post('/api/protected/project/createDoc', this.newDoc)
          .then(response => {
            this.doctorAdd = response.data
          })
      this.show = true
    },
    onclose: function () {
      this.show = false
    }
  }

}
</script>