/**
 * Users Seed
 * Creates initial admin user
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  // Insert seed entries
  // Note: Password should be hashed using bcrypt before inserting
  // This is a placeholder - actual password hashing should be done in the service layer
  await knex('users').insert([
    {
      id: 1,
      email: 'admin@tom.com',
      password_hash: 'PLACEHOLDER_HASH', // Replace with actual bcrypt hash
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      status: 'active',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};
