const app = getApp();
const dataBase = require('../../../javascript/dataBase');

Page({
  data: {
    proposals:null
  },
  onLoad: function () {
    let that = this;
    dataBase.onQueryOrderBy('proposals', 'supportStaff','desc',function(res){
      console.log('数据加载成功');
      // 关于点赞的独白
      let proposals = res.data;
      console.log(proposals);

      // // 根据点赞集合是否含有该用户的openid,初始化页面状态
      // for (let x = 0; x < proposals.length; x++) {
      //   if(proposals[x].supportStaff) {
      //     let supportStaff = proposals[x].supportStaff;
      //     for (let y = 0; y < supportStaff.length; y++) {
      //       if(app.globalData.openid === supportStaff[y]){
      //         proposals[x].supportState = true;
      //       }
      //     }
      //   } else {
      //     proposals[x].supportState = false;
      //   }
      // }

      // 页面渲染
      that.setData({
        proposals: proposals
      })
    })
  },

  support(e){
    let index = e.currentTarget.dataset.id;
    let curProposal = this.data.proposals[index];
    let id = curProposal._id;
    console.log(curProposal);
    // if (!supportState){
    //   let curProposal = this.data.proposals[index];
    //   curProposal.supportState = true;

    //   let supportStaff = [];
    //   if (curProposal.supportStaff){
    //     curProposal.supportStaff.push(app.globalData.openid);
    //     supportStaff = curProposal.supportStaff;
    //   } else {
    //     supportStaff.push(app.globalData.openid);
    //     curProposal.supportStaff = supportStaff;
    //   }

    //   this.setData({
    //     proposals: this.data.proposals
    //   })

      // 存储点赞者openid
      // let data = {
      //   supportStaff: supportStaff
      // }

      // dataBase.onUpdate('proposals', curProposal._id, data,function(res){
      //   console.log('proposal数据更新成功！');
      // });
    dataBase.onAdd('supports', { id: id}, function (res) {
        console.log('点赞添加成功！');
      });

  },

  onPullDownRefresh() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    console.log('onPullDownRefresh', new Date())
  },

  stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete(res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  }

});