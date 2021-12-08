<template>
  <div id="doctorentryform" style="width: 500px; margin-left: auto; margin-right: auto">
    <br>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="eesnimi"
          :counter="15"
          :rules="nameRules"
          label="Eesnimi"
          required
      ></v-text-field>

      <v-text-field
          v-model="perenimi"
          :counter="15"
          :rules="nameRules"
          label="Perenimi"
          required
      ></v-text-field>

      <v-text-field
          v-model="amet"
          :counter="30"
          :rules="nameRules"
          label="Amet"
          required
      ></v-text-field>

      <v-text-field
          v-model="asukoht"
          :counter="30"
          :rules="nameRules"
          label="Asukoht"
          required
      ></v-text-field>

      <v-text-field
          v-model="litsents"
          :counter="10"
          :rules="nameRules"
          label="Litsents"
          required
      ></v-text-field>

      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
      >
        Validate
      </v-btn>

      <v-btn
          color="error"
          class="mr-4"
          @click="reset"
      >
        Reset Form
      </v-btn>

      <v-btn
          color="warning"
          @click="resetValidation"
      >
        Reset Validation
      </v-btn>
    </v-form>
  </div>
</template>


<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>