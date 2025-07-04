const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('database.sqlite');

// Create tables
db.serialize(() => {
  // Users table for authentication
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
  )`);

  // Influencers table
  db.run(`CREATE TABLE IF NOT EXISTS influencers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    handle TEXT UNIQUE NOT NULL,
    niche TEXT NOT NULL,
    followers TEXT NOT NULL,
    engagement TEXT NOT NULL,
    rating REAL DEFAULT 0,
    location TEXT,
    price_range TEXT,
    verified BOOLEAN DEFAULT 0,
    recent_work TEXT,
    platforms TEXT,
    status TEXT DEFAULT 'active',
    email TEXT,
    bio TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    rating REAL DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    image TEXT,
    description TEXT,
    features TEXT,
    conversion_rate TEXT,
    influencer_content TEXT,
    in_stock BOOLEAN DEFAULT 1,
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Campaigns table
  db.run(`CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'planning',
    progress INTEGER DEFAULT 0,
    reach INTEGER DEFAULT 0,
    engagement TEXT,
    budget REAL,
    start_date TEXT,
    end_date TEXT,
    influencers TEXT,
    products TEXT,
    metrics TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Cart table
  db.run(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    price REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  )`);

  // Orders table
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_intent_id TEXT,
    shipping_address TEXT,
    items TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Analytics table for detailed reporting
  db.run(`CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    metric_type TEXT NOT NULL,
    metric_value REAL NOT NULL,
    product_id INTEGER,
    campaign_id INTEGER,
    influencer_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert sample users
  const sampleUsers = [
    {
      email: 'admin@postse.com',
      password: bcrypt.hashSync('admin123', 10),
      name: 'Admin User',
      role: 'admin'
    },
    {
      email: 'customer@example.com',
      password: bcrypt.hashSync('customer123', 10),
      name: 'John Customer',
      role: 'customer'
    },
    {
      email: 'influencer@example.com',
      password: bcrypt.hashSync('influencer123', 10),
      name: 'Sarah Johnson',
      role: 'influencer'
    }
  ];

  const insertUser = db.prepare('INSERT OR IGNORE INTO users (email, password, name, role) VALUES (?, ?, ?, ?)');
  sampleUsers.forEach(user => {
    insertUser.run(user.email, user.password, user.name, user.role);
  });
  insertUser.finalize();

  // Insert sample influencers
  const sampleInfluencers = [
    {
      name: 'Sarah Johnson',
      handle: '@sarahjstyle',
      niche: 'Fashion & Lifestyle',
      followers: '125K',
      engagement: '4.8%',
      rating: 4.9,
      location: 'Los Angeles, CA',
      price_range: '$500-$2000',
      verified: 1,
      recent_work: 'Nike, Zara, Sephora',
      platforms: 'Instagram,TikTok,YouTube',
      status: 'active',
      email: 'sarah@example.com',
      bio: 'Fashion influencer helping brands connect with their audience'
    },
    {
      name: 'Mike Chen',
      handle: '@techmikechen',
      niche: 'Technology',
      followers: '89K',
      engagement: '3.2%',
      rating: 4.7,
      location: 'San Francisco, CA',
      price_range: '$800-$3000',
      verified: 1,
      recent_work: 'Apple, Samsung, Google',
      platforms: 'YouTube,Instagram,Twitter',
      status: 'active',
      email: 'mike@example.com',
      bio: 'Tech reviewer and gadget enthusiast'
    },
    {
      name: 'Emma Davis',
      handle: '@emmadavislife',
      niche: 'Lifestyle & Wellness',
      followers: '67K',
      engagement: '5.1%',
      rating: 4.8,
      location: 'New York, NY',
      price_range: '$400-$1500',
      verified: 1,
      recent_work: 'Lululemon, Whole Foods, Peloton',
      platforms: 'Instagram,TikTok',
      status: 'active',
      email: 'emma@example.com',
      bio: 'Wellness advocate sharing healthy living tips'
    },
    {
      name: 'Alex Rodriguez',
      handle: '@alexfitness',
      niche: 'Fitness & Health',
      followers: '156K',
      engagement: '6.3%',
      rating: 4.9,
      location: 'Miami, FL',
      price_range: '$600-$2500',
      verified: 1,
      recent_work: 'Nike, Gatorade, Fitbit',
      platforms: 'Instagram,YouTube,TikTok',
      status: 'active',
      email: 'alex@example.com',
      bio: 'Fitness coach and nutrition expert'
    }
  ];

  const insertInfluencer = db.prepare(`
    INSERT OR IGNORE INTO influencers 
    (name, handle, niche, followers, engagement, rating, location, price_range, verified, recent_work, platforms, status, email, bio) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  sampleInfluencers.forEach(influencer => {
    insertInfluencer.run(
      influencer.name, influencer.handle, influencer.niche, influencer.followers,
      influencer.engagement, influencer.rating, influencer.location, influencer.price_range,
      influencer.verified, influencer.recent_work, influencer.platforms, influencer.status,
      influencer.email, influencer.bio
    );
  });
  insertInfluencer.finalize();

  // Insert sample products
  const sampleProducts = [
    {
      name: 'Wireless Premium Headphones',
      price: 299,
      category: 'Technology',
      rating: 4.8,
      reviews: 342,
      image: '/placeholder.svg',
      description: 'Premium wireless headphones with industry-leading noise cancellation',
      features: JSON.stringify(['Noise Cancellation', '30-hour battery', 'Premium comfort']),
      conversion_rate: '8.4%',
      influencer_content: JSON.stringify([
        { name: 'Mike Chen', handle: '@techmikechen', contentType: 'video', views: '45K', engagement: '4.2%' },
        { name: 'Sarah Johnson', handle: '@sarahjstyle', contentType: 'story', views: '23K', engagement: '5.1%' }
      ]),
      in_stock: 1,
      tags: JSON.stringify(['wireless', 'audio', 'premium'])
    },
    {
      name: 'Sustainable Fashion Jacket',
      price: 189,
      category: 'Fashion',
      rating: 4.9,
      reviews: 187,
      image: '/placeholder.svg',
      description: 'Eco-friendly fashion jacket made from sustainable materials',
      features: JSON.stringify(['Eco-friendly materials', 'Versatile design', 'Durable construction']),
      conversion_rate: '12.1%',
      influencer_content: JSON.stringify([
        { name: 'Emma Davis', handle: '@emmadavislife', contentType: 'reel', views: '67K', engagement: '6.3%' },
        { name: 'Sarah Johnson', handle: '@sarahjstyle', contentType: 'post', views: '34K', engagement: '4.8%' }
      ]),
      in_stock: 1,
      tags: JSON.stringify(['fashion', 'sustainable', 'jacket'])
    },
    {
      name: 'Organic Protein Powder',
      price: 79,
      category: 'Health & Fitness',
      rating: 4.6,
      reviews: 523,
      image: '/placeholder.svg',
      description: 'High-quality organic protein powder for fitness enthusiasts',
      features: JSON.stringify(['25g protein per serving', 'No artificial additives', 'Great taste']),
      conversion_rate: '15.3%',
      influencer_content: JSON.stringify([
        { name: 'Alex Rodriguez', handle: '@alexfitness', contentType: 'video', views: '89K', engagement: '7.2%' },
        { name: 'Emma Davis', handle: '@emmadavislife', contentType: 'story', views: '41K', engagement: '5.9%' }
      ]),
      in_stock: 1,
      tags: JSON.stringify(['health', 'protein', 'organic'])
    }
  ];

  const insertProduct = db.prepare(`
    INSERT OR IGNORE INTO products 
    (name, price, category, rating, reviews, image, description, features, conversion_rate, influencer_content, in_stock, tags) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  sampleProducts.forEach(product => {
    insertProduct.run(
      product.name, product.price, product.category, product.rating, product.reviews,
      product.image, product.description, product.features, product.conversion_rate,
      product.influencer_content, product.in_stock, product.tags
    );
  });
  insertProduct.finalize();

  // Insert sample campaigns
  const sampleCampaigns = [
    {
      name: 'Summer Fashion Collection',
      description: 'Promoting our latest summer fashion line with top influencers',
      status: 'active',
      progress: 75,
      reach: 250000,
      engagement: '4.2%',
      budget: 15000,
      start_date: '2024-06-01',
      end_date: '2024-08-31',
      influencers: JSON.stringify(['1', '2']),
      products: JSON.stringify(['2']),
      metrics: JSON.stringify({
        impressions: 250000,
        clicks: 12500,
        conversions: 1875,
        roi: 2.5
      })
    },
    {
      name: 'Tech Gadgets Launch',
      description: 'Launch campaign for new wireless headphones',
      status: 'active',
      progress: 60,
      reach: 180000,
      engagement: '3.8%',
      budget: 12000,
      start_date: '2024-07-01',
      end_date: '2024-09-30',
      influencers: JSON.stringify(['2', '3']),
      products: JSON.stringify(['1']),
      metrics: JSON.stringify({
        impressions: 180000,
        clicks: 9000,
        conversions: 1350,
        roi: 2.1
      })
    }
  ];

  const insertCampaign = db.prepare(`
    INSERT OR IGNORE INTO campaigns 
    (name, description, status, progress, reach, engagement, budget, start_date, end_date, influencers, products, metrics) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  sampleCampaigns.forEach(campaign => {
    insertCampaign.run(
      campaign.name, campaign.description, campaign.status, campaign.progress,
      campaign.reach, campaign.engagement, campaign.budget, campaign.start_date,
      campaign.end_date, campaign.influencers, campaign.products, campaign.metrics
    );
  });
  insertCampaign.finalize();

  // Insert sample analytics data
  const sampleAnalytics = [
    { date: '2024-07-01', metric_type: 'revenue', metric_value: 12500, product_id: 1 },
    { date: '2024-07-01', metric_type: 'revenue', metric_value: 8900, product_id: 2 },
    { date: '2024-07-01', metric_type: 'revenue', metric_value: 6700, product_id: 3 },
    { date: '2024-07-02', metric_type: 'revenue', metric_value: 14200, product_id: 1 },
    { date: '2024-07-02', metric_type: 'revenue', metric_value: 10200, product_id: 2 },
    { date: '2024-07-02', metric_type: 'revenue', metric_value: 7800, product_id: 3 },
    { date: '2024-07-03', metric_type: 'revenue', metric_value: 11800, product_id: 1 },
    { date: '2024-07-03', metric_type: 'revenue', metric_value: 9500, product_id: 2 },
    { date: '2024-07-03', metric_type: 'revenue', metric_value: 7200, product_id: 3 },
    { date: '2024-07-01', metric_type: 'conversions', metric_value: 125, product_id: 1 },
    { date: '2024-07-01', metric_type: 'conversions', metric_value: 89, product_id: 2 },
    { date: '2024-07-01', metric_type: 'conversions', metric_value: 67, product_id: 3 },
    { date: '2024-07-02', metric_type: 'conversions', metric_value: 142, product_id: 1 },
    { date: '2024-07-02', metric_type: 'conversions', metric_value: 102, product_id: 2 },
    { date: '2024-07-02', metric_type: 'conversions', metric_value: 78, product_id: 3 }
  ];

  const insertAnalytics = db.prepare(`
    INSERT OR IGNORE INTO analytics 
    (date, metric_type, metric_value, product_id) 
    VALUES (?, ?, ?, ?)
  `);
  
  sampleAnalytics.forEach(analytics => {
    insertAnalytics.run(analytics.date, analytics.metric_type, analytics.metric_value, analytics.product_id);
  });
  insertAnalytics.finalize();

  console.log('Database initialized successfully!');
});

db.close();
