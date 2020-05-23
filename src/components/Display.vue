<template>
  <div class="matrix-container">
    <div
      v-for="(parentNumbers, parent_y_index) in display.numbers"
      class="matrix_parent_y"
      v-bind:key="parent_y_index"
    >
      <div
        v-for="(parentNumber, parent_x_index) in parentNumbers"
        class="matrix_parent_x"
        v-bind:key="parent_x_index"
      >
        <div
          v-for="(childNumbers, x_index) in parentNumber"
          class="matrix_child"
          v-bind:key="x_index"
        >
          <ul>
            <li
              v-for="(childNumber,y_index) in childNumbers"
              v-bind:key="y_index"
              v-bind:class="divHighlightMethod(parent_x_index, parent_y_index, x_index, y_index, display) "
              @click="select(parent_x_index, parent_y_index, x_index, y_index)"
            >
              <span>{{childNumber.insert}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      /* parent_x_index: null,
      parent_y_index: null */
    };
  },
  computed: {
    ...mapState(["display"])
  },

  methods: {
    divHighlightMethod(parentX, parentY, childX, childY, display) {
      const selectParentX = display.select.parentX;
      const selectParentY = display.select.parentY;
      const selectChildX = display.select.childX;
      const selectChildY = display.select.childY;

      return {
        active:
          parentX === selectParentX &&
          parentY === selectParentY &&
          selectChildX == childX &&
          selectChildY == childY
            ? true
            : false,
        select_grid:
          parentX === selectParentX && parentY === selectParentY ? true : false,
        select_row:
          parentY === selectParentY && childX == selectChildX ? true : false,
        select_col:
          parentX === selectParentX && childY == selectChildY ? true : false
      };
    },

    select(parentX, parentY, childX, childY) {
      const payload = { parentX, parentY, childX, childY };
      this.$store.dispatch("display/select", payload);
    }
  },
  created() {
    this.$store.dispatch("display/createNumbers");
  }
};
</script>

<style>
.matrix-container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  border: 2px solid black;
}

.matrix_parent_y {
  flex: 0 0 100%;
  display: flex;
  flex-direction: row;
}

.matrix-container .matrix_parent_y:nth-child(-n + 2) {
  border-bottom: 2px solid black;
}
.matrix_parent_y .matrix_parent_x:nth-child(-n + 2) {
  border-right: 2px solid black;
}
.matrix_parent_x .matrix_child:nth-child(-n + 2) {
  border-bottom: 2px solid #bbc3d2;
}
.matrix_child li:nth-child(-n + 3) {
  border-left: 2px solid #bbc3d2;
}

.matrix_parent_x {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.matrix_child {
  flex: 0 0 100%;
}

.matrix_child ul {
  height: 100%;
  display: flex;
  align-content: stretch;
  list-style: none;
}
.matrix_child li {
  flex: 1;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.matrix_child span {
  font-size: 24px;
}

.matrix_child li.select_grid {
  background-color: #e1e6ec;
}

.matrix_child li.select_row {
  background-color: #e1e6ec;
}
.matrix_child li.select_col {
  background-color: #e1e6ec;
}
.matrix_child li.active {
  background-color: #bedbfe;
}
</style>
