<template>
  <div class="broneerimine">
    <br>
    <h1 style="text-align: center">KASUTAJA TEGEVUSED:</h1> <br>
    <div class="text-center align-center justify-space-around">
    <v-btn
        elevation="2"
        outlined
        v-on:click="goToBron()"
    >Broneeri arstiaeg
    </v-btn>
    </div>
  </div>
</template>


<script>
import router from "../router";

export default {
  data: () => ({

  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

  methods: {
    goToBron: function () {
      router.push({name: 'Broneerimine'});
    }

  },
}
</script>