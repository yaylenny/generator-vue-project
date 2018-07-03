<script>
  export default{
    props: {},
    data(){
      return {};
    },
    components:{},
    computed:{},
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template>
  <div class="app-content">
    <% if( useRouter ){ %>
      <router-view></router-view>
    <%}%>
  </div>
</template>
