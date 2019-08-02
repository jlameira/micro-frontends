import Vue from 'vue'
import singleSpaVue from 'single-spa-vue';
import App from './App.vue'
import store from './store'


Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
        el: '#appVue',
        render: h => h(App),
        store
}
});

export const bootstrap = [
    vueLifecycles.bootstrap,
];

export function mount(props) {
    createDomElement();
    return vueLifecycles.mount(props);
}

export const unmount = [
    vueLifecycles.unmount,
];

function createDomElement() {
    // Make sure there is a div for us to render into
    let el = document.getElementById('appVue');

    if (!el) {
        el = document.createElement('div');
        el.id = 'appVue';
        document.body.appendChild(el);
    }
    return el;
}
