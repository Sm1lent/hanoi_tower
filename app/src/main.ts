import './style.css'
import { Tower } from './types.ts'

console.log("Игра началась");
const towerOneElement = document.getElementById('tower1') as HTMLElement;
const towerTwoElement = document.getElementById('tower2') as HTMLElement;
const towerThreeElement = document.getElementById('tower3') as HTMLElement;
const movesElement = document.getElementById('moves-count') as HTMLElement;
const gameoverElement = document.getElementById('gameover') as HTMLElement;
const formElement = document.getElementById('form') as HTMLFormElement;
const towerHeightInput = document.getElementById('start-number') as HTMLInputElement;
const tickInput = document.getElementById('tick') as HTMLInputElement;
const stopButton = document.getElementById('stop') as HTMLButtonElement;


const game = {
  moves: 0,
  startNumber: 8,
  tick: 100,
  isRunning: false,
  switchStatus(value: boolean) {
    this.isRunning = value;
  },
  isStartNumberEven() {
    return this.startNumber % 2 === 0 ? true : false;
  },
  start() {
    gameoverElement.classList.remove('visible');
    this.isRunning = true;
    this.moves = 0;
    startMoves(this.startNumber);
  },
  break() {
    stopMoves("Игра прервана");
  },
  end() {
    stopMoves("Башня перестроена. Спасибо за внимание (:");
  }
}

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  game.startNumber = Number(towerHeightInput.value) > 2 ? Number(towerHeightInput.value) : 3;
  game.tick = Number(tickInput.value) >= 0 ? Number(tickInput.value) : 0;
  formElement.classList.add('hidden');
  stopButton.classList.remove('hidden');
  game.start();
})

stopButton.addEventListener('click', () => {
  game.break();
})


function startMoves(startNumber: number) {
  const towerOne = new Tower({
    towerNumber: 1, 
    element: towerOneElement, 
    startNumber, 
    isStartTower: true
  });

  const towerTwo = new Tower({
    towerNumber: 2, 
    element: towerTwoElement, 
    startNumber
  });

  const towerThree = new Tower({
    towerNumber: 3, 
    element: towerThreeElement, 
    startNumber
  });

  console.log("first:",towerOne, "second:", towerTwo, "third:", towerThree);

  reportStacks(towerOne, towerTwo, towerThree);

  moveItems(towerOne, towerTwo, towerThree);
}

function moveItems(towerOne: Tower, towerTwo: Tower, towerThree: Tower) {
  getInfoForTopperAndMoveIt(towerOne, towerTwo, towerThree);
  setTimeout(() => { 
    if(towerTwo.isFull()) {
      game.end();
    } else if(!game.isRunning) {
      game.break();
    } else {
      getTargetsAndMoveItem(towerOne, towerTwo, towerThree);   
      setTimeout(() => {
        moveItems(towerOne, towerTwo, towerThree);
      }, game.tick);
    }
  }, game.tick);
}

function reportStacks(towerOne: Tower, towerTwo: Tower, towerThree: Tower) {
  console.log("Стек первой башни:")
  towerOne.reportStack();
  console.log("Стек второй башни:")
  towerTwo.reportStack();
  console.log("Стек третей башни:")
  towerThree.reportStack();
}

function moveTopper(sourceTower: Tower, targetTower: Tower) {
  game.moves++;
  const item = sourceTower.popTopItem();
  if(item) {
    targetTower.addItem(item);  
    movesElement.innerText = game.moves.toString();
  }
}

function moveItem(sourceTower: Tower, targetTower: Tower) {
  game.moves++;
  const item = sourceTower.popTopItem();
  if(item) targetTower.addItem(item);  
  movesElement.innerText = game.moves.toString();
}

function getSourceAndTarget(tower1: Tower, tower2: Tower): {sourceTower: Tower, targetTower: Tower} | undefined {
  if(tower1.isEmpty()) {
    return {
      sourceTower: tower2,
      targetTower: tower1
    }
  }
  if(tower2.isEmpty()) {
    return {
      sourceTower: tower1,
      targetTower: tower2
    }
  }

  const [itemFrom1Size, itemFrom2Size] = [tower1.lookAtTop()?.size, tower2.lookAtTop()?.size];
  if(itemFrom1Size && itemFrom2Size) {
    return  itemFrom1Size > itemFrom2Size ? 
    {
      sourceTower: tower2,
      targetTower: tower1
    } :
    {
      sourceTower: tower1,
      targetTower: tower2
    }
  }
  return undefined
}

function getSourceAndTargetForTopper(towerOne: Tower, towerTwo: Tower, towerThree: Tower) {
  const towerWithTopper = [towerOne, towerTwo, towerThree].find(tower => tower.lookAtTop()?.size === 1);
  const towerWithTopperNumber = towerWithTopper?.towerNumber;

  return game.isStartNumberEven() ? 
  {
    towerWithTopper,
    targetForTopper: towerWithTopperNumber === 1 ? towerThree : towerWithTopperNumber === 2 ? towerOne : towerTwo
  } :
  {
    towerWithTopper,
    targetForTopper: towerWithTopperNumber === 2 ? towerThree : towerWithTopperNumber === 3 ? towerOne : towerTwo
  } 
}

function getInfoForTopperAndMoveIt(towerOne: Tower, towerTwo: Tower, towerThree: Tower) {
  const {towerWithTopper, targetForTopper} = getSourceAndTargetForTopper(towerOne, towerTwo, towerThree);
  console.log("tower-top",towerWithTopper?.towerNumber, "tower-to",targetForTopper?.towerNumber);
  if(towerWithTopper && targetForTopper) {
    moveTopper(towerWithTopper, targetForTopper);
  }
  reportStacks(towerOne, towerTwo, towerThree); 
}

function getTargetsAndMoveItem(towerOne: Tower, towerTwo: Tower, towerThree: Tower) {
  const targetTowers = [towerOne, towerTwo, towerThree].filter(tower => tower.lookAtTop()?.size !== 1);
  if(targetTowers.length === 2) {
    const targets = getSourceAndTarget(targetTowers[0], targetTowers[1]);
    if(targets) {
      const {sourceTower, targetTower} = targets
      moveItem(sourceTower, targetTower);
    }
    reportStacks(towerOne, towerTwo, towerThree); 
  }
}

function stopMoves(message: string) {
  game.isRunning = false;
  console.log(message);
  gameoverElement.classList.add('visible');
  gameoverElement.innerText = message;
  formElement.classList.remove('hidden');
  stopButton.classList.add('hidden');
}