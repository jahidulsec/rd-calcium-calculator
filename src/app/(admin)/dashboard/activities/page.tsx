import { DashboardHeader } from '@/components/section/section'
import { DashbaordHeading } from '@/components/typography/heading'
import ExportSection from '@/features/activities/components/export-section'
import { IconReport } from '@tabler/icons-react'
import React from 'react'

export default function ActivitiesPage() {
  return (
    <>
       <DashboardHeader>
        <DashbaordHeading>
          <IconReport /> Users Activities
        </DashbaordHeading>

        <ExportSection />
      </DashboardHeader>
    </>
  )
}
