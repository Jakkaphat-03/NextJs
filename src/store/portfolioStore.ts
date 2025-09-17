import { create } from 'zustand'

export interface Portfolio {
  id: string
  firstName: string
  lastName: string
  address: string
  phone: string
  school: string
  gpa: number
  talent?: string
  reason: string
  major: string
  university: string
  image?: string
  activities?: string[]     // รูปกิจกรรม
  achievements?: string[]   // รูปผลงาน
}


interface PortfolioState {
    portfolios: Portfolio[]
    addPortfolio: (data: Portfolio) => void
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    portfolios: [],
    addPortfolio: (data) =>
        set((state) => ({
            portfolios: [...state.portfolios, data],
        })),
}))
