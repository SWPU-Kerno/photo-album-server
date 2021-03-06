/**
 * 自行构建的本地存储对象
 */
class LocalStorage {
  loop() {
    setTimeout(() => {
      this.expiredCheck()
      if (this.map.size > 0) {
        this.loop()
      }
    }, 1000)
  }

  constructor() {
    this.map = new Map()
  }

  /**
   * 设置键
   * @param key 键
   * @param value 值
   * @param duration(s) 过期时间(默认-1不过期)
   */
  setItem(key, value, duration = -1) {
    if (this.map.size === 0) {
      this.loop()
    }
    this.map.set(key, { value, duration })
  }

  /**
   * 移除键
   */
  removeItem(key) {
    this.map.delete(key)
  }

  /**
   * 过期指定键
   */
  expireItem(key) {
    this.setItem(key, null, 0)
  }

  /**
   * 获取键值
   */
  getItem(key) {
    return this.map.get(key)
  }

  /**
   * 清除所有键值
   */
  clearItem() {
    this.map.clear()
  }

  /**
   * 过期检测
   */
  expiredCheck() {
    const keys = this.map.keys()
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      const value = this.getItem(key)
      if (value.duration === 0) {
        // 处理过期
        console.log(`处理过期-------${key}`)
        this.removeItem(key)
      } else {
        value.duration -=1
      }
    }
  }

  /**
   * 获取对象
   */
  static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage()
    }
    return LocalStorage.instance
  }
}

module.exports = LocalStorage.getInstance()
