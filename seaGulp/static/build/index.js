$(function(){
	console.log('header');
});
define('index',['base'],function (require, exports, module) {
	require('base');

    console.log('index');
})
