//	https://juejin.im/post/5c244b33e51d45593b4bbd3d
//	https://www.404forest.com/2017/07/18/how-javascript-actually-works-eventloop-and-uirendering/

var outer = document.querySelector('.outer')
var inner = document.querySelector('.inner')

function onClick() {
  console.log('click')

  setTimeout(function() {
    console.log('timeout')
  }, 0)

  Promise.resolve().then(function() {
    console.log('promise')
  })
}

inner.addEventListener('click', onClick)
outer.addEventListener('click', onClick)

//	inner.click()


// https://juejin.im/post/5ad3fa47518825619d4d3a11#heading-9

const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
});
promise.then(() => {
    console.log(3);
});
console.log(4);

// 输出结果为：1，2，4，3。

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
    reject('error')
  }, 1000)
})
promise.then((res)=>{
  console.log(res)
},(err)=>{
  console.log(err)
})

// 　输出结果：success


Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
// 1



async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')

//	https://segmentfault.com/a/1190000015057278
// https://mp.weixin.qq.com/s/2fnJADWMneTg6Zxl_oVahA
// https://juejin.im/post/5c0397186fb9a049b5068e54#heading-7
// https://juejin.im/post/5c394da4518825253661bd4d
// https://juejin.im/post/5c8a024d51882546be0a3082
// https://juejin.im/post/5cbc0a9cf265da03b11f3505#heading-18
//	https://juejin.im/post/5c0397186fb9a049b5068e54#heading-5
// https://juejin.im/post/5cbc0a9cf265da03b11f3505#heading-12



const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });

}));

first().then((arg) => {
    console.log(arg);
});
console.log(4);


console.log('start here')

const foo = () => (new Promise((resolve, reject) => {
	console.log('first promise constructor')

	let promise1 = new Promise((resolve, reject) => {
	    console.log('second promise constructor')

	    setTimeout(() => {
	        console.log('setTimeout here')
	        resolve()
	    }, 0)

	    resolve('promise1')
	})

	resolve('promise0')

	promise1.then(arg => {
	    console.log(arg)
	})
}))

foo().then(arg => {
    console.log(arg)
})

console.log('end here')

// 3
// 7
// 4
// 1
// 2
// 5 

// https://juejin.im/post/5bd697cfe51d454c791cd1d5#heading-16?add=add




async function async1() {
    console.log(1)
    await async2()
    console.log(2)
    return await 3
}
async function async2() {
    console.log(4)
}

setTimeout(function() {
    console.log(5)
}, 0)

async1().then(v => console.log(v))
new Promise(function(resolve) {
    console.log(6)
    resolve();
    console.log(7)
}).then(function() {
    console.log(8)
})
console.log(9)

// https://juejin.im/post/5c1b95fcf265da6158771dda?add=add



let resolvePromise = new Promise(resolve => {
  let resolvedPromise = Promise.resolve()
  resolve(resolvedPromise)
})
resolvePromise.then(() => {
  console.log('resolvePromise resolved')
})
let resolvedPromiseThen = Promise.resolve().then(res => {
  console.log('promise1')
})
resolvedPromiseThen
  .then(() => {
    console.log('promise2')
  })
  .then(() => {
    console.log('promise3')
  })

// https://juejin.im/post/5c8a024d51882546be0a3082


var a = async function () {
    await Promise.resolve().then(() => console.log(111));
    console.log(222)
}
a().then(() => console.log(333))

var b = async function () {
    await setTimeout(() => console.log('aaa'), 0);
    console.log('bbb')
}
b().then(() => console.log('ccc'))

var c = async function () {
    await console.log('A');
    console.log('B')
}
c().then(() => console.log('C'))


async function asyncFun1 () {
    await Promise.resolve().then(() => console.log('await asyncFun1'))
    console.log('asyncFun1 end')
}

asyncFun1().then(() => console.log('asyncFun1 promise resolved'))

async function asyncFun2 () {
    await setTimeout(() => console.log('await asyncFun2'), 0)
    console.log('asyncFun2 end')
}

asyncFun2().then(() => console.log('asyncFun2 promise resolved'))

async function asyncFun3 () {
    await console.log('await asyncFun3')
    console.log('asyncFun3 end')
}
asyncFun3().then(() => console.log('asyncFun3 promise resolved'))

// https://juejin.im/post/5c48380f5188252533160295

const p1 = new Promise((resolve, reject) => {
  console.log('promise1'); // 1
  resolve();
})
  .then(() => {
    console.log('then11'); // 2
    return new Promise((resolve, reject) => {
      console.log('promise2'); // 3
      resolve();
    })
      .then(() => {
        console.log('then21'); // 4
      })
      .then(() => {
        console.log('then23'); // 5
      });
  })
  .then(() => {
    console.log('then12'); //6
  });

// https://juejin.im/post/5cbc0a9cf265da03b11f3505#heading-18

console.log('start here')

