
function onAdd(collection,data){

  const db = wx.cloud.database()
  db.collection(collection).add({
    data: data,
    success: res => {
      // 在返回结果中会包含新创建的记录的 _id
      wx.showToast({
        title: '新增记录成功',
      })
      console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '新增记录失败'
      })
      console.error('[数据库] [新增记录] 失败：', err)
    }
  })

}

function onQuery(collection,callback) {
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  db.collection(collection).get({
    success: res => {
      if (callback){
        callback(res);
      }
      // console.log('[数据库] [查询记录] 成功: ', res)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err)
    }
  })
}

function onQueryWhere(collection,data, callback) {
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  db.collection(collection).where(data).get({
    success: res => {
      if (callback) {
        callback(res);
      }
      // console.log('[数据库] [查询记录] 成功: ', res)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err)
    }
  })
}

function onQueryOrderBy(collection, fieldName,order, callback) {
  const db = wx.cloud.database()
  db.collection(collection).orderBy(fieldName, order).get({
    success: res => {
      if (callback) {
        callback(res);
      }
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err)
    }
  })
}

function onUpdate(collection,id,data,callback) {
  const db = wx.cloud.database()

  console.log(id);
  db.collection(collection).doc(id).update({
    data: data,
    success: res => {
      if (callback){
        callback(res);
      }
    },
    fail: err => {
      icon: 'none',
      console.error('[数据库] [更新记录] 失败：', err)
    }
  })
}

module.exports = {
  onAdd,
  onQuery,
  onQueryWhere,
  onUpdate,
  onQueryOrderBy
}
