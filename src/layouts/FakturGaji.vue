<template>
  <NavbarComponent msg="Faktur Gaji" />
  <!-- Modal -->
  <ModalComponent :fitur="isFitur" :open="isOpen" @close="isOpen = !isOpen" />

  <!-- nama dan tanggal -->
  <div class="nameAndDate">
    <div class="bagianAtas">
      <h2>{{ $store.state.dataGaji.nama_karyawan }}</h2>
      <p>
        {{ $store.getters.tanggal_awal }} - {{ $store.getters.tanggal_akhir }}
      </p>
    </div>
    <div class="bagianBawah">
      <p>Masuk {{ $store.state.dataGaji.total_kehadiran }} Hari</p>
      <p
        class="hyperlink"
        @click="(isOpen = true), (isFitur = 'kehadiranData')"
      >
        Ubah Kehadiran
      </p>
    </div>
  </div>

  <div class="group1">
    <!-- gaji -->
    <div class="gaji">
      <h2>Gaji</h2>
      <div v-for="item in $store.state.dataGaji.pengaturan_gaji" :key="item.id">
        <div class="listItem">
          <div class="left">
            <p class="title">{{ item.nama }}</p>
            <p>
              {{ this.numSeparator(item.nominal) }} x
              <span v-if="item.jenis === 'periode'"
                >{{ $store.state.dataGaji.total_periode }}
                {{ item.jenis }}</span
              >
              <span v-else
                >{{ $store.state.dataGaji.total_kehadiran }}
                {{ item.jenis }}</span
              >
            </p>
          </div>
          <div class="right">
            {{
              item.jenis == "periode"
                ? this.multiplyGaji(
                    item.nominal,
                    $store.state.dataGaji.total_periode
                  )
                : this.multiplyGaji(
                    item.nominal,
                    $store.state.dataGaji.total_kehadiran
                  )
            }}
            <span class="iconEdit"
              ><fa :icon="['fas', 'pencil-square']"
            /></span>
          </div>
        </div>
      </div>
      <div class="bagianBawah">
        <h2>Subtotal Gaji</h2>
        <h2>Rp {{ this.numSeparator($store.state.subTotalGaji) }}</h2>
      </div>
    </div>

    <!-- upah borongan -->
    <div class="upahBorongan">
      <h2>Upah Borongan</h2>
      <div
        v-for="(item, index) in $store.state.dataGaji.pengaturan_upah"
        :key="index"
      >
        <div class="listItem">
          <div class="left">
            <p class="title">
              {{ item.nama.charAt(0).toUpperCase() + item.nama.slice(1) }}
            </p>
            <p>{{ $store.state.dataGaji.pengerjaan_upah[index].nominal }} KG</p>
          </div>
          <div class="right">
            {{
              this.multiplyUpah(
                item.nominal,
                $store.state.dataGaji.pengerjaan_upah[index].nominal
              )
            }}
          </div>
        </div>
      </div>
      <div class="bagianBawah">
        <h2>Subtotal Upah</h2>
        <h2>Rp {{ this.numSeparator($store.state.subTotalUpah) }}</h2>
      </div>
    </div>

    <!-- komisi -->
    <div class="komisi">
      <h2>Komisi</h2>
      <div class="content">
        <p class="hyperlink" @click="(isOpen = true), (isFitur = 'komisiData')">
          <fa :icon="['fas', 'plus-circle']" /> Tambah Komisi Lainnya...
        </p>
      </div>
      <div v-for="(item, index) in $store.state.dataGaji.komisi" :key="index">
        <div class="listItem">
          <div class="left">
            <p class="title">
              {{ item.nama.charAt(0).toUpperCase() + item.nama.slice(1) }}
            </p>
          </div>
          <div class="right">
            {{ this.numSeparator(item.nominal) }}
            <span class="iconEdit"
              ><fa :icon="['fas', 'pencil-square']"
            /></span>
          </div>
        </div>
      </div>
      <div class="bagianBawah">
        <h2>Subtotal Komisi</h2>
        <h2>Rp {{ this.numSeparator($store.state.subTotalKomisi) }}</h2>
      </div>
    </div>
  </div>

  <!-- gaji kotor -->
  <div class="gajiKotor">
    <h2>Total Gaji Kotor</h2>
    <div class="bagianBawah">
      <h2>Rp {{ this.numSeparator($store.getters.total_gaji_kotor) }}</h2>
    </div>
  </div>

  <!-- tanggungan -->
  <div class="tanggungan">
    <div class="bagianAtas">
      <h2>Tanggungan</h2>
      <p>
        Karyawan ini memiliki tanggungan Rp
        {{ this.numSeparator($store.state.tanggungan) }}
      </p>
    </div>
    <div class="content">
      <p
        class="hyperlink"
        @click="(isOpen = true), (isFitur = 'tanggunganData')"
      >
        <fa :icon="['fas', 'plus-circle']" /> Tambah Pembayaran Tanggungan...
      </p>
    </div>
    <div v-for="(item, index) in $store.state.dataGaji.tanggungan" :key="index">
      <div class="listItem">
        <div class="left">
          <p class="title">
            {{ item.nama.charAt(0).toUpperCase() + item.nama.slice(1) }}
          </p>
        </div>
        <div class="right">
          {{ this.numSeparator(item.nominal) }}
          <span class="iconEdit" style="color: red"
            ><fa :icon="['fas', 'pencil-square']"
          /></span>
        </div>
      </div>
    </div>
    <div class="bagianBawah">
      <h2>Tanggungan Dibayar</h2>
      <h2 style="color: red">
        (-) Rp {{ this.numSeparator($store.state.subPembayaranTanggungan) }}
      </h2>
    </div>
  </div>

  <!-- footer -->
  <div class="footer">
    <div class="gajiBersih">
      <h2>
        Total Gaji Bersih
        <span style="color: #00a88a"
          ><fa :icon="['fas', 'check-circle']"
        /></span>
      </h2>
      <div class="bagianBawah">
        <h2>Rp {{ this.numSeparator($store.getters.total_gaji_bersih) }}</h2>
      </div>
    </div>
    <p>
      Nominal akhir yang diterima karyawan setelah ditambah komisi dikurangi
      pembayaran tanggungan (jika ada).
    </p>
    <router-link to="/detailFaktur">
      <button>Berikutnya</button>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";

