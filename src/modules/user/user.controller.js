/**
 * User Controller
 * HTTP request/response handling for users
 */

const asyncHandler = require('../../utils/helpers/async-handler');
const UserService = require('./user.service');

class UserController {
  constructor() {
    this.service = new UserService();
  }

  /**
   * Get all users
   * GET /users
   */
  findAll = asyncHandler(async (req, res) => {
    const filters = req.query;
    const users = await this.service.findAll(filters);
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  });

  /**
   * Get user by ID
   * GET /users/:id
   */
  findById = asyncHandler(async (req, res) => {
    const user = await this.service.findById(req.params.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  });

  /**
   * Get user with organization
   * GET /users/:id/organization
   */
  findWithOrganization = asyncHandler(async (req, res) => {
    const user = await this.service.findWithOrganization(req.params.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  });

  /**
   * Create new user
   * POST /users
   */
  create = asyncHandler(async (req, res) => {
    const user = await this.service.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  });

  /**
   * Update user
   * PUT /users/:id
   */
  update = asyncHandler(async (req, res) => {
    const user = await this.service.update(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  });

  /**
   * Delete user
   * DELETE /users/:id
   */
  delete = asyncHandler(async (req, res) => {
    await this.service.delete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  });

  /**
   * Get users by role
   * GET /users/role/:role
   */
  findByRole = asyncHandler(async (req, res) => {
    const users = await this.service.findByRole(req.params.role);
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  });

  /**
   * Get users by organization
   * GET /users/organization/:organizationId
   */
  findByOrganization = asyncHandler(async (req, res) => {
    const users = await this.service.findByOrganization(req.params.organizationId);
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  });
}

module.exports = new UserController();
