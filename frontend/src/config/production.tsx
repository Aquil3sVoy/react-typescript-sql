// Place the URL here with the /api suffix.
// Ex.:`https://domain.com/api`;
const backendUrl = `https://legalpro-71a99-7myibb5zga-uc.a.run.app/api`;

/**
 * Frontend URL.
 */
const frontendUrl = {
  host: 'legalpro-71a99.web.app',
  protocol: 'https',
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
const stripePublishableKey = 'pk_test_fpUWuCcan9vMHctt7F3DNwjO';

export default {
  frontendUrl,
  backendUrl,
  tenantMode,
  isPlanEnabled,
  stripePublishableKey
};
