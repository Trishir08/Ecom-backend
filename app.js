
import express from "express";
import cors from "cors";
import productRouter from "./routers/product.route.js";
import multer from "multer";
import path from "path";
import userRouter from './routers/user.route.js';
import fs from 'fs';
import Stripe from 'stripe';

const stripe = new Stripe(); 
const app = express(); 

app.use(cors());
app.use(express.json());

const uploadDir = './upload/images';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
app.use('/images', express.static(uploadDir));

app.post("/upload", upload.single('product'), (req, res) => {
    console.log("fsalfjkahfahoi" ,req.file);  // Logs the file information
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT || 3000}/images/${req.file.filename}`
    });
});


app.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: 'http://localhost:4000/success',
        cancel_url: 'http://localhost:4000/cancel',
      });
  
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// ROUTES 
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

export { app };
