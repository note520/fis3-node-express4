/**
 * Created with WebStorm.
 * User: rico sky@note520.com
 * Date: 2016/01/18
 * Time: 9:47
 * */

var now = new Date();
var timeStamp = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()].join('');

fis.hook('commonjs');

fis.set('timeStamp', timeStamp);

//目录配置
var Config = {
    src: {
        root: "/public/",
        serverView:"/server/views/"
    },
    ignore: [
        '.git/**',
        '.svn/**',
        '*.bak',
        '.idea',
        '{*,**/*}.scss',
        '*.rb',
        '*.md',
        'bower_components/**',
        //'/node_modules/**',
        //'/server/{*,**/*}',
        'gulpfile.js',
        'fis-conf.js'
    ]
};
/******************排除某些文件**********************/
fis.set('project.ignore', Config.ignore);

fis.match('/server/{*,**/*}',{
    useMap:false,
    useHash: false,
    useCompile: false
});

fis.match('/node_modules/{*,**/*}', {
    useMap:false,
    useHash: false,
    useCompile: false
});

/******************静态资源处理**********************/
//加md5
fis.match(Config.src.root + '**.{js,css,png,otf,eot,svg,ttf,woff,woff2}', {
    useHash: true
});

//JS
fis.match(Config.src.root + '**.js', {
    query:'?=t'+fis.get('timeStamp'),
    optimizer: fis.plugin('uglify-js')
});

//CSS
fis.match(Config.src.root + '**.css', {
    query:'?=t'+fis.get('timeStamp'),
    useSprite: true,
    optimizer: fis.plugin('clean-css')
});

//png
fis.match(Config.src.root + '**.png', {
    optimizer: fis.plugin('png-compressor')
});

//ejs
fis.match(Config.src.serverView+'**.ejs', {
    isHtmlLike:true
});

//fis.match(Config.src.serverView+'*.ejs:js', {
//    query:'?=t'+fis.get('timeStamp'),
//    optimizer: fis.plugin('uglify-js'),
//    useHash: true
//});
//
//fis.match(Config.src.serverView+'*.ejs:css', {
//    query:'?=t'+fis.get('timeStamp'),
//    useSprite: true,
//    useHash: true,
//    optimizer: fis.plugin('clean-css')
//});

/******************打包阶段插件**********************/
fis.match('::packager', {
    spriter: fis.plugin('csssprites'),
    postpackager: fis.plugin('rosetta',{
        allInOne: {
            css:"./public/pkg/${filepath}_all.css",
            js:"./public/pkg/${filepath}_all.js"
        },
        processor: {
            '.html': 'html',
            '.ejs': 'html'
        }
    })
});

