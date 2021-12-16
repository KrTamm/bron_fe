<template>
  <div class="broneerimine" style="text-align: center">
    <br>

    <br>
    <v-btn @click="playMusic(); goToNextPage()"
    loop="loop">
      <h1 style="text-align: center">AVENGERS ASSEMBLE</h1>
    </v-btn>


  </div>
</template>
<script>
import router from "../router";

export default {
  methods: {
    goToNextPage: function () {
      router.push({name: 'Broneerimine'});
    },
    playMusic() {
      let audio = new Audio(require('./Avengers.mp3'));
      audio.play();
      setInterval(this.playMusic,125000);
    }

  }
}
</script>