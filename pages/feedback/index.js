// pages/feedback/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseList: ["体验问题", "商品/商家投诉"],
    activeIndex: 0,
    imgs: [],
    value: "",
  },
  timer: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  handleClick(e) {
    let { index } = e.target.dataset;
    this.setData({ activeIndex: index });
  },
  chooseimg() {
    let { imgs } = this.data;
    wx.chooseImage({
      count: 3,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        // tempFilePath可以作为 img 标签的 src 属性显示图片
        const tempFilePaths = res.tempFilePaths;
        imgs = imgs.concat(tempFilePaths);
        this.setData({ imgs });
      },
    });
  },
  deleteImg(e) {
    let { imgs } = this.data;
    let index = imgs.findIndex((v) => v === e.detail.src);
    imgs.splice(index, 1);
    this.setData({ imgs });
  },
  textinput(e) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setData({
        value: e.detail.value,
      });
    }, 500);
  },
  submitinfo() {
    console.log(1);
    let { value, imgs } = this.data;
    if (!value.trim()) {
      wx.showToast({
        title: "输入不合法",
      });
      return;
    }
    wx.showLoading({
      title: "正在提交。",
    });
    if (imgs.length) {
      //无接口，暂时不写
      // imgs.forEach((v) => {
      //   wx.uploadFile({
      //     // 文件路径
      //     filePath: "filePath",
      //     // 上传的文件名
      //     name: "name",
      //     // 上传的服务器地址
      //     url: "url",
      //     formData: {},
      //     success: () => {
      //       wx.hideLoading({});
      //     },
      //     fail: () => {},
      //   });
      // });
      wx.hideLoading({});
    } else {
      wx.hideLoading({});
    }
    wx.navigateBack({
      delta: 1,
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
