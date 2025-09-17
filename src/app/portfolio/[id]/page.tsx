'use client'

import { usePortfolioStore } from '@/store/portfolioStore'
import { useParams } from 'next/navigation'

export default function PortfolioDetailPage() {
    const { id } = useParams()
    const portfolio = usePortfolioStore((s) =>
        s.portfolios.find((p) => p.id === id)
    )

    if (!portfolio) {
        return (
            <div className="min-h-screen flex items-center justify-center font-sans">
                <p className="text-red-500 text-lg">ไม่พบข้อมูลนักเรียน</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 font-sans">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
                    ข้อมูลนักเรียน
                </h2>

                {/* รูปภาพ */}
                {portfolio.image && (
                    <div className="flex justify-center mb-6">
                        <img
                            src={portfolio.image}
                            alt="student"
                            className="w-40 h-40 object-cover rounded-full border-4 border-indigo-300 shadow-md"
                        />
                    </div>
                )}

                {/* ข้อมูลส่วนตัว */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm text-gray-500">ชื่อ - นามสกุล</label>
                        <p className="text-lg font-medium text-gray-800">
                            {portfolio.firstName} {portfolio.lastName}
                        </p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">เบอร์โทร</label>
                        <p className="text-lg font-medium text-gray-800">{portfolio.phone}</p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">ที่อยู่</label>
                        <p className="text-lg font-medium text-gray-800">{portfolio.address}</p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">โรงเรียน</label>
                        <p className="text-lg font-medium text-gray-800">{portfolio.school}</p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">GPA</label>
                        <p className="text-lg font-medium text-gray-800">{portfolio.gpa.toFixed(2)}</p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">ความสามารถพิเศษ</label>
                        <p className="text-lg font-medium text-gray-800">{portfolio.talent || '-'}</p>
                    </div>
                </div>

                {/* ข้อมูลการสมัคร */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">ข้อมูลการสมัคร</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-500">เหตุผลในการสมัคร</label>
                            <p className="text-gray-800">{portfolio.reason}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">สาขาที่เลือก</label>
                            <p className="text-gray-800">{portfolio.major}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">มหาวิทยาลัย</label>
                            <p className="text-gray-800">{portfolio.university}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
