//由于webpack是基于node构建的,在配置文件时,任何合法的node代码都是支持的
//1.导入路径模块
const path= require('path');
//导入在内存中生成html页面的插件
    //这个插件的两个作用:
        //1.自动在内存中根据指定页面生成了一个内存的页面
        //2.自动把打包好的main.js追加到页面
const htmlWebpackPlugin=require('html-webpack-plugin');


//2.通过node中的模块操作,向外暴露一个配置对象
module.exports ={
    //配置打包模式为开发模式
    mode: 'development',
    //配置入口路径:要打包的文件
    entry:path.join(__dirname,'./src/index.js'),
    //配置出口路径
    output:{
        path:path.join(__dirname,'./dist'),//指定输出的路径
        filename:'main.js'//指定输出文件的名字
    },
    //配置dev-server的参数 ---方法二:
    // devServer:{
    //     open:true,//自动打开浏览器
    //     port:3000,//设置端口号
    //     hot:true,//启用热更新
    // },

    //配置插件--->所有webpack的插件都配置在这里
    plugins:[
        //创建一个生成在内存中生成html的插件
        new htmlWebpackPlugin({
            //配置指定模板文件的路径
            template:path.join(__dirname,'./src/index.html'),
            //配置生成内存页面的名称
            filename:'index.html'
        })
    ],

    //配置第三方的loader模块
    module:{
        //第三方模块的匹配规则
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},//处理css文件的转化
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },//处理less文件的转化
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },//处理sass文件的转化



            { test: /\.(png|jpg|gif|jpeg)$/, use: 'url-loader?limit=600&name=[hash:8][name].[ext]' },//处理css中的路径,
            // ↑ base64格式的图片能减少二次请求,只有小图片才能转 ,,
            // 设置图片大小的限制 传参 ?limit=图片的大小字节  ,
            // 当图片字节大于设置的字节,会转hash值, 当图片小于设置的字节,会转base64编码格式的图片
            //如果想用自己图片的命名,加第二个参数,&name=[name].[ext]
            //为了防止图片重名被覆盖,再加一个hash值&name=[hash:8][name].[ext]
            //hash值相当于身份证,不存在相同的 最多是32位


            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:"url-loader"},//处理bootstrap字体图标

            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },//配置bable来转换高级的js语法
            // ↑ 注意①:在配置时,必须要把node_modules目录排除在外
                //原因:不排除的话,babel会吧node_modules所有的js文件,全部都打包编译,会非常消耗电脑的cpu,同事打包速度非常慢,就算不排除,也会报错,导致无法运行
            //注意②:在项目的根目录中,新建 .babelrc文件,这个文件相当于json文件,配置相关的babel参数

            { test: /\.vue$/, use: 'vue-loader' },//处理vue的文件
        ]
    },

    //配置修改路径
    resolve:{
        //修改vue被导入时的路径
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    }

}