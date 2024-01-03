<template>
  <li>
    <h2>
      {{ name }}
      <img v-if="friend" class="friendIcon" src="friends.png" alt="" />
    </h2>
    <button @click="$emit('friends')">
      {{ friend ? "Usuń ze znajomych" : "Dodaj do znajomych" }}
    </button>
    <button @click="this.showDetails = !this.showDetails">
      {{ showDetails ? "Ukryj szczegóły" : "Pokaż szczegóły" }}
    </button>
    <ul v-if="showDetails && friend">
      <li>
        <strong>telefon:</strong>
        {{ phoneNumber }}
      </li>
      <li>
        <strong>e-mail:</strong>
        {{ emailAddress }}
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ["name", "phoneNumber", "emailAddress", "friend"],
  data() {
    return {
      showDetails: false,
    };
  },
};
</script>

<style scoped>
.friendIcon {
  margin-left: 10px;
  width: 30px;
}
li {
  list-style-type: none;
  margin: 15px;
  padding-bottom: 15px;
  padding-top: 5px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 4px 0px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 4px 0px rgba(66, 68, 90, 1);
}
h2 {
  margin-right: 50px;
  margin-left: 50px;
  padding-bottom: 10px;
  border-bottom: 5px solid lightgrey;
}
button {
  background-color: rgb(96, 137, 208);
  color: white;
  padding: 5px;
  margin: 5px;
  border-radius: 10%;
  border: none;
}
</style>
