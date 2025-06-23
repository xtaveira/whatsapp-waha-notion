"use client";

import React, { useEffect, useState } from "react";

type Person = {
  name: string;
  status: string;
  groups: string[];
  whatsappLink?: string;
  instagramLink?: string;
};

function extractPhoneNumber(whatsappLink?: string) {
  if (!whatsappLink) return "No number";
  const match = whatsappLink.match(/phone=\+?(\d+)/);
  return match ? match[1] : "No number";
}

export default function HomePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/people")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setPeople(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading people...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">People List</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2">Name</th>
            <th className="border border-gray-300 px-3 py-2">Status</th>
            <th className="border border-gray-300 px-3 py-2">Groups</th>
            <th className="border border-gray-300 px-3 py-2">
              WhatsApp Number
            </th>
            <th className="border border-gray-300 px-3 py-2">Instagram</th>
          </tr>
        </thead>
        <tbody>
          {people.map(
            ({ name, status, groups, whatsappLink, instagramLink }) => (
              <tr key={name} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2">{name}</td>
                <td className="border border-gray-300 px-3 py-2">{status}</td>
                <td className="border border-gray-300 px-3 py-2">
                  {groups.join(", ")}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {extractPhoneNumber(whatsappLink)}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {instagramLink ? (
                    <a
                      href={instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Instagram
                    </a>
                  ) : (
                    "No Instagram"
                  )}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
