const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const documents = {};
const rooms = [];

io.on("connection", socket => {
  console.log('a user connected');
  socket.on("disconnect", x => {
    console.log("a user go out");
  });

  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on("getDoc", docId => {
    safeJoin(docId);
    socket.emit("document", documents[docId]);
  });

  socket.on("addDoc", doc => {
    documents[doc.id] = doc;
    safeJoin(doc.id);
    io.emit("documents", Object.keys(documents));
    socket.emit("document", doc);
  });

  socket.on("editDoc", doc => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit("document", doc);
  });

  /** 取得房間列表 */
  socket.on("getRooms", room => {
    io.emit("rooms", rooms);
  });

  /** 取得單一房間資訊 */
  socket.on("getRoom", roomId => {
    const theRoom = rooms.find(function (x) { return x.id == roomId; });
    safeJoin(roomId);
    socket.emit("room", theRoom);
  });

  /** 建立房間 */
  socket.on("createRoom", room => {
    rooms.push(room);
    socket.leaveAll();
    socket.join(room.id);
    io.emit("rooms", rooms);
    console.log(room.players)
  });

  /** 加入房間 */
  socket.on("joinRoom", request => {
    const theRoom = rooms.find(function (x) { return x.id == request.roomId; });

    if (theRoom.players.length >= 4) {
      io.emit("result", false);
    } else {
      theRoom.players.push(request.player);
      socket.to(request.roomId).emit("room", theRoom);
      io.emit("rooms", rooms);
      io.emit("result", true);
    }
  });

  /** 離開房間 */
  socket.on("leftRoom", request => {
    const theRoom = rooms.find(function (x) { return x.id == request.roomId; });
    const leftPlayer = theRoom.players.find(function (x) { return x.name == request.playerName; });
    theRoom.players.splice(theRoom.players.indexOf(leftPlayer), 1);
    socket.leave(theRoom.id);

    // 若房間沒人則移除房間
    if (theRoom.players.length == 0) {
      rooms.splice(rooms.indexOf(theRoom), 1);
    } else {
      // 若無房主則指定新房主
      if (theRoom.players.find(function (x) { return x.isCreater == true; }) == undefined) {
        theRoom.players[0].isCreater = true;
      }

      socket.to(request.roomId).emit("room", theRoom);
    }
    io.emit("rooms", rooms);
  });

  io.emit("documents", Object.keys(documents));
  io.emit("rooms", rooms);
});

// async function callApi() {
//   // var headers = new Headers({ 'Content-Type': 'Tapplication/json' });

//   // 準備 資料酬載 (Payload)
//   var data = { username: "test", password: "1234" };

//   // 請求參數 init:
//   //
//   // 請求方法 POST
//   // 設置表頭
//   // 將編碼後的酬載 置於訊息主體 (Message Body) 中
//   var myInit = {
//     method: 'POST',
//     headers: { 'Content-Type': 'Tapplication/json' },
//     body: data
//   };

//   // 實例請求 -- Request，設置 目標 URI 與 請求參數 init
//   var myRequest = new Request('http://localhost:4000/Users/authenticate', myInit);

//   // 非同步執行 fetch
//   let res = await fetch(myRequest);

//   // 判斷回應狀態碼
//   if (res.ok) {
//     console.log(await res.text());
//   } else {
//     let text = await res.text();
//     console.log(text);
//   }
// }

http.listen(4444);
console.log('server on');