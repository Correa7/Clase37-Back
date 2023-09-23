const getChat = (req, res) => {
  let session = req.session.user
  let rol = req.session.user.rol 
  const data = {
    title: "Chat", 
    message: "Ecommerce backend  Index",
    style: "chat.css",
  };
  data[rol]= session
  res.render("chat", data);
}
const getChatError = (req, res) => {
  res.render("error404", {
    style: "error404.css",
    title: "Error 404",
  });
}
 
module.exports = {
  getChat,
  getChatError
}


// router.get("/", isUser, (req, res) => {
//   let session = req.session.user
//   const data = {
//     title: "Chat",
//     message: "Ecommerce backend  Index",
//     style: "chat.css",
//     session:session
//   };
//   res.render("chat", data);
// });

// router.get("*", (req, res) => {
//   res.render("error404", {
//     style: "error404.css",
//     title: "Error 404",
//   });
// });

