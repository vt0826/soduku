<template>
  <div id="app">
    <div class="container">
      <div class="title">
        <h1>數獨</h1>
      </div>
      <div class="display">
        <div class="display_status">
          <status />
        </div>
        <div class="display_board">
          <div class="display_board-matrix">
            <display />
          </div>
          <div class="display_board-toolPad">
            <numberPad />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--    <h1 v-show="isSolved">成功ㄌ!</h1> -->
</template>

<script>
import NumberPad from "./components/NumberPad.vue";
import Display from "./components/Display.vue";
import Status from "./components/Status.vue";

export default {
  components: {
    NumberPad,
    Display,
    Status
  },

  name: "app",
  data() {
    return {
      selected: "",
      isNoteOn: false,
      isSolved: false
    };
  },
  watch: {
    // whenever question changes, this function will run
    numbers: {
      handler: function() {
        let error = false;
        for (let i = 0; i < 9; i++) {
          if (!this.numbers[i].hint) {
            if (this.numbers[i].insert != this.numbers[i].ans) {
              error = true;
              break;
            }
          }
        }
        if (!error) {
          this.isSolved = true;
        }
      },
      deep: true
    }
  },
  methods: {
    selectSlot(slot) {
      this.selected = slot;
    },
    noteToggle() {
      this.isNoteOn = !this.isNoteOn;
    },
    updateSlot(num) {
      let index = this.selected;
      this.numbers[index].insert = num;
    },
    deleteSlot() {
      let index = this.selected;
      this.numbers[index].insert = "";
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "NTR", sans-serif;
  box-sizing: border-box;
}
body {
  background: #ffffff;
  width: 100%;
  height: 100vh;
}
.container {
  display: -webkit-box;
  height: 100vh;
  padding: 0 12px;
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.title {
  flex: 0 0 100%;
  height: 80px;
  text-align: center;
}
.title h1 {
  color: #2e4963;
  padding: 20px;
}
.display {
  flex: 0 0 100%;
  height: calc(100% - 80px);
  padding: 0 80px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

.display_status {
  flex: 0 0 100%;
  height: 40px;
}

.display_board {
  flex: 0 0 100%;
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
}

.display_board-matrix {
  flex: 3;
}
.display_board-toolPad {
  flex: 1;
  padding-bottom: 20px;
}
@media only screen and (min-width: 992px) {
  .display {
    padding: 0;
  }
  .display_board {
    padding-bottom: 80px;
    flex-direction: row;
  }
  .display_board-matrix {
    flex: 0 0 60%;
    padding-right: 30px;
  }
  .display_board-toolPad {
    flex: 0 0 40%;

    padding-bottom: 0;
  }
}
</style>
