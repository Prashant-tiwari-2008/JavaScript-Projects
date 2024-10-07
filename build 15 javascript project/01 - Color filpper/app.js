const colors = ['green', 'red', 'rgba(133,122,200)', '#f15025'];
const btn = document.getElementById('btn');
const color = document.querySelector('.color');

btn.addEventListener('click', async function () {
    let rgba = getRandomNumber();
    console.log('rgba color code', rgba)
    document.body.style.backgroundColor = `rgba(${rgba.firstNumber},${rgba.SecondNumber}, ${rgba.ThirdNumber},${rgba.opacity})`;
    color.textContent = rgba.firstNumber
})

function getRandomNumber() {
    let rgb = {
        firstNumber: Math.floor(Math.random() * 200),
        SecondNumber: Math.floor(Math.random() * 200),
        ThirdNumber: Math.floor(Math.random() * 200),
        opacity: parseFloat(Math.random().toFixed(1))
    }
    return rgb;
}

8800319044