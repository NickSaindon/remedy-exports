import  mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true  },
        color: { type: String, required: true },
        imageOne: {  type: String, required: true },
        imageTwo: {  type: String, required: true },
        imageThree: {  type: String, required: true },
        imageFour: {  type: String, required: true },
        price: { type: Number, required: true },
        countInTons: { type: Number, required: true, default: 100 },
        description: { type: String, required: true },
        benefits: { type: String, required: true },
    }, 
    {
        timestamps: true
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;