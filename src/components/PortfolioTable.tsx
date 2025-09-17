// components/PortfolioTable.tsx
import { usePortfolioStore } from '@/store/portfolioStore'
import Link from 'next/link'
import { useState } from 'react'

export default function PortfolioTable() {
    const portfolios = usePortfolioStore((s) => s.portfolios)
    const [sortAsc, setSortAsc] = useState(true)

    const sorted = [...portfolios].sort((a, b) =>
        sortAsc ? a.gpa - b.gpa : b.gpa - a.gpa
    )

    return (
        <div>
            <button onClick={() => setSortAsc(!sortAsc)}>
                เรียง GPA {sortAsc ? '⬆️' : '⬇️'}
            </button>
            <table>
                <thead>
                    <tr>
                        <th>ชื่อ</th>
                        <th>GPA</th>
                        <th>ดูรายละเอียด</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((p) => (
                        <tr key={p.id}>
                            <td>{p.firstName} {p.lastName}</td>
                            <td>{p.gpa}</td>
                            <td>
                                <Link href={`/portfolio/${p.id}`}>ดูข้อมูล</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
