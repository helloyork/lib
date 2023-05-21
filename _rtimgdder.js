// 创建一个iframe元素
var floatingWindow = document.createElement('iframe');
floatingWindow.src = 'about:blank'; // 设置iframe的初始URL
floatingWindow.style.cssText = 'position: fixed; top: 50px; left: 50px; width: 300px; height: 200px; border: none; background-color: white; z-index: 9999;';
// 添加悬浮窗到页面的body元素中
document.body.appendChild(floatingWindow);

// 在iframe加载完成后执行自定义的操作
floatingWindow.addEventListener('load', function() {
  // 在iframe中插入自定义内容
  var iframeContent = floatingWindow.contentDocument;
  iframeContent.open();
  iframeContent.write('<html><head><style>/* 在这里插入你的自定义CSS样式 */</style></head><body>这是一个悬浮窗</body></html>');
  iframeContent.close();
});
