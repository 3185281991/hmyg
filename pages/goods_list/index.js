// pages/goods_list/index.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseList: ["综合", "销量", "价格"],
    activeIndex: 0,
    goods_list: [],
  },
  totalPage: 0,
  queryParams: {
    pagesize: 10,
    pagenum: 1,
    cid: "",
    query: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.queryParams.cid = options.cid || "";
    this.queryParams.query = options.query || "";
    this.getShopList();
  },
  handleClick(e) {
    let { index } = e.target.dataset;
    this.setData({ activeIndex: index });
  },
  getShopList() {
    request({
      url: "/goods/search",
      data: this.queryParams,
    }).then((res) => {
      this.totalPage = Math.ceil(
        res.data.message.total / this.queryParams.pagesize
      );
      this.setData({
        goods_list: [...this.data.goods_list, ...res.data.message.goods],
      });
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
  async onPullDownRefresh() {
    this.queryParams.pagenum = 1;
    this.setData({ goods_list: [] });
    await this.getShopList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触(底事件的处理函数
   */
  onReachBottom() {
    if (this.queryParams.pagenum < this.totalPage) {
      this.queryParams.pagenum++;
      this.getShopList();
    } else {
      wx.showToast({
        title: "暂无数据",
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
