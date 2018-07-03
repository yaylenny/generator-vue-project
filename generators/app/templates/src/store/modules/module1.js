
const state={
  items: []
};
const getters={
  items( state, getters, rootState, rootGetters ){
    return state.items.map( item=>{
      return Object.assign({}, item, {});
    })
  }
};

const actions={
  CREATE_ITEM({ commit, state }, payload ){
    return sync.create( kw, payload ).then( response=>{
      commit("ADD_ITEM", response.data );
      return response.data;
    })
  }
}

const mutations={
  ADD_ITEM( state, payload ){
    let arr=( Array.isArray( payload ) ? payload : [ payload ]).slice();
    state.items=state.items.map( item=>{
      let index=arr.findIndex( thing=>thing.id==item.id );
      if( index >= 0 ){
        item=arr[index];
        arr.splice( index, 1 );
      }
      return item;
    });
    if( arr.length ) state.items.push( ...arr );
  }
};

export default{ state, getters, actions, mutations };
