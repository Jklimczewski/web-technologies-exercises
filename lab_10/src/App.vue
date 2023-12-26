<template>
  <Header></Header>
  <Players
    :opponentBarStyles="opponentBarStyles"
    :playerBarStyles="playerBarStyles"
  />
  <Controls
    :powerUseButtonStyle="powerUseButtonStyle"
    :fightButtonStyle="fightButtonStyle"
    :finishButtonStyle="finishButtonStyle"
    :healUseButtonStyle="healUseButtonStyle"
    @control-clicked="handleControls"
  />
  <Logs :backlog="backlog" />
</template>

<script>
import Players from "./components/Players.vue";
import Controls from "./components/Controls.vue";
import Logs from "./components/Logs.vue";

const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default {
  name: "App",
  components: {
    Players,
    Controls,
    Logs,
  },
  data() {
    return {
      player: {
        health: 100,
        width: "100%",
        color: "green",
        powerUseRound: undefined,
        healUseRound: undefined,
      },
      opponent: {
        health: 100,
        width: "100%",
        color: "green",
      },
      round: 0,
      backlog: [],
    };
  },
  watch: {
    "player.health": function (newVal) {
      if (newVal <= 0) {
        this.changeWidth("player", 0);
        this.backlog.push("Przeciwnik wygrał! Resetowanie gry...");
        setTimeout(() => {
          this.kapitulacja();
        }, 5000);
      } else if (newVal <= 100) {
        this.changeWidth("player", newVal);

        if (newVal <= 20) {
          this.changeColor("player", "red");
        } else if (newVal <= 60) {
          this.changeColor("player", "orange");
        } else {
          this.changeColor("player", "green");
        }
      }
    },
    "opponent.health": function (newVal) {
      if (newVal <= 0) {
        this.changeWidth("opponent", 0);
        this.backlog.push("Gracz wygrał! Resetowanie gry...");
        setTimeout(() => {
          this.kapitulacja();
        }, 5000);
      } else if (newVal <= 100) {
        this.changeWidth("opponent", newVal);

        if (newVal <= 20) {
          this.changeColor("opponent", "red");
        } else if (newVal <= 60) {
          this.changeColor("opponent", "orange");
        } else {
          this.changeColor("opponent", "green");
        }
      }
    },
  },
  methods: {
    handleControls(msg) {
      if (msg == "STARCIE") {
        this.starcie();
      } else if (msg == "STARCIE++") {
        this.starciePlus();
      } else if (msg == "ODZYSKANIE SIŁ") {
        this.odzyskanie();
      } else {
        this.kapitulacja();
      }
    },
    starcie() {
      const playerMove = getRandomValue(0, 2) * 10;
      const opponentsMove = getRandomValue(0, 2) * 10;
      this.player["health"] -= opponentsMove;
      this.opponent["health"] -= playerMove;
      this.round += 1;
      this.backlog.push("Gracz zaatakował za", playerMove);
      this.backlog.push("Przeciwnik zaatakował za", opponentsMove);
    },
    starciePlus() {
      const playerMove = getRandomValue(1, 5) * 10;
      const opponentsMove = getRandomValue(0, 2) * 10;
      this.player["health"] -= opponentsMove;
      this.opponent["health"] -= playerMove;
      this.player["powerUseRound"] = this.round;
      this.round += 1;
      this.backlog.push("Gracz zaatakował bonusowo za", playerMove);
      this.backlog.push("Przeciwnik zaatakował za", opponentsMove);
    },
    odzyskanie() {
      const playerMove = getRandomValue(0, 2) * 10;
      const opponentsMove = getRandomValue(0, 2) * 10;
      this.player["health"] += playerMove;
      this.player["health"] -= opponentsMove;
      this.player["healUseRound"] = this.round;
      this.round += 1;
      this.backlog.push("Gracz uleczył się za", playerMove);
      this.backlog.push("Przeciwnik zaatakował za", opponentsMove);
    },
    kapitulacja() {
      (this.player = {
        health: 100,
        width: "100%",
        color: "green",
        powerUseRound: undefined,
        healUseRound: undefined,
      }),
        (this.opponent = {
          health: 100,
          width: "100%",
          color: "green",
        });
      this.round = 0;
      this.backlog = [];
    },
    changeWidth(person, value) {
      const perc = value + "%";
      if (person == "player") {
        this.player["width"] = perc;
      } else if (person == "opponent") {
        this.opponent["width"] = perc;
      }
    },
    changeColor(person, value) {
      if (person == "player") {
        this.player["color"] = value;
      } else if (person == "opponent") {
        this.opponent["color"] = value;
      }
    },
  },
  computed: {
    opponentBarStyles() {
      return {
        width: this.opponent["width"],
        "background-color": this.opponent["color"],
      };
    },
    playerBarStyles() {
      return {
        width: this.player["width"],
        "background-color": this.player["color"],
      };
    },
    powerUseButtonStyle() {
      if (this.player.health <= 0 || this.opponent.health <= 0) {
        return true;
      } else {
        return this.round - this.player["powerUseRound"] < 3 ? true : false;
      }
    },
    healUseButtonStyle() {
      if (
        this.round == 0 ||
        this.player.health <= 0 ||
        this.opponent.health <= 0
      ) {
        return true;
      } else {
        return this.round - this.player["healUseRound"] < 5 ? true : false;
      }
    },
    fightButtonStyle() {
      if (this.player.health <= 0 || this.opponent.health <= 0) {
        return true;
      }
    },
    finishButtonStyle() {
      if (this.player.health <= 0 || this.opponent.health <= 0) {
        return true;
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
  background-color: aliceblue;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}
</style>
