// index.js
// 获取应用实例
import { request } from "../../request/index";
const app = getApp();

Page({
  date: {
    swiperList: [],
    cateList: [],
    floorList: [],
  },
  onLoad: function (options) {
    this.getSwiperList();
    this.getCate();
    this.getFloor();
  },
  // 获取轮播图数据
  getSwiperList() {
    request({
      url: "/home/swiperdata",
    }).then((res) => {
      res.data.message.forEach(
        (v) => (v.navigator_url = v.navigator_url.replace("main", "index"))
      );
      this.setData({
        swiperList: res.data.message,
      });
    });
  },
  // 分类导航
  getCate() {
    request({
      url: "/home/catitems",
    }).then((res) => {
      res.data.message.forEach((v) =>
        v.navigator_url
          ? (v.navigator_url = v.navigator_url.replace("main", "index"))
          : ""
      );
      this.setData({
        cateList: res.data.message,
      });
    });
  },
  // 分类导航
  getFloor() {
    request({
      url: "/home/floordata",
    }).then((res) => {
      res.data.message.forEach((v) =>
        v.product_list.forEach((item) => {
          item.navigator_url = item.navigator_url.replace(
            "goods_list",
            "goods_list/index"
          );
        })
      );
      this.setData({
        floorList: res.data.message,
      });
    });
  },
});
