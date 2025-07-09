import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// -----------------------
// REGISTER CONTROLLER
// -----------------------
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, password: hashedPassword });

    // ✅ Include name & email in token payload
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// -----------------------
// LOGIN CONTROLLER
// -----------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // ✅ Include name & email in token payload
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// -----------------------
// GET LOGGED-IN USER
// -----------------------
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch user" });
  }
};
