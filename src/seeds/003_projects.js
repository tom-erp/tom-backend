/**
 * Projects Seed
 * Creates initial projects for testing client purchase orders
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('projects').del();
  
  // Inserts seed entries
  await knex('projects').insert([
    {
      id: 1,
      project_code: 'PJT-2024-TOM-001',
      project_name: 'Marina Bay MEP Installation',
      client_id: 1,
      project_type: 'MEP Prefabrication',
      site_location: 'Marina Bay, Singapore',
      start_date: '2024-01-01',
      end_date: '2024-06-30',
      estimated_budget: 500000.00,
      currency: 'SGD',
      status: 'active',
      description: 'Complete MEP system prefabrication and installation for Marina Bay project',
      created_by: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      deleted_at: null
    },
    {
      id: 2,
      project_code: 'PJT-2024-TOM-002',
      project_name: 'Orchard Road Development',
      client_id: 1,
      project_type: 'Installation',
      site_location: 'Orchard Road, Singapore',
      start_date: '2024-02-01',
      end_date: '2024-08-31',
      estimated_budget: 750000.00,
      currency: 'SGD',
      status: 'active',
      description: 'Electrical and plumbing installation for commercial building',
      created_by: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      deleted_at: null
    },
    {
      id: 3,
      project_code: 'PJT-2024-TOM-003',
      project_name: 'Changi Airport Terminal Expansion',
      client_id: 1,
      project_type: 'MEP Prefabrication',
      site_location: 'Changi Airport, Singapore',
      start_date: '2024-03-01',
      end_date: '2024-12-31',
      estimated_budget: 1200000.00,
      currency: 'SGD',
      status: 'in_progress',
      description: 'HVAC ductwork prefabrication for airport terminal expansion',
      created_by: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      deleted_at: null
    }
  ]);
  
  // Reset sequence to max ID (important when using explicit IDs)
  await knex.raw("SELECT setval('projects_id_seq', COALESCE((SELECT MAX(id) FROM projects), 1), true)");
};