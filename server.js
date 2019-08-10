const app = require("./app");
const express = require("express");
const path = require("path");

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// 9229
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on ${port}`));
