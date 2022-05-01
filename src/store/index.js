import {
    createStore
} from "vuex";
import axios from "axios";
// import moment from 'moment';

const store = createStore({
    state: {
        dataGaji: [],
        subTotalGaji: 0,
        subTotalUpah: 0,
        subTotalKomisi: 0,
        subPembayaranTanggungan: 0,
        tanggungan: 570000,
        rekening: [],
        temp: []
    },
    getters: {
        tanggal_awal(state) {
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const date = new Date(state.dataGaji.tanggal_awal);
            return date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
        },
        tanggal_akhir(state) {
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const date = new Date(state.dataGaji.tanggal_akhir);
            return date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
        },
        total_gaji_kotor(state) {
            var total = state.subTotalGaji + state.subTotalUpah + state.subTotalKomisi;
            return total;
        },
        total_gaji_bersih(state) {
            var total = state.subTotalGaji + state.subTotalUpah + state.subTotalKomisi + state.subPembayaranTanggungan - state.tanggungan;
            return total;
        },
        total_komisi(state) {
            return state.subTotalKomisi;
        },
        total_kehadiran(state) {
            return state.dataGaji.total_kehadiran;
        },
        the_length(state) {
            return state.dataGaji.length
        }
    },
    mutations: {
        setDataGaji(state, responseData) {
            state.dataGaji = responseData;
        },
        setDataRekening(state, responseData) {
            state.rekening = responseData;
        },
        setSubTotalGaji(state, responseData) {
            state.subTotalGaji = responseData;
        },
        setSubTotalUpah(state, responseData) {
            state.subTotalUpah = responseData;
        },
        setTotalKomisi(state, responseData) {
            state.subTotalKomisi = responseData;
        },
        addKomisi(state, payload) {
            const obj = {
                "nama": payload.nama,
                "nominal": payload.nominal
            };
            state.dataGaji.komisi.push(obj);
            state.subTotalKomisi += payload.nominal;
        },
        addTanggungan(state, payload) {
            const obj = {
                "nama": payload.nama,
                "nominal": payload.nominal
            };
            state.dataGaji.tanggungan.push(obj);
            state.subPembayaranTanggungan += payload.nominal;
        },
        addDataTambahan(state, payload) {
            // console.log(state.dataGaji)
            var FOUND = -1;
            for (var i = 0; i < state.rekening.length; i++) {
                if (state.rekening[i].nomor == payload.nomor) {
                    FOUND = i;
                    break;
                }
            }


            const obj = {
                "rekening": state.rekening[FOUND],
                "tanggal_catat": payload.tanggal_catat,
                "keterangan": payload.keterangan,
            };
            Object.assign( state.dataGaji,obj )
        },
        ubahKehadiran(state, payload) {
            state.dataGaji.total_kehadiran = payload.total_kehadiran
        }
    },
    actions: {
        fetchData({
            commit,
            dispatch
        }) {
            axios.get("/salary/inquiry").then((res) => {
                if (res.data.success === true) {
                    commit('setDataGaji', res.data.data);
                }
                dispatch('totalGaji');
                dispatch('totalUpah');
            });

        },
        fetchRekening({
            commit
        }) {
            axios.get("/salary/bank").then((res) => {
                if (res.data.success === true) {
                    commit('setDataRekening', res.data.data);
                }
            });

        },
        postData(state) {
                axios
                .post("/salaryi/save/", state.dataGaji)
                .then((res) => {
                  console.log(res)
                });
        },
        totalGaji({
            commit,
            state
        }) {
            if (state.dataGaji != null) {
                var total = 0;
                for (var i = 0; i < state.dataGaji.pengaturan_gaji.length; i++) {
                    if (state.dataGaji.pengaturan_gaji[i].jenis === 'periode') {
                        total += state.dataGaji.pengaturan_gaji[i].nominal * state.dataGaji.total_periode;
                    }
                    if (state.dataGaji.pengaturan_gaji[i].jenis === 'kehadiran') {
                        total += state.dataGaji.pengaturan_gaji[i].nominal * state.dataGaji.total_kehadiran;
                    }
                }
                commit('setSubTotalGaji', total);
            }
        },
        totalUpah({
            commit,
            state
        }) {
            if (state.dataGaji != null) {
                var total = 0;
                for (var i = 0; i < state.dataGaji.pengaturan_upah.length; i++) {
                    total += state.dataGaji.pengaturan_upah[i].nominal * state.dataGaji.pengerjaan_upah[i].nominal;
                }
                commit('setSubTotalUpah', total);
            }
        },
        
        // totalKomisi({
        //     commit,
        //     state
        // }) {
        //     if (state.dataGaji != null) {
        //         var total = 0;
        //         for (var i = 0; i < state.dataGaji.komisi.length; i++) {
        //             total += state.dataGaji.komisi[i].nominal;
        //         }
        //         commit('setTotalKomisi', total);
        //     }
        // },
    }
});

export default store;