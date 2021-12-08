<template>
  <v-app>
    <v-app-bar
        app
        color="gray"

        dark
    >

      <div id="nav">
        <router-link to="/bron">Bron</router-link> |
        <router-link to="/addDoc">Add Doc</router-link>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>

      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>

#nav {
  color: white;
  text-align: center;
}
</style>