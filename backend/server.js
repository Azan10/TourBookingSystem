const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

async function startServer() {
  const password = process.env.db_password;
  const connectionUrl = `mongodb+srv://azan_11:${password}@cluster0.2nigr81.mongodb.net/`

  try {
    await mongoose.connect(connectionUrl ,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Database');
  } catch (error) {
    console.log('Error connecting to Database:', error);
    return;
  }

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

startServer();
