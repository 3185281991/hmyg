// pages/login/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  getUserInfo(e) {
    let { userInfo } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1,
    });
  },
});
