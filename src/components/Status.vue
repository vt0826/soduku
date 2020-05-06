<template>
  <div class="info-container">
    <div>{{ info.difficulty }}</div>
    <div>{{ info.favorite }}</div>
    <div>mistake: {{ info.mistake }}/3</div>
    <div class="time-container">
      <span>{{ formatedTimer }}</span>
      <button v-show="timer.isPause" @click="pause">
        <img src="../assets/icon-play.png" />
      </button>
      <button v-show="!timer.isPause" @click="pause">
        <img src="../assets/icon-pause.png" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      active_el: 1,
      time: ""
    };
  },
  computed: {
    ...mapState(["info", "timer"]),
    ...mapGetters("timer", {
      formatedTimer: "formatedTimer"
    })
  },
  props: ["numbers", "answerNumbers"],
  methods: mapActions("timer", ["pause"]),
  created() {
    this.$store.dispatch("timer/startTimer");
  }
};
</script>

<style>
.info-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-content: center;
  color: #86888a;
}
.time-container {
  display: flex;
}
.time-container img {
  width: 20px;
}

.time-container button {
  border: none;
  background-color: white;
}
.time-container button:hover {
  cursor: pointer;
}
</style>
