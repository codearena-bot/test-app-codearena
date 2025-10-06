+"use client";
import Image from "next/image";
+import { useState } from "react";

export default function Home() {
+  const [n, setN] = useState<number | "">("");
+  const [prime, setPrime] = useState<number | null>(null);
+
+  const isPrime = (num: number): boolean => {
+    if (num <= 1) return false;
+    for (let i = 2; i * i <= num; i++) {
+      if (num % i === 0) return false;
+    }
+    return true;
+  };
+
+  const findNthPrime = () => {
+    if (n === "" || n <= 0) {
+      setPrime(null);
+      return;
+    }
+    let count = 0;
+    let num = 2;
+    while (count < n) {
+      if (isPrime(num)) {
+        count++;
+      }
+      if (count === n) {
+        setPrime(num);
+        break;
+      }
+      num++;
+    }
+  };
+
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
+        <div className="flex flex-col gap-4 items-center">
+          <h1 className="text-2xl font-bold">N-th Prime Number Computer</h1>
+          <div className="flex gap-2">
+            <input
+              type="number"
+              value={n}
+              onChange={(e) => setN(parseInt(e.target.value))}
+              className="border border-gray-300 rounded-md p-2 text-black"
+              placeholder="Enter a number"
            />
+            <button
+              onClick={findNthPrime}
+              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
+            >
+              Compute
+            </button>
+          </div>
+          {prime !== null && (
+            <p className="text-lg">
+              The {n}-th prime number is: <strong>{prime}</strong>
+            </p>
+          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
