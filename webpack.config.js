//使用commonJS模块化语法向外暴露一个配置对象

const path = require('path') //node内置
//__dirname:全局变量，当前文件的全局路径
const HtmlWebpackPlugin = require('html-webpack-plugin') //构造函数

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports ={
    //模式
    //mode:'development',
    //入口
    entry: './src/index.js',
    //出口
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    //模块加载器
    module:{
        rules: [//内部配置loader
            {//处理ES6
                test: /\.m?js$/,  //处理js文件
                exclude: /node_modules/, //排除匹配文件夹
                include: [path.resolve(__dirname,'src')], //只对匹配的文件夹进行处理
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }] //配置预设包
                    ]
                  }
                }
            },

            //处理CSS
            {
                test:/\.css$/,
                // css-loader：将css打包到js中，
                //style-loader：将js中css转移到html的<style>
                use: ['style-loader', 'css-loader'] //loader处理从下向上，从右向左
            },
            //处理图片
            {
                
            }
        ]
    },
    //插件
    plugins:[//插件实例对象
        new HtmlWebpackPlugin({ //打包文件插件
            template:'index.html' //在执行命令所在目录下查找
        }),
        new CleanWebpackPlugin(), //清除打包文件夹dist
    ]
}