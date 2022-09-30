// pages/search/index.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: false,
    query: [],
    value: "",
  },
  timer: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  query(query) {
    request({
      url: "/goods/qsearch",
      data: { query },
    }).then((res) => {
      this.setData({ query: res.data.message });
    });
  },
  handleInput(e) {
    let { value } = e.detail;
    if (!value.trim()) {
      this.setData({
        query: [],
        active: true,
      });
      return;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.query(value);
    }, 1000);
  },
  inputfoucs() {
    this.setData({ active: true });
  },
  closepropt() {
    this.setData({ active: false, value: "", query: [] });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
