import { Schema, model } from 'mongoose';
import { IProduct, productModel } from './product.interface';
import slugify from 'slugify';
const colorEnum = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'purple', 'orange', 'pink', 'gray'];
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: 'string',
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    price: {
      type: 'number',
      required: true,
    },
    stock: {
      type: 'number',
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    activeStatus: {
      type: 'boolean',
      default: true,
    },
    features: {
      type: String,
    },
    color: {
      type: String,
      enum: colorEnum,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

productSchema.pre('save', async function (next) {
  if (this.isModified('name') || !this.slug) {
    const baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await Product.exists({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }
  next();
});

export const Product = model<IProduct, productModel>('Product', productSchema);
