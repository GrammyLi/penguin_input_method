const jokeArr = [
    {question: "What do penguins like to eat?", answer: "Brrrrritos"},
    {question: "What's a penguin's favourite relative?", answer: "Aunt Arctica"},
    {question: "What do penguins wear on their heads?", answer: "Ice caps"},
    {question: "What kind of fish do penguins catch at night?", answer: "Starfish"},
    {question: "What's a penguin's favourite fast food?", answer: "Ice-burgers"},
];
const minWordWarningArr = [
    "You gotta say something!",
    "Don't leave me hanging!",
    "Type 'penguins are cool!!!'",
    "Type 'penguins are awesome'",
    "Type 'penguins are amazing'",
];
const textBoxEl = document.querySelector('.textbox');
const formEl = document.querySelector('#form');
const wordCountEl = document.querySelector('.word-bubble');
const inputLabelEl = document.querySelector('#fav-animal-input-label');

const textboxMaxLength = textBoxEl.maxLength;
const textboxWidth = textBoxEl.getBoundingClientRect()['width'];
const penguinWidth = document.querySelector('.penguin').getBoundingClientRect()['width'];
const penguinMaxOffsetX = textboxWidth - penguinWidth;
const penguinAnimDur = 0.2;
let wordCount = 0;

function getRandomJoke() {
    return jokeArr[Math.floor(Math.random() * jokeArr.length)];
}

function getMinWordWarning() {
    return minWordWarningArr[Math.floor(Math.random() * minWordWarningArr.length)];
}

function setWordCountLabel(text) {
    wordCountEl.innerHTML = text;
}

function handleNoWordCount() {
    gsap.timeline({ defaults: { duration: penguinAnimDur } })
        // --- textbox jiggle
        .to('#fav-animal-input', { x: -4, duration: penguinAnimDur / 4 })
        .to('#fav-animal-input', { x: 4,  duration: penguinAnimDur / 4 })
        .to('#fav-animal-input', { x: -4, duration: penguinAnimDur / 4 })
        .to('#fav-animal-input', { x: 4,  duration: penguinAnimDur / 4 })
        // --- word count reappear
        .to('.word-bubble', { y: 30, opacity: 0, duration: penguinAnimDur / 2 })
        .to('.word-bubble', { y: 0,  opacity: 1, duration: penguinAnimDur / 2 })
        // --- penguin flail
        .to('.penguin__wing--left',  { y: 17, rotate: -18 })
        .to('.penguin__wing--right', { y: 17, rotate: 18 }, `-=${penguinAnimDur}`)
        .to('.penguin__wing--left',  { y: 23, rotate: -48 })
        .to('.penguin__wing--right', { y: 23, rotate: 48 }, `-=${penguinAnimDur}`)
        .to('.penguin__wing--left',  { y: 17, rotate: -18 })
        .to('.penguin__wing--right', { y: 17, rotate: 18 }, `-=${penguinAnimDur}`)
        .to('.penguin__wing--left',  { y: 23, rotate: -48 })
        .to('.penguin__wing--right', { y: 23, rotate: 48 }, `-=${penguinAnimDur}`)
        setTimeout( () => wordCountEl.innerHTML = getMinWordWarning(), penguinAnimDur * 1500 );
}

