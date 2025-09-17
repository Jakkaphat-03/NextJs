'use client'

import PortfolioForm from '@/components/PortfolioForm'

export default function HomePage() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">กรอกข้อมูล Portfolio</h2>
            <PortfolioForm />
        </div>
    )
}
