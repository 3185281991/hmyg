// pages/pay/index.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    address: {},
    num: 0,
    price: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let cart = wx.getStorageSync("cart") || [];
    let address = wx.getStorageSync("address") || {};
    cart = cart.filter((item) => item.checked === true);
    let price = cart.reduce((prev, cur) => prev + cur.goods_price * cur.num, 0);
    let num = cart.reduce((prev, cur) => prev + cur.num, 0);
    this.setData({ cart, address, num, price });
  },
  //微信支付
  async pay() {
    //先判断token
    let token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/index",
      });
      return;
    }
    //存在token
    let header = { Authorization: token };
    let order_price = this.data.price;
    let consignee_addr = this.data.address.all;
    let goods = [];
    let { cart } = this.data;
    cart.forEach((item) => {
      goods.push({
        goods_id: item.goods_id,
        goods_number: item.num,
        goods_price: item.goods_price,
      });
    });
    let res1 = await request({
      url: "/my/orders/create",
      header,
      data: {
        order_price,
        consignee_addr,
        goods,
      },
      method: "post",
    });
    let { order_number } = res1.data.message;
    let res2 = await request({
      url: "/my/orders/req_unifiedorder",
      header,
      method: "post",
      data: {
        order_number,
      },
    });
    let { pay } = res2.data.message;
    await wx.requestPayment({
      ...pay,
      success: () => {
        wx.showToast({
          title: "支付成功",
        });
        //删除支付完成的商品信息
        let newCart = wx.getStorageSync("cart");
        newCart = newCart.filter((item) => !item.checked);
        wx.setStorageSync("cart", newCart);
        wx.navigateTo({
          url: "/pages/order/index",
        });
      },
      fail: () => {
        wx.showToast({
          title: "支付失败",
        });
      },
    });
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
