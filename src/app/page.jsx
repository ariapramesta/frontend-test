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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 font-inter">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <iframe
            src="/carousel.html"
            className="w-full h-[220px] sm:h-[280px] md:h-[350px] lg:h-[420px] border-none"
            title="Alpine Carousel"
          ></iframe>
        </div>

        {view === "list" ? (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center sm:text-left">
                Company Directory
              </h2>

              <button
                onClick={() => setView("form")}
                className="w-full sm:w-auto text-sm md:text-base px-4 py-2 rounded-lg font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
              >
                + Register Company
              </button>
            </div>

            {loading && (
              <p className="text-gray-500 animate-pulse text-center">
                Loading data...
              </p>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && !error && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs tracking-wide">
                    <tr>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Industry</th>
                      <th className="text-left p-3 font-medium">
                        Founded Year
                      </th>
                      <th className="text-left p-3 font-medium">
                        Headquarters City
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c, i) => (
                      <tr
                        key={i}
                        className="hover:bg-blue-50/50 transition-colors border-b border-gray-100"
                      >
                        <td className="p-3 font-medium text-gray-800">
                          {c.name}
                        </td>
                        <td className="p-3 text-gray-600">{c.industry}</td>
                        <td className="p-3 text-gray-600">
                          {c.foundedYear || "N/A"}
                        </td>
                        <td className="p-3 text-gray-600">
                          {c.headquarters || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ) : (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center sm:text-left">
                Company Registration
              </h2>
              <button
                onClick={() => setView("list")}
                className="w-full sm:w-auto text-sm md:text-base px-4 py-2 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 transition"
              >
                ← Back to List
              </button>
            </div>

            <form
              action=""
              method="post"
              noValidate
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Company Name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="companyName"
                  placeholder="Enter company name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Industry Sector */}
              <div>
                <label
                  htmlFor="industrySector"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Industry Sector
                </label>
                <select
                  name="industrySector"
                  id="industrySector"
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select sector</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Employee Size */}
              <div className="sm:col-span-2">
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Size
                </span>
                <div className="flex flex-wrap gap-4">
                  {["1-50", "51-100", "200+"].map((size) => (
                    <label
                      key={size}
                      className="flex items-center gap-2 text-gray-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="employeeSize"
                        value={size}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              {/* Headquarters City */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="headquartersCity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Headquarters City
                </label>
                <input
                  type="text"
                  name="headquartersCity"
                  id="headquartersCity"
                  placeholder="Enter city"
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Terms */}
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agree"
                  id="agree"
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="agree" className="text-sm text-gray-700">
                  I agree to the Terms and Conditions
                </label>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-md hover:bg-blue-700 active:scale-[0.99] transition-transform"
                >
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
