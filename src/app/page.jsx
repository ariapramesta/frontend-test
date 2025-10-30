"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [view, setView] = useState("list");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://json-placeholder.mock.beeceptor.com/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        {/* Carousel */}

        <iframe
          src="/carousel.html"
          className="w-full h-96 border-none"
          title="Alpine Carousel"
        ></iframe>

        {/* Conditional View */}
        {view === "list" ? (
          <section className="bg-white rounded-2xl shadow p-8 border border-gray-100">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold mb-6">Company List</h2>

              <button
                onClick={() => setView("form")}
                className={`px-4 py-2 rounded-lg font-medium transition bg-gray-100 hover:bg-gray-200" `}
              >
                Register Company
              </button>
            </div>

            {loading && <p>Loading data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-100 border-b border-gray-200 text-gray-700">
                    <tr>
                      <th className="text-left p-3 font-semibold">Name</th>
                      <th className="text-left p-3 font-semibold">Industry</th>
                      <th className="text-left p-3 font-semibold">
                        Founded Year
                      </th>
                      <th className="text-left p-3 font-semibold">
                        Headquarters City
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c, i) => (
                      <tr
                        key={i}
                        className="hover:bg-blue-50 transition-colors border-b border-gray-100"
                      >
                        <td className="p-3">{c.name}</td>
                        <td className="p-3">{c.industry}</td>
                        <td className="p-3">{c.foundedYear || "N/A"}</td>
                        <td className="p-3">{c.headquarters || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ) : (
          <section className="bg-white rounded-2xl shadow p-8 border border-gray-100">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold mb-6 ">
                Company Registration
              </h2>
              <button
                onClick={() => setView("list")}
                className={`px-4 py-2 rounded-lg font-medium transition bg-gray-100 hover:bg-gray-200" `}
              >
                Company List
              </button>
            </div>

            <form className="grid gap-6 sm:grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-600">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full mt-1 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  placeholder="e.g., OpenAI"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Industry Sector
                </label>
                <select className="w-full mt-1 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Employee Size
                </label>
                <div className="flex gap-4 mt-2 text-sm text-gray-700">
                  <label>
                    <input type="radio" name="size" className="mr-1" /> 1–50
                  </label>
                  <label>
                    <input type="radio" name="size" className="mr-1" /> 51–200
                  </label>
                  <label>
                    <input type="radio" name="size" className="mr-1" /> 200+
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="w-full mt-1 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Headquarters City
                </label>
                <input
                  type="text"
                  className="w-full mt-1 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  placeholder="Jakarta"
                />
              </div>

              <div className="col-span-2 flex items-center mt-2">
                <input
                  type="checkbox"
                  className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                />
                <span className="text-sm text-gray-700">
                  I agree to the Terms and Conditions
                </span>
              </div>

              <div className="col-span-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
                  Submit
                </button>
              </div>
            </form>
          </section>
        )}
      </section>
    </main>
  );
}
