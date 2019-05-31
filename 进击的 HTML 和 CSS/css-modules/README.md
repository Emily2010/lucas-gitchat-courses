- Step 1：创建项目，

```
npm init --y
```

此时生成 package.json 如下：

```
{
  "name": "css-modules",
  "version": "1.0.0",
  "description": "README.md",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```


- Step 2：创建必要文件

```
mkdir src
touch index.html
```
在 ./src 文件夹中，创建：index.js：

```
import bluestyle from './style.css';
import greenstyle from './app.css';

let html = `
<h2 class="${bluestyle.my_css_selector}">I should be displayed in blue.</h2>
<br/>
<h2 class="${greenstyle.my_css_selector}">I should be displayed in green.</h2> 
`;
document.write(html);
```

以及 style.css：

```
.my_css_selector {
	color: blue;
}
```

和 app.css：

```
.my_css_selector {
	color: green;
}
```

在这两个样式文件中，我们使用了相同的 class 名。


- Step 3：安装依赖

接下来我们按照 webpack，webpack-cli，babel 全家桶（babel-core、babel-loader、abel-preset-env），和相应的 loaders：
css-loader，style-loader，以及 extract-text-webpack-plugin 插件。

这些依赖项具体是做什么的这里不再赘述，又不了解的读者可以自行 Google 学习。另外，强烈建议安装版本遵循：

```
"babel-core": "^6.26.3",
"babel-loader": "^7.1.4",
"babel-preset-env": "^1.6.1",
"css-loader": "^0.28.11",
"extract-text-webpack-plugin": "^4.0.0-beta.0",
"style-loader": "^0.21.0",
"webpack": "^4.1.0",
"webpack-cli": "^3.1.1"
```

否则会出现类似 webpack 版本和 extract-text-webpack-plugin 不兼容等依赖版本问题。

正常流程下来，我们 package.json 如下：

```
{
  "name": "css-modules",
  "version": "1.0.0",
  "description": "README.md",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-preset-env": "^1.6.1",
    "css-loader": "^0.28.11",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "style-loader": "^0.21.0",
    "webpack": "^4.1.0",
    "webpack-cli": "^3.1.1"
  }
}
```


- Step 4：编写 webpack 配置

创建 webpack 配置文件：

```
touch webpack.config.js
```

并编写：

```
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js/,
				loader: 'babel-loader',
				include: __dirname + '/src'
			},
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract("css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]")
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("styles.css")
	]
}

```

我们使用了 extract-text-webpack-plugin 插件，并定义入口为 ./src 目录，产出为 `__dirname + '/build'` 目录。对后缀名为 css 的文件使用 css-loader 解析，产出为 styles.css 文件并在 index.html 中使用。

注意我们看对于 css-loader，我们设置了 modules 参数，进行了 css modules 处理。




- Step 4：编写 npm script 并运行

还差一步，我们将 package.json 中的 script 命令改为：

```
"scripts": {
	"start": "webpack --mode development"
},
```

便是运行 webpack，此时 package.json 内容为：

```
{
  "name": "css-modules",
  "version": "1.0.0",
  "description": "README.md",
  "main": "index.js",
  "scripts": {
    "start": "webpack --mode development"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-preset-env": "^1.6.1",
    "css-loader": "^0.28.11",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "style-loader": "^0.21.0",
    "webpack": "^4.1.0",
    "webpack-cli": "^3.1.1"
  }
}
```

运行 `npm start`，得到产出，打开页面会发现：


如图，已经在编译过程中完成了 css module 处理。










