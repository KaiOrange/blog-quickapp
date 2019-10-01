/**
 * 显示菜单
 */
function showMenu() {
  const prompt = require('@system.prompt')
  const router = require('@system.router')
  const appInfo = require('@system.app').getInfo()
  const Constant = require('./Common/Constant')

  prompt.showContextMenu({
    itemList: ['首页', '标签', '分类', '归档', '关于', '取消'],
    success: function(ret) {
      let url = null
      let baseUrl = Constant.HOST
      switch (ret.index) {
      case 0:
        // 首页
        router.clear()
        router.replace({
          uri: '/'
        })
        break
      case 1:
        // 标签
        url = '/tags/'
        break
      case 2:
        // 分类
        url = '/categories/'
        break
      case 3:
        // 归档
        url = '/archives/'
        break
      case 4:
        // 关于
        router.push({
          uri: '/About',
          params: {
            name: appInfo.name,
            icon: appInfo.icon
          }
        })
        break
      case 5:
        // 取消
        break
      default:
        prompt.showToast({
          message: 'error'
        })
      }

      if (url) {
        router.push({
          uri: '/Webview',
          params: {
            url: baseUrl + url
          }
        })
      }
    }
  })
}

/**
 * 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut() {
  const prompt = require('@system.prompt')
  const shortcut = require('@system.shortcut')
  shortcut.hasInstalled({
    success: function(ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        })
      } else {
        shortcut.install({
          success: function() {
            prompt.showToast({
              message: '成功创建桌面图标'
            })
          },
          fail: function(errmsg, errcode) {
            prompt.showToast({
              message: `${errcode}: ${errmsg}`
            })
          }
        })
      }
    }
  })
}

function getRandomEmoji() {
  let emoji = [
    '😁',
    '🤣',
    '😂',
    '😄',
    '😅',
    '🐱',
    '🐭',
    '🐹',
    '🐰',
    '🐸',
    '🍏',
    '🍎',
    '🍐',
    '🍊',
    '🍌',
    '🍉',
    '🍇',
    '🍓',
    '🍒',
    '🍍',
    '🥝',
    '🥑',
    '🍅',
    '🍆',
    '🥒',
    '🥕',
    '🌶',
    '🥔',
    '🥐',
    '🍞',
    '🥖',
    '🧀',
    '🍖',
    '🍤',
    '🍔',
    '🍟',
    '🍕',
    '🍝',
    '🔯',
    '💕',
    '💗',
    '💘',
    '💘',
    '🧡',
    '🗯',
    '⚪',
    '️⚫️',
    '🔴',
    '🔵'
  ]
  return emoji[Math.floor(Math.random() * emoji.length)]
}

export default {
  showMenu,
  createShortcut,
  getRandomEmoji
}
