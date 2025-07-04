const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_key');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { authenticateToken, requireRole, JWT_SECRET } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database
const db = new sqlite3.Database('database.sqlite');

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role = 'customer' } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, role],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email already exists' });
          }
          return res.status(500).json({ error: 'Registration failed' });
        }
        
        const token = jwt.sign(
          { id: this.lastID, email, name, role },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        
        res.json({ token, user: { id: this.lastID, email, name, role } });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Login failed' });
    }
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login
    db.run('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      } 
    });
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Influencers routes
app.get('/api/influencers', (req, res) => {
  db.all('SELECT * FROM influencers ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch influencers' });
    }
    res.json(rows.map(row => ({
      ...row,
      recentWork: row.recent_work ? row.recent_work.split(',') : [],
      platforms: row.platforms ? row.platforms.split(',') : []
    })));
  });
});

app.post('/api/influencers', authenticateToken, requireRole(['admin']), (req, res) => {
  const influencer = req.body;
  db.run(
    `INSERT INTO influencers (name, handle, niche, followers, engagement, rating, location, price_range, verified, recent_work, platforms, status, email, bio) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [influencer.name, influencer.handle, influencer.niche, influencer.followers, influencer.engagement, influencer.rating, influencer.location, influencer.priceRange, influencer.verified, influencer.recentWork.join(','), influencer.platforms.join(','), influencer.status, influencer.email, influencer.bio],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create influencer' });
      }
      res.json({ id: this.lastID, ...influencer });
    }
  );
});

// Products routes
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(rows.map(row => ({
      ...row,
      features: row.features ? JSON.parse(row.features) : [],
      influencerContent: row.influencer_content ? JSON.parse(row.influencer_content) : [],
      tags: row.tags ? JSON.parse(row.tags) : []
    })));
  });
});

app.post('/api/products', authenticateToken, requireRole(['admin']), (req, res) => {
  const product = req.body;
  db.run(
    `INSERT INTO products (name, price, category, rating, reviews, image, description, features, conversion_rate, influencer_content, in_stock, tags) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [product.name, product.price, product.category, product.rating, product.reviews, product.image, product.description, JSON.stringify(product.features), product.conversionRate, JSON.stringify(product.influencerContent), product.inStock, JSON.stringify(product.tags)],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create product' });
      }
      res.json({ id: this.lastID, ...product });
    }
  );
});

// Campaigns routes
app.get('/api/campaigns', authenticateToken, (req, res) => {
  db.all('SELECT * FROM campaigns ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
    res.json(rows.map(row => ({
      ...row,
      influencers: row.influencers ? JSON.parse(row.influencers) : [],
      products: row.products ? JSON.parse(row.products) : [],
      metrics: row.metrics ? JSON.parse(row.metrics) : {}
    })));
  });
});

app.post('/api/campaigns', authenticateToken, requireRole(['admin']), (req, res) => {
  const campaign = req.body;
  db.run(
    `INSERT INTO campaigns (name, description, status, progress, reach, engagement, budget, start_date, end_date, influencers, products, metrics) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [campaign.name, campaign.description, campaign.status, campaign.progress, campaign.reach, campaign.engagement, campaign.budget, campaign.startDate, campaign.endDate, JSON.stringify(campaign.influencers), JSON.stringify(campaign.products), JSON.stringify(campaign.metrics)],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create campaign' });
      }
      res.json({ id: this.lastID, ...campaign });
    }
  );
});

// Cart routes
app.get('/api/cart/:userId', authenticateToken, (req, res) => {
  const { userId } = req.params;

  if (req.user.role !== 'admin' && req.user.id.toString() !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  db.all(
    `SELECT c.*, p.name, p.image, p.price as product_price
     FROM cart c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = ?`,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch cart' });
      }
      res.json(rows);
    }
  );
});

app.post('/api/cart', authenticateToken, (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (req.user.role !== 'admin' && req.user.id.toString() !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Check if item already exists in cart
  db.get('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId], (err, existingItem) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add to cart' });
    }

    if (existingItem) {
      // Update quantity
      db.run('UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?', 
        [quantity, userId, productId], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to update cart' });
        }
        res.json({ message: 'Cart updated' });
      });
    } else {
      // Add new item
      db.get('SELECT price FROM products WHERE id = ?', [productId], (err, product) => {
        if (err || !product) {
          return res.status(500).json({ error: 'Product not found' });
        }

        db.run('INSERT INTO cart (user_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [userId, productId, quantity, product.price * quantity],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to add to cart' });
            }
            res.json({ id: this.lastID, userId, productId, quantity, price: product.price * quantity });
          }
        );
      });
    }
  });
});

app.delete('/api/cart/:userId/:productId', authenticateToken, (req, res) => {
  const { userId, productId } = req.params;

  if (req.user.role !== 'admin' && req.user.id.toString() !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  db.run('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to remove from cart' });
    }
    res.json({ message: 'Item removed from cart' });
  });
});

// Payment routes
app.post('/api/payments/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: { userId: req.user.id }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed' });
  }
});

// Orders routes
app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentIntentId } = req.body;

    // Clear cart after successful order
    db.run('DELETE FROM cart WHERE user_id = ?', [req.user.id]);

    db.run(
      `INSERT INTO orders (user_id, total_amount, status, payment_intent_id, shipping_address, items)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, totalAmount, 'completed', paymentIntentId, JSON.stringify(shippingAddress), JSON.stringify(items)],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create order' });
        }
        res.json({
          orderId: this.lastID,
          message: 'Order created successfully'
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Order creation failed' });
  }
});

