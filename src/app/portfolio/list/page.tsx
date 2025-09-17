'use client'

import { usePortfolioStore } from '@/store/portfolioStore'
import Link from 'next/link'
import { useState } from 'react'

export default function PortfolioListPage() {
    const portfolios = usePortfolioStore((s) => s.portfolios)
    const [sortAsc, setSortAsc] = useState(true)

    const sorted = [...portfolios].sort((a, b) =>
        sortAsc ? a.gpa - b.gpa : b.gpa - a.gpa
    )

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">รายชื่อนักเรียน</h2>
            <button
                onClick={() => setSortAsc(!sortAsc)}
                className="mb-4 bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600"
            >
                เรียง GPA {sortAsc ? '⬆️' : '⬇️'}
            </button>
            <table className="w-full table-auto border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">ชื่อ</th>
                        <th className="p-2">GPA</th>
                        <th className="p-2">ดูรายละเอียด</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((p) => (
                        <tr key={p.id} className="border-t">
                            <td className="p-2">{p.firstName} {p.lastName}</td>
                            <td className="p-2">{p.gpa.toFixed(2)}</td>
                            <td className="p-2 text-indigo-600 underline">
                                <Link href={`/portfolio/${p.id}`}>ดูข้อมูล</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
