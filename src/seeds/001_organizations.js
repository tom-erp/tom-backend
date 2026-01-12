/**
 * Organizations Seed
 * Creates initial organization(s) for the TOM system
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('organizations').del();
  
  // Inserts seed entries
  await knex('organizations').insert([
    {
      id: 1,
      code: 'TOM',
      name: 'Tech Onshore MEP-Prefabricators',
      type: 'both', // Can be both client and vendor
      registration_number: null,
      tax_id: null,
      contact_person: 'Admin',
      email: 'admin@tom.com',
      phone: '+65 1234 5678',
      address: null,
      city: 'Singapore',
      state: null,
      country: 'Singapore',
      postal_code: null,
      payment_terms: 'Net 30',
      credit_limit: null,
      currency: 'SGD',
      status: 'active',
      notes: 'Primary organization for TOM system',
      created_by: null, // Will be set after users are created
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      deleted_at: null
    }
  ]);
  
  // Reset sequence to max ID (important when using explicit IDs)
  await knex.raw("SELECT setval('organizations_id_seq', COALESCE((SELECT MAX(id) FROM organizations), 1), true)");
};
