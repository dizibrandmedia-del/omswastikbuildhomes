'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatCurrency, getPlotStatusBadgeClass } from '@/lib/utils';
import { Filter, Compass, ArrowRight, ShieldCheck, Check, Search, Eye, Sparkles } from 'lucide-react';
import EnquiryModal from './EnquiryModal';
import ScheduleVisitModal from './ScheduleVisitModal';

interface PlotData {
  id: string;
  plotNumber: string;
  projectId: string;
  projectName?: string;
  sizeSqYd: number;
  sizeSqFt: number;
  lengthFt: number | null;
  widthFt: number | null;
  facing: string;
  roadWidthFt: number;
  isCorner: boolean;
  isParkFacing: boolean;
  isMainRoadFacing: boolean;
  priceTotal: number;
  pricePerUnit: number;
  bookingAmount: number;
  status: string;
  remarks: string | null;
}

interface PlotInventoryViewerProps {
  plots: PlotData[];
  projectName?: string;
  projectId?: string;
}

export default function PlotInventoryViewer({
  plots,
  projectName = 'Riddhi Premium Plots',
  projectId,
}: PlotInventoryViewerProps) {
  const [selectedFacing, setSelectedFacing] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedSize, setSelectedSize] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [onlyCorners, setOnlyCorners] = useState<boolean>(false);
  const [onlyParks, setOnlyParks] = useState<boolean>(false);

  // Modal controls
  const [enquiryPlot, setEnquiryPlot] = useState<PlotData | null>(null);
  const [visitPlot, setVisitPlot] = useState<PlotData | null>(null);

  // Filter logic
  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      // Search filter
      if (searchTerm && !plot.plotNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      // Facing filter
      if (selectedFacing !== 'ALL' && plot.facing !== selectedFacing) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'ALL' && plot.status !== selectedStatus) {
        return false;
      }
      // Size filter
      if (selectedSize === '150' && plot.sizeSqYd !== 150) return false;
      if (selectedSize === '200' && plot.sizeSqYd !== 200) return false;
      if (selectedSize === '250+' && plot.sizeSqYd < 250) return false;
      // Corner filter
      if (onlyCorners && !plot.isCorner) return false;
      // Park filter
      if (onlyParks && !plot.isParkFacing) return false;

      return true;
    });
  }, [plots, searchTerm, selectedFacing, selectedStatus, selectedSize, onlyCorners, onlyParks]);

  const availableCount = plots.filter((p) => p.status === 'AVAILABLE').length;
  const holdCount = plots.filter((p) => p.status === 'HOLD').length;
  const bookedCount = plots.filter((p) => p.status === 'BOOKED' || p.status === 'SOLD').length;

  return (
    <div style={{ width: '100%' }}>
      {/* Inventory KPI Summary Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600 }}>Total Plots Cataloged</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)' }}>
            {plots.length} Units
          </div>
        </div>

        <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '12px', border: '1px solid #bbf7d0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#166534', fontWeight: 600 }}>Ready For Allotment</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#15803d', fontFamily: 'var(--font-heading)' }}>
            {availableCount} Available
          </div>
        </div>

        <div style={{ background: '#fefce8', padding: '1.25rem', borderRadius: '12px', border: '1px solid #fef08a', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#854d0e', fontWeight: 600 }}>Temporary Hold</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#a16207', fontFamily: 'var(--font-heading)' }}>
            {holdCount} Units
          </div>
        </div>

        <div style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: '12px', border: '1px solid #fecaca', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#991b1b', fontWeight: 600 }}>Allocated / Sold</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#b91c1c', fontFamily: 'var(--font-heading)' }}>
            {bookedCount} Units
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--grey-border)',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} style={{ color: 'var(--gold-deep)' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: 0 }}>Filter Plot Inventory</h3>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search Plot No. (e.g. A-101)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '36px', paddingBlock: '0.55rem', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          {/* Status Filter */}
          <div>
            <label className="form-label">Availability</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-select"
              style={{ paddingBlock: '0.55rem', fontSize: '0.875rem' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="AVAILABLE">Available Only</option>
              <option value="HOLD">On Hold</option>
              <option value="BOOKED">Booked</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>

          {/* Facing Filter */}
          <div>
            <label className="form-label">Facing Direction</label>
            <select
              value={selectedFacing}
              onChange={(e) => setSelectedFacing(e.target.value)}
              className="form-select"
              style={{ paddingBlock: '0.55rem', fontSize: '0.875rem' }}
            >
              <option value="ALL">Any Direction</option>
              <option value="EAST">East Facing</option>
              <option value="NORTH">North Facing</option>
              <option value="NORTH_EAST">North-East (Ishan)</option>
              <option value="WEST">West Facing</option>
              <option value="SOUTH_EAST">South-East</option>
            </select>
          </div>

          {/* Size Filter */}
          <div>
            <label className="form-label">Plot Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="form-select"
              style={{ paddingBlock: '0.55rem', fontSize: '0.875rem' }}
            >
              <option value="ALL">All Sizes</option>
              <option value="150">150 Sq. Yd. (1,350 sqft)</option>
              <option value="200">200 Sq. Yd. (1,800 sqft)</option>
              <option value="250+">250 Sq. Yd. &amp; Above</option>
            </select>
          </div>

          {/* Special Attributes */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={onlyCorners}
                onChange={(e) => setOnlyCorners(e.target.checked)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Corner Plots Only</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={onlyParks}
                onChange={(e) => setOnlyParks(e.target.checked)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Park Facing Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Filter Results Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.9rem', color: '#64748b' }}>
        <span>Showing <strong>{filteredPlots.length}</strong> matching plots</span>
        {(selectedFacing !== 'ALL' || selectedStatus !== 'ALL' || selectedSize !== 'ALL' || searchTerm || onlyCorners || onlyParks) && (
          <button
            onClick={() => {
              setSelectedFacing('ALL');
              setSelectedStatus('ALL');
              setSelectedSize('ALL');
              setSearchTerm('');
              setOnlyCorners(false);
              setOnlyParks(false);
            }}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Plot Grid */}
      {filteredPlots.length === 0 ? (
        <div style={{ background: '#ffffff', padding: '4rem 2rem', borderRadius: '16px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '1rem' }}>No plots found matching your current filter criteria.</p>
          <button
            onClick={() => {
              setSelectedFacing('ALL');
              setSelectedStatus('ALL');
              setSelectedSize('ALL');
              setSearchTerm('');
              setOnlyCorners(false);
              setOnlyParks(false);
            }}
            className="btn-outline-gold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredPlots.map((plot) => {
            const isAvailable = plot.status === 'AVAILABLE';
            const isHold = plot.status === 'HOLD';
            const isBooked = plot.status === 'BOOKED' || plot.status === 'SOLD' || plot.status === 'BLOCKED';

            return (
              <div
                key={plot.id}
                className="luxury-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.5rem',
                  borderTop: isAvailable ? '3px solid #10b981' : isHold ? '3px solid #f59e0b' : '3px solid #ef4444',
                }}
              >
                {/* Card Header: Plot Number & Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>Plot Number</span>
                    <h4 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', margin: 0 }}>
                      #{plot.plotNumber}
                    </h4>
                  </div>
                  <span className={getPlotStatusBadgeClass(plot.status)}>
                    {plot.status}
                  </span>
                </div>

                {/* Plot Specs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Area (Sq. Yd.)</div>
                    <div style={{ fontWeight: 700, color: 'var(--dark)' }}>{plot.sizeSqYd} Sq. Yd.</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>({plot.sizeSqFt} Sq. Ft.)</div>
                  </div>

                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Facing &amp; Road</div>
                    <div style={{ fontWeight: 700, color: 'var(--dark)' }}>{plot.facing.replace('_', ' ')}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{plot.roadWidthFt}ft Wide Road</div>
                  </div>
                </div>

                {/* Badges / Highlights */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {plot.isCorner && (
                    <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                      Corner Plot
                    </span>
                  )}
                  {plot.isParkFacing && (
                    <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                      Park Facing
                    </span>
                  )}
                  {plot.isMainRoadFacing && (
                    <span style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                      Main Road
                    </span>
                  )}
                </div>

                {/* Price Information */}
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Investment</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {formatCurrency(plot.priceTotal)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Rate / Sq. Yd.</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
                        ₹{plot.pricePerUnit.toLocaleString('en-IN')}/yd
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                    Booking Token: <strong>{formatCurrency(plot.bookingAmount)}</strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {isAvailable ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <button
                        onClick={() => setEnquiryPlot(plot)}
                        className="btn-primary"
                        style={{ padding: '0.65rem 0.5rem', fontSize: '0.85rem', width: '100%' }}
                      >
                        Enquire
                      </button>
                      <button
                        onClick={() => setVisitPlot(plot)}
                        className="btn-outline-gold"
                        style={{ padding: '0.65rem 0.5rem', fontSize: '0.85rem', width: '100%' }}
                      >
                        Visit Site
                      </button>
                    </div>
                  ) : isHold ? (
                    <button
                      onClick={() => setEnquiryPlot(plot)}
                      className="btn-outline-gold"
                      style={{ width: '100%', fontSize: '0.85rem' }}
                    >
                      Join Waitlist (On Hold)
                    </button>
                  ) : (
                    <button
                      disabled
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        backgroundColor: '#f1f5f9',
                        color: '#94a3b8',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'not-allowed',
                      }}
                    >
                      Allotted ({plot.status})
                    </button>
                  )}

                  <Link
                    href={`/plots/${plot.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      fontSize: '0.8rem',
                      color: 'var(--primary)',
                      padding: '0.35rem',
                      fontWeight: 600,
                    }}
                  >
                    <Eye size={14} /> View Full Plot Dimensions &amp; Layout
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {enquiryPlot && (
        <EnquiryModal
          onClose={() => setEnquiryPlot(null)}
          projectName={projectName}
          projectId={projectId}
          plotNumber={enquiryPlot.plotNumber}
          plotId={enquiryPlot.id}
        />
      )}

      {visitPlot && (
        <ScheduleVisitModal
          onClose={() => setVisitPlot(null)}
          projectName={projectName}
          projectId={projectId}
          plotNumber={visitPlot.plotNumber}
          plotId={visitPlot.id}
        />
      )}
    </div>
  );
}
