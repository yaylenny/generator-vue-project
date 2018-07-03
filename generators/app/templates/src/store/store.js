// IMPORT MODULES
import item from "./modules/item.js";
import sync from "./sync.js";

const state={
  user:{
    name: '',
    id: 0
  }
};
const modules={
  item
};

const getters={
  username:state=>state.user.name,
  userid:state=>state.user.id
};

const actions={
  init({ commit }){
    return sync.init().then( response=>{
      let { user, items }=response.data;
      commit("SET_USER", user );
      commit("SET_ITEMS", items );
      return response;
    });
  }
}

const mutations={
  SET_USER( state, user ){
    state.user=user;
  }
};

export default{ state, modules, getters, actions, mutations };
