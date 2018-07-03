var path = require('path')
var Generator = require('yeoman-generator')
function promise( fn, str ){
  return new Promise(( resolve, reject )=>{
    resolve( fn( str ));
  })
}
function unspace( str="" ){
  return str.replace(/ /g, '');
}
function lower( w="" ){
  return w.toLowerCase();
}
function slugify( str="" ){
  if( !str.includes(' ')) return lower( str );
  return str.split(' ').map( lower ).join('-');
}
function capitalize( str="", forcelower ){
  let start=str[0].toUpperCase();
  let end=str.slice(1);
  if( forcelower ) end=lower( end );
  return start+end;
}
function unslug( str="" ){
  str=str.replace(/ /g, '');
  if( str.includes('-')){
    return str.split('-').map( s=>capitalize( s, true )).join('');
  }
  return str;
}

const vueTechnologies=[
  { name: 'Vuex - State Management', value: 'useStore' },
  { name: 'Vue Router', value: 'useRouter' },
  { name: 'Vue Material', value: 'useMaterial' }
];
class Base extends Generator{
  constructor( args, opt ){
    super( args, opt );
    this.props={};
  }
  copyTpl( tpl, dest ){
    this.fs.copyTpl(
      this.templatePath(tpl),
      this.destinationPath( dest || tpl ),
      this.props
    );
  }
}
module.exports=class extends Base{
  prompting(){
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "Name of this project - USE DASHES. This is the name used in package.json as well as the name of the packed javascript file",
        filter:str=>promise( slugify, str ),
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description of this project. This goes into package.json -->'
      },
      {
        type: 'checkbox',
        name: 'techs',
        message: 'Which Vue technologies do you want to include?',
        choices: vueTechnologies
      }//,
      // {
      //   type: 'confirm',
      //   name: 'useRouter',
      //   default: true,
      //   message: 'Use Vue Router?'
      // },
      // {
      //   type: 'confirm',
      //   name: 'useStore',
      //   default: true,
      //   message: 'Use Vuex?'
      // },
      // {
      //   type: 'confirm',
      //   name: 'useMaterial',
      //   default: true,
      //   message: 'Use Vue Material?'
      // },
    ]).then( props=>{
      this.props=Object.assign( {}, this.props, props );
      vueTechnologies.forEach( o=>{
        this.props[ o.value ]=this.props.techs.indexOf( o.value )>= 0;
      })
      for( let k in this.props ){
        this.log( k,':', this.props[k]);
      }
    });
  }
  writing(){
    this.copyTpl( '_package.json', 'package.json' );
    this.copyTpl( 'webpack.config.js', 'webpack.config.js' );
    this.copyTpl( 'babelrc', '.babelrc' );
    this.copyTpl( 'src/index.js' );
    this.copyTpl( 'src/views/App.vue' );
    this.copyTpl( 'src/components/AppHeader.vue' );
    this.copyTpl( 'src/components/AppSidebar.vue' );
    this.copyTpl( 'src/components/AppContent.vue' );
    if( this.props.useStore ){
      this.copyTpl( 'src/store/store.js' );
      this.copyTpl( 'src/store/sync.js' );
      this.copyTpl( 'src/store/modules/item.js' );
    }
    if( this.props.useRouter ){
      this.copyTpl( 'src/router/routes.js' );
    }


  }
  installing(){
    // this.installDependencies();
  }
}
