'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Filter,
  Search,
  CheckCircle2,
  Compass,
  MessageCircle,
  Calendar,
  Send,
  Calculator as CalcIcon,
  Layers,
  LayoutGrid,
  Info,
  ExternalLink,
  PhoneCall,
  X
} from 'lucide-react';
import initialPlotsRaw from '@/lib/initialPlots.json';

export interface PlotData {
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
  priceTotal: number | null;
  pricePerUnit: number | null;
  bookingAmount: number;
  status: string;
  remarks: string | null;
  coords?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface PlotInventoryViewerProps {
  plots?: PlotData[];
  projectName?: string;
  projectId?: string;
}

const WHATSAPP_PHONE = '919599213531'; // Standard site WhatsApp

export default function PlotInventoryViewer({
  plots: initialPropPlots,
  projectName = 'Riddhi Premium Plots',
  projectId,
}: PlotInventoryViewerProps) {
  // Merge initial plots with coordinates
  const mergedInitialPlots: PlotData[] = useMemo(() => {
    const rawMap = new Map<string, any>();
    (initialPlotsRaw as any[]).forEach((p) => {
      rawMap.set(String(p.plotNumber), p);
    });

    if (initialPropPlots && initialPropPlots.length > 0) {
      return initialPropPlots.map((p) => {
        const raw = rawMap.get(String(p.plotNumber));
        return {
          ...p,
          sizeSqYd: 200,
          sizeSqFt: 1800,
          lengthFt: 72,
          widthFt: 25,
          coords: raw?.coords || (p as any).coords,
        };
      });
    }

    return (initialPlotsRaw as any[]).map((p) => ({
      ...p,
      sizeSqYd: 200,
      sizeSqFt: 1800,
      lengthFt: 72,
      widthFt: 25,
    }));
  }, [initialPropPlots]);

  const [plots, setPlots] = useState<PlotData[]>(mergedInitialPlots);
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(plots[0] || null);
  const [activeTab, setActiveTab] = useState<'map' | 'grid'>('map');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedFacing, setSelectedFacing] = useState<string>('ALL');
  const [onlyCorners, setOnlyCorners] = useState<boolean>(false);
  const [onlyParks, setOnlyParks] = useState<boolean>(false);
  const [hoveredPlotNumber, setHoveredPlotNumber] = useState<string | null>(null);

  // Interactive EMI Calculator Modal State
  const [emiPlot, setEmiPlot] = useState<PlotData | null>(null);
  const [emiLoanAmount, setEmiLoanAmount] = useState<number>(2000000);
  const [emiRate, setEmiRate] = useState<number>(8.5);
  const [emiTenureYears, setEmiTenureYears] = useState<number>(15);

  // Sync with /api/plots if live updates arrive
  useEffect(() => {
    fetch('/api/plots?t=' + Date.now(), { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        const livePlots = data?.plots || (Array.isArray(data) ? data : null);
        if (livePlots && Array.isArray(livePlots) && livePlots.length > 0) {
          const rawMap = new Map<string, any>();
          (initialPlotsRaw as any[]).forEach((p) => {
            rawMap.set(String(p.plotNumber), p);
          });
          const merged = livePlots.map((p: any) => {
            const raw = rawMap.get(String(p.plotNumber));
            return {
              ...p,
              sizeSqYd: 200,
              sizeSqFt: 1800,
              lengthFt: 72,
              widthFt: 25,
              coords: raw?.coords || p.coords,
            };
          });
          setPlots(merged);
        }
      })
      .catch(() => {});
  }, []);

