<template>
  <div class="pad_container">
    <div class="pad_tools">
      <button class="btn_back" @click="undo">
        <img src="../assets/icon-back.png" />
        <span>復原</span>
      </button>
      <button class="btn_delete" @click="erase">
        <img src="../assets/icon-eraser.png" />
        <span>清除</span>
      </button>
      <button class="btn_note" @click="note">
        <img src="../assets/icon-note.png" />
        <span>註記</span>
      </button>
      <button class="btn_tip" @click="hint">
        <img src="../assets/icon-bulb.png" />
        <span>提示</span>
      </button>
    </div>
    <ul class="pad_keyboard">
      <li v-for="n in 9" class="letter" v-bind:key="n" @click="chooseNum(n)">
        <button>{{ n }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: [],
  methods: {
    chooseNum(num) {
      this.$emit("updateSlot", num);
    },
    deleteSlot() {
      this.$emit("deleteSlot");
    },
    ...mapActions("tools", ["hint", "erase", "undo", "note"])
  }
};
</script>

<style>
.pad_container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pad_tools {
  flex: 1 0 40%;
  display: flex;
  flex-wrap: wrap;
}
.pad_tools button {
  height: 100px;
  width: 100%;
  flex: 1 0 25%;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: #ffffff;
  cursor: pointer;
}
.pad_tools button:active {
  background-color: rgb(160, 157, 157);
}

.pad_keyboard {
  flex: 1 0 60%;
  /*  height: 100%; */
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.pad_keyboard li {
  /* height: 100%; */
  flex: 1 0 11%;
}
.pad_keyboard li button {
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 38px;
  font-weight: 200;
  line-height: 100px;
  text-align: center;
  background-color: #ffffff;
  color: #5f7fc1;
  cursor: pointer;
  border: none;
  outline: none;
}

.pad_keyboard li button:active {
  background-color: rgb(160, 157, 157);
}
button img {
  width: 30px;
}
button span {
  display: block;
}
@media only screen and (min-width: 992px) {
  .pad_tools {
    border: 1px solid #d9d9d9;
  }
  .pad_tools button {
    flex: 1 0 50%;
    height: auto;
    margin: 0;
    border: 1px solid #d9d9d9;
  }
  .btn_delete {
    order: 1;
  }
  .btn_tip {
    order: 2;
  }
  .btn_back {
    order: 3;
  }
  .btn_note {
    order: 4;
  }
  .pad_keyboard li {
    /* height: 100px; */
    flex: 1 0 33%;
  }
  .pad_keyboard li button {
    border: 1px solid #d9d9d9;
    height: 100%;
  }
}
</style>
