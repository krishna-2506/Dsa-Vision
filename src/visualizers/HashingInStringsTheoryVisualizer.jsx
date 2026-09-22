import React from 'react';

export const meta = {
  title: 'String Hashing Theory & Rolling Hash',
  category: 'Strings',
  difficulty: 'Easy / Theory',
  timeComplexity: 'O(N) preprocessing, O(1) query',
  spaceComplexity: 'O(N)',
  description: 'Explores Polynomial Rolling Hash theory, prefix hash tables, O(1) substring hash queries, and collision mitigation using prime base P = 31 and modulo 10^9 + 7.'
};

export const ideaMap = {
  problemArchetype: 'Polynomial Rolling Hash & Modular Arithmetic',
  trigger: 'Need O(1) substring comparisons, multiple pattern matching (Rabin-Karp), longest duplicate substring, or palindromic substring hashing.',
  coreInsight: 'Represent a string as a polynomial evaluated at base P modulo large prime M: H(s) = sum(s[i] * P^i) % M. Precompute prefix hashes and powers of P in O(N). Any arbitrary substring hash H(L, R) can be computed in O(1) via (pref[R] - pref[L-1] * P^(R-L+1)) % M.',
  naiveApproach: {
    title: 'Direct String Slicing & Character Comparison',
    time: 'O(L) per comparison',
    space: 'O(L) memory per slice',
    bottleneck: 'Comparing two substrings of length L requires inspecting up to L characters one by one. Q queries take O(Q * L).'
  },
  optimalApproach: {
    title: 'Prefix Rolling Hash + Power Table',
    time: 'O(N) build, O(1) per query',
    space: 'O(N) prefix array',
    breakthrough: 'Mathematical subtraction and multiplication on prefix hashes yields a unique fingerprint for any slice in O(1).'
  },
  flowNodes: [
    { id: '1', title: 'Base & Modulo Selection', subtitle: 'P = 31, M = 10^9+7', description: 'Pick prime base P larger than alphabet size (P=31 for lowercase, P=53 for mixed) and large prime modulus M to minimize collisions.', tag: 'Config' },
    { id: '2', title: 'Prefix Hash Array', subtitle: 'Cumulative polynomial', description: 'pref[i] = (pref[i-1] * P + val(s[i])) % M. Computes cumulative hash for all prefixes s[0...i].', tag: 'Prefix' },
    { id: '3', title: 'Power Precomputation', subtitle: 'power[k] = P^k % M', description: 'Precompute powers of P up to length N in O(N) to align powers during substring extraction without modular inverse.', tag: 'Powers' },
    { id: '4', title: 'O(1) Substring Query', subtitle: 'pref[R] - pref[L-1]*P^len', description: 'Extract hash of s[L...R] via (pref[R] - pref[L-1] * power[R-L+1]) % M (adding M before modulo for positive values).', tag: 'Query' }
  ],
  pitfalls: [
    'Negative modulo in C++ / Java: Subtraction can produce negative numbers. Always write (diff % MOD + MOD) % MOD.',
    'Hash collisions: A single 10^9+7 modulo has ~1 / 10^9 collision probability. For strict online judges or adversarial test cases, use double hashing (MOD1 = 10^9+7, MOD2 = 10^9+9).',
    'Integer overflow: Use 64-bit integers (long long in C++, BigInt in JS) before applying modulo to prevent 32-bit overflow during multiplications.'
  ],
  interviewCheatSheet: 'Hash any substring in O(1) using prefix hash array: `(pref[R] - pref[L-1] * P^(R-L+1)) % MOD`.'
};

