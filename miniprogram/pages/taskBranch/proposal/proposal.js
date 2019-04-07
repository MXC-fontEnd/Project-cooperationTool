const app = getApp();
const dataBase = require('../../../javascript/dataBase');

// miniprogram/pages/proposal/proposal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (app.globalData.openid) {
    //   this.setData({
    //     openid: app.globalData.openid
    //   })
    // }
  },

  // 上传提案
  formSubmit(e) {
    let data = e.detail.value;
    if(data.question === '' || data.programme === '' || data.type === ''){
      wx.showToast({
        title: '请填写完整！',
      })
      return;
    }
    data.userInfo = app.globalData.userInfo;

    dataBase.onAdd('proposals',data);

  },
  
})