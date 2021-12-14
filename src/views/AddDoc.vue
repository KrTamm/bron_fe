<template>
  <div>
    <v-btn>
      <router-link to="/admin">Admin</router-link>
    </v-btn>
    <br>
    <h1 style="text-align: center">LISA UUS ARST ANDMEBAASI</h1>
    <div id="doctorentryform" style="width: 400px; margin-left: auto; margin-right: auto">
      <br>
      <br>
      <v-text-field
          v-model="newDoc.docFirstName"
          label="Eesnimi"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docLastName"
          label="Perenimi"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docProfession"
          label="Amet"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docArea"
          label="Asukoht"
          required
      ></v-text-field>

      <v-text-field
          v-model="newDoc.docLicense"
          label="Litsents"
          required
      ></v-text-field>

      <v-btn
          block
          color="green"
          elevation="2"
          @click="addDoc"
      >Lisa
      </v-btn>
      <br>
      <v-alert
          v-if="this.show"
          border="left"
          dense
          dismissible
          type="success"
          @input="onclose"
      >Uus arst andmebaasi sisestatud!
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