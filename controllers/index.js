
/**
 * 自动导入所有controller文件并封装为一个controllers数组
 */
import fs from 'fs'

// 过滤index
const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js')

const controllers = {}

for (const file of files) {
  if (file.toLowerCase().endsWith('js')) {
    const controller = require(`./${file}`)
    controllers[`${file.replace(/\.js/, '')}`] = controller
  }
}

export default controllers
