const app = require("./app");

app.listen(app.get("port"), () => {
  console.log(
    `Server ${app.get("appName")}  is listening on port: ${app.get("port")}`
  );
});
