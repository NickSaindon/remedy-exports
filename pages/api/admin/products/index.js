import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: 'product name',
    slug: 'product-slug-' + Math.random(),
    color: 'product color',
    imageOne: '/images/maeng-da-red1.jpg',
    imageTwo: '/images/maeng-da-red2.jpg',
    imageThree: '/images/maeng-da-red3.jpg',
    imageFour: '/images/maeng-da-powder.jpg',
    price: 15,
    countInTons: 100,
    description: 'product description',
    benefits: 'product benefits',
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Product Created', product });
});

export default handler;