q
<template>
  <div>
    <br>
    <h1 style="text-align: center; color: white">SISESTA VABA AJASLOT</h1>
    <div id="doctorentryform" style="width: 400px; margin-left: auto; margin-right: auto"><br><br>

      <!--      <h2 class="text-center">Vali arst</h2>-->
      <div class="text-center">
        <!--        <v-menu offset-y>-->
        <!--          <template v-slot:activator="{ on, attrs }">-->
        <!--            <v-btn-->
        <!--                color="primary"-->
        <!--                dark-->
        <!--                v-bind="attrs"-->
        <!--                v-on="on"-->
        <!--            >-->
        <!--              <v-icon dark>-->
        <!--                mdi-format-list-bulleted-square-->
        <!--              </v-icon>-->
        <!--            </v-btn>-->
        <!--          </template>-->
        <!--          <v-list>-->
        <!--            <v-list-item-->
        <!--                v-for="(item, index) in items"-->
        <!--                :key="index"-->
        <!--            >-->
        <!--              <v-list-item-title>{{ item.title }}</v-list-item-title>-->
        <!--            </v-list-item>-->
        <!--          </v-list>-->
        <!--        </v-menu>-->
      </div>

      <!--      <v-container style="text-align: center">-->
      <!--        <v-row>-->
      <!--          <v-col-->
      <!--              cols="12"-->
      <!--              lg="12"-->
      <!--          >-->
      <!--            <v-menu-->
      <!--                ref="menu1"-->
      <!--                v-model="menu1"-->
      <!--                :close-on-content-click="false"-->
      <!--                transition="scale-transition"-->
      <!--                offset-y-->
      <!--                max-width="290px"-->
      <!--                min-width="auto"-->
      <!--            >-->
      <!--              <template v-slot:activator="{ on, attrs }">-->
      <!--                <v-text-field-->
      <!--                    v-model="dateFormatted"-->
      <!--                    label="Date"-->
      <!--                    hint="MM/DD/YYYY format"-->
      <!--                    persistent-hint-->
      <!--                    prepend-icon="mdi-calendar"-->
      <!--                    v-bind="attrs"-->
      <!--                    @blur="date = parseDate(dateFormatted)"-->
      <!--                    v-on="on"-->
      <!--                ></v-text-field>-->
      <!--              </template>-->
      <!--              <v-date-picker-->
      <!--                  v-model="date"-->
      <!--                  no-title-->
      <!--                  @input="menu1 = false"-->
      <!--                  @click:date="getInfoForDocCard"-->
      <!--              ></v-date-picker>-->
      <!--            </v-menu>-->
      <!--            <strong>Valitud kuupäev: {{ formatDate(date) }}</strong>-->
      <!--            <br>-->
      <!--          </v-col>-->
      <!--        </v-row>-->
      <!--      </v-container>-->

      <v-text-field
          v-model="this.$route.params.id"
          label="Kangelase ID"
          required
      ></v-text-field>
      <v-text-field
          v-model="newBronTimeADate.bookingDate"
          hint="YYYY-MM-DD format"
          label="Kuupäev"
          required
      ></v-text-field>
      <v-text-field
          v-model="newBronTimeADate.bookingTime"
          hint="HH:MM:SS format"
          label="Kellaaeg"
          required
      ></v-text-field>

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
  data: () => ({
    items: [
      {title: 'Click Me'},
      {title: 'Click Me'},
      {title: 'Click Me'},
      {title: 'Click Me 2'},
    ],
    newBronTimeADate: {},
    docId: '',
    bookingDate: '',
    bookingTime: '',
    bronAdd: {},
    show: false,
  }),

  methods: {
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
}
</script>