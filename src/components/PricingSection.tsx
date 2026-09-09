'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Calendar,
  CheckCircle2,
  FileText,
  HelpCircle,
  Percent,
  Phone,
  Shield,
  Sparkles,
  ArrowRight,
  Printer
} from 'lucide-react';

interface PricingSectionProps {
  showHeroBadge?: boolean;
  className?: string;
  id?: string;
}

export default function PricingSection({
  showHeroBadge = true,
  className = '',
  id = 'pricing',
}: PricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<'DOWN_PAYMENT' | 'FLEXI'>('DOWN_PAYMENT');
  const [plotSize, setPlotSize] = useState<number>(150);
  const [isCorner, setIsCorner] = useState<boolean>(false);
  const [isParkOrRoadFacing, setIsParkOrRoadFacing] = useState<boolean>(false);

  // Official Pricing Constants from Company Notice
  const BSP_DOWN_PAYMENT = 12999;
  const BSP_FLEXI = 13999;
  const DEV_CHARGES_PER_SQYD = 1500;
  const CLUB_MEMBERSHIP_PER_SQYD = 500;
  const PLC_CORNER_PERCENT = 0.10;
  const PLC_PARK_ROAD_PERCENT = 0.10;

  const currentRate = selectedPlan === 'DOWN_PAYMENT' ? BSP_DOWN_PAYMENT : BSP_FLEXI;
  const bspTotal = plotSize * currentRate;
  const devTotal = plotSize * DEV_CHARGES_PER_SQYD;
  const clubTotal = plotSize * CLUB_MEMBERSHIP_PER_SQYD;

  const plcCornerAmount = isCorner ? bspTotal * PLC_CORNER_PERCENT : 0;
  const plcParkAmount = isParkOrRoadFacing ? bspTotal * PLC_PARK_ROAD_PERCENT : 0;
  const plcTotal = plcCornerAmount + plcParkAmount;

  const grandTotal = bspTotal + devTotal + clubTotal + plcTotal;

  // Staged Milestones Calculation
  const stage1Amount = Math.round(grandTotal * 0.10);
  const stage2Amount =
    selectedPlan === 'DOWN_PAYMENT'
      ? Math.round(grandTotal * 0.90)
      : Math.round(grandTotal * 0.40);
  const stage3Amount = selectedPlan === 'FLEXI' ? Math.round(grandTotal * 0.50) : 0;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <section
      id={id}
      className={`section-padding ${className}`}
      style={{
        backgroundColor: '#faf8f5',
        position: 'relative',
        borderTop: '1px solid var(--grey-border)',
        borderBottom: '1px solid var(--grey-border)',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
          {showHeroBadge && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="gold-badge">
                <Sparkles size={13} /> Official Price List &amp; Payment Schedules
              </span>
            </div>
          )}
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.1rem)', color: 'var(--primary-dark)', marginBottom: '1rem', lineHeight: 1.2 }}>
            Project Pricing &amp; Flexible Plans
            <span style={{ display: 'block', fontSize: '1.25rem', color: 'var(--gold-deep)', fontStyle: 'italic', fontWeight: 500, marginTop: '0.35rem' }}>
              RIDDHI — Premium Plots | Prime Plots, Dholera SIR
            </span>
          </h2>
          <p style={{ color: '#5e6d70', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Transparent pricing backed by verified clear-title documentation. Choose between our high-value <strong>Down Payment Plan</strong> or cashflow-friendly <strong>Flexi Payment Plan</strong>.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', fontSize: '0.85rem', color: '#64748b', background: '#ffffff', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid var(--grey-border)' }}>
            <span>Release Date: <strong>15 Aug, 2026</strong></span>
            <span>•</span>
            <span>Corporate CIN: <strong>U41000UW2026PTC256814</strong></span>
          </div>
        </div>

        {/* TWO PAYMENT PLANS COMPARISON CARDS */}
        <div className="pricing-plans-grid">
          {/* Card 1: Down Payment Plan */}
          <div
            className="luxury-card pricing-plan-card"
            style={{
              border: selectedPlan === 'DOWN_PAYMENT' ? '2.5px solid var(--gold)' : '1px solid var(--grey-border)',
              boxShadow: selectedPlan === 'DOWN_PAYMENT' ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
              transform: selectedPlan === 'DOWN_PAYMENT' ? 'translateY(-4px)' : 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                padding: '0.3rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Maximum Savings
            </div>

            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Option 1
            </span>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.85rem)', color: 'var(--primary-dark)', margin: '0.35rem 0 0.5rem' }}>
              Down Payment Plan
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Fast-track possession and registration with maximum upfront rate benefits.
            </p>

            {/* Price Highlight */}
            <div
              style={{
                backgroundColor: 'rgba(0, 70, 74, 0.05)',
                padding: '1.25rem 1.5rem',
                borderRadius: '12px',
                borderLeft: '4px solid var(--gold)',
                marginBottom: '1.75rem',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Basic Sale Price (BSP)
              </div>
              <div style={{ fontSize: 'clamp(1.85rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--primary-dark)', fontFamily: 'var(--font-body)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                ₹12,999
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#64748b' }}> / Sq. Yd.</span>
              </div>
            </div>

            {/* Stages Table */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '0.75rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                Disbursement Schedule
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', gap: '0.5rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>Stage 1: On Day of Booking</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Allotment token &amp; confirmation</span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>10%</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', gap: '0.5rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>Stage 2: Within 30 Days</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>From booking date</span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>90%</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(228, 170, 60, 0.15)', borderRadius: '8px', border: '1px solid rgba(228, 170, 60, 0.4)', gap: '0.5rem' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', flex: 1 }}>Total Milestone Payable</strong>
                  <strong style={{ fontSize: '1.3rem', color: 'var(--gold-deep)', flexShrink: 0 }}>100%</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              data-action="open-enquiry"
              data-project-name="Riddhi Premium Plots"
              className={selectedPlan === 'DOWN_PAYMENT' ? 'btn-primary' : 'btn-outline-gold'}
              style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem' }}
              onClick={() => setSelectedPlan('DOWN_PAYMENT')}
            >
              Enquire Down Payment Plan →
            </button>
          </div>

          {/* Card 2: Flexi Payment Plan */}
          <div
            className="luxury-card pricing-plan-card"
            style={{
              border: selectedPlan === 'FLEXI' ? '2.5px solid var(--gold)' : '1px solid var(--grey-border)',
              boxShadow: selectedPlan === 'FLEXI' ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
              transform: selectedPlan === 'FLEXI' ? 'translateY(-4px)' : 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-deep))',
                color: '#172225',
                padding: '0.3rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              90-Day Cashflow
            </div>

            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Option 2
            </span>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.85rem)', color: 'var(--primary-dark)', margin: '0.35rem 0 0.5rem' }}>
              Flexi Payment Plan
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Spread payments smoothly over 3 milestones across a full 90-day window.
            </p>

            {/* Price Highlight */}
            <div
              style={{
                backgroundColor: 'rgba(0, 70, 74, 0.05)',
                padding: '1.25rem 1.5rem',
                borderRadius: '12px',
                borderLeft: '4px solid var(--gold)',
                marginBottom: '1.75rem',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Basic Sale Price (BSP)
              </div>
              <div style={{ fontSize: 'clamp(1.85rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--primary-dark)', fontFamily: 'var(--font-body)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                ₹13,999
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#64748b' }}> / Sq. Yd.</span>
              </div>
            </div>

            {/* Stages Table */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '0.75rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                Disbursement Schedule
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', gap: '0.5rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>Stage 1: On Day of Booking</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Initial commitment token</span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>10%</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', gap: '0.5rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>Stage 2: Within 45 Days</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>From date of booking</span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>40%</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', gap: '0.5rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>Stage 3: Within 90 Days</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Final registry &amp; possession balance</span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>50%</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(228, 170, 60, 0.15)', borderRadius: '8px', border: '1px solid rgba(228, 170, 60, 0.4)', gap: '0.5rem' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', flex: 1 }}>Total Milestone Payable</strong>
                  <strong style={{ fontSize: '1.3rem', color: 'var(--gold-deep)', flexShrink: 0 }}>100%</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              data-action="open-enquiry"
              data-project-name="Riddhi Premium Plots"
              className={selectedPlan === 'FLEXI' ? 'btn-primary' : 'btn-outline-gold'}
              style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem' }}
              onClick={() => setSelectedPlan('FLEXI')}
            >
              Enquire Flexi Payment Plan →
            </button>
          </div>
        </div>

        {/* INTERACTIVE INVESTMENT & ALLOTMENT CALCULATOR */}
        <div className="luxury-card pricing-calc-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flex: '1 1 280px', minWidth: 0 }}>
              <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>
                <Calculator size={13} /> Live Allotment Estimator
              </span>
              <h3 style={{ fontSize: 'clamp(1.35rem, 3.5vw, 1.75rem)', color: 'var(--primary-dark)', margin: '0.25rem 0', lineHeight: 1.25 }}>
                Calculate Estimated Allotment Value &amp; Milestones
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                Select standard plot sizes and check out the exact disbursement numbers.
              </p>
            </div>

            <button
              id="calc-print-btn"
              type="button"
              onClick={handlePrint}
              className="btn-outline-gold"
              style={{ padding: '0.5rem 1rem', fontSize: '0.825rem', whiteSpace: 'nowrap' }}
            >
              <Printer size={14} /> Print / Save Sheet
            </button>
          </div>

          <div className="pricing-calc-grid">
            {/* Left Column: Interactive Inputs */}
            <div style={{ minWidth: 0 }}>
              {/* Select Payment Plan */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label className="form-label" style={{ marginBottom: '0.65rem', display: 'block' }}>
                  Select Preferred Payment Structure
                </label>
                <div className="pricing-plan-toggle">
                  <button
                    id="calc-plan-btn-downpayment"
                    data-plan="DOWN_PAYMENT"
                    type="button"
                    onClick={() => setSelectedPlan('DOWN_PAYMENT')}
                    className="pricing-plan-toggle-btn"
                    style={{
                      border: selectedPlan === 'DOWN_PAYMENT' ? '2px solid var(--primary)' : '1.5px solid var(--grey-border)',
                      backgroundColor: selectedPlan === 'DOWN_PAYMENT' ? 'rgba(0, 70, 74, 0.08)' : '#ffffff',
                      color: selectedPlan === 'DOWN_PAYMENT' ? 'var(--primary-dark)' : '#64748b',
                    }}
                  >
                    <span>Down Payment Plan</span>
                    <span className="plan-rate" style={{ fontWeight: 700, color: 'var(--gold-deep)', marginTop: '0.25rem' }}>
                      ₹12,999 / Sq. Yd.
                    </span>
                  </button>

                  <button
                    id="calc-plan-btn-flexi"
                    data-plan="FLEXI"
                    type="button"
                    onClick={() => setSelectedPlan('FLEXI')}
                    className="pricing-plan-toggle-btn"
                    style={{
                      border: selectedPlan === 'FLEXI' ? '2px solid var(--primary)' : '1.5px solid var(--grey-border)',
                      backgroundColor: selectedPlan === 'FLEXI' ? 'rgba(0, 70, 74, 0.08)' : '#ffffff',
                      color: selectedPlan === 'FLEXI' ? 'var(--primary-dark)' : '#64748b',
                    }}
                  >
                    <span>Flexi Payment Plan</span>
                    <span className="plan-rate" style={{ fontWeight: 700, color: 'var(--gold-deep)', marginTop: '0.25rem' }}>
                      ₹13,999 / Sq. Yd.
                    </span>
                  </button>
                </div>
              </div>

              {/* Select Plot Size */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div className="pricing-plot-header">
                  <label className="form-label" style={{ margin: 0 }}>
                    Plot Area (in Sq. Yards)
                  </label>
                  <span id="calc-plot-size-display" className="pricing-plot-value">
                    {plotSize} Sq. Yd. (~{Math.round(plotSize * 9)} Sq. Ft.)
                  </span>
                </div>

                {/* Preset Chips */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {[150, 200, 250, 300, 500].map((size) => (
                    <button
                      key={size}
                      type="button"
                      data-calc-size-preset={size}
                      onClick={() => setPlotSize(size)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '20px',
                        border: plotSize === size ? '1.5px solid var(--gold-deep)' : '1px solid var(--grey-border)',
                        backgroundColor: plotSize === size ? 'var(--gold-light)' : '#f8fafc',
                        color: plotSize === size ? 'var(--primary-dark)' : '#475569',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {size} Sq. Yd.
                    </button>
                  ))}
                </div>

                <input
                  id="calc-plot-slider"
                  type="range"
                  min="120"
                  max="600"
                  step="10"
                  value={plotSize}
                  onChange={(e) => setPlotSize(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              {/* Optional Preferential Location Charges (PLC) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
                  Preferential Location Attribute (PLC)
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.875rem', color: '#334155', cursor: 'pointer', lineHeight: 1.4 }}>
                    <input
                      id="calc-plc-corner"
                      type="checkbox"
                      checked={isCorner}
                      onChange={(e) => setIsCorner(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--gold-deep)', flexShrink: 0, marginTop: '2px' }}
                    />
                    <span>Corner Plot (+10% on BSP)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.875rem', color: '#334155', cursor: 'pointer', lineHeight: 1.4 }}>
                    <input
                      id="calc-plc-park"
                      type="checkbox"
                      checked={isParkOrRoadFacing}
                      onChange={(e) => setIsParkOrRoadFacing(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--gold-deep)', flexShrink: 0, marginTop: '2px' }}
                    />
                    <span>Park / Club / 12M Wide Road Facing (+10% on BSP)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Cost Breakdown */}
            <div className="calc-summary-box">
              <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', letterSpacing: '0.01em' }}>
                Estimated Cost Summary
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <div className="calc-summary-row">
                  <span id="calc-bsp-label" className="calc-summary-label">
                    Basic Sale Price ({plotSize} Sq. Yd. @ ₹{currentRate.toLocaleString('en-IN')})
                  </span>
                  <span id="calc-bsp-val" className="calc-summary-value">{formatINR(bspTotal)}</span>
                </div>

                <div className="calc-summary-row">
                  <span id="calc-dev-label" className="calc-summary-label">
                    Development Charges (₹1,500 / Sq. Yd.)
                  </span>
                  <span id="calc-dev-val" className="calc-summary-value">{formatINR(devTotal)}</span>
                </div>

                <div className="calc-summary-row">
                  <span id="calc-club-label" className="calc-summary-label">
                    Club Membership (₹500 / Sq. Yd.)
                  </span>
                  <span id="calc-club-val" className="calc-summary-value">{formatINR(clubTotal)}</span>
                </div>

                <div id="calc-plc-row" className="calc-summary-row" style={{ color: 'var(--gold-deep)', display: plcTotal > 0 ? 'flex' : 'none' }}>
                  <span className="calc-summary-label" style={{ color: 'inherit' }}>
                    Preferential Location Charges (PLC)
                  </span>
                  <span id="calc-plc-val" className="calc-summary-value" style={{ color: 'inherit' }}>
                    + {formatINR(plcTotal)}
                  </span>
                </div>

                <div className="calc-total-box">
                  <div style={{ minWidth: 0 }}>
                    <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)', display: 'block', lineHeight: 1.3 }}>
                      Estimated Total Allotment Value
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Excluding Govt. registry &amp; e-stamp</span>
                  </div>
                  <strong id="calc-grand-total-val" className="calc-total-amount">
                    {formatINR(grandTotal)}
                  </strong>
                </div>
              </div>

              {/* Milestone Payments for this estimate */}
              <div className="calc-milestone-box">
                <div id="calc-milestone-title" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem' }}>
                  {selectedPlan === 'DOWN_PAYMENT' ? 'DOWN PAYMENT PLAN MILESTONES' : 'FLEXI PLAN MILESTONES'}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div className="calc-summary-row" style={{ fontSize: '0.85rem' }}>
                    <span className="calc-summary-label">Stage 1: Day of Booking (10%)</span>
                    <strong id="calc-stage1-val" className="calc-summary-value">{formatINR(stage1Amount)}</strong>
                  </div>

                  <div className="calc-summary-row" style={{ fontSize: '0.85rem' }}>
                    <span id="calc-stage2-label" className="calc-summary-label">
                      {selectedPlan === 'DOWN_PAYMENT' ? 'Stage 2: Within 30 Days (90%)' : 'Stage 2: Within 45 Days (40%)'}
                    </span>
                    <strong id="calc-stage2-val" className="calc-summary-value">{formatINR(stage2Amount)}</strong>
                  </div>

                  <div id="calc-stage3-row" className="calc-summary-row" style={{ fontSize: '0.85rem', display: selectedPlan === 'FLEXI' ? 'flex' : 'none' }}>
                    <span className="calc-summary-label">Stage 3: Within 90 Days (50%)</span>
                    <strong id="calc-stage3-val" className="calc-summary-value">{formatINR(stage3Amount)}</strong>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="calc-cta-row">
                <button
                  type="button"
                  data-action="open-enquiry"
                  data-project-name="Riddhi Premium Plots"
                  className="btn-primary calc-cta-btn-primary"
                >
                  Reserve Plot Now →
                </button>
                <button
                  type="button"
                  data-action="open-visit"
                  data-project-name="Riddhi Premium Plots"
                  className="btn-secondary calc-cta-btn-secondary"
                >
                  Schedule Site Visit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vanilla JS Fallback Controller for Allotment Calculator */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setupAllotmentCalculator() {
                  var calcCards = document.querySelectorAll('.pricing-calc-card');
                  if (!calcCards || !calcCards.length) return;

                  calcCards.forEach(function(calcCard) {
                    var state = {
                      plan: 'DOWN_PAYMENT',
                      size: 150,
                      corner: false,
                      park: false
                    };

                    var planDownBtn = calcCard.querySelector('#calc-plan-btn-downpayment') || document.getElementById('calc-plan-btn-downpayment');
                    var planFlexiBtn = calcCard.querySelector('#calc-plan-btn-flexi') || document.getElementById('calc-plan-btn-flexi');
                    var sizeSlider = calcCard.querySelector('#calc-plot-slider') || document.getElementById('calc-plot-slider');
                    var sizeChips = calcCard.querySelectorAll('[data-calc-size-preset]');
                    var plcCorner = calcCard.querySelector('#calc-plc-corner') || document.getElementById('calc-plc-corner');
                    var plcPark = calcCard.querySelector('#calc-plc-park') || document.getElementById('calc-plc-park');
                    var printBtn = document.getElementById('calc-print-btn');

                    function formatINR(val) {
                      return '₹' + Math.round(val).toLocaleString('en-IN');
                    }

                    function updateCalculator() {
                      var currentRate = (state.plan === 'DOWN_PAYMENT') ? 12999 : 13999;
                      var bsp = state.size * currentRate;
                      var dev = state.size * 1500;
                      var club = state.size * 500;
                      var plcPct = 0;
                      if (state.corner) plcPct += 0.10;
                      if (state.park) plcPct += 0.10;
                      var plc = Math.round(bsp * plcPct);
                      var grandTotal = bsp + dev + club + plc;

                      var s1 = Math.round(grandTotal * 0.10);
                      var s2 = (state.plan === 'DOWN_PAYMENT') ? Math.round(grandTotal * 0.90) : Math.round(grandTotal * 0.40);
                      var s3 = (state.plan === 'FLEXI') ? Math.round(grandTotal * 0.50) : 0;

                      // Plan Buttons Visual State
                      if (planDownBtn) {
                        if (state.plan === 'DOWN_PAYMENT') {
                          planDownBtn.style.border = '2px solid var(--primary)';
                          planDownBtn.style.backgroundColor = 'rgba(0, 70, 74, 0.08)';
                          planDownBtn.style.color = 'var(--primary-dark)';
                        } else {
                          planDownBtn.style.border = '1.5px solid var(--grey-border)';
                          planDownBtn.style.backgroundColor = '#ffffff';
                          planDownBtn.style.color = '#64748b';
                        }
                      }
                      if (planFlexiBtn) {
                        if (state.plan === 'FLEXI') {
                          planFlexiBtn.style.border = '2px solid var(--primary)';
                          planFlexiBtn.style.backgroundColor = 'rgba(0, 70, 74, 0.08)';
                          planFlexiBtn.style.color = 'var(--primary-dark)';
                        } else {
                          planFlexiBtn.style.border = '1.5px solid var(--grey-border)';
                          planFlexiBtn.style.backgroundColor = '#ffffff';
                          planFlexiBtn.style.color = '#64748b';
                        }
                      }

                      // Plot Area Display & Slider Value
                      var sizeDisplay = calcCard.querySelector('#calc-plot-size-display');
                      if (sizeDisplay) {
                        sizeDisplay.textContent = state.size + ' Sq. Yd. (~' + Math.round(state.size * 9) + ' Sq. Ft.)';
                      }
                      if (sizeSlider && Number(sizeSlider.value) !== state.size) {
                        sizeSlider.value = state.size;
                      }

                      // Preset Chips Visual State
                      sizeChips.forEach(function(chip) {
                        var chipVal = Number(chip.getAttribute('data-calc-size-preset'));
                        if (chipVal === state.size) {
                          chip.style.border = '1.5px solid var(--gold-deep)';
                          chip.style.backgroundColor = 'var(--gold-light)';
                          chip.style.color = 'var(--primary-dark)';
                        } else {
                          chip.style.border = '1px solid var(--grey-border)';
                          chip.style.backgroundColor = '#f8fafc';
                          chip.style.color = '#475569';
                        }
                      });

                      // Checkboxes
                      if (plcCorner && plcCorner.checked !== state.corner) {
                        plcCorner.checked = state.corner;
                      }
                      if (plcPark && plcPark.checked !== state.park) {
                        plcPark.checked = state.park;
                      }

                      // Cost Breakdown Values
                      var bspLabel = calcCard.querySelector('#calc-bsp-label');
                      if (bspLabel) {
                        bspLabel.textContent = 'Basic Sale Price (' + state.size + ' Sq. Yd. @ ₹' + currentRate.toLocaleString('en-IN') + ')';
                      }
                      var bspVal = calcCard.querySelector('#calc-bsp-val');
                      if (bspVal) bspVal.textContent = formatINR(bsp);

                      var devVal = calcCard.querySelector('#calc-dev-val');
                      if (devVal) devVal.textContent = formatINR(dev);

                      var clubVal = calcCard.querySelector('#calc-club-val');
                      if (clubVal) clubVal.textContent = formatINR(club);

                      var plcRow = calcCard.querySelector('#calc-plc-row');
                      var plcVal = calcCard.querySelector('#calc-plc-val');
                      if (plcRow) {
                        plcRow.style.display = plc > 0 ? 'flex' : 'none';
                      }
                      if (plcVal) {
                        plcVal.textContent = '+ ' + formatINR(plc);
                      }

                      var grandVal = calcCard.querySelector('#calc-grand-total-val');
                      if (grandVal) grandVal.textContent = formatINR(grandTotal);

                      // Milestone Breakdown
                      var msTitle = calcCard.querySelector('#calc-milestone-title');
                      if (msTitle) {
                        msTitle.textContent = (state.plan === 'DOWN_PAYMENT') ? 'DOWN PAYMENT PLAN MILESTONES' : 'FLEXI PLAN MILESTONES';
                      }

                      var s1Val = calcCard.querySelector('#calc-stage1-val');
                      if (s1Val) s1Val.textContent = formatINR(s1);

                      var s2Label = calcCard.querySelector('#calc-stage2-label');
                      if (s2Label) {
                        s2Label.textContent = (state.plan === 'DOWN_PAYMENT') ? 'Stage 2: Within 30 Days (90%)' : 'Stage 2: Within 45 Days (40%)';
                      }
                      var s2Val = calcCard.querySelector('#calc-stage2-val');
                      if (s2Val) s2Val.textContent = formatINR(s2);

                      var s3Row = calcCard.querySelector('#calc-stage3-row');
                      var s3Val = calcCard.querySelector('#calc-stage3-val');
                      if (s3Row) {
                        s3Row.style.display = (state.plan === 'FLEXI') ? 'flex' : 'none';
                      }
                      if (s3Val) s3Val.textContent = formatINR(s3);
                    }

                    if (!calcCard.dataset.listenersAttached) {
                      calcCard.dataset.listenersAttached = 'true';

                      if (planDownBtn) {
                        planDownBtn.addEventListener('click', function(e) {
                          e.preventDefault();
                          state.plan = 'DOWN_PAYMENT';
                          updateCalculator();
                        });
                      }

                      if (planFlexiBtn) {
                        planFlexiBtn.addEventListener('click', function(e) {
                          e.preventDefault();
                          state.plan = 'FLEXI';
                          updateCalculator();
                        });
                      }

                      if (sizeSlider) {
                        ['input', 'change'].forEach(function(ev) {
                          sizeSlider.addEventListener(ev, function() {
                            state.size = Number(sizeSlider.value);
                            updateCalculator();
                          });
                        });
                      }

                      sizeChips.forEach(function(chip) {
                        chip.addEventListener('click', function(e) {
                          e.preventDefault();
                          var val = Number(chip.getAttribute('data-calc-size-preset'));
                          if (val) {
                            state.size = val;
                            updateCalculator();
                          }
                        });
                      });

                      if (plcCorner) {
                        ['change', 'click'].forEach(function(ev) {
                          plcCorner.addEventListener(ev, function() {
                            state.corner = !!plcCorner.checked;
                            updateCalculator();
                          });
                        });
                      }

                      if (plcPark) {
                        ['change', 'click'].forEach(function(ev) {
                          plcPark.addEventListener(ev, function() {
                            state.park = !!plcPark.checked;
                            updateCalculator();
                          });
                        });
                      }

                      if (printBtn) {
                        printBtn.addEventListener('click', function(e) {
                          e.preventDefault();
                          window.print();
                        });
                      }
                    }

                    // Initial render pass
                    updateCalculator();
                  });
                }

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', setupAllotmentCalculator);
                } else {
                  setupAllotmentCalculator();
                }
                setTimeout(setupAllotmentCalculator, 200);
              })();
            `,
          }}
        />

        {/* ADDITIONAL CHARGES & PARTICULARS TABLE (From Image 2) */}
        <div className="pricing-table-card">
          <div className="pricing-table-header">
            <div>
              <h4 style={{ color: '#ffffff', fontSize: 'clamp(1.2rem, 3.5vw, 1.35rem)', margin: 0 }}>
                Riddhi Project Charges &amp; Particulars
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)' }}>
                Official Schedule as announced on 15 Aug, 2026
              </span>
            </div>
            <span className="gold-badge" style={{ background: 'rgba(228, 170, 60, 0.2)', color: 'var(--gold)' }}>
              Clear-Title Allotment
            </span>
          </div>

          <table className="pricing-particulars-table">
            <thead>
              <tr>
                <th style={{ width: '60%' }}>Particulars</th>
                <th style={{ width: '40%' }}>Applicable Charges</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong style={{ color: 'var(--dark)' }}>Basic Sale Price (BSP) — Down Payment Plan</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Standard residential plot rate</div>
                </td>
                <td className="particular-value-cell">
                  <strong style={{ color: 'var(--primary-dark)', fontSize: '1.05rem', whiteSpace: 'nowrap' }}>₹12,999/- Per Sq. Yd.</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong style={{ color: 'var(--dark)' }}>Basic Sale Price (BSP) — Flexi Payment Plan</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>90-day staged milestone rate</div>
                </td>
                <td className="particular-value-cell">
                  <strong style={{ color: 'var(--primary-dark)', fontSize: '1.05rem', whiteSpace: 'nowrap' }}>₹13,999/- Per Sq. Yd.</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong style={{ color: 'var(--dark)' }}>Development Charges</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Roads, boundary, storm drainage, electrification conduit &amp; street illumination</div>
                </td>
                <td className="particular-value-cell">
                  <strong style={{ color: 'var(--dark)', fontSize: '1rem', whiteSpace: 'nowrap' }}>₹1,500/- Sq. Yd.</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong style={{ color: 'var(--dark)' }}>Club Membership</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Access to community clubhouse, recreational landscaped park &amp; wellness zone</div>
                </td>
                <td className="particular-value-cell">
                  <strong style={{ color: 'var(--dark)', fontSize: '1rem', whiteSpace: 'nowrap' }}>₹500/- Sq. Yd.</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong style={{ color: 'var(--dark)' }}>PLC Corner (Preferential Location Charge)</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Applicable only to dual-road corner plots</div>
                </td>
                <td className="particular-value-cell">
                  <span style={{ padding: '0.25rem 0.65rem', background: '#fef3c7', color: '#92400e', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                    10% on BSP
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong style={{ color: 'var(--dark)' }}>Park / Club / 12-Meter Wide Road Facing PLC</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Applicable for prime park front or 12M arterial roadway plots</div>
                </td>
                <td className="particular-value-cell">
                  <span style={{ padding: '0.25rem 0.65rem', background: '#fef3c7', color: '#92400e', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                    10% on BSP
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* OFFICIAL TERMS & CONDITIONS (From Image 2) */}
        <div className="pricing-terms-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Shield size={24} style={{ color: 'var(--gold-deep)' }} />
            <h4 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', margin: 0, letterSpacing: '0.02em' }}>
              Terms &amp; Conditions
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.925rem', color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>
                <strong>Government Charges &amp; E-Stamp Duty:</strong> Government Charges, E-Stamp Duty, and any other applicable statutory registration charges will be borne by the Plot Owner.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>
                <strong>External Development Charges (EDC):</strong> EDC to be borne by Plot Owner as and when applicable / announced by Government Authorities.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>
                <strong>Architectural Guidelines:</strong> Architectural Plan for Boundary Wall would have to be followed as approved by Government norms.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>
                <strong>Remittance In Favour Of:</strong> All Cheque, Demand Draft, RTGS, or fund transfers must be in favour of <strong>&quot;Om Swastik Buildhomes Pvt. Ltd.&quot;</strong>.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>
                <strong>Revision Discretion:</strong> Price and Payment Plan may be revised without any prior notice and at Company&apos;s sole discretion.
              </span>
            </div>
          </div>

          {/* Corporate Footer Strip inside terms */}
          <div className="pricing-terms-footer">
            <div>
              <strong>Registered Office:</strong> ASF - 151, GWSS Sector 16B, UP 201308
            </div>
            <div className="terms-contact-links">
              <a href="mailto:info@omswastikbuildhomes.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                info@omswastikbuildhomes.com
              </a>
              <span className="terms-link-divider">•</span>
              <a href="https://www.omswastikbuildhomes.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-deep)', fontWeight: 600 }}>
                www.omswastikbuildhomes.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
