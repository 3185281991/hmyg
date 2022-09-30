// pages/category/index.js'
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftData: [],
    contentData: [],
    active: 0,
    position: 0,
  },
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 缓存判断
    let cate = wx.getStorageSync("cates");
    if (cate) {
      if (Date.now() - cate.time > 1000 * 60 * 5) {
        this.getCateList();
      } else {
        this.cates = cate.data;
        let leftData = this.cates.map((v) => v.cat_name);
        let rightData = this.cates[0].children;
        this.setData({ leftData, rightData, contentData: rightData });
      }
    } else {
      this.getCateList();
    }
  },

  getCateList() {
    request({ url: "/categories" }).then((res) => {
      this.cates = res.data.message;
      wx.setStorageSync("cates", { time: Date.now(), data: this.cates });
      let leftData = this.cates.map((v) => v.cat_name);
      let rightData = this.cates[0].children;
      this.setData({ leftData, rightData, contentData: rightData });
    });
  },
  handleClick(e) {
    let index = e.target.dataset.index;
    this.setData({
      active: index,
      contentData: this.cates[index].children,
      position: 0,
    });
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
