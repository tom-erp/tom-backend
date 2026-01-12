/**
 * Users Seed
 * Creates initial admin user for the TOM system
 */

const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  // Hash password for admin user
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash('admin123', saltRounds);
  
  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      email: 'admin@tom.com',
      password_hash: passwordHash,
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      organization_id: 1, // References organization created in 001_organizations.js
      phone: null,
      department: 'IT',
      status: 'active',
      last_login_at: null,
      email_verified_at: null,
      created_by: null, // Self-created
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      deleted_at: null
    }
  ]);
  
  // Reset sequence to max ID (important when using explicit IDs)
  await knex.raw("SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1), true)");
};
