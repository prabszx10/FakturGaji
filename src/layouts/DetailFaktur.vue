<template>
  <div class="detailFaktur">
    <NavbarComponent msg="Detail Faktur" />
    <div class="content">
      <div class="rekapGaji">
        <div class="gaji">
          <p>Subtotal Gaji</p>
          <p>Rp {{ this.numSeparator($store.state.subTotalGaji) }}</p>
        </div>
        <div class="upah">
          <p>Subtotal Upah</p>
          <p>Rp {{ this.numSeparator($store.state.subTotalUpah) }}</p>
        </div>
        <div class="komisi">
          <p>Subtotal Komisi</p>
          <p>Rp {{ this.numSeparator($store.state.subTotalKomisi) }}</p>
        </div>
        <div class="gajiKotor">
          <p>Gaji Kotor</p>
          <p class="biaya">
            Rp {{ this.numSeparator($store.getters.total_gaji_kotor) }}
          </p>
        </div>
        <div class="tanggungan">
          <p>Tanggungan</p>
          <p>(-) Rp {{ this.numSeparator($store.state.tanggungan) }}</p>
        </div>
        <div class="gajiBersih">
          <h1>Total Gaji Bersih</h1>
          <h1 class="biaya">
            Rp {{ this.numSeparator($store.getters.total_gaji_bersih) }}
          </h1>
        </div>
      </div>
      <div class="detailTambahan">
        <form v-on:submit.prevent="this.addDataTambahan()">
          <label for="">Bayar dari Rekening</label>
          <div class="boxInput">
            <input
              v-model="this.nomor"
              type="text"
              placeholder="Pilih Rekening Bank"
              list="boxList"
            />
            <datalist id="boxList">
              <option
                v-for="item in $store.state.rekening"
                :key="item.nomor"
                :value="item.nomor"
              >
                {{ item.pemilik }}
              </option>
            </datalist>
          </div>
          <label for="">Dicatat Pada Tanggal</label>
          <div class="boxInput">
            <input
              v-model="this.tanggal_catat"
              placeholder="Pilih Tanggal"
              type="date"
            />
          </div>

          <label for="">Keterangan</label>
          <div class="boxInput">
            <input
              v-model="this.keterangan"
              placeholder="Tambah Keterangan"
              type="text"
            />
          </div>
          <button type="submit">Submit Gaji</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import NavbarComponent from "../components/NavbarComponent.vue";
export default {
  data() {
    return {
      nomor: "",
      tanggal_catat: "",
      keterangan: "",
    };
  },
  async mounted() {
    this.$store.dispatch("fetchRekening");
  },
  components: {
    NavbarComponent,
  },
  methods: {
    addDataTambahan() {
      this.$store.commit({
        type: "addDataTambahan",
        nomor: this.nomor,
        tanggal_catat: this.tanggal_catat,
        keterangan: this.keterangan,
      });
      this.nomor = "";
      this.tanggal_catat = "";
      this.keterangan = "";
      this.sendData()
    },
    sendData() {
     this.$store.dispatch("postData");
    },
    numSeparator(nilai) {
      return nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.content {
  .rekapGaji {
    @include box();
    padding: 2vw;
    margin: 0.3vw 0;

    .gaji,
    .upah,
    .komisi,
    .gajiKotor,
    .tanggungan,
    .gajiBersih {
      @include displayFlex();
      p {
        font-size: 1.5vw;
        font-weight: 400;
        margin: 0;
      }
    }
    .gajiKotor,
    .tanggungan {
      margin: 2vh auto;
    }

    .gajiKotor {
      .biaya {
        color: #00a88a;
      }
    }

    .tanggungan {
      color: red;
    }

    .gajiBersih {
      color: rgb(95, 95, 255);
      padding-top: 2vh;
      border-top: 2px dashed #f2f5f7;
    }
  }
  .detailTambahan {
    @include box();
    padding: 2vw;
    margin: 0.3vw 0;

    option {
      width: 100%;
    }
    button {
      @include button();
      @include bold;
      font-size: 3vh;
      margin: 2vh 0;
    }

    .boxInput {
      width: 98%;
      padding: 0.5vw 1%;
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
  }
}
</style>