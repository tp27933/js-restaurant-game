/* eslint-disable no-undef */
function Food (name, price, time) {
  this.name = name;
  this.price = price;
  this.time = time;
}

const creatAnimationDialogue = {
  render (target) {
    const fram = document.getElementById('seat');
    // 當被點擊的為圓框時
    // 新建div
    const dialogue = document.createElement('div');
    // 添加样式
    dialogue.classList.add('fram');
    // 添加模板字符串
    dialogue.innerHTML = ` 
          <span class="animation_1"></span>
          <span class="animation_2"></span>
          <span class="animation_3"></span>
          <span class="trangle_down"></span>
        </div>`;
    target.appendChild(dialogue);
    dialogue.children[2].addEventListener('animationend', () => {
      this.remove(target, dialogue);
    });
  },
  remove (targetEl, removeEl) {
    targetEl.removeChild(removeEl);
  }
};

const customMovimg = {
  renderCssStyle (el) {
    const waiting = document.getElementById('waiting');
    el.src = waiting.firstElementChild.src;
    const radomBackground = colorSetting[getRandom(4, 0)].split('/');
    el.style.cssText = `background: linear-gradient(to left,${radomBackground[0]}, 50%, ${radomBackground[1]} 0);`;
    this.remove();
  },
  remove () {
    waiting.removeChild(waiting.firstElementChild);
  }
};
const countRevenue = {
  init (delte) {
    delte.table.querySelector('.pay_icon').onclick = () => { this.count(delte); };
  },
  count (delte) {
    soundEffect('moneySound');

    const totalIncome = document.querySelector('#display_income span');
    totalIncome.innerText = parseFloat(totalIncome.innerText) + delte.totalAmount;
    this.remove(delte);
    gameRules.gameOver(totalIncome.innerText);
  },
  remove (el) {
    el.table.closest('div.seat').innerHTML = `
    <div class="row">
       
        <div id='circle' class="circle col-lg-8 col-md-8 col-8">
          <img src="" alt="" class='profile'>
        </div>
        <div id="menu" class="menu_wrap col-lg-4 col-md-4 col-4">
          <ul class="menu">
          </ul>
          </div>
        </div>
    `;
  }

};

const creatMenu = {
  total: 0,
  allMenu: [
    new Food('糖醋排骨', 450, '3s'),
    new Food('紐澳良雞翅', 250, '3s'),
    new Food('葱炒回锅肉', 350, '2s'),
    new Food('鳳梨蝦球', 350, '4s'),
    new Food('烤串', 150, '1.5')
  ],
  init (el, arr) {
    this.menu = this.radomMenu();
    this.creat(el, arr);
  },
  radomMenu () {
    const foodList = [];
    const num = getRandom(4, 1);
    const num1 = [];
    // console.log(`將會有${num}的隨機數字`);
    do {
      const radom = getRandom(4, 0);

      if (num1.indexOf(radom) === -1) {
        num1.push(radom);
        foodList.push(this.allMenu[radom]);
      }
    }
    while (foodList.length < num);
    return foodList;
  },
  creat (id, arry) {
    const arr = arry || this.menu;
    const id2 = id.parentNode.getElementsByClassName('menu')[0];
    const j = !!arry;
    const obj = {
      true: {
        newElement: 'span',
        innerH: `<span class="fill" style="animation-duration:${arr[0].time}" ></span><i></i>`,
        id
      },
      false: {
        newElement: 'li',
        innerH: '<div class="item"><span></span ><i></i></div>',
        id: id2
      }
    };

    for (let i = 0; i < arr.length; i++) {
      const newEl = document.createElement(obj[j].newElement);
      newEl.innerHTML = obj[j].innerH;
      newEl.querySelector('i').innerText = arr[i].name;
      obj[j].id.appendChild(newEl);
      if (arry) {
        newEl.querySelector('.fill').addEventListener('animationend', () => {
          this.remove(id, newEl);
        });
      }
    }
    // 計算訂單總費用
    this.total = this.menu.reduce((prev, element) => prev + element.price, 0);
  },
  remove (id, el) {
    id.removeChild(el);
  }
};

function add () {
  const guestList = [
    './img/gust.png',
    './img/gust_1.png',
    './img/gust_2.png',
    './img/gust_3.png',
    './img/gust_4.png'
  ];
  const img = document.createElement('img');
  img.src = guestList[getRandom(5, 0)];
  img.classList.add('custom');
  waiting.appendChild(img);
}
function newGuest () {
  switch (waiting.children.length) {
    case 0:
      add();
      break;
    case 2:
      waiting.removeChild(waiting.firstChild);
      setTimeout(() => { add(); }, 7000);
      break;
    case 3:
      waiting.removeChild(waiting.firstChild);
      break;
    default:
      add();
      setTimeout(() => { waiting.removeChild(waiting.firstChild); }, 5000);
      break;
  }
}
function getRandom (x, y) {
  return Math.floor(Math.random() * x) + y;
};
function soundEffect (el) {
  const sound = document.getElementById(el);
  sound.play();
}
