require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');
const admin = require('firebase-admin');
const port = process.env.PORT || 4000;
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString(
  'utf8'
);
const serviceAccount = JSON.parse(decoded);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// connect database first
connectDB();

app.listen(port, () => {
  console.log(`Warm Food server running `);
});
