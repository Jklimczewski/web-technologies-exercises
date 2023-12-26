<script>
export default {
  name: "Players",
  props: {
    opponentBarStyles: {
      type: Object,
    },
    playerBarStyles: {
      type: Object,
    },
  },
};
</script>

<template>
  <section id="opponent" class="container">
    <h2>Przeciwnik</h2>
    <div class="healthbar">
      <div class="healthbar__value" :style="opponentBarStyles"></div>
    </div>
  </section>
  <section id="player" class="container">
    <h2>Gracz</h2>
    <div class="healthbar">
      <div class="healthbar__value" :style="playerBarStyles"></div>
    </div>
  </section>
</template>

<style scoped>
.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #d8d8d8;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
}

.container {
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}

#opponent h2,
#player h2 {
  margin: 0.25rem;
}
</style>
