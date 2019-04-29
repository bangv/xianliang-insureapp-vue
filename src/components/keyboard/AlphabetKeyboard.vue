<template>
  <transition enter-active-class="animated fadeInUp">
    <Modal background="transparent" @hide="handleComplete">
      <div id="alphabet-keyboard">
        <ul class="line1">
          <li
            class="number"
            v-for="(number,index) in keyboard.line1"
            :key="index"
            @click="handleNumber(number)"
          >{{number}}</li>
        </ul>
        <ul class="line2">
          <li
            class="letter"
            v-for="item in keyboard.line2"
            :key="item.text"
            :class="{'disabled':disabledKeyboard.includes(item.text)}"
            @click="handleLetter(item)"
          >{{item.text}}</li>
        </ul>
        <ul class="line3">
          <li
            class="letter"
            v-for="item in keyboard.line3"
            :key="item.text"
            @click="handleLetter(item)"
          >{{item.text}}</li>
        </ul>

        <ul class="line4">
          <li class="special backspace-btn" @click="handleBackspace">
            <i class="iconfont">&#xe778;</i>
          </li>
          <li
            class="letter"
            v-for="item in keyboard.line4"
            :key="item.text"
            @click="handleLetter(item)"
          >{{item.text}}</li>
          <li class="special complete-btn" @click="handleComplete">完成</li>
        </ul>
      </div>
    </Modal>
  </transition>
</template>

<script>
export default {
  name: "AlphabetKeyboard",
  data() {
    return {
      disabledKeyboard: ["I", "O"],
      keyboard: {
        line1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        line2: [
          {
            text: "Q",
            type: "letter"
          },
          {
            text: "W",
            type: "letter"
          },
          {
            text: "E",
            type: "letter"
          },
          {
            text: "R",
            type: "letter"
          },
          {
            text: "T",
            type: "letter"
          },
          {
            text: "Y",
            type: "letter"
          },
          {
            text: "U",
            type: "letter"
          },
          {
            text: "I",
            type: "letter"
          },
          {
            text: "O",
            type: "letter"
          },
          {
            text: "P",
            type: "letter"
          }
        ],
        line3: [
          {
            text: "A",
            type: "letter"
          },
          {
            text: "S",
            type: "letter"
          },
          {
            text: "D",
            type: "letter"
          },
          {
            text: "F",
            type: "letter"
          },
          {
            text: "G",
            type: "letter"
          },
          {
            text: "H",
            type: "letter"
          },
          {
            text: "J",
            type: "letter"
          },

          {
            text: "K",
            type: "letter"
          },

          {
            text: "L",
            type: "letter"
          }
        ],
        line4: [
          // {
          //   text: '*',
          //   type: 'delete'
          // },
          {
            text: "Z",
            type: "letter"
          },

          {
            text: "X",
            type: "letter"
          },
          {
            text: "C",
            type: "letter"
          },
          {
            text: "V",
            type: "letter"
          },
          {
            text: "B",
            type: "letter"
          },
          {
            text: "N",
            type: "letter"
          },
          {
            text: "M",
            type: "letter"
          }
        ]
      }
    };
  },
  methods: {
    /**
     * @description 处理数字
     * @param {Number} value 数字
     */
    handleNumber(value) {
      this.$emit("keyboard", {
        type: "number",
        value: value
      });
    },
    /**
     * @description 处理字母
     * @param {Object} item 字母对象
     */
    handleLetter(item) {
      if (!this.disabledKeyboard.includes(item.text)) {
        this.$emit("keyboard", {
          type: "letter",
          value: item.text
        });
      }
    },
    handleBackspace() {
      this.$emit("backspace");
    },
    handleComplete() {
      this.$emit("complete");
      this.$parent.state.showAlphabetKeyboard = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
#alphabet-keyboard {
  position: fixed;
  z-index: 30;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0.05% 20px;
  background-color: #dadee1;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      display: inline-block;
      width: 8%;
      height: 76px;
      max-height: 76px;
      margin: 1.5% 1%;
      text-align: center;
      line-height: 76px;
      border-radius: 6px;
      font-size: 38px;
      box-shadow: 0px 1px 0px #9d9d9d;
      &.special {
        width: 13%;
        font-size: 30px;
        // background-color: #c0c3ca;
      }
    }
    .number {
      background-color: #fff;
    }
    .letter {
      background-color: #fff;
    }
    .disabled {
      opacity: 0.5;
      // background-color: #c0c3ca;
    }
  }
  .backspace-btn {
    background-color: #c0c3ca;
    i {
      font-size: 34px;
      font-weight: 700;
    }
  }
  .complete-btn {
    color: #fff;
    background-color: #0b8aff;
  }
}
</style>