// Enhanced Analytics routes
app.get('/api/analytics/dashboard', authenticateToken, requireRole(['admin']), (req, res) => {
  const { period = '7d' } = req.query;

  // Get date range based on period
  let dateFilter = '';
  switch (period) {
    case '1d':
      dateFilter = "WHERE date >= date('now', '-1 day')";
      break;
    case '7d':
      dateFilter = "WHERE date >= date('now', '-7 days')";
      break;
    case '30d':
      dateFilter = "WHERE date >= date('now', '-30 days')";
      break;
    case '90d':
      dateFilter = "WHERE date >= date('now', '-90 days')";
      break;
    default:
      dateFilter = "WHERE date >= date('now', '-7 days')";
  }

  // Get revenue data
  db.all(
    `SELECT date, SUM(metric_value) as revenue
     FROM analytics
     ${dateFilter} AND metric_type = 'revenue'
     GROUP BY date
     ORDER BY date`,
    (err, revenueData) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch analytics' });
      }

      // Get conversion data
      db.all(
        `SELECT date, SUM(metric_value) as conversions
         FROM analytics
         ${dateFilter} AND metric_type = 'conversions'
         GROUP BY date
         ORDER BY date`,
        (err, conversionData) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to fetch analytics' });
          }

          // Get top products
          db.all(
            `SELECT p.name, p.category, SUM(a.metric_value) as total_revenue
             FROM analytics a
             JOIN products p ON a.product_id = p.id
             ${dateFilter} AND a.metric_type = 'revenue'
             GROUP BY p.id
             ORDER BY total_revenue DESC
             LIMIT 5`,
            (err, topProducts) => {
              if (err) {
                return res.status(500).json({ error: 'Failed to fetch analytics' });
              }

              // Get campaign performance
              db.all(
                `SELECT c.name, c.status, c.progress, c.reach, c.engagement, c.budget,
                        c.metrics
                 FROM campaigns c
                 ORDER BY c.created_at DESC
                 LIMIT 5`,
                (err, campaigns) => {
                  if (err) {
                    return res.status(500).json({ error: 'Failed to fetch analytics' });
                  }

                  res.json({
                    revenueData,
                    conversionData,
                    topProducts,
                    campaigns: campaigns.map(c => ({
                      ...c,
                      metrics: c.metrics ? JSON.parse(c.metrics) : {}
                    }))
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

app.get('/api/analytics/products/:productId', authenticateToken, requireRole(['admin']), (req, res) => {
  const { productId } = req.params;
  const { period = '30d' } = req.query;

  let dateFilter = '';
  switch (period) {
    case '7d':
      dateFilter = "AND date >= date('now', '-7 days')";
      break;
    case '30d':
      dateFilter = "AND date >= date('now', '-30 days')";
      break;
    case '90d':
      dateFilter = "AND date >= date('now', '-90 days')";
      break;
  }

  db.all(
    `SELECT date, metric_type, metric_value
     FROM analytics
     WHERE product_id = ? ${dateFilter}
     ORDER BY date`,
    [productId],
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch product analytics' });
      }

      // Get product details
      db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch product' });
        }

        res.json({
          product: {
            ...product,
            features: product.features ? JSON.parse(product.features) : [],
            influencerContent: product.influencer_content ? JSON.parse(product.influencer_content) : [],
            tags: product.tags ? JSON.parse(product.tags) : []
          },
          analytics: data
        });
      });
    }
  );
});

app.get('/api/analytics/revenue', authenticateToken, requireRole(['admin']), (req, res) => {
  const { period = '30d' } = req.query;

  let dateFilter = '';
  switch (period) {
    case '7d':
      dateFilter = "WHERE date >= date('now', '-7 days')";
      break;
    case '30d':
      dateFilter = "WHERE date >= date('now', '-30 days')";
      break;
    case '90d':
      dateFilter = "WHERE date >= date('now', '-90 days')";
      break;
  }

  db.all(
    `SELECT
       date,
       SUM(CASE WHEN metric_type = 'revenue' THEN metric_value ELSE 0 END) as revenue,
       SUM(CASE WHEN metric_type = 'conversions' THEN metric_value ELSE 0 END) as conversions
     FROM analytics
     ${dateFilter}
     GROUP BY date
     ORDER BY date`,
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch revenue data' });
      }
      res.json(data);
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 