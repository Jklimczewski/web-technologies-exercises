<script>
export default {
  name: "Logs",
  props: {
    backlog: {
      type: Array,
    },
  },
};
</script>

<template>
  <section id="log" class="container">
    <h2>Dziennik Pojedynku</h2>
    <ul>
      <li v-for="el in backlog">{{ el }}</li>
    </ul>
  </section>
</template>

<style scoped>
#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
}

.log--player {
  color: #7700ff;
}

.log--opponent {
  color: #da8d00;
}

.log--damage {
  color: red;
}

.log--heal {
  color: green;
}
</style>
