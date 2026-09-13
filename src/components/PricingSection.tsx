'use client';

import React, { useState, useEffect } from 'react';
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
  Printer,
  X,
  Download,
  Landmark
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

  // Smart Real-Estate EMI Calculator States (default ₹45 Lakhs, 8.5%, 15 Years)
  const [loanAmount, setLoanAmount] = useState<number>(4500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(15);
  const [selectedPlotForEmi, setSelectedPlotForEmi] = useState<{
    plotNumber: string;
    sizeSqYd: number;
    sizeSqFt: number;
    facing: string;
    status?: string;
  } | null>(null);
  const [isLoanPlanModalOpen, setIsLoanPlanModalOpen] = useState<boolean>(false);

  // Listen for plot selection from Master Plan
  useEffect(() => {
    const handleSelectPlotEvent = (e: any) => {
      if (e.detail) {
        setSelectedPlotForEmi(e.detail);
      }
    };
    window.addEventListener('omswastik:select-plot', handleSelectPlotEvent);
    return () => {
      window.removeEventListener('omswastik:select-plot', handleSelectPlotEvent);
    };
  }, []);

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

  const formatLakhsCrores = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crores`;
    }
    return `₹${(val / 100000).toFixed(1)} Lakhs`;
  };

  // Reducing balance EMI calculation
  const emiP = loanAmount;
  const emiAnnualRate = interestRate;
  const emiTenureMonths = loanTenure * 12;
  const emiMonthlyRate = (emiAnnualRate / 12) / 100;
  const monthlyEmi =
    emiMonthlyRate > 0
      ? (emiP * emiMonthlyRate * Math.pow(1 + emiMonthlyRate, emiTenureMonths)) /
        (Math.pow(1 + emiMonthlyRate, emiTenureMonths) - 1)
      : emiP / emiTenureMonths;
  const totalEmiPayable = monthlyEmi * emiTenureMonths;
  const totalEmiInterest = totalEmiPayable - emiP;
  const emiPrincipalPercent = totalEmiPayable > 0 ? (emiP / totalEmiPayable) * 100 : 50;
  const emiInterestPercent = totalEmiPayable > 0 ? (totalEmiInterest / totalEmiPayable) * 100 : 50;

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

        {/* SMART REAL-ESTATE EMI CALCULATOR (Positioned at #calculator) */}
        <div
          id="calculator"
          className="luxury-card pricing-calc-card"
          style={{
            scrollMarginTop: '100px',
            marginBottom: '3.5rem',
            backgroundColor: '#ffffff',
            border: '1.5px solid rgba(228, 170, 60, 0.35)',
            boxShadow: '0 10px 30px rgba(0, 70, 74, 0.08)',
            position: 'relative',
            color: 'var(--dark)',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            <span
              className="gold-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.35rem 0.85rem',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(228, 170, 60, 0.15) 0%, rgba(201, 146, 37, 0.1) 100%)',
                color: 'var(--gold-deep)',
                border: '1px solid rgba(228, 170, 60, 0.4)',
                fontSize: '0.78rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.75rem',
              }}
            >
              <Calculator size={13} style={{ color: 'var(--gold-deep)' }} /> Financial Planning
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                color: 'var(--primary-dark)',
                margin: '0.25rem 0 0.5rem',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.2,
              }}
            >
              Smart Real-Estate EMI Calculator
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>
              Plan your plot purchase with bank-approved rates from SBI, HDFC, ICICI, and Axis Bank.
            </p>
          </div>

          {/* Connected Plot Notification Banner (If selected from Master Plan) */}
          {selectedPlotForEmi && (
            <div
              style={{
                background: 'rgba(228, 170, 60, 0.12)',
                border: '1px solid var(--gold)',
                borderRadius: '12px',
                padding: '0.75rem 1.25rem',
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'var(--gold)',
                    color: 'var(--primary-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  #{selectedPlotForEmi.plotNumber}
                </span>
                <div>
                  <div style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.92rem' }}>
                    Plot #{selectedPlotForEmi.plotNumber} Selected from Master Plan
                  </div>
                  <div style={{ color: 'var(--gold-deep)', fontSize: '0.78rem' }}>
                    Standard 200 Sq. Yds. (25′ × 72′, 1,800 Sq. Ft.) · {selectedPlotForEmi.facing} Facing
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlotForEmi(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <X size={14} /> Clear Selection
              </button>
            </div>
          )}

          {/* Calculator 2-Column Grid */}
          <div
            className="pricing-calc-grid"
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Left Column: Interactive Sliders & Presets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
              {/* 1. Loan Amount */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <label htmlFor="emi-loan-range" style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                    Loan Amount
                  </label>
                  <span
                    id="emiLoanVal"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.15rem, 3.8vw, 1.35rem)',
                      fontWeight: 700,
                      color: 'var(--gold-deep)',
                    }}
                  >
                    {formatLakhsCrores(loanAmount)}
                  </span>
                </div>

                <input
                  id="emi-loan-range"
                  type="range"
                  min="500000"
                  max="15000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  style={{ width: '100%', maxWidth: '100%', accentColor: 'var(--primary)', cursor: 'pointer', display: 'block', boxSizing: 'border-box' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                  <span>₹5 Lakhs</span>
                  <span>₹1.5 Crores</span>
                </div>

                {/* Quick Presets for Loan Amount */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  {[
                    { label: '₹25L', val: 2500000 },
                    { label: '₹35L', val: 3500000 },
                    { label: '₹45L', val: 4500000 },
                    { label: '₹60L', val: 6000000 },
                    { label: '₹85L', val: 8500000 },
                    { label: '₹1.2Cr', val: 12000000 },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setLoanAmount(preset.val)}
                      style={{
                        padding: '0.35rem 0.55rem',
                        borderRadius: '6px',
                        border: loanAmount === preset.val ? '1.5px solid var(--gold-deep)' : '1px solid #e2e8f0',
                        background: loanAmount === preset.val ? 'rgba(228, 170, 60, 0.18)' : '#f8fafc',
                        color: loanAmount === preset.val ? 'var(--primary-dark)' : '#475569',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        flex: '1 1 auto',
                        textAlign: 'center',
                        minWidth: '50px',
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Interest Rate */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <label htmlFor="emi-rate-range" style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                    Interest Rate (% P.A.)
                  </label>
                  <span
                    id="emiRateVal"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.15rem, 3.8vw, 1.35rem)',
                      fontWeight: 700,
                      color: 'var(--gold-deep)',
                    }}
                  >
                    {interestRate.toFixed(1)}%
                  </span>
                </div>

                <input
                  id="emi-rate-range"
                  type="range"
                  min="6.5"
                  max="15.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{ width: '100%', maxWidth: '100%', accentColor: 'var(--primary)', cursor: 'pointer', display: 'block', boxSizing: 'border-box' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                  <span>6.5%</span>
                  <span>15.0%</span>
                </div>

                {/* Quick Presets for Interest Rate */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  {[
                    { label: '8.0%', val: 8.0 },
                    { label: '8.5% (SBI/HDFC)', val: 8.5 },
                    { label: '9.0%', val: 9.0 },
                    { label: '9.5%', val: 9.5 },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setInterestRate(preset.val)}
                      style={{
                        padding: '0.35rem 0.55rem',
                        borderRadius: '6px',
                        border: interestRate === preset.val ? '1.5px solid var(--gold-deep)' : '1px solid #e2e8f0',
                        background: interestRate === preset.val ? 'rgba(228, 170, 60, 0.18)' : '#f8fafc',
                        color: interestRate === preset.val ? 'var(--primary-dark)' : '#475569',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        flex: '1 1 auto',
                        textAlign: 'center',
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Loan Tenure */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <label htmlFor="emi-tenure-range" style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                    Tenure (Years)
                  </label>
                  <span
                    id="emiTenureVal"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.15rem, 3.8vw, 1.35rem)',
                      fontWeight: 700,
                      color: 'var(--gold-deep)',
                    }}
                  >
                    {loanTenure} Years
                  </span>
                </div>

                <input
                  id="emi-tenure-range"
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  style={{ width: '100%', maxWidth: '100%', accentColor: 'var(--primary)', cursor: 'pointer', display: 'block', boxSizing: 'border-box' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>

                {/* Quick Presets for Tenure */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  {[10, 15, 20, 25].map((yrs) => (
                    <button
                      key={yrs}
                      type="button"
                      onClick={() => setLoanTenure(yrs)}
                      style={{
                        padding: '0.35rem 0.55rem',
                        borderRadius: '6px',
                        border: loanTenure === yrs ? '1.5px solid var(--gold-deep)' : '1px solid #e2e8f0',
                        background: loanTenure === yrs ? 'rgba(228, 170, 60, 0.18)' : '#f8fafc',
                        color: loanTenure === yrs ? 'var(--primary-dark)' : '#475569',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        flex: '1 1 auto',
                        textAlign: 'center',
                      }}
                    >
                      {yrs} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Output Card & Visual Breakdown */}
            <div
              className="calc-summary-box"
              style={{
                border: '1.5px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 16px rgba(0, 70, 74, 0.05)',
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}
            >
              {/* Monthly EMI Output Box */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                  Estimated Monthly EMI
                </span>
                <div
                  id="monthlyEmi"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 6vw, 2.85rem)',
                    fontWeight: 700,
                    color: 'var(--primary-dark)',
                    lineHeight: 1.1,
                    margin: '6px 0',
                  }}
                >
                  {formatINR(Math.round(monthlyEmi))}
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                  <CheckCircle2 size={15} /> Pre-approved Bank Loan Assistance
                </div>
              </div>

              {/* Visual Breakdown Bar (Principal vs Interest) */}
              <div
                style={{
                  height: '10px',
                  borderRadius: '5px',
                  background: '#e2e8f0',
                  display: 'flex',
                  overflow: 'hidden',
                  margin: '0.5rem 0 1.25rem',
                }}
              >
                <div
                  id="barPrincipal"
                  title={`Principal Amount: ${Math.round(emiPrincipalPercent)}%`}
                  style={{
                    width: `${emiPrincipalPercent}%`,
                    background: '#10b981',
                    height: '100%',
                    transition: 'width 0.25s ease',
                  }}
                />
                <div
                  id="barInterest"
                  title={`Total Interest: ${Math.round(emiInterestPercent)}%`}
                  style={{
                    width: `${emiInterestPercent}%`,
                    background: 'var(--gold)',
                    height: '100%',
                    transition: 'width 0.25s ease',
                  }}
                />
              </div>

              {/* Stats Breakdown Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', gap: '0.5rem' }}>
                  <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                    <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px', flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Principal Amount</span>
                  </span>
                  <strong id="emiLoanValDup" style={{ color: 'var(--dark)', flexShrink: 0, textAlign: 'right' }}>
                    {formatINR(loanAmount)}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderTop: '1px solid #e2e8f0', gap: '0.5rem' }}>
                  <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                    <span style={{ width: '10px', height: '10px', background: 'var(--gold)', borderRadius: '2px', flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Total Interest Payable</span>
                  </span>
                  <strong id="totalInterest" style={{ color: 'var(--gold-deep)', flexShrink: 0, textAlign: 'right' }}>
                    {formatINR(Math.round(totalEmiInterest))}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '2px dashed #cbd5e1', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--dark)', fontWeight: 700, fontSize: '0.95rem' }}>Total Amount Payable</span>
                  <strong id="totalPayable" style={{ color: 'var(--primary-dark)', fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', fontWeight: 800, flexShrink: 0, textAlign: 'right' }}>
                    {formatINR(Math.round(totalEmiPayable))}
                  </strong>
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.4, marginBottom: '1.25rem', textAlign: 'center' }}>
                *Indicative estimate only. Actual rates, processing fees, and eligibility subject to bank approval.
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <button
                  type="button"
                  id="calc-download-plan-btn"
                  onClick={() => setIsLoanPlanModalOpen(true)}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <FileText size={15} /> Download Custom Bank Loan Plan
                </button>

                <button
                  type="button"
                  data-action="open-enquiry"
                  data-project-name="Riddhi Premium Plots"
                  data-plot-number={selectedPlotForEmi?.plotNumber || ''}
                  className="btn-outline-gold"
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    fontSize: '0.825rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    border: '1.5px solid var(--primary)',
                    color: 'var(--primary-dark)',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Landmark size={14} /> Connect with Bank Loan Specialist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOM BANK LOAN PLAN MODAL / PRINT SHEET */}
        {isLoanPlanModalOpen && (
          <div
            className="modal-overlay show"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(6px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <div
              style={{
                background: '#ffffff',
                color: '#0f172a',
                borderRadius: '16px',
                maxWidth: '620px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2rem',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
              }}
            >
              <button
                type="button"
                onClick={() => setIsLoanPlanModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>

              {/* Printable Letterhead Content */}
              <div id="loan-plan-print-area">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #b88424', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#0f2734', margin: 0 }}>
                      Om Swastik
                    </h3>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: '#b88424', fontWeight: 700 }}>
                      BUILDHOMES PVT LTD
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#64748b' }}>
                    <strong>RERA &amp; ISO Registered</strong><br />
                    Customer Helpline: +91 95992 13531<br />
                    Date: {new Date().toLocaleDateString('en-IN')}
                  </div>
                </div>

                <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: '0 0 0.5rem', fontFamily: 'Playfair Display, serif' }}>
                  Custom Bank Loan Financing Schedule
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem' }}>
                  Project: <strong>Riddhi Premium Plots</strong>, Dholera SIR, Gujarat
                </p>

                {/* Plot Info */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Allotted Unit:</span>
                      <div style={{ fontWeight: 700, color: 'var(--dark)' }}>
                        {selectedPlotForEmi ? `Plot #${selectedPlotForEmi.plotNumber}` : 'Standard Catalog Plot'}
                      </div>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Plot Dimensions:</span>
                      <div style={{ fontWeight: 700, color: 'var(--dark)' }}>25′ × 72′ (200 Sq. Yds.)</div>
                    </div>
                  </div>
                </div>

                {/* Loan Metrics Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px 0', color: '#64748b' }}>Loan Principal Amount</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 700, color: 'var(--primary-dark)' }}>
                        {formatINR(loanAmount)}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px 0', color: '#64748b' }}>Indicative Annual Interest Rate</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 700, color: 'var(--dark)' }}>
                        {interestRate.toFixed(1)}% p.a.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px 0', color: '#64748b' }}>Repayment Tenure</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 700, color: 'var(--dark)' }}>
                        {loanTenure} Years ({loanTenure * 12} Installments)
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fefce8' }}>
                      <td style={{ padding: '10px 8px', color: '#854d0e', fontWeight: 600 }}>Estimated Monthly EMI</td>
                      <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 800, color: '#a16207', fontSize: '1.15rem' }}>
                        {formatINR(Math.round(monthlyEmi))}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px 0', color: '#64748b' }}>Total Interest Over Tenure</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: '#475569' }}>
                        {formatINR(Math.round(totalEmiInterest))}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 0', color: '#0f172a', fontWeight: 700 }}>Total Cumulative Outflow</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 800, color: 'var(--primary-dark)' }}>
                        {formatINR(Math.round(totalEmiPayable))}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Empanelled Banks */}
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>
                  <strong>Empanelled Banking Partners:</strong> State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, Bank of Baroda.
                </div>

                {/* Disclaimer */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', fontSize: '0.7rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  <strong>Statutory Disclaimer:</strong> This document represents an indicative financial estimate calculated using reducing balance amortization. Actual interest rates, processing charges, insurance levies, and loan sanctions are governed by the lending institutions credit policies and subject to final title verification.
                </div>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn-primary"
                  style={{ flex: 1, padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Printer size={16} /> Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={() => setIsLoanPlanModalOpen(false)}
                  className="btn-outline-gold"
                  style={{ flex: 1, padding: '0.75rem' }}
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

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
