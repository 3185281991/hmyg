// pages/goods_detail/index.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_id: "",
    detail: {},
    isLove: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id: options.goods_id,
    });
    this.getGoodsDetail();
  },
  getGoodsDetail() {
    request({
      url: "/goods/detail",
      data: { goods_id: this.data.goods_id },
    }).then((res) => {
      let obj = res.data.message;
      this.setData({
        detail: {
          goods_price: obj.goods_price,
          goods_name: obj.goods_name,
          pics: obj.pics,
          goods_introduce: obj.goods_introduce,
        },
      });
    });
  },
  scaleImg(e) {
    let { index } = e.target.dataset;
    let urls = this.data.detail.pics.map((v) => v.pics_mid);
    wx.previewImage({
      current: urls[index], // 当前显示图片的 http 链接
      urls, // 需要预览的图片 http 链接列表
    });
  },
  addShop() {
    //获取缓存中所有购物车信息
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex((v) => v.goods_id === this.data.goods_id);
    if (index === -1) {
      cart.push({
        goods_id: this.data.goods_id,
        num: 1,
        goods_img: this.data.detail.pics[0].pics_big,
        goods_name: this.data.detail.goods_name,
        goods_price: this.data.detail.goods_price,
        checked: true,
      });
    } else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
  },
  //立即支付
  startShop() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //缓存中读取是否收藏信息
    let collect = wx.getStorageSync("collect") || [];
    let isLove = collect.some((v) => v.goods_id === this.data.goods_id);
    this.setData({ isLove });
  },
  changeLove() {
    let { isLove, goods_id, detail } = this.data;
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex((V) => V.goods_id == goods_id);
    if (index > -1) {
      collect.splice(index, 1);
      isLove = false;
      wx.showToast({
        title: "取消收藏",
      });
    } else {
      let { goods_name, goods_price } = detail;
      let goods_img = detail.pics[0].pics_big;
      collect.push({ goods_name, goods_price, goods_img, goods_id });
      isLove = true;
      wx.showToast({
        title: "收藏成功",
      });
    }
    wx.setStorageSync("collect", collect);
    this.setData({ isLove });
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
