const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: true,
		});
		console.log("DB CONNECTED");
	} catch (error) {
		console.error(`Error:${error.message}`);
		process.exit(1);
	}
};
module.exports = connectDB;