export const solutions = {
  cpp: `// C++ Polynomial Rolling Hash & O(1) Substring Query
#include <string>
#include <vector>
using namespace std;

class StringHash {
    const long long P = 31;
    const long long MOD = 1000000007;
    vector<long long> prefix;
    vector<long long> power;
public:
    StringHash(const string& s) {
        int n = s.size();
        prefix.resize(n + 1, 0);
        power.resize(n + 1, 1);

        for (int i = 0; i < n; i++) {
            prefix[i + 1] = (prefix[i] * P + (s[i] - 'a' + 1)) % MOD;
            power[i + 1] = (power[i] * P) % MOD;
        }
    }

    // Returns hash of substring s[L..R] in O(1) time
    long long getSubstringHash(int L, int R) {
        long long len = R - L + 1;
        long long res = (prefix[R + 1] - (prefix[L] * power[len]) % MOD + MOD) % MOD;
        return res;
    }
};`,
  python: `# Python 3 Polynomial Rolling Hash & O(1) Substring Query
class StringHash:
    def __init__(self, s: str):
        self.P = 31
        self.MOD = 10**9 + 7
        n = len(s)
        self.prefix = [0] * (n + 1)
        self.power = [1] * (n + 1)

        for i in range(n):
            code = ord(s[i]) - ord('a') + 1
            self.prefix[i + 1] = (self.prefix[i] * self.P + code) % self.MOD
            self.power[i + 1] = (self.power[i] * self.P) % self.MOD

    # Returns hash of substring s[L..R] in O(1) time
    def get_substring_hash(self, L: int, R: int) -> int:
        length = R - L + 1
        return (self.prefix[R + 1] - (self.prefix[L] * self.power[length]) % self.MOD) % self.MOD`,
  java: `// Java Polynomial Rolling Hash & O(1) Substring Query
class StringHash {
    private final long P = 31;
    private final long MOD = 1000000007;
    private long[] prefix;
    private long[] power;

    public StringHash(String s) {
        int n = s.length();
        prefix = new long[n + 1];
        power = new long[n + 1];
        power[0] = 1;

        for (int i = 0; i < n; i++) {
            prefix[i + 1] = (prefix[i] * P + (s.charAt(i) - 'a' + 1)) % MOD;
            power[i + 1] = (power[i] * P) % MOD;
        }
    }

    public long getSubstringHash(int L, int R) {
        long len = R - L + 1;
        long res = (prefix[R + 1] - (prefix[L] * power[(int)len]) % MOD + MOD) % MOD;
        return res;
    }
}`,
  javascript: `// JavaScript Polynomial Rolling Hash & O(1) Substring Query
class StringHash {
    constructor(s) {
        this.P = 31n;
        this.MOD = 1000000007n;
        const n = s.length;
        this.prefix = new Array(n + 1).fill(0n);
        this.power = new Array(n + 1).fill(1n);

        for (let i = 0; i < n; i++) {
            const charCode = BigInt(s.charCodeAt(i) - 97 + 1);
            this.prefix[i + 1] = (this.prefix[i] * this.P + charCode) % this.MOD;
            this.power[i + 1] = (this.power[i] * this.P) % this.MOD;
        }
    }

    getSubstringHash(L, R) {
        const len = BigInt(R - L + 1);
        let res = (this.prefix[R + 1] - (this.prefix[L] * this.power[len]) % this.MOD + this.MOD) % this.MOD;
        return Number(res);
    }
}`
};

