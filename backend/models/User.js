import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // Academic Information
  gradeLevel: {
    type: String,
    enum: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
    default: 'Freshman'
  },
  major: {
    type: String,
    default: ''
  },
  degreeType: {
    type: String,
    enum: ['Bachelor', 'Master', 'PhD'],
    default: 'Bachelor'
  },
  // Course Tracking
  completedCourses: [{
    type: String
  }],
  currentCourses: [{
    type: String
  }],
  // Career and Interests
  careerInterests: [{
    type: String
  }],
  // Accessibility
  disabilities: [{
    type: String
  }],
  // Availability
  availability: [{
    day: String,
    slot: String
  }],
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update updatedAt on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('User', userSchema, 'users');
