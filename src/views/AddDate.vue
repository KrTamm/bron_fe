<template>
  <div>
    <br>
    <h1 style="text-align: center">LISA UUS ARSTIAEG ANDMEBAASI</h1>
    <div id="doctorentryform" style="width: 400px; margin-left: auto; margin-right: auto"><br><br>

      <h2 class="text-center">Vali arst</h2>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              <v-icon dark>
                mdi-format-list-bulleted-square
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

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

      <v-btn
          block
          color="green"
          elevation="2"
          @click="addDateToDatabase"
      >Sumbit
      </v-btn><br>

      <v-alert
          border="left"
          dense
          dismissible
          type="success"
      >Doctor added!
      </v-alert>

    </div>
  </div>
</template>


<script>
export default {
  data: () => ({
    items: [
      {title: 'Click Me'},
      {title: 'Click Me'},
      {title: 'Click Me'},
      {title: 'Click Me 2'},
    ],
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
  }),

  methods: {
    addDoc: function () {
      this.$http.post('/api/project/createDoc', this.newDoc)
          .then(response => {
            this.doctorAdd = response.data

          })
    },
    addDateToDatabase: function () {
      this.$http.get('api/project/getInfoForDocDate/' + this.date)
          .then(response => {
            this.InfoForDocCard = response.data
          })
    }
  },
}
</script>