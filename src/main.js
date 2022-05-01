import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import router from './router.js'
library.add(fas);

createApp(App).use(router).component('fa',FontAwesomeIcon).use(store).mount('#app')
