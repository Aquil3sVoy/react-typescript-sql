const backendUrl = `http://localhost:5000/api`;

/**
 * Frontend Url.
 */
const frontendUrl = {
  host: 'localhost:3000',
  protocol: 'http',
};

/**
 * Tenant Mode
 * multi: Allow new users to create new tenants.
 * multi-with-subdomain: Same as multi, but enable access to the tenant via subdomain.
 * single: One tenant, the first user to register will be the admin.
 */
const tenantMode = 'multi';

/**
 * Plan payments configuration.
 */
const isPlanEnabled = true;
const stripePublishableKey =
  'pk_test_fpUWuCcan9vMHctt7F3DNwjO';

export default {
  frontendUrl,
  backendUrl,
  tenantMode,
  isPlanEnabled,
  stripePublishableKey,
};
