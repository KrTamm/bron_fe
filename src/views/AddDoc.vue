<template>
  <div>
    <br>
    <h1 style="text-align: center">LISA UUS ARST ANDMEBAASI</h1>
    <div id="doctorentryform" style="width: 400px; margin-left: auto; margin-right: auto">
      <br>
      <br>
      <v-text-field
          v-model="newDoc.docFirstName"
          :rules="nameRules"
          label="Eesnimi"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docLastName"
          :rules="nameRules"
          label="Perenimi"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docProfession"
          :rules="nameRules"
          label="Amet"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docArea"
          :rules="nameRules"
          label="Asukoht"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docLicense"
          :rules="nameRules"
          label="Litsents"
          required
      ></v-text-field>

      <v-btn
          block
          color="green"
          elevation="2"
          @click="addDoc"
      >Sumbit
      </v-btn>
      <br>
      <v-alert
          v-if="this.show"
          border="left"
          dense
          dismissible
          type="success"
          @input="onclose"
      >Doctor added!
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
    nameRules: [
      v => !!v || 'Name is required'
    ],
    show: false
  }),

  methods: {
    addDoc: function () {
      this.$http.post('/api/project/createDoc', this.newDoc)
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