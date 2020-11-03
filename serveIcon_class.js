class ServeIcon {
  constructor (table, target, done) {
    this.table = table;
    this.done = done;
    this.target = target;
    this.li = null;
    this.creat();
  }

  creat () {
    // console.log(Object.values(totalOrder));
    this.arr = Array.from(this.target.children);
    this.li = this.arr.find((item) => item.children[0].innerText === this.done.name);
    this.serve = document.createElement('div');
    this.serve.className = 'img_fram';
    this.serve.innerHTML = `  
    <img src="./img/serve.png" alt="">
   `;
    this.li.appendChild(this.serve);
    this.serve.onclick = () => { this.animation(); };
  }

  animation () {
    const animation = this.li.querySelector('span');
    animation.className = 'fill';
    animation.addEventListener('animationend', () => {
      this.serve.parentNode.removeChild(this.serve);
    });

    const eatUp = this.arr.every((cur) => {
      let result;
      if (cur.querySelector('.fill')) {
        result = true;
      }
      return result;
    });
    if (eatUp) {
      this.payBill(animation);
    }
  }

  removeServeIcon () {
    this.serve.parentNode.removeChild(this.serve);
  }

  payBill (animation) {
    animation.addEventListener('animationend', () => {
      const dollarIcon = document.createElement('img');
      const findCircleEl = this.target.closest('.seat').querySelector('.circle');
      dollarIcon.src = './img/coin.png';
      dollarIcon.className = 'pay_icon';
      findCircleEl.appendChild(dollarIcon);
      const delte = totalOrder.find((item) => item.state === 1 && item.table === this.table);
      countRevenue.init(delte);
    });
  }
}
