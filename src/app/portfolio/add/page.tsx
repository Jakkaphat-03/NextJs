'use client'

import PortfolioForm from '@/components/PortfolioForm'

export default function AddPortfolioPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10 font-sans">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
                    แบบฟอร์ม Portfolio สำหรับ TCAS69
                </h2>
                <PortfolioForm />
            </div>
        </div>
    )
}
