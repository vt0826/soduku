<template>
  <div id="app">
    <div class="container">
      <div class="title">
        <h1>數獨</h1>
      </div>
      <h1 v-show="isSolved">成功ㄌ!</h1>
      <div class="status">
        <status />
      </div>
      <div class="display">
        <div class="display_matrix">
          <display />
        </div>
        <div class="display_toolPad">
          <numberPad />
        </div>
      </div>
      <div class="footer" />
    </div>
  </div>
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
body {
  margin: 0;
  font-family: "NTR", sans-serif;
  background: #ffffff;
}

.container {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100vh;
  margin: 0 20px 0 20px;
}

.title {
  margin: 0px;
  flex: 1 0 8%;
  text-align: center;
  /* line-height: 100px; */
  color: #2e4963;
}
.title h1 {
  margin-bottom: 0;
  /*  margin-top: 12px; */
}

.status {
  flex: 1 0 5%;
}

.display {
  flex: 1 0 87%;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
}

.display_matrix {
  flex: 1 0 70%;
}
.display_toolPad {
  flex: 1 0 10%;
  display: -webkit-box;
  display: flex;
  margin-top: 4px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
}
@media only screen and (min-width: 992px) {
  .title {
    flex: 1 0 5%;
  }
  .status {
    flex: 1 0 5%;
  }
  .display {
    flex: 1 0 80%;
    display: flex;
    flex-direction: row;
  }
  .footer {
    flex: 1 0 5%;
  }
  .display_matrix {
    flex: 1 0 50%;
  }
  .display_toolPad {
    flex: 1 0 40%;
    margin-left: 20px;
    border: 1px solid #ddd;
  }
}
</style>
