const wxRequest = (url, data = {}, method = 'GET') => 
  new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        // 通用化 header 设置
      },
      success: function (res) {
        const code = res.statusCode
        if (code !== 200) {
          reject({ error: 'request fail', code })
          return
        }
        resolve(res.data)
      },
      fail: function (res) {
        reject({ error: 'request fail'})
      },
    })
  })

const promisify = fn => args => 
  new Promise((resolve, reject) => {
    args.success = function(res) {
      return resolve(res)
    }
    args.fail = function(res) {
      return reject(res)
    }
  })


function Promise(executor) {

}


wxRequest('./userInfo')
  .then(
    data => wxRequest(`./${data.id}/friendList`),
    error => {
      console.log(error)
    }
  )
  .then(
    data => {
      console.log(data)
    },
    error => {
      console.log(error)
    }
  )


let promise1 = new Promise((resolve, reject) => {
  resolve('data')
})

promise1.then(data => {
  console.log(data)
})

let promise2 = new Promise((resolve, reject) => {
  reject('error')
})

promise2.then(data => {
  console.log(data)
}, error => {
  console.log(error)
})



function Promise(executor) {
  this.status = 'pending'
  this.value = null
  this.reason = null

  const self = this

  const resolve = value => {
    self.value = value
  }

  const reject = reason => {
    self.reason = reason
  }

  executor(resolve, reject)
}

Promise.prototype.then = function(onfulfilled = Function.prototype, onrejected = Function.prototype) {
  onfulfilled(this.value)

  onrejected(this.reason)
}


function Promise(executor) {
  this.status = 'pending'
  this.value = null
  this.reason = null

  const self = this

  function resolve(value) {
    self.value = value
  }

  function reject(reason) {
    self.reason = reason
  }

  executor(resolve, reject)
}

Promise.prototype.then = function(onfulfilled = Function.prototype, onrejected = Function.prototype) {
  onfulfilled(this.value)

  onrejected(this.reason)
}


function Promise(executor) {
  this.status = 'pending'
  this.value = null
  this.reason = null

  const self = this

  function resolve(value) {
    self.value = value
  }

  function reject(reason) {
    self.reason = reason
  }

  executor(resolve, reject)
}

Promise.prototype.then = function(onfulfilled = Function.prototype, onrejected = Function.prototype) {
  onfulfilled(this.value)

  onrejected(this.reason)
}








function Promise(executor) {
  this.status = 'pending'
  this.value = null
  this.reason = null
  this.onFulfilledArray = []
  this.onRejectedArray = []

  const resolve = value => {
    if (this.status === 'pending') {
      this.value = value
      this.status = 'fulfilled'

      this.onFulfilledArray.forEach(func => {
        func(this.value)
      })
    }
  }

  const reject = reason => {
    if (this.status === 'pending') {
      this.reason = reason
      this.status = 'rejected'
      this.onRejectedArray.forEach(func => {
        func(this.reason)
      })
    }
  }

  setTimeout(() => {
    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  })
  
}

Promise.prototype.then = function(onfulfilled = Function.prototype, onrejected = Function.prototype) {
  if (this.status === 'pending') {
    this.onFulfilledArray.push(onfulfilled)
    this.onRejectedArray.push(onrejected)
  }
}


let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('data')
  }, 2000)
})

promise.then(data => {
  console.log(data)
}, error => {
  console.log('got error from promise', error)
})





function Promise(executor) {
  this.status = 'pending'
  this.value = null
  this.reason = null
  this.onFulfilledArray = []
  this.onRejectedArray = []

  const resolve = value => {
    if (this.status === 'pending') {
      this.value = value
      this.status = 'fulfilled'

      this.onFulfilledArray.forEach(func => {
        func(this.value)
      })
    }
  }

  const reject = reason => {
    if (this.status === 'pending') {
      this.reason = reason
      this.status = 'rejected'

      this.onRejectedArray.forEach(func => {
        func(this.reason)
      })
    }
  }

  setTimeout(() => {
    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  })
}

Promise.prototype.then = function(onfulfilled = Function.prototype, onrejected = Function.prototype) {
  if (this.status === 'pending') {
    this.onFulfilledArray.push(onfulfilled)
    this.onRejectedArray.push(onrejected)
  }
}