function revealJokeAnim() {
    const inputTl = gsap.timeline({ defaults: { duration: penguinAnimDur } });
    const penguinTl = gsap.timeline({ defaults: { duration: penguinAnimDur } });
    const {question, answer} = getRandomJoke();

    inputTl
    .to('.btn-submit',              { y: -10 })
    .to('.btn-submit',              { y: 30, opacity: 0 })
    .to('#fav-animal-input',        { y: -10 })
    .to('#fav-animal-input',        { y: 30, opacity: 0 })
    .to('.btn-submit',              { visibility: 'hidden' }, `-=${penguinAnimDur * 2}`)
    .to('#fav-animal-input-label',  { y: -10 })
    .to('#fav-animal-input-label',  { y: 30, opacity: 0 })
    .to('#fav-animal-input',        { visibility: 'hidden' }, `-=${penguinAnimDur * 2}`)
    .to('#fav-animal-input-label',  { y: 0, opacity: 1 })

    penguinTl
    .to('.word-bubble', { delay: penguinAnimDur, y: -10 })
    .to('.word-bubble', { y: 30, opacity: 0 })
    .to('.word-bubble', { y: 30, opacity: 0 })
    .to('.word-bubble', { x: penguinMaxOffsetX / 2 })
    .to('.penguin',     { x: penguinMaxOffsetX / 2 }, `-=${penguinAnimDur}`)
    // -------- walk 1 --------
    .to('.penguin__body', {
        borderRadius: '50px 50px 35px 35px',
        width: 35,
        height: 37,
        y: 10,
        boxShadow: 'inset 0px 6px 0px 5px black',
        rotate: 10,
        scale: 1.2
    })
    .to('.penguin__head', {
        x: 18,
        y: -5,
        rotate: 10,
        scale: 1.2
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--left', {
        x: -9,
        y: 15,
        rotate: -16,
        scale: 1.2
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--right', {
        x: 32,
        y: 23,
        rotate: 40,
        scale: 1.2
    }, `-=${penguinAnimDur}`)
    .to('.penguin__feet', {
        x: 6,
        y: 45,
        rotate: 0,
        boxShadow: '15px 0 #FF6F00',
        scale: 1.2
    }, `-=${penguinAnimDur}`)
    .to('.penguin__tail', {
        x: -3,
        y: 31,
        rotate: 37,
        scale: 1.2
    }, `-=${penguinAnimDur}`)
    // -------- walk 2 --------
    .to('.penguin__body', {
        rotate: -10,
        scale: 1.4
    })
    .to('.penguin__head', {
        x: 7,
        y: -9,
        rotate: -10,
        scale: 1.4
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--left', {
        x: -13,
        y: 23,
        rotate: -60,
        scale: 1.4
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--right', {
        x: 33,
        y: 14,
        rotate: 40,
        scale: 1.4
    }, `-=${penguinAnimDur}`)
    .to('.penguin__feet', {
        x: 10,
        y: 48,
        scale: 1.4
    }, `-=${penguinAnimDur}`)
    .to('.penguin__tail', {
        x: -1,
        y: 37,
        rotate: 33,
        scale: 1.4
    }, `-=${penguinAnimDur}`)
    // -------- walk 3 --------
    .to('.penguin__body', {
        rotate: 10,
        scale: 1.6
    })
    .to('.penguin__head', {
        x: 21,
        y: -12,
        rotate: 10,
        scale: 1.6
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--left', {
        x: -17,
        y: 11,
        rotate: -28,
        scale: 1.6
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--right', {
        x: 39,
        y: 17,
        rotate: 40,
        scale: 1.6
    }, `-=${penguinAnimDur}`)
    .to('.penguin__feet', {
        x: 1,
        y: 51,
        scale: 1.6
    }, `-=${penguinAnimDur}`)
    .to('.penguin__tail', {
        x: -10,
        y: 30,
        rotate: 46,
        scale: 1.6
    }, `-=${penguinAnimDur}`)
    // -------- walk 4 --------
    .to('.penguin__body', {
        rotate: -10,
        scale: 1.8
    })
    .to('.penguin__head', {
        x: 5,
        y: -19,
        rotate: -10,
        scale: 1.8
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--left', {
        x: -23,
        y: 27,
        rotate: -61,
        scale: 1.8
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--right', {
        x: 40,
        y: 11,
        rotate: 40,
        scale: 1.8
    }, `-=${penguinAnimDur}`)
    .to('.penguin__feet', {
        x: 9,
        y: 55,
        scale: 1.8
    }, `-=${penguinAnimDur}`)
    .to('.penguin__tail', {
        x: -7,
        y: 41,
        rotate: 30,
        scale: 1.8
    }, `-=${penguinAnimDur}`)
    // -------- walk 5 --------
    .to('.penguin__body', {
        rotate: 0,
        scale: 2
    })
    .to('.penguin__head', {
        x: 12,
        y: -24,
        rotate: 0,
        scale: 2
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--left', {
        x: -24,
        y: 17,
        rotate: -48,
        scale: 2
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--right', {
        x: 44,
        y: 12,
        rotate: 43,
        scale: 2
    }, `-=${penguinAnimDur}`)
    .to('.penguin__feet', {
        x: 3,
        y: 60,
        scale: 2
    }, `-=${penguinAnimDur}`)
    .to('.penguin__tail', {
        x: -12,
        y: 41,
        rotate: 27,
        scale: 2
    }, `-=${penguinAnimDur}`)
    // ---- word bubble reappear
    .to('.word-bubble', {
        y: -35,
        opacity: 1,
    })
    .to('.penguin__wing--left', {
        y: 7, rotate: -18,
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--right', {
        y: 7, rotate: 13,
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--left', {
        y: 14, rotate: -48,
    })
    .to('.penguin__wing--right', {
        y: 12, rotate: 43,
    },`-=${penguinAnimDur}`)
    .to('.penguin__wing--left', {
        y: 7, rotate: -18,
    })
    .to('.penguin__wing--right', {
        y: 7, rotate: 13,
    }, `-=${penguinAnimDur}`)
    .to('.penguin__wing--left', {
        y: 14, rotate: -48,
    })
    .to('.penguin__wing--right', {
        y: 12, rotate: 43,
    },`-=${penguinAnimDur}`);

    setTimeout( () => {
        inputLabelEl.innerHTML = question;
        wordCountEl.innerHTML = answer;
    },  penguinAnimDur * 6000 );
}


