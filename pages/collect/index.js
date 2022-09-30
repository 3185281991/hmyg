// pages/collect/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseList: ["商品收藏", "品牌收藏", "店铺收藏", "浏览足迹"],
    activeIndex: 0,
    collect: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { type } = options;
    this.setData({ activeIndex: type - 1 });
  },

  handleClick(e) {
    let { index } = e.target.dataset;
    this.setData({ activeIndex: index });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let collect = wx.getStorageSync("collect") || [];
    this.setData({ collect });
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
