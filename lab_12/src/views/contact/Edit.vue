<template>
  <div>
    <div class="form-group">
      <label for="name">Imie i nazwisko:</label>
      <input type="text" id="name" v-model="personData.imie" required />
    </div>
    <div class="form-group">
      <label for="address">Address:</label>
      <input type="text" id="address" v-model="personData.adres" required />
    </div>
    <div class="form-group">
      <label for="age">Age:</label>
      <input type="number" id="age" v-model="personData.wiek" required />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="personData.email" required />
    </div>
    <button @click="editContact">Dodaj</button>
  </div>
</template>

<script>
import DataService from "@/services/DataService.js";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      personData: {
        imie: "",
        adres: "",
        wiek: null,
        email: "",
      },
    };
  },
  created() {
    console.log(`Edycja kontaktu „${this.item.name}”`);
  },
  methods: {
    editContact() {
      DataService.editPerson(
        this.item.id,
        this.personData.imie,
        this.personData.adres,
        this.personData.wiek,
        this.personData.email
      )
        .then((response) => {
          this.$router.push({
            name: "ContactDetails", // ,
            // params: {id: this.item.id } // niepotrzebne
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 404) {
            this.$router.push({
              name: "404NotFound",
              params: { resource: "wpis" },
            });
          } else {
            this.$router.push({ name: "NetworkError" });
          }
        });
    },
  },
};
</script>
