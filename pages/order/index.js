// pages/order/index.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseList: ["全部", "待付款", "待发货", "退款退货"],
    activeIndex: 0,
    allList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { type } = options;
    this.setData({ activeIndex: type - 1 });
    this.getOrder(type);
  },
  getOrder(type) {
    let token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/index",
      });
      return;
    }
    let header = { Authorization: token };
    //先判断是否已经存在数据
    let { allList } = this.data;
    if (!allList[type]) {
      request({
        url: "/my/orders/all",
        header,
        data: {
          type,
        },
      }).then((res) => {
        allList[type] = res.data.message.orders;
        this.setData({ allList });
      });
    }
  },
  handleClick(e) {
    let { index } = e.target.dataset;
    this.setData({ activeIndex: index });
    this.getOrder(index + 1);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let { activeIndex } = this.data;
    this.getOrder(activeIndex + 1);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
