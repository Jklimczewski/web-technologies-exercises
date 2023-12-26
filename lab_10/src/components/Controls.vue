<script>
import Button from "./Button.vue";

export default {
  name: "Controls",
  components: {
    Button,
  },
  props: {
    fightButtonStyle: {
      type: Boolean,
    },
    powerUseButtonStyle: {
      type: Boolean,
    },
    healUseButtonStyle: {
      type: Boolean,
    },
    finishButtonStyle: {
      type: Boolean,
    },
  },

  data() {
    return {
      buttons: [
        { msg: "STARCIE" },
        { msg: "STARCIE++" },
        { msg: "ODZYSKANIE SIŁ" },
        { msg: "KAPITULACJA" },
      ],
    };
  },
  methods: {
    forwardMessage(content) {
      this.$emit("control-clicked", content);
    },
  },
  watch: {
    fightButtonStyle: {
      immediate: true,
      handler(newVal) {
        this.buttons[0].style = newVal;
      },
    },
    powerUseButtonStyle: {
      immediate: true,
      handler(newVal) {
        this.buttons[1].style = newVal;
      },
    },
    healUseButtonStyle: {
      immediate: true,
      handler(newVal) {
        this.buttons[2].style = newVal;
      },
    },
    finishButtonStyle: {
      immediate: true,
      handler(newVal) {
        this.buttons[3].style = newVal;
      },
    },
  },
};
</script>

<template>
  <section id="controls">
    <Button
      v-for="(button, index) in buttons"
      :key="index"
      :buttonStyle="button.style"
      :buttonMsg="button.msg"
      @button-clicked="forwardMessage"
    />
  </section>
</template>

<style scoped>
#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
