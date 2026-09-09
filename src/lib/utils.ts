export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return `₹${cr.replace(/\.00$/, '')} Cr`;
  }
  if (amount >= 100000) {
    const lakh = (amount / 100000).toFixed(2);
    return `₹${lakh.replace(/\.00$/, '')} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getPlotStatusBadgeClass(status: string): string {
  switch (status) {
    case 'AVAILABLE':
      return 'badge-available';
    case 'HOLD':
      return 'badge-hold';
    case 'BOOKED':
      return 'badge-booked';
    case 'SOLD':
      return 'badge-sold';
    case 'BLOCKED':
      return 'badge-blocked';
    default:
      return 'badge-default';
  }
}

export function getLeadStatusBadgeClass(status: string): string {
  switch (status) {
    case 'NEW':
      return 'badge-new';
    case 'CONTACTED':
    case 'INTERESTED':
      return 'badge-contacted';
    case 'FOLLOW_UP':
      return 'badge-followup';
    case 'SITE_VISIT_SCHEDULED':
    case 'SITE_VISIT_DONE':
      return 'badge-visit';
    case 'NEGOTIATION':
    case 'BOOKING':
      return 'badge-negotiation';
    case 'SOLD':
      return 'badge-sold';
    case 'LOST':
      return 'badge-lost';
    default:
      return 'badge-default';
  }
}