formEl.addEventListener('submit', e => {
    e.preventDefault();
    
    if (!wordCount){
        handleNoWordCount();
    } else {
        revealJokeAnim();
    }
});

const updateWordCount = () => {
    wordCount =  e('.test-input-method').value.length
    log('word count ', wordCount)
    setWordCountLabel(`还可以填${textboxMaxLength - wordCount} 字`);
    
    const anim = gsap.timeline({ defaults: { duration: penguinAnimDur } });
    const penguinOffsetX = wordCount / textboxMaxLength * penguinMaxOffsetX;

    anim.to('.penguin', {
        x: penguinOffsetX,
    }).to('.word-bubble', {
        x: penguinOffsetX,
    }, `-=${penguinAnimDur}`);

    switch(wordCount) {
        case 0:
        case textboxMaxLength:
            setWordCountLabel(!wordCount ? `开始吧 小鹅` : `Phew!`);
            anim
            .to('.penguin__body', {
                borderRadius: '50px 50px 35px 35px',
                width: 35,
                height: 37,
                y: 10,
                boxShadow: 'inset 0px 6px 0px 5px black',
            })
            .to('.penguin__head', {
                x: 13,
                y: 0,
                rotate: 0
            }, `-=${penguinAnimDur}`)
            .to('.penguin__wing--right', {
                x: 29,
                y: 23,
            }, `-=${penguinAnimDur}`)
            .to('.penguin__wing--left', {
                x: -6,
                y: 23,
                rotate: -48
            }, `-=${penguinAnimDur}`)
            .to('.penguin__feet', {
                x: 10,
                y: 40,
                rotate: 0,
                boxShadow: '15px 0 #f5b23a'
            }, `-=${penguinAnimDur}`)
            .to('.penguin__tail', {
                x: 3,
                y: 33,
                rotate: 27,
            }, `-=${penguinAnimDur}`);
            break;
        default:
            anim.to('.penguin__body', {
                borderRadius: '50px 50px 20px 20px',
                width: 38,
                height: 26,
                y: 24,
                boxShadow: 'inset 0px 11px 0px 5px black',
            })
            .to('.penguin__head', {
                x: 28,
                y: 20,
                rotate: wordCount%2 > 0 ? 30 : 40,
            }, `-=${penguinAnimDur}`)
            .to('.penguin__wing--right', {
                x: 18,
                y: 31,
            }, `-=${penguinAnimDur}`)
            .to('.penguin__wing--left', {
                x: 13,
                y: 38,
                rotate: wordCount%2 > 0 ? -48 : -117
            }, `-=${penguinAnimDur}`)
            .to('.penguin__feet', {
                x: -1,
                y: 40,
                rotate: 85,
                boxShadow: 'none'
            }, `-=${penguinAnimDur}`)
            .to('.penguin__tail', {
                x: 4,
                y: 29,
                rotate: wordCount%2 > 0 ? -10 : -20,
            }, `-=${penguinAnimDur}`);
            break;
    }
}
textBoxEl.addEventListener('keyup', e => {
    if (wordCount === e.target.value.length) {
        return;
    }

    updateWordCount()
});



setWordCountLabel(`我要告诉你一个鹅厂的秘密`);