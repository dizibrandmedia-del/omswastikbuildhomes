'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatCurrency, getPlotStatusBadgeClass } from '@/lib/utils';
import { Filter, Compass, ArrowRight, ShieldCheck, Check, Search, Eye, Sparkles } from 'lucide-react';

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

  // Filter logic for React
  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      if (searchTerm && !plot.plotNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (selectedFacing !== 'ALL' && plot.facing !== selectedFacing) {
        return false;
      }
      if (selectedStatus !== 'ALL' && plot.status !== selectedStatus) {
        return false;
      }
      if (selectedSize === '150' && plot.sizeSqYd !== 150) return false;
      if (selectedSize === '200' && plot.sizeSqYd !== 200) return false;
      if (selectedSize === '250+' && plot.sizeSqYd < 250) return false;
      if (onlyCorners && !plot.isCorner) return false;
      if (onlyParks && !plot.isParkFacing) return false;
      return true;
    });
  }, [plots, searchTerm, selectedFacing, selectedStatus, selectedSize, onlyCorners, onlyParks]);

  const availableCount = plots.filter((p) => p.status === 'AVAILABLE').length;
  const holdCount = plots.filter((p) => p.status === 'HOLD').length;
  const bookedCount = plots.filter((p) => p.status === 'BOOKED' || p.status === 'SOLD').length;

  return (
    <div id="plot-inventory-root" style={{ width: '100%' }}>
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
        id="plot-filter-toolbar"
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
              id="plot-search-input"
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
            <label className="form-label" htmlFor="plot-status-select">Availability</label>
            <select
              id="plot-status-select"
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
            <label className="form-label" htmlFor="plot-facing-select">Facing Direction</label>
            <select
              id="plot-facing-select"
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
            <label className="form-label" htmlFor="plot-size-select">Plot Size</label>
            <select
              id="plot-size-select"
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
                id="plot-corner-checkbox"
                checked={onlyCorners}
                onChange={(e) => setOnlyCorners(e.target.checked)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Corner Plots Only</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                id="plot-park-checkbox"
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
        <span>
          Showing <strong id="plot-matching-count">{filteredPlots.length}</strong> matching plots
        </span>
        <button
          type="button"
          id="plot-reset-filters-btn"
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
      </div>

      {/* Empty State Banner */}
      <div
        id="plot-empty-state"
        style={{
          display: filteredPlots.length === 0 ? 'block' : 'none',
          background: '#ffffff',
          padding: '4rem 2rem',
          borderRadius: '16px',
          textAlign: 'center',
          border: '1px dashed #cbd5e1',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '1rem' }}>
          No plots found matching your current filter criteria.
        </p>
        <button
          type="button"
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

      {/* Plot Grid */}
      <div
        id="plot-grid-container"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}
      >
        {plots.map((plot) => {
          const isAvailable = plot.status === 'AVAILABLE';
          const isHold = plot.status === 'HOLD';
          const isBooked = plot.status === 'BOOKED' || plot.status === 'SOLD' || plot.status === 'BLOCKED';

          return (
            <div
              key={plot.id}
              className="luxury-card plot-inventory-card"
              data-plot-card="true"
              data-plot-number={plot.plotNumber}
              data-status={plot.status}
              data-facing={plot.facing}
              data-size={plot.sizeSqYd}
              data-corner={plot.isCorner ? 'true' : 'false'}
              data-park={plot.isParkFacing ? 'true' : 'false'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
                borderTop: isAvailable ? '3px solid #10b981' : isHold ? '3px solid #f59e0b' : '3px solid #ef4444',
              }}
            >
              {/* Header: Plot # & Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
                    Plot Number
                  </span>
                  <h4 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', margin: 0 }}>
                    #{plot.plotNumber}
                  </h4>
                </div>

                <span className={getPlotStatusBadgeClass(plot.status)}>
                  {plot.status}
                </span>
              </div>

              {/* Specs Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem',
                }}
              >
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

              {/* Tags / USPs */}
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

              {/* Pricing Breakdown */}
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
                      type="button"
                      data-action="open-enquiry"
                      data-plot-id={plot.id}
                      data-plot-number={plot.plotNumber}
                      data-project-name={projectName}
                      className="btn-primary"
                      style={{ padding: '0.65rem 0.5rem', fontSize: '0.85rem', width: '100%' }}
                    >
                      Enquire
                    </button>
                    <button
                      type="button"
                      data-action="open-visit"
                      data-plot-id={plot.id}
                      data-plot-number={plot.plotNumber}
                      data-project-name={projectName}
                      className="btn-outline-gold"
                      style={{ padding: '0.65rem 0.5rem', fontSize: '0.85rem', width: '100%' }}
                    >
                      Visit Site
                    </button>
                  </div>
                ) : isHold ? (
                  <button
                    type="button"
                    data-action="open-enquiry"
                    data-plot-id={plot.id}
                    data-plot-number={plot.plotNumber}
                    data-project-name={projectName}
                    data-type="waitlist"
                    className="btn-outline-gold"
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  >
                    Join Waitlist (On Hold)
                  </button>
                ) : (
                  <button
                    type="button"
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

      {/* Vanilla JS Filter Controller for 100% Reliability on Hostinger Static Export */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function initPlotFilter() {
                var searchInput = document.getElementById('plot-search-input');
                var statusSelect = document.getElementById('plot-status-select');
                var facingSelect = document.getElementById('plot-facing-select');
                var sizeSelect = document.getElementById('plot-size-select');
                var cornerCheck = document.getElementById('plot-corner-checkbox');
                var parkCheck = document.getElementById('plot-park-checkbox');
                var resetBtn = document.getElementById('plot-reset-filters-btn');
                var countEl = document.getElementById('plot-matching-count');
                var emptyEl = document.getElementById('plot-empty-state');

                function applyFilters() {
                  var q = (searchInput ? searchInput.value : '').toLowerCase().trim();
                  var st = statusSelect ? statusSelect.value : 'ALL';
                  var fc = facingSelect ? facingSelect.value : 'ALL';
                  var sz = sizeSelect ? sizeSelect.value : 'ALL';
                  var onlyC = cornerCheck ? cornerCheck.checked : false;
                  var onlyP = parkCheck ? parkCheck.checked : false;

                  var cards = document.querySelectorAll('.plot-inventory-card[data-plot-card="true"]');
                  var matched = 0;

                  cards.forEach(function(card) {
                    var cardNum = (card.getAttribute('data-plot-number') || '').toLowerCase();
                    var cardStatus = card.getAttribute('data-status') || '';
                    var cardFacing = card.getAttribute('data-facing') || '';
                    var cardSize = parseFloat(card.getAttribute('data-size') || '0');
                    var cardCorner = card.getAttribute('data-corner') === 'true';
                    var cardPark = card.getAttribute('data-park') === 'true';

                    var match = true;

                    if (q && cardNum.indexOf(q) === -1) match = false;
                    if (st !== 'ALL' && cardStatus !== st) match = false;
                    if (fc !== 'ALL' && cardFacing !== fc) match = false;

                    if (sz === '150' && cardSize !== 150) match = false;
                    else if (sz === '200' && cardSize !== 200) match = false;
                    else if (sz === '250+' && cardSize < 250) match = false;

                    if (onlyC && !cardCorner) match = false;
                    if (onlyP && !cardPark) match = false;

                    if (match) {
                      card.style.display = 'flex';
                      matched++;
                    } else {
                      card.style.display = 'none';
                    }
                  });

                  if (countEl) countEl.innerText = matched;
                  if (emptyEl) emptyEl.style.display = (matched === 0) ? 'block' : 'none';
                }

                if (searchInput) searchInput.addEventListener('input', applyFilters);
                if (statusSelect) statusSelect.addEventListener('change', applyFilters);
                if (facingSelect) facingSelect.addEventListener('change', applyFilters);
                if (sizeSelect) sizeSelect.addEventListener('change', applyFilters);
                if (cornerCheck) cornerCheck.addEventListener('change', applyFilters);
                if (parkCheck) parkCheck.addEventListener('change', applyFilters);

                if (resetBtn) {
                  resetBtn.addEventListener('click', function() {
                    if (searchInput) searchInput.value = '';
                    if (statusSelect) statusSelect.value = 'ALL';
                    if (facingSelect) facingSelect.value = 'ALL';
                    if (sizeSelect) sizeSelect.value = 'ALL';
                    if (cornerCheck) cornerCheck.checked = false;
                    if (parkCheck) parkCheck.checked = false;
                    applyFilters();
                  });
                }
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initPlotFilter);
              } else {
                initPlotFilter();
              }
            })();
          `,
        }}
      />
    </div>
  );
}
