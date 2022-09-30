// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    num: 0,
    price: 0,
    allChecked: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  //获取收货地址
  chooseAddress() {
    //获取权限状态
    wx.getSetting({
      withSubscriptions: true,
      success: (res) => {
        wx.chooseAddress({
          success: (res) => {
            res.all =
              res.provinceName + res.cityName + res.countyName + res.detailInfo;
            wx.setStorageSync("address", res);
          },
        });
      },
    });
  },
  // 商品复选框改变
  checkboxChange(e) {
    let { id } = e.target.dataset;
    let { cart } = this.data;
    let index = cart.findIndex((v) => v.goods_id === id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  increNum(e) {
    let { index } = e.target.dataset;
    let { cart } = this.data;
    if (cart[index].num > 1) {
      cart[index].num--;
      this.setCart(cart);
    } else {
      wx.showModal({
        title: "提示",
        content: "确定删除商品吗？",
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1);
            this.setCart(cart);
            //同时将缓存中的也删除
          }
        },
      });
    }
  },
  addNum(e) {
    let { index } = e.target.dataset;
    let { cart } = this.data;
    cart[index].num++;
    this.setCart(cart);
  },
  checkAll() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach((item) => (item.checked = allChecked));
    this.setCart(cart);
  },
  //结算付费
  pay() {
    //收货地址
    let { address, num } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: "您还未选择收货地址",
      });
      return;
    }
    if (num === 0) {
      wx.showToast({
        title: "请选择商品",
      });
      return;
    }
    wx.navigateTo({
      url: "/pages/pay/index",
    });
    //是否选中了一个商品
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let address = wx.getStorageSync("address") || {};
    let cart = wx.getStorageSync("cart") || [];
    this.setData({ address });
    this.setCart(cart);
  },
  setCart(cart) {
    let num = 0;
    let price = 0;
    let allChecked = true;
    cart.forEach((item) => {
      if (item.checked) {
        num += item.num;
        price += item.num * item.goods_price;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length !== 0 ? allChecked : false;
    this.setData({ cart, num, price, allChecked });
    wx.setStorageSync("cart", cart);
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
