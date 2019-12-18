const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const documents = {};
const rooms = [];

io.on("connection", socket => {
  console.log('a user connected');
  socket.on("disconnect", () => {
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

  /** 建立房間 */
  socket.on("createRoom", room => {
    rooms.push(room);
    io.emit("rooms", rooms);
  });

  /** 加入房間 */
  socket.on("joinRoom", room => {
    const theRoom = rooms.find(x => x == room);
    console.log(theRoom);
    // theRoom.playersCount++;
    console.log(room);
    console.log(rooms);
    io.emit("rooms", rooms);
  });

  /** 離開房間 */
  socket.on("leftRoom", roomId => {
    const theRoom = rooms.find(x => x.roomId == roomId);
    theRoom.playersCount--;

    // 若房間沒人則移除房間
    if (theRoom.playersCount == 0) {
      rooms.splice(rooms.indexOf(theRoom), 1);
    }

    io.emit("rooms", rooms);
  });

  io.emit("documents", Object.keys(documents));
  io.emit("rooms", rooms);
});

http.listen(4444);
console.log('server on');