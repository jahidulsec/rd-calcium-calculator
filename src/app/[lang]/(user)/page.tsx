import NavUser from '@/components/nav/nav-user'
import BannerSection from '@/features/banner/components/banner-section'
import CalculatorSection from '@/features/calculator/components/calculator-section'
import React from 'react'

export default function HomePage() {
  return (
    <>
      <NavUser />
      <BannerSection />
      <CalculatorSection />
    </>
  )
}
