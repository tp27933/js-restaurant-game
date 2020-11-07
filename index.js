/* eslint-disable no-undef */
const div = document.querySelector('.rules');
const seatArea = document.getElementById('seatArea');

const gameRules = {
  // 目標金額
  setGoal: 0,
  // 遊戲結束後再次彈提示框
  gameOver (goal) {
    if (parseInt(goal) >= parseInt(this.setGoal)) {
      div.querySelector('.rlues_base').innerHTML = `   
      <h1>恭喜達成目標</h1>
      <p>${goal}</p>
      <button class="enter">在玩一次</button>`;
      div.style.display = 'block';
      div.getElementsByTagName('button')[0].onclick = () => window.location.reload();
    }
  },
  vaild: function (setGoal) {
    if (setGoal >= 3000 && setGoal <= 5000) {
      return true;
    }
    return false;
  }
};

// 圓圈背景顏色
const colorSetting = [
  '#FF9122/#D96D00',
  '#AC91FF/#7A4DFF',
  '#FF2626/#B20000',
  '#80FF00/#00B200'
];;

const totalOrder = [];
// 彈出提示框
// click ->客人，廚師 ，吃飯，收錢
/*(function () {
  const btn = document.querySelector('.enter');
  const alert = document.querySelector('.alert_goalIncom');
  const input = document.querySelector('.goalIncom');
  btn.addEventListener('click', () => {
    if (!gameRules.vaild(input.value)) {
      alert.className = 'alert_active';
      return;
    }

    gameRules.setGoal = input.value;

    soundEffect('backgorund_music');
    setInterval(newGuest, 5000);
  });
}());*/
div.style.display = 'none'
seatArea.addEventListener('click', (e) => {
  const { target } = e;
  const picExit = target.getAttribute('src');
  if (target.className === 'profile' && picExit === '') {
    customMovimg.renderCssStyle(target);
    processCustomer(target.parentNode);
  }
});

function processCustomer (target) {
  const food = {
    table: target,
    state: 0
  };
  // thinking 動畫
  creatAnimationDialogue.render(target);
  // 動畫結束後
  target.querySelector('.animation_3').addEventListener('animationend', () => {
    // 創建菜單
    creatMenu.init(target);

    // 儲存菜單資訊
    food.content = creatMenu.menu;
    food.totalAmount = creatMenu.menu.reduce((prev, element) => prev + element.price, 0);
    // 傳送總菜單
    totalOrder.push(food);
  });
}

let that;
class CookWorking {
  constructor (id) {
    that = this;
    this.addCircle = document.getElementById('addCircle');
    this.main = document.querySelector('#cookAreaCircle');
    this.init();
  }

  init () {
    this.updateNode();
    this.addCircle.onclick = this.addNewCook;
    for (let i = 0; i < this.li.length; i++) {
      this.li[i].index = i;
      
      this.li[i].onclick = this.working;
    }
  }

  updateNode () {
    this.li = this.main.querySelectorAll('li');
  }

  addNewCook () {
    if(totalCook.length===4){
      return;
    }
    const newCook = document.createElement('li');
    newCook.innerHTML = ' <img src="./img/chief.png" alt="" class=\'cook\'>';
    const radomBackground = colorSetting[getRandom(4, 0)].split('/');
    newCook.style.cssText = `background: linear-gradient(to left,${radomBackground[0]}, 50%, ${radomBackground[1]} 0);`;
    cookingArea.appendChild(newCook);
    that.cook = new Cook(newCook);
    totalCook.push(that.cook);
    that.init();
  }

  working () {
    
    // 這裡的this指向為li，this.index則調用init裡的this.li[i].index = i以此知道點擊哪個li;
    const thisW = this;
    // 從總cook裡面找出點擊的廚師
    const cookState = totalCook[this.index].state;
    // 選擇待處理訂單
    const meal = totalOrder.find((item) => item.state === 0);
    if (cookState === 1) {
      // 廚師正在製作別的訂單時
      that.popPrompt(cookState, thisW);
      return;
    } if (cookState === 0 && meal === undefined) {
      // 廚師閒置時並且沒有訂單時
      that.popPrompt(cookState, thisW);
      return;
    }
    const avaliableCook = totalCook[this.index];
    avaliableCook.process(meal);
  }

  popPrompt (state, that) {
    // text[totalCook[thisW.index].state]
    const text = {
      0: '人都哪去呢!',
      1: '老夫正忙著呢'
    };
    const el = document.createElement('div');
    el.className = 'cookPrompt';
    el.innerHTML = `<p>${text[state]}</p>`;
    that.appendChild(el);

    setTimeout(() => {
      that.removeChild(el);
    }, 2000);
  }
}
new CookWorking();
