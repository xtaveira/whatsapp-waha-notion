"use client";

import React, { useEffect, useState } from "react";

type Person = {
  id: string;
  name: string;
  url: string;
};

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPeople() {
      try {
        const res = await fetch("/api/people");
        if (!res.ok) throw new Error("Failed to fetch people");
        const data: Person[] = await res.json();
        setPeople(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchPeople();
  }, []);

  function extractWhatsAppNumber(url: string) {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("wa.me")) {
        return parsedUrl.pathname.replace("/", "");
      }
      return url;
    } catch {
      return url;
    }
  }

  if (loading) return <p className="p-4">Loading people...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">People List</h1>
      <ul className="space-y-2">
        {people.map(({ id, name, url }) => (
          <li key={id}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {extractWhatsAppNumber(url)}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
