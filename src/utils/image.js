import html2canvas from 'html2canvas'
/**
 * @description 操作图片
 */
export const image = {
  /**
   * @description 压缩图片
   * @param {*} photo
   * @param {*} fileType
   */
  compressImage(photo, fileType) {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    let width = photo.width
    let height = photo.height

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(photo, 0, 0, width, height)

    const compressedBase64 = canvas.toDataURL(fileType, 0.2)
    canvas = ctx = null
    return compressedBase64
  },
  /**
   * @description 旋转图片（解决 IOS 拍照上传旋转问题） https://blog.csdn.net/linlzk/article/details/48652635
   * @param {*} photo
   * @param {*} fileType
   */
  rotateImage() { },
  /**
   * @description HTML 转为图片
   * @type {String} 图片结果类型
   * @param {Node} html 
   */
  async html2Image(html) {
    const canvas = await html2canvas(html)
    return canvas.toDataURL('image/jpg');
  }
}

