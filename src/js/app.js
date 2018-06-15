import "babel-polyfill";
import '../css/style.css'
import initMaze from './Wall2.js'
buildRandomMaze.addEventListener('click', function(e) {
    let ranArr = ['easy', 'normal', 'hard', 'lunatic', 'extra'];
    let res = ranArr[Math.floor(Math.random() * 5)];
    requestMaze(res);
})

buildEasyMaze.addEventListener('click', function(e) {
    requestMaze('easy');
})

buildNormalMaze.addEventListener('click', function(e) {
    requestMaze('normal');
})

buildHardMaze.addEventListener('click', function(e) {
    requestMaze('hard');
})

buildLunaticMaze.addEventListener('click', function(e) {
    requestMaze('lunatic');
})

buildExtraMaze.addEventListener('click', function(e) {
    requestMaze('extra');
})

showRoad.addEventListener('click', function(e) {
    let wrapper = document.querySelector('.mazeWrapper');
    if (wrapper) {
        wrapper.classList.add('show');
    }
})

addCoin.addEventListener('click', function() {
    let judge = parseInt(Math.random() * 2);
    if (judge === 1) {
        coin.innerHTML = parseInt(coin.innerHTML) + 30;
    } else {
        alert(`就算你充再多的钱，我不让你变强，你还是不能变强。\r\n嗯，没错，程序猿就是为所欲为。\r\n当然，你可以赌赌运气继续充，手动滑稽。`);
    }
})

function requestMaze(level) {
    let leftCoin = parseInt(document.querySelector('#coin').textContent);
    if (leftCoin > 0) {
        if (document.querySelector('.mazeWrapper')) {
            $('.mazeWrapper').remove();
        }
        document.querySelector('#coin').textContent = leftCoin - 5;
        initMaze(level);
    } else {
        alert('没硬币了！充一发?');
    }
}

