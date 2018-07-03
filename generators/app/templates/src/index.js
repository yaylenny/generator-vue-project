import Vue from 'vue';
import App from './views/App.vue';

/* * *    SETUP VUE APPLICATION   * * */
const elementID="application";
const config={
  el: `#${elementID}`,
  render:h=>h( App )
};

<% if( useRouter ){ %>
/* * *    VUE ROUTER    * * */
import VueRouter from 'vue-router';
import routes from './router/routes.js';
Vue.use( VueRouter );
config.router=new VueRouter({ mode: 'hash', routes })
<% } %><% if( useStore ){ %>
/* * *    VUEX - STORE    * * */
import Vuex from "vuex";
import storeConfig from './store/store.js';
Vue.use( Vuex );
config.store=new Vuex.Store( storeConfig );
<% } %>
<% if( useMaterial ){ %>
// * * * VUE MATERIAL * * *
import VueMaterial from "vue-material";
Vue.use( VueMaterial );
import "vue-material/dist/vue-material.css";
<% } %>

/* * *      INSTANTIATE THE COMPONENT    * * */
new Vue( config );
