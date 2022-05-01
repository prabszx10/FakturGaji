<template>
  <transition name="fade">
    <div class="vue-modal" v-show="open">
      <div class="close" @click="close"></div>
      <transition name="drop-in">
        <div class="veu-modal-inner" v-show="open">
          <div class="vue-modal-content">
            <!-- Form Komisi atau Tanggungan -->
            <form
              v-if="fitur == 'komisiData' || fitur == 'tanggunganData'"
              v-on:submit.prevent="this.getJenis()"
              action=""
            >
              <div class="atas">
                <h1>
                  {{
                    fitur == "komisiData"
                      ? "Tambah Komisi"
                      : "Tambah Tanggungan"
                  }}
                </h1>
              </div>
              <label for="">{{
                fitur == "komisiData"
                  ? "Nama Komisi"
                  : "Nama Pembayaran Tanggungan"
              }}</label>
              <div class="boxInput">
                <input v-model="this.nama" placeholder="Isi Nama" type="text" />
              </div>
              <label for="">Nominal</label>
              <div class="boxInput">
                <input
                  v-model="this.nominal"
                  placeholder="Isi Nominal"
                  type="number"
                />
              </div>
              <div class="groupButton">
                <button type="button" @click="close">Tutup</button>
                <button type="submit" @click="close" class="simpan">
                  Simpan
                </button>
              </div>
            </form>

            <!-- Form Kehadiran-->
            <form
              v-if="fitur == 'kehadiranData'"
              v-on:submit.prevent="this.getJenis()"
              action=""
            >
              <div class="atas">
                <h1>Ubah Kehadiran</h1>
              </div>
                  <label for="">Jumlah Kehadiran</label>
                  <div class="boxInput">
                    <input
                      v-model="this.total_kehadiran"
                      placeholder="Kehadiran"
                      type="text"
                    />
                  </div>
              <div class="groupButton">
                <button type="submit" @click="close" class="simpanFull">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      nama: "",
      nominal: "",
      total_kehadiran: '',
    };
  },
  props: {
    fitur: {
      type: String,
      required: true,
    },
    open: {
      type: Boolean,
      required: true,
    },
  },
  beforeMount() {
    this.kehadiran();
  },
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
  methods: {
    kehadiran() {
      console.log("ini" + this.$store.state.dataGaji.total_kehadiran);
    },
    getJenis() {
      if (this.fitur == "komisiData") {
        this.komisiData();
      } else if (this.fitur == "tanggunganData") {
        this.tanggunganData();
      } else if (this.fitur == "kehadiranData") {
        this.kehadiranData();
      }
    },
    refreshTotal(){
            this.$store.dispatch('totalGaji');
      this.$store.dispatch('totalUpah');
    },
    komisiData() {
      this.$store.commit({
        type: "addKomisi",
        nama: this.nama,
        nominal: this.nominal,
      });
      this.nama = "";
      this.nominal = "";
      this.refreshTotal()
    },
    tanggunganData() {
      this.$store.commit({
        type: "addTanggungan",
        nama: this.nama,
        nominal: this.nominal,
      });
      this.nama = "";
      this.nominal = "";
      this.refreshTotal()
    },
    kehadiranData() {
      this.$store.commit({
        type: "ubahKehadiran",
        total_kehadiran: this.total_kehadiran,
      });
      this.nama = "";
      this.nominal = "";
      this.refreshTotal()
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  font-size: 4vh;
  text-align: center;
  margin-bottom: 2vh;
}

.groupForm{
  @include displayFlex();
  .kanan, .kiri {
    width: 49%
  }
}
.groupButton {
  @include displayFlex();
  button {
    @include buttonClose(49%);
  }
  .simpan {
    @include button(49%);
  }
  .simpanFull {
    @include button();
  }
}

.boxInput {
  width: 100%;
  padding: 0.5vw;
  margin-bottom: 1vw;
  border: 1px solid grey;
  border-radius: 0.5vw;
  input {
    width: 100%;
    border: none;
  }
  input:focus {
    outline: none;
  }
}

.close {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.vue-modal-inner {
  max-width: 500px;
  margin: 2rem auto;
}

.vue-modal-content {
  margin: 30vh auto;
  width: 80%;
  position: relative;
  background-color: #fff;
  border: none;
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 3vw;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translate(0, -50px);
}
</style>