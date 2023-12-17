const Role = require('../models/role');
const Program = require('../models/program')

// Create a new role
exports.createRole = async (req, res) => {
    try {
        const newRole = new Role(req.body);
        await newRole.save();
        res.status(201).send(newRole);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).send({ error: error.message }); // Send more detailed error
    }
};

// Get a list of all roles with program details and selected fields
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({})
            .populate({
                path: 'programs',
                model: 'Program',
                select: 'title description path module _id', // Excluding the _id and roles of programs
                populate: {
                    path: 'module',
                    model: 'Module',
                    select: 'moduleName _id' // Selecting only moduleName and excluding _id
                }
            })
            .select('roleName programs _id'); // Selecting roleName and programs, excluding _id of role

        res.status(200).send(roles);
    } catch (error) {
        res.status(500).send(error);
    }
};


// Get a single role by ID
exports.getRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).send();
        }
        res.send(role);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a role
exports.updateRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!role) {
            return res.status(404).send();
        }
        res.send(role);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            return res.status(404).send();
        }
        res.send(role);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Add multiple programs to a role
exports.addProgramsToRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.roleId);
        if (!role) {
            return res.status(404).send({ error: 'Role not found' });
        }

        const programIdsToSet = req.body.programIds; // Expecting an array of program IDs

        // Validate each program ID and check for duplicates
        const validatedProgramIds = new Set(); // Using a Set to avoid duplicates
        for (const programId of programIdsToSet) {
            const program = await Program.findById(programId);
            if (!program) {
                return res.status(404).send({ error: `Program not found: ${programId}` });
            }
            validatedProgramIds.add(programId);
        }

        // Set the role's programs to the new array of validated program IDs
        role.programs = Array.from(validatedProgramIds);
        await role.save();
        res.status(200).send(role);
    } catch (error) {
        res.status(500).send(error);
    }
};