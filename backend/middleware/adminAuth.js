import { requireAuth, requireRole } from './auth.js';

// Repurposed adminAuth to provide backward compatibility for old admin routes
// until they are individually updated to use proper roles if needed.
// By default, admin access is now HOD and INVENTORY_TO.
const adminAuth = [requireAuth, requireRole('HOD', 'INVENTORY_TO')];

export default adminAuth;
