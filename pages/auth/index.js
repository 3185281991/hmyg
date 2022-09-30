// pages/auth/index.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  getUserInfo(e) {
    let { encryptedData, iv, rawData, signature, userInfo } = e.detail;
    let code = null;
    wx.login({
      timeout: 1000,
      success: (res) => {
        //保存登录后的code
        code = res.code;
      },
    });
    let loginParams = { encryptedData, rawData, iv, signature, code };
    //获取临时token，
    request({
      url: "/users/wxlogin",
      method: "post",
      data: loginParams,
    }).then((res) => {
      // 这里的token好像获取不到，暂时使用其他
      wx.setStorageSync(
        "token",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      );
      wx.navigateBack({
        delta: 1,
      });
    });
  },
});
