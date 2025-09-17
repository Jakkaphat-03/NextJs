'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePortfolioStore } from '@/store/portfolioStore'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    address: z.string().min(1),
    phone: z.string().regex(/^0[0-9]{9}$/),
    school: z.string().min(1),
    gpa: z.coerce.number().min(0).max(4),
    talent: z.string().optional(),
    reason: z.string().min(1),
    major: z.string().min(1),
    university: z.string().min(1),
})

type FormData = z.infer<typeof schema>

export default function PortfolioForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })


    const addPortfolio = usePortfolioStore((s) => s.addPortfolio)
    const router = useRouter()

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [activityFiles, setActivityFiles] = useState<File[]>([])
    const [achievementFiles, setAchievementFiles] = useState<File[]>([])

    const handleFileUpload = (files: FileList | null, setFiles: (f: File[]) => void) => {
        if (!files) return
        const validFiles = Array.from(files).filter((file) => file.type === 'application/pdf')
        setFiles(validFiles)
    }

    const onSubmit = (data: FormData) => {
        addPortfolio({
            id: uuidv4(),
            ...data,
            image: imagePreview ?? undefined,
            activities: activityFiles.map((f) => URL.createObjectURL(f)),
            achievements: achievementFiles.map((f) => URL.createObjectURL(f)),
        })
        router.push('/portfolio/list/teacher')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-sans">
            {/* ข้อมูลส่วนตัว */}
            <section>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">ข้อมูลส่วนตัว</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">ชื่อ</label>
                        <input {...register('firstName')} className="input" />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">นามสกุล</label>
                        <input {...register('lastName')} className="input" />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 mb-1">ที่อยู่</label>
                        <input {...register('address')} className="input" />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">เบอร์โทร</label>
                        <input {...register('phone')} className="input" />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">โรงเรียน</label>
                        <input {...register('school')} className="input" />
                        {errors.school && <p className="text-red-500 text-sm">{errors.school.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">GPA</label>
                        <input type="number" step="0.01" {...register('gpa')} className="input" />
                        {errors.gpa && <p className="text-red-500 text-sm">{errors.gpa.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">ความสามารถพิเศษ</label>
                        <input {...register('talent')} className="input" />
                    </div>
                </div>
            </section>

            {/* ข้อมูลการสมัคร */}
            <section className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">ข้อมูลการสมัคร</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 mb-1">เหตุผลในการสมัคร</label>
                        <textarea {...register('reason')} className="input h-24 resize-none" />
                        {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">สาขาที่เลือก</label>
                        <input {...register('major')} className="input" />
                        {errors.major && <p className="text-red-500 text-sm">{errors.major.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">มหาวิทยาลัย</label>
                        <input {...register('university')} className="input" />
                        {errors.university && <p className="text-red-500 text-sm">{errors.university.message}</p>}
                    </div>
                </div>
            </section>

            {/* อัปโหลดไฟล์ */}
            <section className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">อัปโหลดไฟล์</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">รูปนักเรียน (ภาพ)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) setImagePreview(URL.createObjectURL(file))
                            }}
                            className="input"
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="preview" className="w-32 h-32 object-cover mt-2 rounded-md" />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">กิจกรรม (PDF เท่านั้น)</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            multiple
                            onChange={(e) => handleFileUpload(e.target.files, setActivityFiles)}
                            className="input"
                        />
                        <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                            {activityFiles.map((file, i) => (
                                <li key={i}>{file.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">ผลงาน (PDF เท่านั้น)</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            multiple
                            onChange={(e) => handleFileUpload(e.target.files, setAchievementFiles)}
                            className="input"
                        />
                        <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                            {achievementFiles.map((file, i) => (
                                <li key={i}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
                    บันทึกข้อมูล
                </button>
            </div>
        </form>
    )
}
