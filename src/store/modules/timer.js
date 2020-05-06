function pad(n) {
  return n < 10 ? "0" + n : n;
}

// initial state
// shape: [{ id, quantity }]
const state = {
  duration: 0,
  isPause: false
};

// getters
const getters = {
  formatedTimer: (state, getters) => {
    const hours = Math.floor(state.duration / 3600);
    const minutes = Math.floor(state.duration / 60 - hours * 60);
    const seconds = Math.floor(state.duration - hours * 3600 - minutes * 60);
    const time = `${hours ? pad(hours) + ":" : ""} ${pad(minutes)} : ${pad(
      seconds
    )}`;
    return time;
  }
};

// actions
const actions = {
  pause(context) {
    context.commit("pause");
  },

  startTimer(context) {
    setInterval(() => {
      if (!state.isPause) {
        context.commit("start");
      }
    }, 1000);
  }
};

// mutations
const mutations = {
  start(state, duration) {
    state.duration++;
  },

  pause(state, isPause) {
    state.isPause = !state.isPause;
  }
};

function timeCalulation(duration) {
  const hours = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);
  const time = { hours, minutes, seconds };
  return time;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
