/**
 * Add project_id to client_purchase_orders table
 */

exports.up = async function(knex) {
  await knex.raw(`
    ALTER TABLE client_purchase_orders 
    ADD COLUMN project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL
  `);
  
  await knex.raw(`
    CREATE INDEX idx_client_pos_project_id ON client_purchase_orders(project_id)
  `);
};

exports.down = async function(knex) {
  await knex.raw(`
    DROP INDEX IF EXISTS idx_client_pos_project_id
  `);
  
  await knex.raw(`
    ALTER TABLE client_purchase_orders 
    DROP COLUMN IF EXISTS project_id
  `);
};