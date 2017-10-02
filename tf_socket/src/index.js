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
      this.changePlayer();//デバッグ用
      this.changeTurn();
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
  changeTurn: function () {
    if (this.turn==="○") {
      this.turn="×";
    }else {
      this.turn="○";
    }
  },
  judge: function () {
    let flag = 0;
    let drow = 0;
    //横判定
    for(let i=0;i<this.board[0].length;i++){
      if (this.board[i][0].value!==""&&this.board[i][0].value===this.board[i][1].value&&this.board[i][0].value===this.board[i][2].value) {
        flag=1;
      }
    }
    //縦判定
    for(let i=0;i<this.board.length;i++){
      if (this.board[0][i].value!==""&&this.board[0][i].value===this.board[1][i].value&&this.board[0][i].value===this.board[2][i].value) {
        flag=1;
      }
    }
    //斜め判定
    if (this.board[0][0].value!==""&&this.board[0][0].value===this.board[1][1].value&&this.board[0][0].value===this.board[2][2].value) {
      flag=1;
    }
    if (this.board[2][0].value!==""&&this.board[2][0].value===this.board[1][1].value&&this.board[2][0].value===this.board[0][2].value) {
      flag=1;
    }
    //引き分け判定
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j].value !== "") {
          drow++;
          // console.log(i, j, drow);
        }
      }
    }
    if (drow===9) {
      flag=2
    }
    // console.log(drow);
    //勝敗
    console.log(flag)
    if (flag===1) {
      window.alert(`${this.turn}の勝ち`)
      window.location.href = "./index.html";
    }else if(flag===2){
      window.alert("引き分け")
      window.location.href = "./index.html";
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
      tf.judge();
    })
  }
}
