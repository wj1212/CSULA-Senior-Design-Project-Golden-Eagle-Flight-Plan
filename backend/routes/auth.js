import express from 'express';
import mongo from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      console.log('Validation failed: missing fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    console.log('Checking for existing user with email:', email);
    const cursor = await mongo.find('users', { email });
    const existingUser = await cursor.toArray();
    console.log('Existing users found:', existingUser.length);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const userData = {
      name,
      email,
      password: hashedPassword,
      gradeLevel: 'Freshman',
      major: '',
      degreeType: 'Bachelor',
      completedCourses: [],
      currentCourses: [],
      careerInterests: [],
      disabilities: [],
      availability: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await mongo.insert('users', userData);
    const userId = result.insertedId;

    // Generate token
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign({ userId: userId.toString() }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: userId,
        name: userData.name,
        email: userData.email,
        gradeLevel: userData.gradeLevel,
        major: userData.major,
        degreeType: userData.degreeType
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const users = await mongo.find('users', { email }).toArray();
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gradeLevel: user.gradeLevel,
        major: user.major,
        degreeType: user.degreeType
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const users = await mongo.find('users', { _id: new mongo.ObjectId(decoded.userId) }).toArray();
    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = users[0];
    delete user.password;

    res.json({
      user
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const {
      gradeLevel,
      major,
      degreeType,
      completedCourses,
      currentCourses,
      careerInterests,
      disabilities,
      availability
    } = req.body;

    const updateData = { updatedAt: new Date() };
    
    if (gradeLevel) updateData.gradeLevel = gradeLevel;
    if (major) updateData.major = major;
    if (degreeType) updateData.degreeType = degreeType;
    if (completedCourses) updateData.completedCourses = completedCourses;
    if (currentCourses) updateData.currentCourses = currentCourses;
    if (careerInterests) updateData.careerInterests = careerInterests;
    if (disabilities) updateData.disabilities = disabilities;
    if (availability) updateData.availability = availability;

    await mongo.update('users', { _id: new mongo.ObjectId(decoded.userId) }, updateData);

    const users = await mongo.find('users', { _id: new mongo.ObjectId(decoded.userId) }).toArray();
    const user = users[0];
    delete user.password;

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const users = await mongo.find('users', { _id: new mongo.ObjectId(decoded.userId) }).toArray();
    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = users[0];
    delete user.password;

    res.json({
      valid: true,
      user
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
