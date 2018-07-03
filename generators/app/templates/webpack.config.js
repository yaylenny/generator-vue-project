
module.exports={
  entry: "./src",
  output:{
    // THIS DOES NOT OUPUT A LIBRARY BECAUSE IT IS A TOP LEVEL APPLICATION
    path: __dirname + '/dist',
    filename: '<%= name %>.js'
  },
  module:{
    loaders:[
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.scss$/, loaders: [ "style-loader", "css-loader", "sass-loader"] },
      { test: /\.vue$/, loader: 'vue-loader',
        options:{
          scss: 'style!css!sass'
        }
      },
      { test: /\.css$/, loaders: [ "style-loader", "css-loader"] }
    ]
  }
}