export const steps = [
  {
    title: '1. Why String Hashing? The O(1) Advantage',
    phase: 'THEORY',
    codeLine: 12,
    s: 'abacaba',
    activeCharIdx: -1,
    queryRange: null,
    formulaDisplay: 'Hash(s) = sum(s[i] * P^(n-1-i)) mod M',
    action: 'Naively comparing strings takes O(L). Hashing enables O(1) equality comparisons.',
    explain: 'Comparing two substrings of length L naively requires character-by-character checks taking O(L) time. By mapping any substring to an integer hash value, we can compare any two substrings in O(1) time!',
    intuition: 'We treat the string as a base-P number where P is a prime number (typically P = 31 for lowercase alphabets).'
  },
  {
    title: '2. Table Initialization & Parameters',
    phase: 'INIT',
    codeLine: 19,
    s: 'abacaba',
    activeCharIdx: -1,
    queryRange: null,
    prefixTable: [0],
    powerTable: [1],
    action: 'Base P = 31, Modulo M = 10^9 + 7. Set prefix[0] = 0, power[0] = 1',
    explain: 'We allocate arrays prefix[n+1] and power[n+1]. Base P = 31 (a prime larger than alphabet size 26) and Modulo M = 10^9 + 7 to prevent integer overflow and minimize collisions.',
    intuition: 'Character mapping: a=1, b=2, c=3, ..., z=26.'
  },
  {
    title: '3. Compute Index 0: s[0] = "a" (val = 1)',
    phase: 'BUILD_PREFIX',
    codeLine: 20,
    s: 'abacaba',
    activeCharIdx: 0,
    queryRange: null,
    prefixTable: [0, 1],
    powerTable: [1, 31],
    mathStep: 'prefix[1] = (0 * 31 + 1) % M = 1',
    action: 'Add s[0]="a": prefix[1] = 1, power[1] = 31',
    explain: 'Compute prefix hash for s[0]: prefix[1] = (prefix[0] * 31 + 1) % MOD = 1. power[1] = 31^1 = 31.',
    intuition: 'The prefix hash for single character "a" is simply 1.'
  },
  {
    title: '4. Compute Index 1: s[1] = "b" (val = 2)',
    phase: 'BUILD_PREFIX',
    codeLine: 20,
    s: 'abacaba',
    activeCharIdx: 1,
    queryRange: null,
    prefixTable: [0, 1, 33],
    powerTable: [1, 31, 961],
    mathStep: 'prefix[2] = (1 * 31 + 2) % M = 33',
    action: 'Add s[1]="b": prefix[2] = 33, power[2] = 961',
    explain: 'Multiply previous hash by 31 and add character value 2: prefix[2] = (1 * 31 + 2) = 33. Substring "ab" has hash 33.',
    intuition: 'Each step shifts the existing hash to the left by base P and adds the new digit.'
  },
  {
    title: '5. Compute Index 2: s[2] = "a" (val = 1)',
    phase: 'BUILD_PREFIX',
    codeLine: 20,
    s: 'abacaba',
    activeCharIdx: 2,
    queryRange: null,
    prefixTable: [0, 1, 33, 1024],
    powerTable: [1, 31, 961, 29791],
    mathStep: 'prefix[3] = (33 * 31 + 1) % M = 1024',
    action: 'Add s[2]="a": prefix[3] = 1024, power[3] = 29791',
    explain: 'prefix[3] = (33 * 31 + 1) = 1024. Substring "aba" has hash 1024! Remember this number—we will see it again when examining the suffix "aba".',
    intuition: 'Hash of "aba" at index 0..2 is 1024.'
  },
  {
    title: '6. Compute Index 3: s[3] = "c" (val = 3)',
    phase: 'BUILD_PREFIX',
    codeLine: 20,
    s: 'abacaba',
    activeCharIdx: 3,
    queryRange: null,
    prefixTable: [0, 1, 33, 1024, 31747],
    powerTable: [1, 31, 961, 29791, 923521],
    mathStep: 'prefix[4] = (1024 * 31 + 3) % M = 31747',
    action: 'Add s[3]="c": prefix[4] = 31747',
    explain: 'prefix[4] = (1024 * 31 + 3) = 31747. The cumulative hash table continues to build in strict O(1) per character.',
    intuition: 'In a single linear pass of O(N), we compute the prefix table for all characters.'
  },
  {
    title: '7. Completed Prefix Table for All 7 Characters',
    phase: 'TABLE_DONE',
    codeLine: 22,
    s: 'abacaba',
    activeCharIdx: -1,
    queryRange: null,
    prefixTable: [0, 1, 33, 1024, 31747, 984158, 30508900, 945775901],
    powerTable: [1, 31, 961, 29791, 923521, 28629151, 887503681, 512613922],
    action: 'Full prefix and power tables built in O(N) time',
    explain: 'All 7 characters processed! prefix table holds cumulative rolling hashes for every prefix s[0..k]. Now we can extract ANY substring hash in O(1) arithmetic operations!',
    intuition: 'Just like prefix sums allow O(1) range sum queries, prefix hashes allow O(1) substring hash queries.'
  },
  {
    title: '8. O(1) Query: Extract Prefix "aba" at s[0..2]',
    phase: 'QUERY_1',
    codeLine: 29,
    s: 'abacaba',
    activeCharIdx: -1,
    queryRange: [0, 2],
    substring: 'aba',
    queryHash: 1024,
    mathStep: 'hash(0..2) = (prefix[3] - prefix[0] * P^3) % M = 1024 - 0 = 1024',
    action: 'Extract hash of s[0..2] ("aba") -> Hash = 1024 in O(1)',
    explain: 'Using the formula hash(L..R) = (prefix[R+1] - prefix[L] * P^(R-L+1)) % M: For L=0, R=2: (prefix[3] - prefix[0] * 31^3) = 1024 - 0 = 1024.',
    intuition: 'Subtracting the shifted prefix isolates the exact substring polynomial.'
  },
  {
    title: '9. O(1) Query: Extract Suffix "aba" at s[4..6] & Match!',
    phase: 'QUERY_2',
    codeLine: 29,
    s: 'abacaba',
    activeCharIdx: -1,
    queryRange: [4, 6],
    substring: 'aba',
    queryHash: 1024,
    mathStep: 'hash(4..6) = (prefix[7] - prefix[4] * P^3) % M = (945775901 - 31747 * 29791) % M = 1024',
    action: 'Extract hash of s[4..6] ("aba") -> Hash = 1024. Exact match with s[0..2] in O(1)!',
    explain: 'For L=4, R=6: (prefix[7] - prefix[4] * 31^3) % MOD = 1024! Both substrings s[0..2] and s[4..6] equal 1024. In a single O(1) integer comparison, we verify they are identical without scanning any characters!',
    intuition: 'Foundation of Rabin-Karp, Longest Common Substring, and Palindrome testing.'
  }
];

