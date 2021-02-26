const config = require('./conf.js');
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPages = 'pages'
const resolvePath = local => {
  return path.resolve(config.srcRoot, local)
}

const baseFilePlugin = {
  favicon: resolvePath(`static/favicon.ico`),
  inject: true,
  chunks: ['common'], //只包含 common 以及自己的那一个 chunk
  // minify: {
  //   html5: true,
  //   collapseWhitespace: true,
  //   preserveLineBreaks: false,
  //   minifyCSS: true,
  //   minifyJS: true,
  //   removeComments: false
  // }
}

const getHtmlWebPackArr = (root) => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const itera = (route) => {
    const filenames = fs.readdirSync(resolvePath(route));
    filenames.forEach((filename) => {
      const stats = fs.statSync(resolvePath(`${route}/${filename}`));
      if (stats.isFile()) {
        const extension = path.extname(filename);
        const name = filename.substring(0, filename.lastIndexOf(extension));

        const foldName = route.match(/pages[\\|\/](.+)/);
        let tempFoldName = '';
        if (foldName) {
          tempFoldName = foldName[0];
        }

        console.log('foldName', foldName);
        console.log('tempFoldName', tempFoldName);
        const oHtmlWebpackPluginTemp = new HtmlWebpackPlugin({
          filename: `${tempFoldName ? tempFoldName + '/' : ''}${name}.html`,
          template: resolvePath(`${route}/${name}.html`),
          ...baseFilePlugin,
          chunks: [...baseFilePlugin.chunks, name]
        })
        const jsRoute = route.replace(new RegExp(htmlPages), 'js')
        entry[name] = resolvePath(`${jsRoute}/${name}.js`);

        htmlWebpackPlugins.push(oHtmlWebpackPluginTemp);
      } else if (stats.isDirectory()) {
        itera(resolvePath(`${route}/${filename}`))
      }
    })
  }

  itera(root);

  // console.log('entry', JSON.stringify(entry, null, '  '));
  // console.log('htmlWebpackPlugins', JSON.stringify(htmlWebpackPlugins, null, '  '));

  return {
    entry,
    htmlWebpackPlugins
  }
}

const setMPA = () => {
  return getHtmlWebPackArr(htmlPages);
}

module.exports = {
  setMPA
}