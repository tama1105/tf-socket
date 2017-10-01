/*
  送るjson
  {
  座標
  ○か×か
  }
  socketが送られてきたとき自分のターン
  送ったら相手のターン
*/
let tf = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  put: function(i, j){
    if (this.board[i][j].value !== "") {
      console.log(this.msg);
      this.msg.textContent="置けない";
    }else {
      this.board[i][j].value = this.player;
    }
  },
  msg: document.getElementById('message'),
  turn: "×",
  player: "○",
  changePlayer: function () {//仮のもの:デバッグ用
    if (this.player==="○") {
      this.player="×";
    }else {
      this.player="○";
    }
  },
  changeTurn: function () {//仮のもの:デバッグ用
    if (this.turn==="○") {
      this.turn="×";
    }else {
      this.turn="○";
    }
  }

}
tf.board[0][0] = document.getElementById('b0');
tf.board[0][1] = document.getElementById('b1');
tf.board[0][2] = document.getElementById('b2');
tf.board[1][0] = document.getElementById('b3');
tf.board[1][1] = document.getElementById('b4');
tf.board[1][2] = document.getElementById('b5');
tf.board[2][0] = document.getElementById('b6');
tf.board[2][1] = document.getElementById('b7');
tf.board[2][2] = document.getElementById('b8');
for (let i = 0; i < tf.board.length; i++) {
  for(let j = 0; j < tf.board[i].length;j++){
    tf.board[i][j].addEventListener("click", () => {
      tf.put(i, j);//置けるか判定
      //socketで送る
    })
  }
}