  // Filtered plot set
  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      if (searchTerm && !plot.plotNumber.toLowerCase().includes(searchTerm.toLowerCase().trim())) {
        return false;
      }
      if (selectedStatus !== 'ALL' && plot.status !== selectedStatus) {
        return false;
      }
      if (selectedFacing !== 'ALL' && plot.facing !== selectedFacing) {
        return false;
      }
      if (onlyCorners && !plot.isCorner) return false;
      if (onlyParks && !plot.isParkFacing) return false;
      return true;
    });
  }, [plots, searchTerm, selectedStatus, selectedFacing, onlyCorners, onlyParks]);

  const filteredPlotNumbers = useMemo(() => {
    return new Set(filteredPlots.map((p) => p.plotNumber));
  }, [filteredPlots]);

  // Inventory KPI counts
  const availableCount = useMemo(() => plots.filter((p) => p.status === 'AVAILABLE').length, [plots]);
  const holdCount = useMemo(() => plots.filter((p) => p.status === 'HOLD').length, [plots]);
  const bookedCount = useMemo(() => plots.filter((p) => p.status === 'BOOKED').length, [plots]);
  const soldCount = useMemo(() => plots.filter((p) => p.status === 'SOLD').length, [plots]);

  // Select plot
  const handleSelectPlot = (plot: PlotData) => {
    setSelectedPlot(plot);
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      setTimeout(() => {
        const inspector = document.getElementById('selected-plot-inspector');
        if (inspector) {
          inspector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 120);
    }
  };

  // Interactive EMI calculations
  const emiMonthlyRate = (emiRate / 12) / 100;
  const emiTenureMonths = emiTenureYears * 12;
  const calculatedMonthlyEmi =
    emiMonthlyRate > 0
      ? Math.round((emiLoanAmount * emiMonthlyRate * Math.pow(1 + emiMonthlyRate, emiTenureMonths)) /
        (Math.pow(1 + emiMonthlyRate, emiTenureMonths) - 1))
      : Math.round(emiLoanAmount / emiTenureMonths);
  const calculatedTotalPayable = calculatedMonthlyEmi * emiTenureMonths;
  const calculatedTotalInterest = Math.max(0, calculatedTotalPayable - emiLoanAmount);

  // Open interactive EMI calculator modal & optionally sync with #calculator if on page
  const handleOpenEmiModal = (plot: PlotData) => {
    setEmiPlot(plot);
    setEmiLoanAmount(2000000);
    setEmiRate(8.5);
    setEmiTenureYears(15);

    const calc = document.getElementById('calculator');
    if (calc) {
      calc.scrollIntoView({ behavior: 'smooth' });
    }
    // Dispatch custom event so calculator receives selected plot info
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('omswastik:select-plot', {
          detail: {
            plotNumber: plot.plotNumber,
            sizeSqYd: plot.sizeSqYd,
            sizeSqFt: plot.sizeSqFt,
            facing: plot.facing,
            status: plot.status,
          },
        })
      );
    }
  };

  const handleEnquireFromEmi = (plot: PlotData) => {
    setEmiPlot(null);
    if (typeof window !== 'undefined' && (window as any).openEnquiryModal) {
      const dummy = document.createElement('div');
      dummy.setAttribute('data-plot-number', plot.plotNumber);
      dummy.setAttribute('data-plot-id', plot.id);
      dummy.setAttribute('data-project-name', projectName);
      (window as any).openEnquiryModal(dummy);
      setTimeout(() => {
        const msg = document.getElementById('enquiry-field-message') as HTMLTextAreaElement;
        if (msg) {
          msg.value = `Inquiring for Plot #${plot.plotNumber} with Loan requirement of ₹${(emiLoanAmount / 100000).toFixed(1)} Lakh at ${emiRate}% for ${emiTenureYears} Years (Est. EMI: ₹${calculatedMonthlyEmi.toLocaleString('en-IN')}/mo).`;
        }
      }, 100);
    }
  };

  // Generate WhatsApp message URL
  const getWhatsAppUrl = (plot: PlotData) => {
    const msg =
      `Hello Om Swastik Buildhomes,\n\n` +
      `I am interested in Plot #${plot.plotNumber}.\n\n` +
      `Plot Size: 25′ × 72′\n` +
      `Area: 200 Sq. Yds.\n` +
      `Area: 1,800 Sq. Ft.\n\n` +
      `Please share availability and pricing.`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  // Status color helpers
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return '#10b981'; // emerald
      case 'HOLD':
        return '#f59e0b'; // amber
      case 'BOOKED':
        return '#ef4444'; // red
      case 'SOLD':
        return '#64748b'; // slate
      default:
        return '#10b981';
    }
  };

  const getFillColor = (status: string, isSelected: boolean) => {
    if (isSelected) return 'rgba(234, 179, 8, 0.55)'; // vibrant gold
    switch (status) {
      case 'AVAILABLE':
        return 'rgba(16, 185, 129, 0.32)';
      case 'HOLD':
        return 'rgba(245, 158, 11, 0.38)';
      case 'BOOKED':
        return 'rgba(239, 68, 68, 0.38)';
      case 'SOLD':
        return 'rgba(100, 116, 139, 0.45)';
      default:
        return 'rgba(16, 185, 129, 0.32)';
    }
  };

  const renderSchematicPlot = (plotNum: number, orientation: 'vertical' | 'horizontal' = 'vertical') => {
    const plot = plots.find((p) => String(p.plotNumber) === String(plotNum));
    if (!plot) return null;

    const isSelected = selectedPlot?.plotNumber === String(plotNum);
    const isHovered = hoveredPlotNumber === String(plotNum);
    const isMatch = filteredPlotNumbers.has(String(plotNum));
    const isHold = plot.status === 'HOLD';
    const isBooked = plot.status === 'BOOKED' || plot.status === 'SOLD';

    // Warm cream-yellow background matching the user reference drawing
    let bg = '#fff9c4'; // Soft warm yellow
    let border = '#1e293b'; // Solid dark crisp architectural border
    let text = '#0f172a'; // Bold dark number
    let statusDot = '#10b981'; // Green dot for available

    if (isHold) {
      bg = '#fed7aa'; // Amber tint
      border = '#c2410c';
      statusDot = '#f59e0b';
    } else if (isBooked) {
      bg = '#cbd5e1'; // Muted slate grey
      border = '#64748b';
      text = '#475569';
      statusDot = '#64748b';
    }

    if (isSelected) {
      border = '#eab308';
      bg = '#fef08a'; // Bright gold highlight
    }

    const isVert = orientation === 'vertical';

    return (
      <button
        key={plotNum}
        type="button"
        id={`plot-unit-btn-${plotNum}`}
        data-plot-number={plotNum}
        onClick={() => handleSelectPlot(plot)}
        onMouseEnter={() => setHoveredPlotNumber(String(plotNum))}
        onMouseLeave={() => setHoveredPlotNumber(null)}
        title={`Plot #${plotNum} · ${plot.status} · 200 Sq. Yd. (${plot.facing} Facing)`}
        style={{
          width: isVert ? '48px' : '62px',
          height: isVert ? '68px' : '44px',
          background: bg,
          border: isSelected ? '2.5px solid #eab308' : `1.5px solid ${border}`,
          borderRadius: '3px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.15s ease',
          transform: isSelected ? 'scale(1.08)' : isHovered ? 'scale(1.04)' : 'none',
          boxShadow: isSelected
            ? '0 0 16px rgba(250, 204, 21, 0.9), inset 0 0 6px rgba(250, 204, 21, 0.35)'
            : isHovered
            ? '0 4px 10px rgba(0, 0, 0, 0.35)'
            : 'none',
          opacity: isMatch ? 1 : 0.2,
          zIndex: isSelected ? 5 : isHovered ? 4 : 1,
          padding: 0,
          outline: 'none',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            fontSize: '1.05rem',
            fontWeight: 800,
            color: text,
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {plotNum}
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '3px',
            right: '3px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: statusDot,
          }}
        />
      </button>
    );
  };

  return (
    <div id="plot-inventory-root" style={{ width: '100%' }}>
      {/* 1. Inventory Header & KPI Counter Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '1.15rem 1.25rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.05em' }}>
            Total Plots in Layout
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)' }}>
            {plots.length} Units
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
            Standard 200 Sq. Yd. (25′ × 72′)
          </div>
        </div>

        <div
          onClick={() => setSelectedStatus(selectedStatus === 'AVAILABLE' ? 'ALL' : 'AVAILABLE')}
          style={{
            background: selectedStatus === 'AVAILABLE' ? '#dcfce7' : '#f0fdf4',
            padding: '1.15rem 1.25rem',
            borderRadius: '12px',
            border: selectedStatus === 'AVAILABLE' ? '2px solid #16a34a' : '1px solid #bbf7d0',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#166534', fontWeight: 600, letterSpacing: '0.05em' }}>
            Ready For Allotment
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#15803d', fontFamily: 'var(--font-heading)' }}>
            {availableCount} Available
          </div>
          <div style={{ fontSize: '0.75rem', color: '#166534', marginTop: '2px' }}>
            Click to filter Available
          </div>
        </div>

        <div
          onClick={() => setSelectedStatus(selectedStatus === 'HOLD' ? 'ALL' : 'HOLD')}
          style={{
            background: selectedStatus === 'HOLD' ? '#fef08a' : '#fefce8',
            padding: '1.15rem 1.25rem',
            borderRadius: '12px',
            border: selectedStatus === 'HOLD' ? '2px solid #ca8a04' : '1px solid #fef08a',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#854d0e', fontWeight: 600, letterSpacing: '0.05em' }}>
            Under Token / Hold
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#a16207', fontFamily: 'var(--font-heading)' }}>
            {holdCount} Units
          </div>
          <div style={{ fontSize: '0.75rem', color: '#854d0e', marginTop: '2px' }}>
            Waitlist Registration Open
          </div>
        </div>

        <div
          onClick={() => setSelectedStatus(selectedStatus === 'BOOKED' ? 'ALL' : 'BOOKED')}
          style={{
            background: selectedStatus === 'BOOKED' ? '#fee2e2' : '#fef2f2',
            padding: '1.15rem 1.25rem',
            borderRadius: '12px',
            border: selectedStatus === 'BOOKED' ? '2px solid #dc2626' : '1px solid #fecaca',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#991b1b', fontWeight: 600, letterSpacing: '0.05em' }}>
            Booked / Allotted
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#b91c1c', fontFamily: 'var(--font-heading)' }}>
            {bookedCount + soldCount} Units
          </div>
          <div style={{ fontSize: '0.75rem', color: '#991b1b', marginTop: '2px' }}>
            {soldCount} Registered · {bookedCount} In Process
          </div>
        </div>
      </div>

      {/* 2. View Toggle & Filter Toolbar */}
      <div
        id="plot-filter-toolbar"
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--grey-border)',
          padding: '1.25rem 1.25rem',
          marginBottom: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '1rem' }}>
          {/* View Mode Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#f1f5f9', padding: '4px', borderRadius: '10px', flexWrap: 'wrap', width: 'auto', maxWidth: '100%' }}>
            <button
              type="button"
              id="btn-view-map"
              onClick={() => setActiveTab('map')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'map' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'map' ? '#ffffff' : '#475569',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Layers size={15} /> Project Layout Map
            </button>

            <button
              type="button"
              id="btn-view-grid"
              onClick={() => setActiveTab('grid')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'grid' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'grid' ? '#ffffff' : '#475569',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <LayoutGrid size={15} /> Inventory Units ({filteredPlots.length})
            </button>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '340px', flex: '1 1 200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              id="plot-search-input"
              placeholder="Search Plot Number (e.g. 24, 60)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // If direct match, auto-select
                const target = plots.find((p) => p.plotNumber === e.target.value.trim());
                if (target) setSelectedPlot(target);
              }}
              className="form-input"
              style={{ paddingLeft: '36px', paddingBlock: '0.55rem', fontSize: '0.875rem', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Filters Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem', alignItems: 'flex-end' }}>
          {/* Status */}
          <div>
            <label className="form-label" htmlFor="plot-status-select" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>
              Status Filter
            </label>
            <select
              id="plot-status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-select"
              style={{ paddingBlock: '0.45rem', fontSize: '0.85rem' }}
            >
              <option value="ALL">All Statuses ({plots.length})</option>
              <option value="AVAILABLE">Available Only ({availableCount})</option>
              <option value="HOLD">On Hold ({holdCount})</option>
              <option value="BOOKED">Booked ({bookedCount})</option>
              <option value="SOLD">Sold ({soldCount})</option>
            </select>
          </div>

          {/* Facing */}
          <div>
            <label className="form-label" htmlFor="plot-facing-select" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>
              Orientation / Facing
            </label>
            <select
              id="plot-facing-select"
              value={selectedFacing}
              onChange={(e) => setSelectedFacing(e.target.value)}
              className="form-select"
              style={{ paddingBlock: '0.45rem', fontSize: '0.85rem' }}
            >
              <option value="ALL">All Directions</option>
              <option value="SOUTH">South Facing (18m / 9m Road)</option>
              <option value="EAST">East Facing (Spine / Internal Road)</option>
              <option value="WEST">West Facing (Park / Spine Road)</option>
            </select>
          </div>

          {/* Checkboxes */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '0.4rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                id="plot-corner-checkbox"
                checked={onlyCorners}
                onChange={(e) => setOnlyCorners(e.target.checked)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Corner Only</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                id="plot-park-checkbox"
                checked={onlyParks}
                onChange={(e) => setOnlyParks(e.target.checked)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Park / Club Facing</span>
            </label>
          </div>

          {/* Reset Filters */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '0.4rem' }}>
            <button
              type="button"
              id="plot-reset-filters-btn"
              onClick={() => {
                setSelectedStatus('ALL');
                setSelectedFacing('ALL');
                setSearchTerm('');
                setOnlyCorners(false);
                setOnlyParks(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'underline',
              }}
            >
              Reset All Filters
            </button>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE MASTER PLAN MAP VIEW */}
      <div
        id="master-plan-view-wrap"
        className="master-plan-grid-container"
        style={{ display: activeTab === 'map' ? 'grid' : 'none' }}
      >
          {/* Main Visual Digital Layout Board (Matching User Reference Image 2) */}
          <div
            id="digital-layout-board"
            style={{
              background: '#04131a',
              borderRadius: '16px',
              border: '1px solid rgba(228, 170, 60, 0.35)',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Top Row: Status Legend (Matching Reference Screenshot) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                background: 'rgba(3, 14, 20, 0.95)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                flexWrap: 'wrap',
                gap: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#e2e8f0', fontWeight: 500 }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#10b981', display: 'inline-block' }} />
                <span>Available (Ready to Book)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#e2e8f0', fontWeight: 500 }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f59e0b', display: 'inline-block' }} />
                <span>On Hold (In Negotiation)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#e2e8f0', fontWeight: 500 }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#475569', display: 'inline-block' }} />
                <span>Booked / Registered</span>
              </div>
            </div>

            {/* Inner Header Row: Layout Title & Status Filter Dropdown (Matching Reference Screenshot) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1.5rem',
                background: 'rgba(6, 23, 31, 0.75)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={18} style={{ color: 'var(--gold)' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '0.02em' }}>
                  Project Layout Map (Total {plots.length} Plots)
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 500 }}>Filter Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{
                    background: '#071d24',
                    color: '#ffffff',
                    border: '1px solid rgba(228, 170, 60, 0.4)',
                    borderRadius: '8px',
                    padding: '0.45rem 1rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="ALL">Show All ({plots.length} Plots)</option>
                  <option value="AVAILABLE">Available ({availableCount} Plots)</option>
                  <option value="HOLD">On Hold ({holdCount} Plots)</option>
                  <option value="BOOKED">Booked ({bookedCount} Plots)</option>
                  <option value="SOLD">Sold ({soldCount} Plots)</option>
                </select>
              </div>
            </div>

            {/* The Schematic Site Plan Board (Exact Match to User Reference Diagram) */}
            <div
              style={{
                padding: '2rem 1.25rem',
                overflowX: 'auto',
                overflowY: 'auto',
                maxHeight: '680px',
                boxSizing: 'border-box',
                background: 'linear-gradient(180deg, #021118 0%, #031821 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  minWidth: '980px',
                  maxWidth: '1080px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxSizing: 'border-box',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  background: 'rgba(2, 20, 28, 0.85)',
                  border: '1px solid rgba(228, 170, 60, 0.25)',
                  boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* 1. TOP TIER (Horizontal Rows: 27-35 & 36-43) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  {/* Top-Left Block: Plots 27 to 35 (9 plots) */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '2px',
                      background: '#0f172a',
                      padding: '2px',
                      borderRadius: '5px',
                      border: '1.5px solid #334155',
                    }}
                  >
                    {[27, 28, 29, 30, 31, 32, 33, 34, 35].map((num) => renderSchematicPlot(num, 'vertical'))}
                  </div>

                  {/* Central Spine Top Gap */}
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingInline: '1rem',
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      North Sector Road
                    </span>
                  </div>

                  {/* Top-Right Block: Plots 36 to 43 (8 plots) */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '2px',
                      background: '#0f172a',
                      padding: '2px',
                      borderRadius: '5px',
                      border: '1.5px solid #334155',
                    }}
                  >
                    {[36, 37, 38, 39, 40, 41, 42, 43].map((num) => renderSchematicPlot(num, 'vertical'))}
                  </div>
                </div>

                {/* Horizontal Road Corridor (Between Top Row & Middle Section) */}
                <div
                  style={{
                    height: '32px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: '6px',
                    border: '1px dashed rgba(148, 163, 184, 0.25)',
                    position: 'relative',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', color: 'var(--gold-light)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    ← 9.00 Metre Wide Internal Sector Road →
                  </span>
                </div>

                {/* 2. MIDDLE TIER (4 Vertical 2-Column Blocks) */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingBlock: '4px',
                  }}
                >
                  {/* Left Half (Block 1 & Block 2) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '38px' }}>
                    {/* Middle Block 1: 14-11 (left col), 15-18 (right col) */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                        gap: '2px',
                        background: '#0f172a',
                        padding: '2px',
                        borderRadius: '5px',
                        border: '1.5px solid #334155',
                      }}
                    >
                      {/* Row 1: 14, 15 */}
                      {renderSchematicPlot(14, 'horizontal')}
                      {renderSchematicPlot(15, 'horizontal')}
                      {/* Row 2: 13, 16 */}
                      {renderSchematicPlot(13, 'horizontal')}
                      {renderSchematicPlot(16, 'horizontal')}
                      {/* Row 3: 12, 17 */}
                      {renderSchematicPlot(12, 'horizontal')}
                      {renderSchematicPlot(17, 'horizontal')}
                      {/* Row 4: 11, 18 */}
                      {renderSchematicPlot(11, 'horizontal')}
                      {renderSchematicPlot(18, 'horizontal')}
                    </div>

                    {/* Middle Block 2: 22-19 (left col), 23-26 (right col) */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                        gap: '2px',
                        background: '#0f172a',
                        padding: '2px',
                        borderRadius: '5px',
                        border: '1.5px solid #334155',
                      }}
                    >
                      {/* Row 1: 22, 23 */}
                      {renderSchematicPlot(22, 'horizontal')}
                      {renderSchematicPlot(23, 'horizontal')}
                      {/* Row 2: 21, 24 */}
                      {renderSchematicPlot(21, 'horizontal')}
                      {renderSchematicPlot(24, 'horizontal')}
                      {/* Row 3: 20, 25 */}
                      {renderSchematicPlot(20, 'horizontal')}
                      {renderSchematicPlot(25, 'horizontal')}
                      {/* Row 4: 19, 26 */}
                      {renderSchematicPlot(19, 'horizontal')}
                      {renderSchematicPlot(26, 'horizontal')}
                    </div>
                  </div>

                  {/* Central Spine Avenue (Aligned with Top/Bottom Central Opening) */}
                  <div
                    style={{
                      height: '188px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingInline: '1rem',
                      borderLeft: '1px dashed rgba(228, 170, 60, 0.3)',
                      borderRight: '1px dashed rgba(228, 170, 60, 0.3)',
                      background: 'rgba(228, 170, 60, 0.03)',
                      borderRadius: '6px',
                    }}
                  >
                    <span
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--gold)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Central Spine Boulevard
                    </span>
                  </div>

                  {/* Right Half (Block 3 & Block 4) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '38px' }}>
                    {/* Middle Block 3: 56-59 (left col), 55-52 (right col) */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                        gap: '2px',
                        background: '#0f172a',
                        padding: '2px',
                        borderRadius: '5px',
                        border: '1.5px solid #334155',
                      }}
                    >
                      {/* Row 1: 56, 55 */}
                      {renderSchematicPlot(56, 'horizontal')}
                      {renderSchematicPlot(55, 'horizontal')}
                      {/* Row 2: 57, 54 */}
                      {renderSchematicPlot(57, 'horizontal')}
                      {renderSchematicPlot(54, 'horizontal')}
                      {/* Row 3: 58, 53 */}
                      {renderSchematicPlot(58, 'horizontal')}
                      {renderSchematicPlot(53, 'horizontal')}
                      {/* Row 4: 59, 52 */}
                      {renderSchematicPlot(59, 'horizontal')}
                      {renderSchematicPlot(52, 'horizontal')}
                    </div>

                    {/* Middle Block 4: 51-48 (left col), 44-47 (right col) */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                        gap: '2px',
                        background: '#0f172a',
                        padding: '2px',
                        borderRadius: '5px',
                        border: '1.5px solid #334155',
                      }}
                    >
                      {/* Row 1: 51, 44 */}
                      {renderSchematicPlot(51, 'horizontal')}
                      {renderSchematicPlot(44, 'horizontal')}
                      {/* Row 2: 50, 45 */}
                      {renderSchematicPlot(50, 'horizontal')}
                      {renderSchematicPlot(45, 'horizontal')}
                      {/* Row 3: 49, 46 */}
                      {renderSchematicPlot(49, 'horizontal')}
                      {renderSchematicPlot(46, 'horizontal')}
                      {/* Row 4: 48, 47 */}
                      {renderSchematicPlot(48, 'horizontal')}
                      {renderSchematicPlot(47, 'horizontal')}
                    </div>
                  </div>
                </div>

                {/* Horizontal Road Corridor (Between Middle Section & Bottom Row) */}
                <div
                  style={{
                    height: '32px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: '6px',
                    border: '1px dashed rgba(148, 163, 184, 0.25)',
                    position: 'relative',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', color: 'var(--gold-light)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    ← 9.00 Metre Wide Internal Sector Road →
                  </span>
                </div>

                {/* 3. BOTTOM TIER (Horizontal Rows: 10-1 & 69-60) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  {/* Bottom-Left Block: Plots 10 down to 1 (10 plots) */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '2px',
                      background: '#0f172a',
                      padding: '2px',
                      borderRadius: '5px',
                      border: '1.5px solid #334155',
                    }}
                  >
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => renderSchematicPlot(num, 'vertical'))}
                  </div>

                  {/* Central Spine Bottom Gap */}
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingInline: '1rem',
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Boulevard Access
                    </span>
                  </div>

                  {/* Bottom-Right Block: Plots 69 down to 60 (10 plots) */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '2px',
                      background: '#0f172a',
                      padding: '2px',
                      borderRadius: '5px',
                      border: '1.5px solid #334155',
                    }}
                  >
                    {[69, 68, 67, 66, 65, 64, 63, 62, 61, 60].map((num) => renderSchematicPlot(num, 'vertical'))}
                  </div>
                </div>

                {/* Bottom Main Arterial Road (In front of Plots 10-1 & 69-60) */}
                <div
                  style={{
                    height: '40px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(90deg, rgba(0, 70, 74, 0.45) 0%, rgba(202, 138, 4, 0.45) 100%)',
                    borderRadius: '8px',
                    border: '1.5px solid rgba(228, 170, 60, 0.4)',
                    marginTop: '4px',
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    🛣️ 18.00 Metre Main Arterial Sector Road (Expressway Facing)
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div
              style={{
                padding: '0.85rem 1.25rem',
                background: 'rgba(6, 17, 24, 0.96)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
                color: '#94a3b8',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <span>
                Showing <strong>{filteredPlots.length}</strong> matching plots out of <strong>{plots.length}</strong> total layout units
              </span>
              <span style={{ color: 'var(--gold-light)' }}>
                Standard Plot Typology: 25′ × 72′ · 200 Sq. Yds. (1,800 Sq. Ft.)
              </span>
            </div>
          </div>

          {/* Right Floating / Docked Selected Plot Details Inspector */}
          {selectedPlot && (
            <div
              id="selected-plot-inspector"
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '2px solid var(--gold)',
                padding: '1.25rem',
                boxShadow: '0 12px 28px rgba(0, 70, 74, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: '90px',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {/* Header: Plot # & Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.06em' }}>
                    Selected Unit
                  </span>
                  <h3 style={{ fontSize: '1.85rem', color: 'var(--primary-dark)', margin: '2px 0 0', lineHeight: 1 }}>
                    Plot #{selectedPlot.plotNumber}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{projectName}</span>
                </div>

                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    backgroundColor:
                      selectedPlot.status === 'AVAILABLE'
                        ? '#dcfce7'
                        : selectedPlot.status === 'HOLD'
                        ? '#fef08a'
                        : '#fee2e2',
                    color:
                      selectedPlot.status === 'AVAILABLE'
                        ? '#166534'
                        : selectedPlot.status === 'HOLD'
                        ? '#854d0e'
                        : '#991b1b',
                    border: `1px solid ${getStatusColor(selectedPlot.status)}`,
                  }}
                >
                  {selectedPlot.status}
                </span>
              </div>

              {/* Standard Dimensions Display */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Dimensions</span>
                    <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>25′ × 72′</strong>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Plot Area</span>
                    <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>200 Sq. Yds.</strong>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>1,800 Sq. Ft.</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Facing Direction</span>
                    <strong style={{ fontSize: '0.9rem', color: '#334155' }}>{selectedPlot.facing}</strong>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Front Road Width</span>
                    <strong style={{ fontSize: '0.9rem', color: '#334155' }}>{selectedPlot.roadWidthFt}m Wide</strong>
                  </div>
                </div>

                {/* Badges / USPs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.85rem' }}>
                  {selectedPlot.isCorner && (
                    <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                      Corner Plot
                    </span>
                  )}
                  {selectedPlot.isParkFacing && (
                    <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                      Park / Club Facing
                    </span>
                  )}
                  {selectedPlot.isMainRoadFacing && (
                    <span style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                      Main Arterial Road
                    </span>
                  )}
                </div>
              </div>

              {/* Pricing Specification */}
              <div
                style={{
                  background: 'rgba(0, 70, 74, 0.04)',
                  border: '1px dashed var(--gold-deep)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Allotment Value
                    </span>
                    <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)' }}>
                      Starting at ₹26 Lakh
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Booking Token</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-deep)' }}>₹51,000</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>
                  Transparent title with immediate registration &amp; bank loan eligibility.
                </div>
              </div>

              {/* Action CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {/* 1. Enquire Now button */}
                <button
                  type="button"
                  data-action="open-enquiry"
                  data-plot-id={selectedPlot.id}
                  data-plot-number={selectedPlot.plotNumber}
                  data-project-name={projectName}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof window !== 'undefined' && (window as any).openEnquiryModal) {
                      (window as any).openEnquiryModal(e.currentTarget);
                    }
                  }}
                  className="btn-primary"
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '0.9rem',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Send size={15} /> Enquire for Plot #{selectedPlot.plotNumber}
                </button>

                {/* 2. Schedule Site Visit */}
                <button
                  type="button"
                  data-action="open-visit"
                  data-plot-id={selectedPlot.id}
                  data-plot-number={selectedPlot.plotNumber}
                  data-project-name={projectName}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof window !== 'undefined' && (window as any).openVisitModal) {
                      (window as any).openVisitModal(e.currentTarget);
                    }
                  }}
                  className="btn-outline-gold"
                  style={{
                    padding: '0.7rem 1rem',
                    fontSize: '0.875rem',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Calendar size={15} /> Schedule Site Visit
                </button>

                {/* 3. WhatsApp Direct CTA with Dynamic Pre-filled Template */}
                <a
                  href={getWhatsAppUrl(selectedPlot)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`whatsapp-plot-${selectedPlot.plotNumber}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    padding: '0.7rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <MessageCircle size={16} /> WhatsApp Inquiry
                </a>

                {/* 4. Calculate EMI Button (Scrolls & Connects with #calculator) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEmiModal(selectedPlot);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    backgroundColor: '#f8fafc',
                    color: 'var(--primary-dark)',
                    border: '1.5px solid #cbd5e1',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <CalcIcon size={15} style={{ color: 'var(--gold-deep)' }} /> Calculate EMI for this Plot
                </button>
              </div>
            </div>
          )}
      </div>

      {/* 4. INVENTORY CARDS VIEW */}
      <div
        id="plot-grid-view-wrap"
        style={{ display: activeTab === 'grid' ? 'block' : 'none', width: '100%' }}
      >
        <div>
          {filteredPlots.length === 0 ? (
            <div
              style={{
                background: '#ffffff',
                padding: '4rem 2rem',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px dashed #cbd5e1',
                marginBottom: '2rem',
              }}
            >
              <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '1rem' }}>
                No plots found matching your current filter criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedStatus('ALL');
                  setSelectedFacing('ALL');
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
            <div
              id="plot-grid-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2.5rem',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {filteredPlots.map((plot) => {
                const isAvailable = plot.status === 'AVAILABLE';
                const isHold = plot.status === 'HOLD';
                const isSelected = selectedPlot?.plotNumber === plot.plotNumber;

                return (
                  <div
                    key={plot.id}
                    className="luxury-card plot-inventory-card"
                    data-plot-card="true"
                    data-plot-number={plot.plotNumber}
                    data-status={plot.status}
                    data-facing={plot.facing}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1.5rem',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid var(--gold)' : '1px solid var(--grey-border)',
                      borderTop: `4px solid ${getStatusColor(plot.status)}`,
                      background: '#ffffff',
                      boxShadow: isSelected ? '0 8px 24px rgba(212, 175, 55, 0.25)' : 'var(--shadow-sm)',
                    }}
                  >
                    {/* Top Row: Plot Number & Status Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
                          Unit Identifier
                        </span>
                        <h4 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', margin: 0, lineHeight: 1.1 }}>
                          Plot #{plot.plotNumber}
                        </h4>
                      </div>

                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '16px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          backgroundColor:
                            plot.status === 'AVAILABLE'
                              ? '#dcfce7'
                              : plot.status === 'HOLD'
                              ? '#fef08a'
                              : '#fee2e2',
                          color:
                            plot.status === 'AVAILABLE'
                              ? '#166534'
                              : plot.status === 'HOLD'
                              ? '#854d0e'
                              : '#991b1b',
                          border: `1px solid ${getStatusColor(plot.status)}`,
                        }}
                      >
                        {plot.status}
                      </span>
                    </div>

                    {/* Standard Dimensions Specification */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.75rem',
                        padding: '0.9rem',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        fontSize: '0.85rem',
                      }}
                    >
                      <div>
                        <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Dimensions</div>
                        <div style={{ fontWeight: 700, color: 'var(--dark)' }}>25′ × 72′</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>200 Sq. Yd. (1,800 sqft)</div>
                      </div>

                      <div>
                        <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Facing &amp; Road</div>
                        <div style={{ fontWeight: 700, color: 'var(--dark)' }}>{plot.facing} Facing</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{plot.roadWidthFt}m Wide Road</div>
                      </div>
                    </div>

                    {/* USPs / Features */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                      {plot.isCorner && (
                        <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                          Corner Plot
                        </span>
                      )}
                      {plot.isParkFacing && (
                        <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                          Park Facing
                        </span>
                      )}
                      {plot.isMainRoadFacing && (
                        <span style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                          18m Main Road
                        </span>
                      )}
                    </div>

                    {/* Pricing */}
                    <div style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Allotment Price</div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                            From ₹26 Lakh
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Booking Token</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>₹51,000</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
                        <button
                          type="button"
                          data-action="open-enquiry"
                          data-plot-id={plot.id}
                          data-plot-number={plot.plotNumber}
                          data-project-name={projectName}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (typeof window !== 'undefined' && (window as any).openEnquiryModal) {
                              (window as any).openEnquiryModal(e.currentTarget);
                            }
                          }}
                          className="btn-primary"
                          style={{ padding: '0.55rem 0.5rem', fontSize: '0.82rem', width: '100%' }}
                        >
                          Enquire
                        </button>

                        <button
                          type="button"
                          data-action="open-visit"
                          data-plot-id={plot.id}
                          data-plot-number={plot.plotNumber}
                          data-project-name={projectName}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (typeof window !== 'undefined' && (window as any).openVisitModal) {
                              (window as any).openVisitModal(e.currentTarget);
                            }
                          }}
                          className="btn-outline-gold"
                          style={{ padding: '0.55rem 0.5rem', fontSize: '0.82rem', width: '100%' }}
                        >
                          Visit Site
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
                        <a
                          href={getWhatsAppUrl(plot)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            backgroundColor: '#25D366',
                            color: '#ffffff',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                          }}
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </a>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPlot(plot);
                            handleOpenEmiModal(plot);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            backgroundColor: '#f1f5f9',
                            color: 'var(--primary-dark)',
                            border: '1px solid #cbd5e1',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          <CalcIcon size={14} /> EMI Calc
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('map');
                          handleSelectPlot(plot);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          padding: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          textDecoration: 'underline',
                        }}
                      >
                        <Layers size={13} /> Locate in Layout Board
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 5. INTERACTIVE PLOT EMI CALCULATOR MODAL */}
      {emiPlot && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 32, 35, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setEmiPlot(null)}
        >
          <div
            className="modal-content"
            style={{
              position: 'relative',
              maxWidth: '540px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '20px',
              padding: 0,
              background: '#ffffff',
              border: '1.5px solid rgba(228, 170, 60, 0.4)',
              boxShadow: '0 25px 60px -12px rgba(0, 32, 35, 0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #00363a 0%, #001f22 100%)',
                padding: '1.5rem 1.75rem',
                borderBottom: '2px solid var(--gold)',
                color: '#ffffff',
                borderTopLeftRadius: '18px',
                borderTopRightRadius: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    color: 'var(--gold-light)',
                    background: 'rgba(228, 170, 60, 0.15)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                  }}
                >
                  <CalcIcon size={13} style={{ color: 'var(--gold)' }} />
                  <span>Plot Financial Calculator</span>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#ffffff' }}>
                  Plot #{emiPlot.plotNumber} · EMI Estimator
                </h3>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: '#94a3b8' }}>
                  200 Sq. Yd. (25′ × 72′) · {emiPlot.facing} Facing · Plots from ₹26 Lakh
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEmiPlot(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem 1.75rem' }}>
              {/* Monthly EMI Result Highlight */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 70, 74, 0.08) 0%, rgba(228, 170, 60, 0.12) 100%)',
                  border: '1.5px solid var(--gold)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Estimated Monthly EMI
                </div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '0.25rem 0' }}>
                  ₹{calculatedMonthlyEmi.toLocaleString('en-IN')}
                  <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b' }}> / month*</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.78rem', color: '#64748b', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <span>Total Loan: <strong style={{ color: 'var(--dark)' }}>₹{(emiLoanAmount / 100000).toFixed(1)} Lakh</strong></span>
                  <span>Total Interest: <strong style={{ color: 'var(--dark)' }}>₹{(calculatedTotalInterest / 100000).toFixed(2)} Lakh</strong></span>
                  <span>Payable: <strong style={{ color: 'var(--dark)' }}>₹{(calculatedTotalPayable / 100000).toFixed(2)} Lakh</strong></span>
                </div>
              </div>

              {/* Slider 1: Loan Amount */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                    Loan Amount
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                    ₹{(emiLoanAmount / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={4000000}
                  step={50000}
                  value={emiLoanAmount}
                  onChange={(e) => setEmiLoanAmount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                  <span>₹5 Lakh</span>
                  <span>₹20 Lakh (75%)</span>
                  <span>₹40 Lakh</span>
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                    Interest Rate (% p.a.)
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {emiRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={13}
                  step={0.1}
                  value={emiRate}
                  onChange={(e) => setEmiRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                  <span>7.5%</span>
                  <span>8.5% (Avg Bank Rate)</span>
                  <span>13.0%</span>
                </div>
              </div>

              {/* Slider 3: Loan Tenure */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                    Loan Tenure (Years)
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {emiTenureYears} Years ({emiTenureYears * 12} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={25}
                  step={1}
                  value={emiTenureYears}
                  onChange={(e) => setEmiTenureYears(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                  <span>3 Yrs</span>
                  <span>15 Yrs</span>
                  <span>25 Yrs</span>
                </div>
              </div>

              {/* Bank Partners Trust Banner */}
              <div
                style={{
                  background: '#f8fafc',
                  borderRadius: '8px',
                  padding: '0.7rem 1rem',
                  fontSize: '0.75rem',
                  color: '#64748b',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={15} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>
                  Nationalized &amp; Private Bank Home/Plot Loan assistance available: <strong>SBI, HDFC, ICICI, Axis Bank</strong>.
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => handleEnquireFromEmi(emiPlot)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '0.85rem', fontSize: '0.92rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Send size={15} /> Apply for this Loan Plan
                </button>
                <button
                  type="button"
                  onClick={() => setEmiPlot(null)}
                  className="btn-outline-gold"
                  style={{ padding: '0.85rem 1.25rem', fontSize: '0.92rem' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
