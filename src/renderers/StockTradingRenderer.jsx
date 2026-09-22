import React from 'react';
import { VisualizerLayout } from '../components/primitives';

/**
 * StockTradingRenderer
 * 
 * Shared renderer for all Buy & Sell Stock DP problems:
 * - Best Time to Buy and Sell Stock (I)
 * - Best Time to Buy and Sell Stock II (Infinite transactions)
 * - Best Time to Buy and Sell Stock III (At most 2 transactions)
 * - Best Time to Buy and Sell Stock IV (At most K transactions)
 * - Best Time to Buy and Sell Stock with Cooldown
 * - Best Time to Buy and Sell Stock with Transaction Fee
 * 
 * Expects step data shape:
 * {
 *   phase: string,
 *   prices: number[],
 *   currentDay: number | null,
 *   trades: [{ buy: number, sell: number, gross?: number, fee?: number, net: number }],
 *   dpState?: {
 *     holdProfit?: number,
 *     notHoldProfit?: number,
 *     cooldownProfit?: number,
 *     transactionsLeft?: number
 *   },
 *   metrics: [{ label: string, value: any, highlight?: boolean }],
 *   formula: string,
 *   action: string,
 *   explain: string,
 *   intuition: string,
 *   customCard?: { title: string, rows: [{ label: string, value: string, accent?: boolean }] }
 * }
 */
export default function StockTradingRenderer({ currentStep = 0, steps = [] }) {
  if (!steps || steps.length === 0) return null;

  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx];

  const maxPrice = Math.max(...(step.prices || [10]), 1);

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={
        step.currentDay !== null && step.currentDay !== undefined
          ? `Day ${step.currentDay} (Price: $${step.prices?.[step.currentDay] ?? '—'})`
          : step.phase === 'COMPLETED' ? 'Complete' : 'Overview'
      }
      metrics={step.metrics || []}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4 font-mono">
        {/* Price Timeline Chart */}
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
          <div className="w-full flex items-center justify-between text-xs text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              Stock Price Timeline
            </span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> BUY
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> SELL
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span> ACTIVE
              </span>
            </div>
          </div>

          <div className="w-full flex items-end justify-between gap-2 h-44 pt-4 px-2">
            {(step.prices || []).map((price, idx) => {
              const heightPercent = Math.max(18, Math.round((price / maxPrice) * 100));
              const isCurrent = idx === step.currentDay;
              const isBuy = (step.trades || []).some(t => t.buy === idx);
              const isSell = (step.trades || []).some(t => t.sell === idx);

              let barClass = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-faint)]';
              let badge = '';

              if (isBuy) {
                barClass = 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg';
                badge = 'BUY';
              } else if (isSell) {
                barClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
                badge = 'SELL';
              } else if (isCurrent) {
                barClass = 'border-cyan-500 bg-cyan-500/25 text-cyan-300 ring-2 ring-cyan-500/40 shadow-lg';
                badge = 'DAY';
              }

              return (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className={`text-[11px] font-bold mb-1 ${isBuy ? 'text-emerald-400' : isSell ? 'text-amber-300' : isCurrent ? 'text-cyan-300' : 'text-[var(--chalk-dim)]'}`}>
                    ${price}
                  </span>

                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[48px] rounded-t-xl border-t border-x flex flex-col items-center justify-between p-1 transition-all duration-300 ${barClass}`}
                  >
                    <span className="text-[8px] font-bold tracking-wider">
                      {badge}
                    </span>
                    <span className="text-[7px] opacity-70">
                      p[{idx}]
                    </span>
                  </div>

                  <span className={`text-[10px] mt-1.5 ${isCurrent ? 'text-cyan-300 font-bold' : 'text-[var(--chalk-dim)]'}`}>
                    D{idx}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Executed Trades Info */}
          {(step.trades || []).length > 0 && (
            <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 flex flex-wrap items-center justify-around gap-2 text-xs">
              {step.trades.map((t, tidx) => (
                <div key={tidx} className="px-3 py-1.5 rounded-lg bg-[var(--board-raised)] border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                  <span className="font-bold text-[10px] uppercase text-[var(--chalk-dim)]">Trade {tidx + 1}:</span>
                  <span>Buy D{t.buy} (${step.prices?.[t.buy]}) &rarr; Sell D{t.sell} (${step.prices?.[t.sell]})</span>
                  {t.fee !== undefined && <span className="text-amber-400/80 text-[10px]">(-${t.fee} fee)</span>}
                  <strong className="text-amber-300">+{t.net >= 0 ? `$${t.net}` : `-$${Math.abs(t.net)}`}</strong>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DP Decision State Cards (if provided) */}
        {step.dpState && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {step.dpState.holdProfit !== undefined && (
              <div className="p-3 rounded-xl bg-[var(--board-raised)] border border-[var(--line)]">
                <span className="text-[10px] text-[var(--chalk-dim)] block uppercase font-semibold">Hold / Buy State</span>
                <span className="text-sm font-bold text-emerald-400">${step.dpState.holdProfit}</span>
              </div>
            )}
            {step.dpState.notHoldProfit !== undefined && (
              <div className="p-3 rounded-xl bg-[var(--board-raised)] border border-[var(--line)]">
                <span className="text-[10px] text-[var(--chalk-dim)] block uppercase font-semibold">Sell / Idle State</span>
                <span className="text-sm font-bold text-cyan-400">${step.dpState.notHoldProfit}</span>
              </div>
            )}
            {step.dpState.cooldownProfit !== undefined && (
              <div className="p-3 rounded-xl bg-[var(--board-raised)] border border-[var(--line)]">
                <span className="text-[10px] text-[var(--chalk-dim)] block uppercase font-semibold">Cooldown State</span>
                <span className="text-sm font-bold text-purple-400">${step.dpState.cooldownProfit}</span>
              </div>
            )}
            {step.dpState.transactionsLeft !== undefined && (
              <div className="p-3 rounded-xl bg-[var(--board-raised)] border border-[var(--line)]">
                <span className="text-[10px] text-[var(--chalk-dim)] block uppercase font-semibold">Transactions Left</span>
                <span className="text-sm font-bold text-amber-300">{step.dpState.transactionsLeft}</span>
              </div>
            )}
          </div>
        )}

        {/* Custom Strategy / Transition Card */}
        {step.customCard && (
          <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm text-xs space-y-2">
            <div className="flex items-center justify-between text-[var(--chalk-dim)] border-b border-[var(--line)] pb-1.5">
              <span className="font-semibold uppercase tracking-wider text-[11px]">
                {step.customCard.title}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {step.customCard.rows.map((row, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
                  <span className={`font-bold block mb-1 ${row.accent ? 'text-emerald-400' : 'text-[var(--accent-bright)]'}`}>
                    {row.label}
                  </span>
                  <p className="text-[11px] text-[var(--chalk-dim)] font-sans">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </VisualizerLayout>
  );
}
