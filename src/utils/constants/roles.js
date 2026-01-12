/**
 * User Roles Constants
 * All available roles in the TOM system
 */

const ROLES = {
  ADMIN: 'admin',
  SALES_EXECUTIVE: 'sales_executive',
  SALES_MANAGER: 'sales_manager',
  PROJECT_MANAGER: 'project_manager',
  PROCUREMENT_OFFICER: 'procurement_officer',
  SITE_ENGINEER: 'site_engineer',
  FINANCE_OFFICER: 'finance_officer',
  QC_OFFICER: 'qc_officer',
  WORKSHOP_SUPERVISOR: 'workshop_supervisor',
  HR_OFFICER: 'hr_officer'
};

/**
 * Array of all valid roles
 */
const VALID_ROLES = Object.values(ROLES);

/**
 * Role descriptions
 */
const ROLE_DESCRIPTIONS = {
  [ROLES.ADMIN]: 'System Administrator - Full system access',
  [ROLES.SALES_EXECUTIVE]: 'Sales Executive - Handle sales enquiries and quotations',
  [ROLES.SALES_MANAGER]: 'Sales Manager - Oversee sales team and approve quotations',
  [ROLES.PROJECT_MANAGER]: 'Project Manager - Manage projects and coordinate resources',
  [ROLES.PROCUREMENT_OFFICER]: 'Procurement Officer - Manage purchase requests and orders',
  [ROLES.SITE_ENGINEER]: 'Site Engineer - Site operations and WIP tracking',
  [ROLES.FINANCE_OFFICER]: 'Finance Officer - Invoice and payment management',
  [ROLES.QC_OFFICER]: 'Quality Control Officer - Inspection and GRN processing',
  [ROLES.WORKSHOP_SUPERVISOR]: 'Workshop Supervisor - Production and material tracking',
  [ROLES.HR_OFFICER]: 'HR Officer - User management and attendance tracking'
};

/**
 * Check if a role is valid
 */
const isValidRole = (role) => {
  return VALID_ROLES.includes(role);
};

/**
 * Check if user has admin role
 */
const isAdmin = (role) => {
  return role === ROLES.ADMIN;
};

module.exports = {
  ROLES,
  VALID_ROLES,
  ROLE_DESCRIPTIONS,
  isValidRole,
  isAdmin
};
