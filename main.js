import Vue from 'vue'
import App from './App'

import { HttpWidget } from './common/dt-request';

Vue.use(new HttpWidget());

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
