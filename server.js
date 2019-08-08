const app = require("./app");

// 9229
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on ${port}`));
