const showPinyin = () => {
    let keys = window.chars.split(' ').join('')
    let t = `
    <div class="pinyin"> ${keys}</div>
    `
    e('#simle_input_method').insertAdjacentHTML('beforeend', t)
    updateWordCount()
}


const styleBtn = (pages) => {
    let up =  {
        opacity: 1,
        offset: -1,
    }
    let down = {
        opacity: 1,
        offset: 1,
    }
    if (window.page == 1) {
        up = {
            opacity: 0.3,
            offset: 0,
        }
    }
    if (pages == window.page && pages !== 0) {
        down = {
            opacity: 0.3,
            offset: 0,
        }
    }
    return {
        up,
        down,
    }
}
/*
找规律：

page = 1

i: 0 - 4


page = 2

i: 5 - 9

考虑最后一页情况

*/

const showFontBox = () => {
    let ks = window.chars
    let words = window.letterMap[ks] ? window.letterMap[ks].split('') : []
    // log('words', words)
    // 有多少页
    let pages = Math.ceil(words.length / 5)
    let {up, down} = styleBtn(pages)
    
    if (words.length > 5) {
        let start = 5 * (window.page - 1)
        let end = start + 5
        // 考虑最后一页情况
        if (end > words.length - 1) {
            end = words.length - 1
        }
        words = words.slice(start, end)
    }  
  
    // log('words', words)
    let ws = ''
    words.forEach((w, i) => {
        let index = 5 * (window.page - 1) + i
        ws += `
            <li data-number=${index} class="word">${w}</li>
        `
    })
    let t = `
    <div class="result">
        <ol>
            ${ws}
        </ol>
        <div class="page-up-down">
            <span class="page-up page-btn" style="opacity: ${up.opacity};" data-offset=${up.offset}>▲</span>
            <span class="page-down page-btn" style="opacity: ${down.opacity};" data-offset=${down.offset}>▼</span>
        </div>
    </div>
    `
    e('#simle_input_method').insertAdjacentHTML('beforeend', t)
}

const clearBox = () => {
    e('#simle_input_method').innerHTML = ''
}

const showBox = () => {
    // 清空
    clearBox()
    // 等输入字符为空的时候，那么不显示
    if (window.chars.length === 0) {
        return
    }
   
    // 当前输入的所有字符
    showPinyin()
    // 展示文字选项
    showFontBox()
}

/**
 * 
 * @param {数字 是那个一个字} number 
 * @param {是否点击键盘上的 1} isClickKey  【如果是鼠标点击 选择的字那么为 false】
 */
const selectWordBy = (number, isClickKey = true) => {
    let n = number  
    let input = e('.test-input-method')
    let v = input.value
    let end = isClickKey ? v.length - chars.length - 1 : v.length - chars.length
    // 进行数据处理  提取出相应的字
    v = v.slice(0, end)
    let word = window.letterMap[chars][n]  
    v += word

    input.value = v
    window.chars = ''
    // 归回首页
    window.page = 1
    updateWordCount()
}

// 如果全部都为空格 那么返回 false
const inputValueIsEmpty = () => {
    let input = e('.test-input-method')
    let v = input.value
    for (let char of v) {
        if (char !== ' ') {
            return true
        }
    }
    return false
}

const bindEventKeyupInput = () => {
    window.addEventListener('keyup', event => {
        log('event', event)
        log('event', event.key)
        let key = event.key
        // 数字
        // 目前只有五个选项 
        if ('12345'.includes(key)) {
            let n = Number(key)
            log('n', n)
            n =  5 * (window.page - 1) + n - 1
            log('afer n', n)
            // 选择字
            selectWordBy(n)
        }
        // 字母
        let lower = 'qwertyyuiopasdfghjklzxcvbnm'
        if (lower.includes(key)) {
            window.chars += key
        }
        // 删除
        if (key == 'Backspace') {
            if (window.chars.length === 0) {
                return
            }
            window.chars = chars.slice(0, chars.length - 1)
        }
        // 点击空格
        if (key === ' ' && inputValueIsEmpty()) {
            // 默认选择第一个
            let n = 1
            n =  5 * (window.page - 1) + n - 1
            selectWordBy(n)
        }
        if (key === 'ArrowUp') {
            let ks = window.chars
            let words = window.letterMap[ks] ? window.letterMap[ks].split('') : []
            // 有多少页
            let pages = Math.ceil(words.length / 5)
            let p = window.page + 1
            if (p <= pages) {
                window.page = p
            }
        }
        if (key === 'ArrowDown') {
            if (window.page === 1)  {
                return
            }
            window.page -= 1
        }
        // 更新页面
        showBox()
        
    })
}

const bindEventClickWord = () => {
    e('#simle_input_method').addEventListener('click', event => {
        let word = event.target
        if (word.classList.contains('word')) {
            let n = Number(word.dataset.number)
            // 改变值  直接鼠标点击
            selectWordBy(n, false)
            // 更新页面数据
            showBox()
        }
        updateWordCount()
    })
}

const bindEventPageButton = () => {
    e('#simle_input_method').addEventListener('click', event => {
        let btn = event.target
        if (btn.classList.contains('page-btn')) {
            let n = Number(btn.dataset.offset)
            window.page += n
            showBox()
        }
        
    })
}

const bindEvents = () => {
    bindEventKeyupInput()
    bindEventClickWord()
    bindEventPageButton()
}

const __main = () => {
    window.chars = ''  // 当前输入的所有字符

    window.page = 1 // 默认当前为第一页

    bindEvents()
}

__main()