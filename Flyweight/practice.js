class ChessPiece {
  type; // Pyada, Raja, Rani, Hathi, Wazir, Ghoda
  color; // black, white
  constructor(type, color) {
    this.type = type;
    this.color = color;
  }

  render(position) {
    console.log(`postition for ${this.color}-${this.type} is ${position}`);
  }
}

class ChessPieceFactory {
  static cache = new Map();
  static createChessPiece(type, color) {
    const key = `${type}:${color}`;
    if (!this.cache.has(key)) {
      const piece = new ChessPiece(type, color);
      console.log("New piece created");
      this.cache.set(key, piece);
      return piece;
    } else {
      console.log("reused piece");
      const piece = this.cache.get(key);
      return piece;
    }
  }
}

class ChessBoard {
  // client using our Flyweight pattern and having/saving extrinsic state ie position
  constructor() {
    this.board = new Map();
  }

  placePiece(type, color, position) {
    const piece = ChessPieceFactory.createChessPiece(type, color);
    this.board.set(position, piece);
  }

  movePiece(oldPosition, newPosition) {
    const piece = this.board.get(oldPosition);
    if (piece) {
      this.board.delete(oldPosition);
      this.board.set(newPosition, piece);
    }
  }

  displayBoard() {
    for (const [position, piece] of this.board.entries()) {
      piece.render(position);
    }
  }
}

const board = new ChessBoard();
board.placePiece("pyada", "white", "a2");
board.placePiece("pyada", "white", "b2");
board.placePiece("hathi", "white", "a1");
board.placePiece("hathi", "white", "b1");

board.displayBoard();

console.log("---------------------");
board.movePiece("b2", "b3");
board.movePiece("a2", "a3");
board.movePiece("a1", "a5");

board.displayBoard();
