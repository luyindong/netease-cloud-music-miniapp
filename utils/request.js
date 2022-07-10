import config from "./config"

export default (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
   let cookie =  wx.getStorageSync('cookie')
    wx.request({
      url: config.baseUrl + url,
      method,
      data:{...data,cookie},
      success: (res) => {
        resolve(res.data)
      },
      failed: (err) => {
        reject(err)
      }
    })
  })
}