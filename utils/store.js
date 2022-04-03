const stateModule = {
  state: {
    serverReady: false,
    sqlServerReady: false,
    tokenValidFail: false,
    PRIVATE_KEY: 'Your Key Here',
    EXPIRES_TIME: '12h'
  },
  mutations: {
    serverOnReady() {
      store.serverReady = true
      console.log("[MAIN]服务器开启完成")
    },
    SQLServerConnected() {
      store.sqlServerReady = true
      console.log("[MAIN]SQL服务器连接成功")
    },
    tokenFailStatus(flag) {
      store.tokenValidFail = flag
    }
  },
  /**
   * 提交对state内容修改，并执行一些方法
   * @param mutations 方法名
   * @param payload 有效载荷
   */
  commit(mutations, payload) { // commit暴露方法
    try {
      stateModule.mutations[mutations](payload)
    } catch (e) {
      console.log('[EWARN]' + mutations + '不是一个合法的mutation')
    }
  }
}

const store = stateModule.state // 避免对象内this问题

module.exports = stateModule
