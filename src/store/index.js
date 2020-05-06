import Vue from "vue";
import Vuex from "vuex";
import info from "./modules/info";
import display from "./modules/display";
import timer from "./modules/timer";
import tools from "./modules/tools";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    info,
    display,
    timer,
    tools
  }
});
