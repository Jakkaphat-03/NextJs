'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (username === 'teacher' && password === 'tcas69') {
            router.push('/portfolio/list/teacher')
        } else {
            setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="เช่น teacher"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="เช่น tcas69"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <h5 className="block text-xs font-medium text-gray-700">Password Only</h5>
                    <h5 className="block text-xs font-medium text-gray-700">User: teacher <br /> Password: tcas69</h5>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Sign in
                    </button>
                </form>
                
            </div>
        </div>
    )
}
