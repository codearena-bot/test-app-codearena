'use client';

import { useState } from 'react';

export default function PrimeNumberComputer() {
  const [n, setN] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Function to check if a number is prime
  function isPrime(num: number): boolean {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  }

  // Function to find the nth prime number
  function findNthPrime(n: number): number {
    if (n < 1) throw new Error('N must be a positive integer');

    let count = 0;
    let num = 2;

    while (count < n) {
      if (isPrime(num)) {
        count++;
        if (count === n) return num;
      }
      num++;
    }

    return num;
  }

  const handleCalculate = async () => {
    const nValue = parseInt(n);

    if (!n || isNaN(nValue) || nValue < 1) {
      setError('Please enter a valid positive integer');
      return;
    }

    if (nValue > 10000) {
      setError('Please enter a number less than or equal to 10,000 for performance reasons');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Add a small delay for large numbers to show loading state
      if (nValue > 1000) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const prime = findNthPrime(nValue);
      setResult(prime);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Prime Number Computer
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="n-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter n to find the nth prime number:
          </label>
          <input
            id="n-input"
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a positive integer (1-10,000)"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            min="1"
            max="10000"
            disabled={isLoading}
          />
        </div>

        <button
          onClick={handleCalculate}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? 'Computing...' : 'Find Prime'}
        </button>

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md">
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        )}

        {result !== null && !error && (
          <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-md">
            <p className="text-green-800 dark:text-green-200">
              The <span className="font-bold">{n}</span>
              {n === '1' ? 'st' : n === '2' ? 'nd' : n === '3' ? 'rd' : 'th'} prime number is:
              <span className="text-xl font-bold ml-2">{result}</span>
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          <p>Examples: 1st prime = 2, 2nd prime = 3, 3rd prime = 5, 10th prime = 29</p>
        </div>
      </div>
    </div>
  );
}