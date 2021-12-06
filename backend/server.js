// const io = require('socket.io')(3000)
const io = require('socket.io')( 5000 , {
    cors : {origin:"*"
}}
);

var users_count = 0 ;

io.on('connection' , socket =>{

    ++users_count;
    io.emit('users_count' , users_count);

    socket.on('disconnect' , function (){
        --users_count;                  
        io.emit('users_count' , users_count);

    });


    console.log(socket.id)
    // socket.on('custom-event' , (number, string , obj) => {
    //     console.log(number , string , obj)
    // })

   socket.emit('fetch_id',socket.id)

    // / take time function from client 
    socket.on('send-time-words-name' , (timeElapsed , correctWords , value) => {
      
        // send time to client (this will tell server to send time to every single socket)
        io.emit('received-time-words-name', timeElapsed , correctWords , value)
        // to all client +client who send 

        // if(room === ' '){
        // socket.broadcast.emit('received-time-words-name', timeElapsed , correctWords , value)
        // only to other not to one who send
    
        console.log("t " + timeElapsed);
        console.log("C " + correctWords);
        console.log("n " + value);

        // const minutes = timeElapsed/60;
        // const speed = ((correctWords/minutes) || 0 ).toFixed(2)
        // console.log("s " + speed);

    })
    


    
})


// console.log("hieeee");