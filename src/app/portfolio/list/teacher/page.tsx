'use client'

import { usePortfolioStore } from '@/store/portfolioStore'
import Link from 'next/link'
import { useState } from 'react'

export default function TeacherListPage() {
    const portfolios = usePortfolioStore((s) => s.portfolios)
    const [sortAsc, setSortAsc] = useState(true)

    const sortedPortfolios = [...portfolios].sort((a, b) =>
        sortAsc ? a.gpa - b.gpa : b.gpa - a.gpa
    )

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                <h2 className="text-3xl font-bold text-indigo-600 text-center">รายชื่อนักเรียนทั้งหมด</h2>

                <div className="flex justify-end">
                    <button
                        onClick={() => setSortAsc(!sortAsc)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                        GPA
                        {sortAsc ? '▲' : '▼'}
                    </button>
                </div>

                {sortedPortfolios.length === 0 ? (
                    <p className="text-center text-gray-500">ยังไม่มีข้อมูลนักเรียน</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sortedPortfolios.map((p) => (
                            <div key={p.id} className="bg-white rounded-xl shadow-md p-6 space-y-4">
                                <div className="flex items-center gap-4">
                                    {p.image && (
                                        <img
                                            src={p.image}
                                            alt="student"
                                            className="w-20 h-20 object-cover rounded-full border border-indigo-300"
                                        />
                                    )}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {p.firstName} {p.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-600">โรงเรียน: {p.school}</p>
                                        <p className="text-sm text-gray-600">GPA: {p.gpa.toFixed(2)}</p>
                                        <Link
                                            href={`/portfolio/${p.id}`}
                                            className="text-sm text-indigo-600 hover:underline"
                                        >
                                            ดูรายละเอียด
                                        </Link>
                                    </div>
                                </div>

                                {/* กิจกรรม PDF */}
                                {p.activities && p.activities.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-1">กิจกรรม (PDF)</p>
                                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                            {p.activities.map((url, i) => (
                                                <li key={i}>
                                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                                                        กิจกรรม {i + 1}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* ผลงาน PDF */}
                                {p.achievements && p.achievements.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-1">ผลงาน (PDF)</p>
                                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                            {p.achievements.map((url, i) => (
                                                <li key={i}>
                                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                                                        ผลงาน {i + 1}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
