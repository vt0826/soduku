// initial state
// shape: [{ id, quantity }]
const state = {
  isEraseOn: false,
  isHintOn: false,
  isUndoOn: false,
  isNoteOn: false
};

// getters
const getters = {};

// actions
const actions = {
  erase(context) {
    console.log("erase");
    context.commit("erase");
  },
  hint(context) {
    console.log("hint");
    context.commit("hint");
  },
  undo(context) {
    console.log("undo");
    context.commit("undo");
  },
  note(context) {
    console.log("note");
    context.commit("note");
  }
};

// mutations
const mutations = {
  hint(state, isHintOn) {
    state.isHintOn = !state.isHintOn;
  },

  erase(state, isEraseOn) {
    state.isEraseOn = !state.isEraseOn;
  },
  undo(state, isUndoOn) {
    state.isUndoOn = !state.isUndoOn;
  },

  note(state, isNoteOn) {
    state.isNoteOn = !state.isNoteOn;
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
