<template>
  <v-app>
    <v-app-bar
        app
        color="lightgray"
    >

      <div id="nav" style="margin-right: auto;margin-left: auto">
        <router-link to="/kasutaja">Kasutaja</router-link> |
        <router-link to="/admin">Admin</router-link>
      </div>


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
* {
  font-family: Verdana;
  font-weight: lighter;
}

#nav {
  color: white;
  text-align: center;
}
</style>