export default function HashingInStringsTheoryVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  const chars = step.s.split('');

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 space-y-6 select-none">
      {/* ── Top Header Metrics & Badges ── */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md border font-semibold uppercase text-[10px] ${
            step.phase === 'BUILD_PREFIX'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : step.phase.startsWith('QUERY')
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
          }`}>
            {step.phase}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
            Base P = <strong className="text-cyan-400">31</strong> · MOD = <strong className="text-amber-400">10⁹+7</strong>
          </span>
          {step.queryHash !== undefined && (
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
              Substr Hash: {step.queryHash}
            </span>
          )}
        </div>
      </div>

      {/* ── String Character Stream with Range Query Highlight ── */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-3">
          <span className="uppercase tracking-wider">String Character Stream</span>
          <span>s = "{step.s}"</span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 overflow-x-auto">
          {chars.map((ch, idx) => {
            const isActive = step.activeCharIdx === idx;
            const inQuery = step.queryRange && idx >= step.queryRange[0] && idx <= step.queryRange[1];
            const charCode = ch.charCodeAt(0) - 97 + 1;

            let cardStyle = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk)]';

            if (inQuery) {
              cardStyle = 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-400/50 shadow-md';
            } else if (isActive) {
              cardStyle = 'border-amber-400 bg-amber-500/25 text-amber-300 ring-2 ring-amber-400/50 scale-105';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[42px] sm:min-w-[48px]">
                {/* Pointer / Highlight Label */}
                <div className="h-4 flex items-center justify-center text-[10px] font-mono font-bold">
                  {inQuery ? (
                    <span className="text-emerald-400">Query▼</span>
                  ) : isActive ? (
                    <span className="text-amber-400 animate-bounce">i▼</span>
                  ) : null}
                </div>

                {/* Character Box */}
                <div
                  className={`w-11 h-14 sm:w-13 sm:h-16 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-200 relative ${cardStyle}`}
                >
                  <span className="text-xl sm:text-2xl font-bold">{ch}</span>
                  <span className="text-[9px] text-[var(--chalk-dim)]">val={charCode}</span>
                </div>

                {/* Index tag */}
                <span className="text-[10px] font-mono text-[var(--chalk-faint)]">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Action description banner */}
        <div className="p-3 rounded-xl bg-[var(--board)] border border-[var(--line)] text-xs font-mono flex items-center justify-between gap-2">
          <span className="text-[var(--chalk-dim)]">Action:</span>
          <span className="font-semibold text-amber-300 truncate text-right">
            {step.action}
          </span>
        </div>
      </div>

      {/* ── Active Math Step Callout (if active) ── */}
      {step.mathStep && (
        <div className="w-full p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono space-y-1">
          <span className="text-[10px] uppercase font-bold text-indigo-400">Calculation:</span>
          <div className="text-sm font-bold text-indigo-200">{step.mathStep}</div>
        </div>
      )}

      {/* ── Prefix Hash Table Visualizer ── */}
      {step.prefixTable && (
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
            <span className="uppercase tracking-wider">Prefix Hash Table: prefix[0 .. {step.prefixTable.length - 1}]</span>
            <span className="text-emerald-400 font-bold">O(1) Access</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center font-mono text-xs overflow-x-auto">
            {step.prefixTable.map((val, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${
                  step.activeCharIdx + 1 === idx
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300 ring-2 ring-amber-400/40'
                    : 'border-[var(--line)] bg-[var(--board)] text-[var(--chalk-dim)]'
                }`}
              >
                <span className="text-[9px] text-[var(--chalk-faint)]">pref[{idx}]</span>
                <span className="text-xs font-bold text-[var(--chalk)] mt-1 truncate max-w-full">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Pedagogical Explanation & Intuition Callout ── */}
      <div className="w-full space-y-2">
        <div className="w-full p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs font-sans text-[var(--chalk)] leading-relaxed shadow-sm">
          <strong className="text-amber-400 font-mono block mb-1">Step Walkthrough:</strong>
          {step.explain}
        </div>

        <div className="w-full p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-sans text-amber-300/90 leading-relaxed">
          <strong className="font-mono text-amber-400">💡 Algorithmic Intuition: </strong>
          {step.intuition}
        </div>
      </div>
    </div>
  );
}
