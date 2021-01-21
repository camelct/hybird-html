export const initClipBoardJs = (type) => {
  var clipBoardObj = new ClipboardJS(type)
  clipBoardObj.on('success', function() {
    layer.msg('复制成功')
  })

  clipBoardObj.on('error', function() {
    layer.msg('复制失败')
  })

  return clipBoardObj;
}

export const listenBaseInit = () => {

}
