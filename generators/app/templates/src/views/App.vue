<script>
import AppHeader from "../components/AppHeader.vue";
import AppSidebar from "../components/AppSidebar.vue";
import AppContent from "../components/AppContent.vue";

  export default{
    props: {},
    data(){
      return {};
    },
    components:{
      'app-header': AppHeader,
      'app-sidebar': AppSidebar,
      'app-content': AppContent
    },
    computed:{},
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template>
  <div class="application">
    <app-header></app-header>
    <div class="app-body">
      <app-sidebar></app-sidebar>
      <app-content></app-content>
    </div>
  </div>
</template>
