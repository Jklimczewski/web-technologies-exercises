<template>
  <section>
    <header>
      <h1>Lista kontaktów</h1>
    </header>
    <ul id="contacts">
      <contact-info
        v-for="item in contacts"
        :key="item.id"
        :name="item.name"
        :phone-number="item.phone"
        :email-address="item.email"
        :friend="item.friend"
        @friends="item.friend = !item.friend"
      ></contact-info>
    </ul>
  </section>
</template>

<script>
import ContactInfo from "./components/ContactInfo.vue";

export default {
  data() {
    return {
      contacts: [
        {
          id: "item01",
          name: "Chava Avila",
          phone: "(504) 324-5554",
          email: "justo.nec@hotmail.net",
          friend: true,
        },
        {
          id: "item02",
          name: "Garth Banks",
          phone: "(921) 768-4863",
          email: "non@yahoo.net",
          friend: false,
        },
        {
          id: "item03",
          name: "Dolan Valdez",
          phone: "(501) 395-5218",
          email: "phasellus.vitae@aol.ca",
          friend: true,
        },
        {
          id: "item04",
          name: "Stephanie Cardenas",
          phone: "(741) 465-7252",
          email: "ornare.sagittis.felis@icloud.com",
          friend: false,
        },
        {
          id: "item05",
          name: "Fletcher Mcbride",
          phone: "(255) 723-7718",
          email: "parturient.montes@hotmail.ca",
          friend: false,
        },
        {
          id: "item06",
          name: "Sydnee Morse",
          phone: "(233) 588-1681",
          email: "integer@protonmail.net",
          friend: false,
        },
        {
          id: "item07",
          name: "Damon Santana",
          phone: "1-847-762-8728",
          email: "nascetur.ridiculus@hotmail.edu",
          friend: true,
        },
        {
          id: "item08",
          name: "Zeus Blackwell",
          phone: "(576) 949-0717",
          email: "nec.euismod@icloud.net",
          friend: false,
        },
        {
          id: "item09",
          name: "Rhona Cain",
          phone: "(727) 106-4022",
          email: "elit.pellentesque@protonmail.org",
          friend: false,
        },
        {
          id: "item10",
          name: "Shad Stephens",
          phone: "1-464-218-9616",
          email: "accumsan.laoreet@outlook.com",
          friend: true,
        },
      ],
    };
  },
  components: {
    ContactInfo,
  },
};
</script>

<style>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  background-color: darkblue;
  color: white;
  width: 100%;
  text-align: center;
  border-radius: 10px;
}
#contacts {
  width: 60%;
  text-align: center;
}
</style>
