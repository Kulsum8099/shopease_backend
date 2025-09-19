const mongoose = require('mongoose');
require('dotenv').config();

// Import all your models
const { User } = require('./src/app/modules/auth/auth.model');
const { Product } = require('./src/app/modules/product/product.model');
const { Order } = require('./src/app/modules/order/order.model');
const { Category } = require('./src/app/modules/category/category.model');
const { Brand } = require('./src/app/modules/brand/brand.model');
const { Material } = require('./src/app/modules/material/material.model');
const { Contact } = require('./src/app/modules/contact/contact.model');

async function viewDatabase() {
  try {
    // Connect to MongoDB
    const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/shopease';
    console.log('🔌 Connecting to database:', databaseUrl);
    
    await mongoose.connect(databaseUrl);
    console.log('✅ Connected to MongoDB successfully!\n');

    // Get database stats
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('📊 DATABASE OVERVIEW');
    console.log('==================');
    console.log(`Database Name: ${db.databaseName}`);
    console.log(`Total Collections: ${collections.length}\n`);

    // Show each collection with sample data
    for (const collection of collections) {
      const collectionName = collection.name;
      const count = await db.collection(collectionName).countDocuments();
      
      console.log(`📁 Collection: ${collectionName}`);
      console.log(`   Documents: ${count}`);
      
      if (count > 0) {
        console.log('   Sample Document:');
        const sample = await db.collection(collectionName).findOne();
        console.log('   ', JSON.stringify(sample, null, 2).substring(0, 200) + '...');
      }
      console.log('');
    }

    // Show specific data for each model
    console.log('🔍 DETAILED COLLECTION DATA');
    console.log('============================\n');

    // Users
    const userCount = await User.countDocuments();
    console.log(`👥 USERS (${userCount} total)`);
    if (userCount > 0) {
      const users = await User.find().limit(3).select('-password');
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.fullName || 'No name'} (${user.email}) - Role: ${user.role}`);
      });
    }
    console.log('');

    // Products
    const productCount = await Product.countDocuments();
    console.log(`🛍️ PRODUCTS (${productCount} total)`);
    if (productCount > 0) {
      const products = await Product.find().limit(3);
      products.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name} - $${product.price} - Stock: ${product.stock}`);
      });
    }
    console.log('');

    // Orders
    const orderCount = await Order.countDocuments();
    console.log(`📦 ORDERS (${orderCount} total)`);
    if (orderCount > 0) {
      const orders = await Order.find().limit(3).populate('user', 'email fullName');
      orders.forEach((order, index) => {
        console.log(`   ${index + 1}. Order #${order._id} - User: ${order.user?.email} - Status: ${order.orderStatus}`);
      });
    }
    console.log('');

    // Categories
    const categoryCount = await Category.countDocuments();
    console.log(`📂 CATEGORIES (${categoryCount} total)`);
    if (categoryCount > 0) {
      const categories = await Category.find().limit(5);
      categories.forEach((category, index) => {
        console.log(`   ${index + 1}. ${category.name}`);
      });
    }
    console.log('');

    // Brands
    const brandCount = await Brand.countDocuments();
    console.log(`🏷️ BRANDS (${brandCount} total)`);
    if (brandCount > 0) {
      const brands = await Brand.find().limit(5);
      brands.forEach((brand, index) => {
        console.log(`   ${index + 1}. ${brand.name} - Active: ${brand.activeStatus}`);
      });
    }
    console.log('');

    // Materials
    const materialCount = await Material.countDocuments();
    console.log(`🧱 MATERIALS (${materialCount} total)`);
    if (materialCount > 0) {
      const materials = await Material.find().limit(5);
      materials.forEach((material, index) => {
        console.log(`   ${index + 1}. ${material.name}`);
      });
    }
    console.log('');

    // Contacts
    const contactCount = await Contact.countDocuments();
    console.log(`📞 CONTACTS (${contactCount} total)`);
    if (contactCount > 0) {
      const contacts = await Contact.find().limit(3);
      contacts.forEach((contact, index) => {
        console.log(`   ${index + 1}. ${contact.name} - ${contact.email} - ${contact.subject}`);
      });
    }

  } catch (error) {
    console.error('❌ Error connecting to database:', error.message);
    console.log('\n💡 TROUBLESHOOTING:');
    console.log('1. Make sure MongoDB is running on your computer');
    console.log('2. Check your DATABASE_URL in .env file');
    console.log('3. If using MongoDB Atlas, check your connection string');
    console.log('4. Make sure you have internet connection (for cloud databases)');
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

// Run the script
viewDatabase();

