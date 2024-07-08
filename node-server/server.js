const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoURI = 'mongodb+srv://ivatti2184:IVATTI2184@test.ouhuooi.mongodb.net/?retryWrites=true&w=majority&appName=Test';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/accounts', accountRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
