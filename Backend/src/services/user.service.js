import { ODataController } from 'odata-v4-server';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

class UserController extends ODataController {
  async find(query) {
    try {
      const users = await User.find(query).select('-password');
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id, query) {
    try {
      const user = await User.findById(id).select('-password');
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async insert(body) {
    try {
      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);

      const user = new User(body);
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id, body) {
    try {
      // If password is being updated, hash it
      if (body.password) {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
      }

      const user = await User.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      }).select('-password');

      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error('User not found');
      }
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserController;