new Promise((resolve, reject) => {
  console.log('first promise')
  resolve()
})
  .then(() => {
    console.log('first promise then')
    return new Promise((resolve, reject) => {
      console.log('second promise')
      resolve()
    })
      .then(() => {
        console.log('second promise then')
      })
  })
  .then(() => {
    console.log('another first promise then')
  });

console.log('end here')


new Promise(resolve => {
    resolve(1);
    Promise.resolve().then(() => console.log(2));
    console.log(4);
}).then(t => console.log(t));
console.log(3);

// https://juejin.im/post/5cc64a71e51d456e51614b2f#heading-4


setTimeout(() => {
	console.log('setTimeout block')
}, 100)

while (true) {

}

console.log('end here')


const t1 = new Date()
setTimeout(() => {
	const t3 = new Date()
	console.log('setTimeout block')
	console.log('t3 - t1 =', t3 - t1)
}, 100)


let t2 = new Date()
while (t2 - t1 < 200) {
	t2 = new Date()
}

console.log('end here')

// end here
// setTimeout block
// t3 - t1 = 200


const t1 = new Date()

setTimeout(() => {
	console.log('here 200')
}, 200)

setTimeout(() => {
	console.log('here 2')
}, 2)


let t2 = new Date()
while (t2 - t1 < 200) {
	t2 = new Date()
}

console.log('end here')




console.log('start here')

setTimeout(() => {
	console.log('setTimeout')
}, 0)

new Promise((resolve, reject) => {
	resolve('promise result')
}).then(value => {console.log(value)})

console.log('end here')



// https://juejin.im/post/5c9a43175188252d876e5903#heading-3
// https://juejin.im/post/5ca205f451882543e85f068f?add=add
// https://juejin.im/post/5bd697cfe51d454c791cd1d5#heading-16












function red() {
    console.log('red')
}
function green() {
    console.log('green')
}
function yellow() {
    console.log('yellow')
}

var light = function (timmer, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            cb()
            resolve()
        }, timmer)
    })
}

var step = function () {
    Promise.resolve().then(function () {
        return light(3000, red)
    }).then(function () {
        return light(2000, green)
    }).then(function () {
        return light(1000, yellow)
    }).then(function () {
        step()
    })
}

step()





const target = document.querySelectorAll('#man')[0]
target.style.cssText = `
	position: absolute;
	left: 0px;
	top: 0px
`

const walk = (direction, distance, callback) => {
	setTimeout(() => {
		let currentLeft = parseInt(target.style.left, 10)
		let currentTop = parseInt(target.style.top, 10)

		const shouldFinish = (direction === 'left' && currentLeft === -distance) || (direction === 'top' && currentTop === -distance)

		if (shouldFinish) {
			// 任务之行结束，执行下一个回调
			callback && callback()
		}
		else {
			if (direction === 'left') {
				currentLeft--
				target.style.left = `${currentLeft}px`
			}
			else if (direction === 'top') {
				currentTop--
				target.style.top = `${currentTop}px`
			}

			walk(direction, distance, callback)
		}
	}, 20)
}

walk('left', 20, () => {
	walk('top', 50, () => {
		walk('left', 30, Function.prototype)
	})
})



const target = document.querySelectorAll('#man')[0]
target.style.cssText = `
	position: absolute;
	left: 0px;
	top: 0px
`

const walk = (direction, distance) => 
	new Promise((resolve, reject) => {
		const innerWalk = () => {
			setTimeout(() => {
				let currentLeft = parseInt(target.style.left, 10)
				let currentTop = parseInt(target.style.top, 10)

				const shouldFinish = (direction === 'left' && currentLeft === -distance) || (direction === 'top' && currentTop === -distance)

				if (shouldFinish) {
					// 任务之行结束
					resolve()
				}
				else {
					if (direction === 'left') {
						currentLeft--
						target.style.left = `${currentLeft}px`
					}
					else if (direction === 'top') {
						currentTop--
						target.style.top = `${currentTop}px`
					}

					innerWalk()
				}
			}, 20)
		}
		innerWalk()
	})

walk('left', 20)
	.then(() => walk('top', 50))
	.then(() => walk('left', 30))



function *taskGenerator() {
	yield walk('left', 20)
	yield walk('top', 50)
	yield walk('left', 30)
}
const gen = taskGenerator()

gen.next()
gen.next()
gen.next()



const task = async function () {
    await walk('left', 20)
	await walk('top', 50)
	await walk('left', 30)
} 

task()



const red = () => {
    console.log('red')
}
const green = () => {
    console.log('green')
}
const yellow = () => {
    console.log('yellow')
}

const task = (timer, light, callback) => {
	setTimeout(() => {
		if (light === 'red') {
			red()
		}
		else if (light === 'green') {
			green()
		}
		else if (light === 'yellow') {
			yellow()
		}
	    callback()
	}, timer)
}

const step = () => {
	task(3000, 'red', () => {
		task(2000, 'green', () => {
			task(1000, 'yellow', step)
		})
	})
}

step()


const red = () => {
    console.log('red')
}
const green = () => {
    console.log('green')
}
const yellow = () => {
    console.log('yellow')
}

