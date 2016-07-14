export const STATUSES = {
  active: 'active',
  closed: 'closed',
};

export function chechStatus(status): boolean {
  if (Object.keys(STATUSES).indexOf(status) === -1) return false;
  return true;
}
