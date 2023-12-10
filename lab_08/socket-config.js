const initialize = (io) => {
  io.of("/sports").on("connection", (socket) => {
    console.log("Uruchomiłem kanał /sports");
    socket.join("/sports");

    socket.on("message", (msg) => {
      socket.emit("message", msg);
      socket.broadcast.to("/sports").emit("message", msg);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  io.of("/news").on("connection", (socket) => {
    console.log("Uruchomiłem kanał /news");
    socket.join("/news");

    socket.on("message", (msg) => {
      socket.emit("message", msg);
      socket.broadcast.to("/news").emit("message", msg);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

module.exports = initialize;
