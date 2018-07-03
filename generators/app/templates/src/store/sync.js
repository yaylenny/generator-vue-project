import axios from "axios";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common['X-Requested-With']='XMLHttpRequest';
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.put['Content-Type']='application/json';

function _u( kw, id ){
  id=id ? `${id}/` : '';
  return `/${kw}/${id}`;
}

function ajax( kw, method, id, data ){
  let url=_u( kw, id );
  let config={ method, url, contentType: "application/json" };
  if( data ) config.data=JSON.stringify( data );
  return axios( config );
}
export default{
  init(){
    return axios({
      method: "get",
      url: location.href
    })
  },
  create( kw, data ){
    return ajax( kw, "post", undefined, data );
  },
  destroy( kw, id ){
    return ajax( kw, "delete", id );
  },
  fetch( kw, id ){
    return ajax( kw, "get", id );
  },
  update( kw, data ){
    return ajax( kw, "put", data.id, data );
  }
}
