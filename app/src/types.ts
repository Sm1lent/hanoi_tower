export class TowerItem {
  readonly id: number;
  readonly color: string;
  readonly size: number;
  constructor(color: string, id: number, size: number) {
    this.id = id;
    this.color = color;
    this.size = size;
  }
}

export type TowerProps = {
  towerNumber: number;
  element: HTMLElement;
  startNumber: number; 
  isStartTower?: boolean;
}

export class Tower {
  readonly towerNumber: number;
  private stack: TowerItem[] = [];
  readonly element: HTMLElement;
  readonly fullHeight: number;
  constructor(towerProps: TowerProps) {
    const {towerNumber, element, startNumber, isStartTower} = towerProps;
    if(isStartTower) {
      for(let i = 0; i < startNumber; i++) {
        const item = new TowerItem(getRandomColor(), i, startNumber - i);
        this.stack.push(item);
      };
    }

    this.towerNumber = towerNumber;
    this.element = element;
    this.fullHeight = startNumber
  }

  addItem(item: TowerItem) {
    this.stack.push(item);
    this.redrawTower();
  }

  popTopItem(): TowerItem | undefined {
    const lastItem = this.stack.pop();
    this.redrawTower();
    return lastItem;
  }

  reportTowerStack(){
    console.log(this.stack)
  }

  getStackLength(): number {
    return this.stack.length
  }

  redrawTower() {
    this.element.innerHTML = '';
    for(let item of this.stack) {
      const { color, size, id } = item;
      const brick = document.createElement('div');
      brick.classList.add('brick');
      brick.style.width = `${(size * 20) + 20}px`;
      brick.style.backgroundColor = color;
      brick.innerText = (id + 1).toString();
      this.element.append(brick);
    }
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }

  isFull(): boolean {
    return this.stack.length === this.fullHeight;
  }

  lookAtTop(): TowerItem | undefined {
    return this.stack[this.stack.length - 1];
  }

  reportStack() {
    console.log(this.stack) 
  }
}

function getRandomColor(): string { 
  return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
}; 