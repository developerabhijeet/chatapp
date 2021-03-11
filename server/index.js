const app= require('express');
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const socketio = require('socket.io');
const io = socketio(http);
const mongoDB = "mongodb+srv://abhijeet:abhijeet27@cluster0.wrxh9.mongodb.net/chat-data?retryWrites=true&w=majority";
mongoose.connect(mongoDB,{useNewUrlParser: true,useUnifiedTopology:true}).then(()=>console.log('connect')).
catch(err=>console.log(err));
const {addUser, getUser, removeUser} = require('./helper');
const PORT = process.env.PORT || 5000;
const Room = require('./models/Room');
io.on('connection', (socket)=>{
  console.log(socket.id);
  Room.find().then(result=>{
    socket.emit('output-rooms',result)
  })
  socket.on('create-room',name=>{
    //console.log('The room name recieved is: ',name)
    const room = new Room({name});
    room.save().then(result=>{
      io.emit('room-created', result)
    })
  })
  socket.on('join',({name,room_id, user_id})=>{
    const {error,user} = addUser({
      socket_id:socket.id,
      name,
      room_id,
      user_id
    })
    socket.join(room_id);
    if(error){
      console.log('join error',error)
    }else{
      console.log('join user', user)
    }
  })
  socket.on('sendMessage',(message,room_id,callback)=>{
    const user = getUser(socket.id);
    const mssgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text:message
    }
    console.log('message',mssgToStore)
    io.to(room_id).emit('message',mssgToStore);
    callback()
  })
  socket.on('disconnect',()=>{
    const user = removeUser(socket.id);
  })
});

http.listen(PORT,()=>{
  console.log(`listening at port ${PORT}`)
});
