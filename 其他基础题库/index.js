// L 表示左表达式，R 表示右表达式
const instanceof (L, R) => {
	while (true) { 
		if (L === null) {
			// 已经遍历到了最顶端
			return false
		}
		if (R.prototype === L.__proto__) {
			return true
		}
		L = L.__proto__
	} 
}

const obj = {
    user: {
        posts: [
            { title: 'Foo', comments: [ 'Good one!', 'Interesting...' ] },
            { title: 'Bar', comments: [ 'Ok' ] },
            { title: 'Baz', comments: []}
        ],
        comments: []
    }
} || {
	user: {
        posts: [
            { title: '', comments: [] }
        ],
        comments: []
    }
}