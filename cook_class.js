/* eslint-disable no-undef */
/* eslint-disable no-new */
/*
   * state:0=>等待製作
   *       1=>正在製作
   *       2=>完成製作
   */

const cookingArea = document.getElementById('cookAreaCircle');

const totalCook = [];

class Cook {
  constructor (target) {
    this.state = 0;
    this.target = target;
    this.guest = null;
  }

  process (meal) {
    meal.state = 1;
    this.guest = meal;
    if (totalOrder.length !== 0) this.cooking(meal);
  }

  cooking (meal) {
    const dish = meal || this.guest;
    // 訂單全部處理完才退出沒有則繼續烹飪
    if (dish.content.length === 0) {
      // 將廚師的狀態改為閒置
      this.state = 0;
      return;
    }
    // 將廚師的狀態改為忙碌
    this.state = 1;
    // 哪一桌的訂單
    const creatIcon = dish.table.parentNode;
    const table = creatIcon.getElementsByClassName('menu')[0];
    const done = dish.content.shift();
    const done1 = [];
    done1.push(done);
    // 顯示此前處理哪道菜
    creatMenu.creat(this.target, done1);
    // 處理動畫結束後
    this.target.querySelector('.fill').addEventListener('animationend', () => {
      new ServeIcon(dish.table, table, done);
      this.cooking();
    });
  }
}
