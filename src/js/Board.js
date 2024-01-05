export default class Board {
  constructor(container) {
    this.container = container;
    this.board = null;
  }

  createBoard() {
    this.board = document.createElement("div");
    this.board.classList.add("board-container");
    this.bindToDOM();
  }

  static get markup() {
    return `
    
    <div class="board-container">
      <h3 class="board__title"></h3>
      <div class="board"></div>
      <div class="input-wrapper">
        <input class="text__field" type="text" placeholder="Введите ваше сообщение...">
        <div class="button__block">
          <button class="audio__btn">&#9835</button>
          <button class="video__btn">&#128249</button>
        </div>
      </div>
    </div>
		`;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML("afterbegin", this.constructor.markup);
  }
}