const red = () => {
    console.log('red')
}
const green = () => {
    console.log('green')
}
const yellow = () => {
    console.log('yellow')
}


const task = (timer, light, callback) => 
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (light === 'red') {
				red()
			}
			else if (light === 'green') {
				green()
			}
			else if (light === 'yellow') {
				yellow()
			}
		    resolve()
		}, timer)
	})

const step = () => {
	task(3000, 'red')
		.then(() => task(2000, 'green'))
		.then(() => task(2100, 'yellow'))
		.then(step)
}

step()

const taskRunner =  async () => {
	await task(3000, 'red')
	await task(2000, 'green')
	await task(2100, 'yellow')
	taskRunner()
}


const gen = taskGenerator()

gen.next()
gen.next()
gen.next()






const loadImg = urlId => {
	const url = `https://www.image.com/${urlId}`

	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = url
		img.onerror = function() { 
			reject(urlId)
		}

		img.onload = function() { 
			resolve(urlId)
		}
	})
}

const loadImgOneByOne = async () => {
	for (i of urlIds) {
		await loadImg(urlIds[i])
	}
}

const urlIds = [1, 2, 3, 4, 5]

urlIds.reduce((prevPromise, urlId) => {
	return prevPromise
		.then(() => loadImg(urlId))
		.catch(error => {console.log(`error @ ${urlId}`)})
}, Promise.resolve())

const loadImgOneByOne = index => {
	const length = urlIds.length
	for (let i = 0;i < length; i++) {
		loadImg(urlIds[i]).then(() => {
			if (i === length - 1) {
				return 
			}
			else {
				loadImgOneByOne(i++)
			}
		})
	}
}


const promiseArray = urlIds.map(urlId => loadImg(urlId))

Promise.all(promiseArray)
	.then(() => {
		console.log('finish load all')
	})
	.catch(() => {
		console.log('promise all catch')
	})






const loadByLimit = (urlIds, loadImg, limit) => {
	const urlIdsCopy = [...urlIds]


	if (urlIdsCopy.length <= limit) {
		// 如果数组长度小于最大并发数，直接全部请求
		const promiseArray = urlIds.map(urlId => loadImg(urlId))
    	return Promise.all(promiseArray)
	}

	// 注意 splice 方法会改变 urlIdsCopy 数组
	const promiseArray = urlIdsCopy.splice(0, limit).map(urlId => loadImg(urlId)) 
	
	urlIdsCopy.reduce(
		(prevPromise, urlId) => {
			prevPromise
				.then(() => Promise.race(promiseArray))
				.catch(error => {console.log(error)})
				.then(resolvedId => {
					// 将 resolvedId 剔除出 promiseArray 数组
					let resolvedIdPostion = promiseArray.findIndex(id => resolvedId === id)
					promiseArray.splice(resolvedIdPostion, 1)

					// 从 urlIdsCopy 中补充一个 urlId promise 到 promiseArray 数组
					promiseArray.push(loadImg(urlId))
				})
		}, 
		Promise.resolve()
	)
	.then(() => Promise.all(promiseArray))
}


const fetchBooksInfo = bookIdList => {
	// ...
	return ([
		{
			123: {
				// ...
			}
		},
		{
			456: {
				// ...
			}
		},
		// ...
	])
}




// 储存将要请求的 id 数组
let bookIdListToFetch = []

// 储存每个 id 请求 promise 的 resolve 和 reject
// key 为 bookId，value 为 resolve 和 reject 方法
let promiseMap = {}

// 用于数组去重
const getUniqueArray = array => Array.from(new Set(array))

// 定时器 id
let timer

const getBooksInfo = bookId => new Promsie((resolve, reject) => {
	promiseMap[bookId] = promiseMap[bookId] || []
	promiseMap[bookId].push({
		resolve,
		reject
	})

	if (bookIdListToFetch.length === 0) {
		bookIdListToFetch.push(bookId)

		timer = setTimeout(() => {
			handleFetch(bookIdListToFetch, promiseMap)

			// 清空
			bookIdListToFetch = []
			promiseMap = {}
		}, 100)
	}
	else {
		bookIdListToFetch.push(bookId)

		bookIdListToFetch = getUniqueArray(bookIdListToFetch)

		if (bookIdListToFetch.length >= 100) {
			clearTimeout(timer)

			handleFetch(bookIdListToFetch, promiseMap)

			// 清空
			bookIdListToFetch = []
			promiseMap = {}
		}
	}
})

const handleFetch = (list, map) => {
	fetchBooksInfo(list).then(resultArray => {
		// 处理存在的 bookId
		resultArray.forEach(id => promiseMap[id].forEach(item => {
			item.resolve(data)
		}))

		// 处理失败没拿到的 bookId
		const resultIdArray = resultArray.map(item => item.id)
		let rejectIdArray
		bookIdListToFetch.forEach(id => {
			if (!resultIdArray.includes(id)) {
				rejectIdArray.push(id)
			}
		})

		rejectIdArray.forEach(id => promiseMap[id].forEach(item => {
			item.reject()
		}))
	}, error => {
		console.log(error)
	})
}








