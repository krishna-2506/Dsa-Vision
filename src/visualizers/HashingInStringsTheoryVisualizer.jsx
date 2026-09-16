import React from 'react';

export const meta = {
  title: 'String Hashing Theory & Rolling Hash',
  category: 'Strings',
  difficulty: 'Medium',
  timeComplexity: 'O(N) preprocessing, O(1) query',
  spaceComplexity: 'O(N)',
  description: 'Explores Polynomial Rolling Hash theory, prefix hash arrays, O(1) substring hash queries, and collision mitigation using prime bases (e.g. 31, 53) and large modulos (10^9 + 7).'
};

export const solutions = {
  cpp: `// C++ Polynomial Rolling Hash & Substring Hash
// Preprocessing: O(N) | Substring Query: O(1)
#include <string>
#include <vector>
using namespace std;

class StringHash {
    const long long P = 31;
    const long long MOD = 1000000007;
    vector<long long> hashPrefix;
    vector<long long> power;
public:
    StringHash(const string& s) {
        int n = s.size();
        hashPrefix.resize(n + 1, 0);
        power.resize(n + 1, 1);

        for (int i = 0; i < n; i++) {
            hashPrefix[i + 1] = (hashPrefix[i] * P + (s[i] - 'a' + 1)) % MOD;
            power[i + 1] = (power[i] * P) % MOD;
        }
    }

    // Returns hash of substring s[L..R] (0-indexed, inclusive)
    long long getSubstringHash(int L, int R) {
        long long res = (hashPrefix[R + 1] - (hashPrefix[L] * power[R - L + 1]) % MOD + MOD) % MOD;
        return res;
    }
};`,
  python: `# Python 3 Polynomial Rolling Hash & Substring Query
# Preprocessing: O(N) | Substring Query: O(1)
class StringHash:
    def __init__(self, s: str):
        self.P = 31
        self.MOD = 10**9 + 7
        n = len(s)
        self.prefix = [0] * (n + 1)
        self.power = [1] * (n + 1)

        for i in range(n):
            self.prefix[i + 1] = (self.prefix[i] * self.P + (ord(s[i]) - ord('a') + 1)) % self.MOD
            self.power[i + 1] = (self.power[i] * self.P) % self.MOD

    def get_substring_hash(self, L: int, R: int) -> int:
        res = (self.prefix[R + 1] - (self.prefix[L] * self.power[R - L + 1]) % self.MOD) % self.MOD
        return res`,
  java: `// Java Polynomial Rolling Hash & Substring Query
// Preprocessing: O(N) | Substring Query: O(1)
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
        long res = (prefix[R + 1] - (prefix[L] * power[R - L + 1]) % MOD + MOD) % MOD;
        return res;
    }
}`,
  javascript: `// JavaScript Polynomial Rolling Hash
// Preprocessing: O(N) | Substring Query: O(1)
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
    title: '1. Polynomial Hash Formula & Parameters',
    phase: 'FORMULA',
    codeLine: 12,
    s: 'abacaba',
    p: 31,
    mod: '10^9 + 7',
    prefixHashes: [0, 1, 33, 1024, 31747],
    variables: { formula: 'H(s) = sum(s[i] * P^i) mod M', baseP: 31, modulo: '10^9 + 7' },
    explain: 'Each character is converted to an integer (a=1, b=2, ..., z=26) and multiplied by powers of prime base P mod M.',
    intuition: 'Treats the string as a base-P number to achieve near-zero collision probability.'
  },
  {
    title: '2. Compute Prefix Hash Array in O(N)',
    phase: 'PREFIX_ARRAY',
    codeLine: 19,
    s: 'abacaba',
    p: 31,
    mod: '10^9 + 7',
    prefixHashes: [0, 1, 33, 1024, 31747],
    variables: { 'prefix[1]': 'hash("a") = 1', 'prefix[2]': 'hash("ab") = 1*31 + 2 = 33', 'prefix[3]': 'hash("aba") = 33*31 + 1 = 1024' },
    explain: 'Prefix array precomputes rolling hashes in a single linear scan: prefix[i+1] = (prefix[i] * P + char) % MOD.',
    intuition: 'Cumulative hash prefix mirrors prefix sums for numerical arrays.'
  },
  {
    title: '3. O(1) Substring Hash Extraction',
    phase: 'SUBSTRING_QUERY',
    codeLine: 26,
    s: 'abacaba',
    p: 31,
    mod: '10^9 + 7',
    queryRange: [0, 2],
    subString: 'aba',
    queryHash: 1024,
    variables: { formula: 'hash(L..R) = (prefix[R+1] - prefix[L] * P^(R-L+1)) mod M', range: 's[0..2] = "aba"', hashValue: 1024 },
    explain: 'To extract hash of substring "aba" from index 0 to 2: subtract shifted left prefix in O(1) time.',
    intuition: 'Enables constant-time equality checks for substrings of any length.'
  },
  {
    title: '4. Summary: Robin-Karp & Collision Avoidance',
    phase: 'COMPLETED',
    codeLine: 30,
    s: 'abacaba',
    p: 31,
    mod: '10^9 + 7',
    queryRange: [4, 6],
    subString: 'aba',
    queryHash: 1024,
    variables: { 's[0..2] "aba"': 1024, 's[4..6] "aba"': 1024, comparison: 'Identical Hash in O(1)!' },
    explain: 'Both occurrences of "aba" produce identical hash 1024 in O(1) operations. Double hashing eliminates collisions completely.',
    intuition: 'Foundation for Rabin-Karp pattern search, palindrome testing, and longest common prefix queries.'
  }
];

export default function HashingInStringsTheoryVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Base P: {step.p}, MOD: {step.mod}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Substring Query: O(1)
        </span>
      </div>

      {/* String Characters with Hash Previews */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          String Stream: "{step.s}"
        </span>

        <div className="flex items-center justify-center gap-2 py-2">
          {step.s.split('').map((ch, idx) => {
            const inQuery =
              step.queryRange &&
              idx >= step.queryRange[0] &&
              idx <= step.queryRange[1];

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-12 h-16 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    inQuery
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                      : 'border-[#272b3c] bg-[#161824] text-slate-400'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                  <span className="text-base font-bold text-amber-300 mt-0.5">{ch}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Substring Hash Query Result */}
        {step.subString && (
          <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-1 font-mono text-xs">
            <span className="text-cyan-300 font-semibold">
              Query Substring: "{step.subString}" &rarr; Hash:{' '}
              <span className="text-emerald-400 font-bold">{step.queryHash}</span>
            </span>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
