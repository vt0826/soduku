<template>
  <div class="status-container">
    <div class="status_difficulty">{{ info.difficulty }}</div>
    <div class="status_favorite">{{ info.favorite }}</div>
    <div class="status_mistake">mistake: {{ info.mistake }}/3</div>
    <div class="status_timer">
      <span>{{ formatedTimer }}</span>
      <button v-show="timer.isPause" @click="pause">
        <div class="play"></div>
      </button>
      <button v-show="!timer.isPause" @click="pause">
        <div class="pause"></div>
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
.status-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;
  color: #86888a;
}
.status_difficulty {
  flex: 2;
  display: flex;
  align-self: center;
  text-transform: capitalize;
}
.status_favorite {
  flex: 1;
  display: flex;
  align-self: center;
}
.status_mistake {
  flex: 1;
  display: flex;
  align-self: center;
  text-transform: capitalize;
}

.status_timer {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-self: center;
}
.status_timer div {
  width: 14px;
  height: 14px;
  cursor: pointer;
}
.status_timer .pause {
  border-style: double;
  border-width: 0px 0px 0px 12px;
  border-color: #86888a;
}

.status_timer .play {
  box-sizing: border-box;
  border-style: solid;
  border-width: 7px 0 7px 14px;
  border-color: transparent transparent transparent #86888a;
}
.status_timer button {
  border: none;
  margin-left: 16px;
  background-color: white;
}

.status_timer button:focus {
  outline: none;
  box-shadow: none;
}

@media only screen and (min-width: 992px) {
  .status_difficulty {
    flex: 2;
  }
}
</style>
