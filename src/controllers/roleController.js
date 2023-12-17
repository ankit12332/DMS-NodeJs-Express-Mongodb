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
                populate: {
                    path: 'module',
                    model: 'Module'
                }
            });

        // Transforming the data to group programs under modules
        const transformedRoles = roles.map(role => {
            let modules = {};

            role.programs.forEach(program => {
                const moduleId = program.module._id.toString();
                if (!modules[moduleId]) {
                    modules[moduleId] = {
                        moduleName: program.module.moduleName,
                        programs: []
                    };
                }
                modules[moduleId].programs.push({
                    title: program.title,
                    description: program.description,
                    path: program.path
                });
            });

            return {
                roleName: role.roleName,
                modules: Object.values(modules)
            };
        });

        res.status(200).send(transformedRoles);
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