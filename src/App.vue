<template>
  <v-app>
    <v-app-bar
        app
        color="yellow"
    >
      <div style="margin: auto">
        <router-link to="/bron" style="margin-right: 10px">Broneerimine</router-link>
        <span>     </span>
        <router-link to="/addDoc">Lisa Arst</router-link>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>

export default {
  name: 'App',

  data: () => ({}),
};
</script>
