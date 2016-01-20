# fis3-node-express4
基于fis3+nodev.0.12.8+express4 项目打包合并压缩css js以及服务端ejs中css js链接合并添加时间戳 md5演示DEMO

1-安装必要的fis3插件

	npm install -g fis3-postpackager-loader
	npm install -g fis3-postpackager-rosetta
	npm install -g fis3-hook-commonjs

2-服务端代码中的视图ejs文件中需要把css js路径指向真实目录!!!，请查看server/views/index.ejs中的路径

这里只是把express4中的服务端目录代表移到server目录下,修改了app.js,bin/www

3-cmd下执行 fis3 release -d ../dist
