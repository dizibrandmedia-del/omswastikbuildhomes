import React from 'react';
import initialLeads from '@/lib/initialLeads.json';
import LeadDetailClient from './LeadDetailClient';

export function generateStaticParams() {
  return initialLeads.map((l: any) => ({ id: l.id }));
}

interface LeadDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  return <LeadDetailClient id={id} />;
}
