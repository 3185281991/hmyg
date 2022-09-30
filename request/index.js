// 同时发送多个异步请求loading处理
let num = 0;
export const request = (params) => {
  let baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  num++;
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        num--;
        if (num === 0) {
          wx.hideLoading();
        }
      },
    });
  });
};
