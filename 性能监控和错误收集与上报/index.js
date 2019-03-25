const window.performance = { 
    memory: {
        usedJSHeapSize,
        totalJSHeapSize,
        jsHeapSizeLimit
    },
 
    navigation: {
        // 页面重定向跳转到当前页面的次数
        redirectCount,
        // 以哪种方式进入页面
        // 0 正常跳转进入
        // 1 window.location.reload() 重新刷新
        // 2 通过浏览器历史记录，以及前进后退进入
        // 255 其他方式进入
        type,         
    },
 
    timing: {
        // 等于前一个页面 unload 时间，如果没有前一个页面，则等于 fetchStart 时间
        navigationStart,
        // 前一个页面 unload 时间，如果没有前一个页面或者前一个页面与当前页面不同域，则值为 0
        unloadEventStart,
        // 前一个页面 unload 事件绑定的回调函数执行完毕的时间
        unloadEventEnd,
        redirectStart,
        redirectEnd,
        // 检查缓存前，准备请求第一个资源的时间
        fetchStart,
        // 域名查询开始的时间
        domainLookupStart,
        // 域名查询结束的时间
        domainLookupEnd,
        // HTTP（TCP） 开始建立连接的时间	        connectStart,
        // HTTP（TCP）建立连接结束的时间
        connectEnd,
        secureConnectionStart,
        // 连接建立完成后，请求文档开始的时间
        requestStart,
        // 连接建立完成后，文档开始返回并收到内容的时间
        responseStart,
        // 最后一个字节返回并收到内容的时间
        responseEnd,
        // Document.readyState 值为 loading 的时间
        domLoading,
        // Document.readyState 值为 interactive
        domInteractive,
        // DOMContentLoaded 事件开始时间
        domContentLoadedEventStart,
        // DOMContentLoaded 事件结束时间
        domContentLoadedEventEnd,
        // Document.readyState 值为 complete 的时间	        domComplete,
        // load 事件开始的时间
        loadEventStart,
        // load 事件结束的时间
        loadEventEnd
    }
}

const calcTime = () => {
    let times = {}
    let t = window.performance.timing
      
    // 重定向时间
    times.redirectTime = t.redirectEnd - t.redirectStart
      
    // DNS 查询耗时
    times.dnsTime = t.domainLookupEnd - t.domainLookupStart
      
    // TCP 建立连接完成握手的时间
    connect = t.connectEnd - t.connectStart
      
    // TTFB 读取页面第一个字节的时间
    times.ttfbTime = t.responseStart - t.navigationStart
      
    // DNS 缓存时间
    times.appcacheTime = t.domainLookupStart - t.fetchStart
      
    // 卸载页面的时间
    times.unloadTime = t.unloadEventEnd - t.unloadEventStart
      
    // TCP 连接耗时
    times.tcpTime = t.connectEnd - t.connectStart
      
    // request 请求耗时
    times.reqTime = t.responseEnd - t.responseStart
      
    // 解析 DOM 树耗时
    times.analysisTime = t.domComplete - t.domInteractive
      
    // 白屏时间
    times.blankTime = t.domLoading - t.fetchStart
      
    // domReadyTime 即用户可交互时间
    times.domReadyTime = t.domContentLoadedEventEnd - t.fetchStart
      
    // 用户等待页面完全可用的时间
    times.loadPage = t.loadEventEnd - t.navigationStart

    return times
}


const getOffsetTop = ele => {
    let offsetTop = ele.offsetTop
    if (ele.offsetParent !== null) {
        offsetTop += getOffsetTop(ele.offsetParent)
    }
    return offsetTop
}

const win = window
const firstScreenHeight = win.screen.height
let firstScreenImgs = []
let isFindLastImg = false
let allImgLoaded = false
let collect = []

const t = setInterval(() => {
    let i, img
    if (isFindLastImg) {
        if (firstScreenImgs.length) {
            for (i = 0; i < firstScreenImgs.length; i++) {
                img = firstScreenImgs[i]
                if (!img.complete) {
                    allImgLoaded = false
                    break
                } else {
                    allImgLoaded = true
                }
            }
        } else {
            allImgLoaded = true
        }
        if (allImgLoaded) {
            collect.push({
                firstScreenLoaded: startTime - Date.now()
            })
            clearInterval(t)
        }
    } else {
        var imgs = body.querySelector('img')
        for (i = 0; i < imgs.length; i++) {
            img = imgs[i]
            let imgOffsetTop = getOffsetTop(img)
            if (imgOffsetTop > firstScreenHeight) {
                isFindLastImg = true
                break
            } else if (imgOffsetTop <= firstScreenHeight 
            && !img.hasPushed) {
                img.hasPushed = 1
                firstScreenImgs.push(img)
            }
        }
    }
}, 0)

const doc = document
doc.addEventListener('DOMContentLoaded', () => {
    const imgs = body.querySelector('img')
    if (!imgs.length) {
        isFindLastImg = true
    }
})

win.addEventListener('load', () => {
    allImgLoaded = true
    isFindLastImg = true
    if (t) {
        clearInterval(t)
    }
})


(function logFirstScreen() {
    let images = document.getElementsByTagName('img')
    let iLen = images.length
    let curMax = 0
    let inScreenLen = 0
    
    // 图片的加载回调
    function imageBack() {
        this.removeEventListener
        && this.removeEventListener('load', imageBack, !1)
        if (++curMax === inScreenLen) {
            // 所有在首屏的图片均已加载完成的话，发送日志
            log()
        }   
    } 
    // 对于所有的位于指定区域的图片，绑定回调事件
    for (var s = 0; s < iLen; s++) {
        var img = images[s]
        var offset = {
            top: 0
        }
        var curImg = img
        while (curImg.offsetParent) {
            offset.top += curImg.offsetTop
            curImg = curImg.offsetParent
        }
        // 判断图片在不在首屏
        if (document.documentElement.clientHeight < offset.top) {
            continue
        }
        // 图片还没有加载完成的话
        if (!img.complete) {
            inScreenLen++
            img.addEventListener('load', imageBack, !1)
        }
    }
    // 如果首屏没有图片的话，直接发送日志
    if (inScreenLen === 0) {
        log()
    }
    // 发送日志进行统计
    function log () {
        window.logInfo.firstScreen = +new Date() - window.performance.timing.navigationStart
        console.log('首屏时间：', +new Date() - window.performance.timing.navigationStart)
    }
})()


















