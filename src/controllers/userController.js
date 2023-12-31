const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
      name: req.body.name,
      employeeCode: req.body.employeeCode,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      createdAt: req.body.createdAt
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read (get) a single user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: 'roles',
        model: 'Role',
        populate: {
          path: 'programs',
          model: 'Program',
          populate: {
            path: 'module',
            model: 'Module'
          }
        }
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Transform the user data to group programs under modules
    const transformedUser = {
      id: user._id,
      name: user.name,
      employeeCode: user.employeeCode,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      roles: user.roles.map(role => {
        // Group programs by their module
        let modules = {};
        role.programs.forEach(program => {
          const moduleId = program.module._id.toString();
          if (!modules[moduleId]) {
            modules[moduleId] = {
              id: moduleId,
              moduleName: program.module.moduleName,
              programs: []
            };
          }
          modules[moduleId].programs.push({
            id: program._id,
            title: program.title,
            description: program.description,
            path: program.path
          });
        });

        return {
          id: role._id,
          roleName: role.roleName,
          modules: Object.values(modules)
        };
      })
    };

    res.json(transformedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by id
exports.updateUser = async (req, res) => {
  try {
    // If password is being updated, it needs to be hashed
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by id
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

// List all users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Assign roles to a user
exports.addRolesToUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const roleIds = req.body.roleIds; // Expecting an array of role IDs

    // Optional: Validate the role IDs (Check if they exist in the Role collection)

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Assigning roles to the user
    user.roles = roleIds;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
