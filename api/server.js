const express = require('express');
const morgan = require('morgan');
const pkg = require('./package.json');
const app = express();

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/index');

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(console.log('Connected to MongoDB'))
  .catch(err => console.log(`========== Connection issue with MongoDB ========== ${err}`));

app.use('/api/auth', routes.auth);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});