export default {
  name: "FakturGaji",
  components: {
    NavbarComponent,
    ModalComponent,
  },
  setup() {
    const isOpen = ref(false);
    const isFitur = ref("komisiData");
    return { isOpen, isFitur };
  },
  async mounted() {
    this.$store.dispatch("fetchData");
  },
  methods: {
    multiplyGaji(nominal, nominalJenis) {
      return this.numSeparator(nominal * nominalJenis);
    },
    multiplyUpah(nominal, jumlah) {
      return this.numSeparator(nominal * jumlah);
    },
    numSeparator(nilai) {
      return nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";

.nameAndDate {
  @include box(0.2vw);
  h2 {
    font-size: 3vh;
    margin: 0;
  }

  p {
    font-size: 2.5vh;
    margin: 0;
  }

  .bagianAtas {
    padding: 2vw;
  }

  .bagianBawah {
    @include bold;
    @include displayFlex;
    padding: 2vw;
    border-top: 2px dashed #f2f5f7;
    .hyperlink {
      color: rgb(95, 95, 255);
      cursor: pointer;
    }
  }
}

.group1 {
  display: flex;
  width: 100%;
  gap: 0.5%;
  .gaji,
  .upahBorongan,
  .komisi {
    width: 33%;
  }

  .upahBorongan {
    .bagianBawah {
      margin-bottom: 0;
    }
  }
}

.gaji,
.upahBorongan,
.komisi,
.tanggungan {
  @include box();
  padding: 2vw;
  margin: 0.3vw 0;
  h2 {
    margin: 0;
  }

  .hyperlink {
    color: rgb(95, 95, 255);
    font-weight: 600;
    cursor: pointer;
  }

  .listItem {
    @include displayFlex;
    .title {
      @include bold;
    }
  }

  .iconEdit {
    margin-left: 0.2vw;
    font-size: 1.5vw;
    color: rgb(95, 95, 255);
    cursor: pointer;
  }

  .bagianBawah {
    @include bold;
    @include displayFlex;
    border-top: 2px dashed #f2f5f7;
    padding: 1vw 0;
  }
}

.tanggungan {
  .bagianAtas {
    border-bottom: 3px dashed #f2f5f7;
    padding-bottom: 1vw;
    h2,
    p {
      margin: 0;
    }
  }
}
.gajiKotor {
  @include box();
  @include bold;
  @include displayFlex;
  color: #00a88a;
  padding: 1vw 2vw;
  margin: 0.4vw 0;
}

.footer {
  @include box();
  padding: 1vw 2vw;
  margin: 0.4vw 0;
  .gajiBersih {
    @include bold;
    @include displayFlex;
    color: rgb(95, 95, 255);
  }
  p {
    margin: 0;
  }

  button {
    @include button();
    @include bold;
    font-size: 3vh;
    margin: 2vh 0;
  }
}
</style>