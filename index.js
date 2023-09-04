const express = require('express');
const mongoose =require("mongoose")
const dbconnect = require('./config/dbconnect');
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 2000;
mongoose.set('strictQuery', false)
const authRouter = require("./routes/authRoutes");
const registercompanyRouter = require("./routes/registercompanyRouter");
const postingjobRouter = require("./routes/postingjobRouter");
const artistRouter = require("./routes/artistRouter");
const FunctionalareaRouter = require("./routes/functionalareaRouter");
const ArtworkcatRouter = require("./routes/artworkcatRouter");
const ArtworkRouter = require("./routes/artworkRouter");
const DashboardRouter = require("./routes/dashboardRouter");
const recruiterRouter = require("./routes/recruiterRouter");
const chatRouter = require("./routes/chatRouter");
const messageRouter = require("./routes/messageRouter");

const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { default: mongoose } = require('mongoose');
// const multer = require("multer");
dbconnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/api/user", authRouter);
app.use("/api/registercompany", registercompanyRouter);
app.use("/api/job", postingjobRouter);
app.use("/api/artist", artistRouter);
app.use("/api/recruiter", recruiterRouter);
app.use("/api/functionalarea", FunctionalareaRouter);
app.use("/api/artwork", ArtworkRouter);
app.use("/api/dashboard", DashboardRouter);
app.use("/api/artwork", recruiterRouter);
app.use("/api/artworkcat", ArtworkcatRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);






app.get("/", (req, res) => {
});
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
})