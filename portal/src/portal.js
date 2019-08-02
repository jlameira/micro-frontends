import 'zone.js';
import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './helper'

async function init() {
    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];

    loadingPromises.push(loadApp('appReact', '/appReact', '/appReact/singleSpaEntry.js', '/appReact/store.js', globalEventDistributor));

    loadingPromises.push(loadApp('appAngular', '/appAngular', '/appAngular/singleSpaEntry.js', '/appAngular/store.js', globalEventDistributor));

    loadingPromises.push(loadApp('appVue', '/appVue', '/appVue/singleSpaEntry.js', '/appVue/store.js', globalEventDistributor));

    // wait until all stores are loaded and all apps are registered with singleSpa
    await Promise.all(loadingPromises);

    singleSpa.start();
}

init();

