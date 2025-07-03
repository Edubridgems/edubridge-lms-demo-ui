'use client'
import SectionHeader from '@/components/shared/SectionHeader'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Transcripts } from '@/constants/constants'
import { Download } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const StudentResultsPage = () => {
  return (
    <div>
      <SectionHeader
        name='Results and Transcripts'
        hasShowMore= {false}
        description='View all of your results and transcripts here'
      />
        <Toaster position='top-center' />
      <div>
            <Table className='table bg-white-600 rounded-md shadow-md text-center'>
                <TableHeader className=' bg-maya-blue-800 text-white shadow-md text-center'>
                    <TableHead className='font-bold '>
                        Name
                    </TableHead>
                    <TableHead>
                        Exam period
                    </TableHead>
                    <TableHead>
                        Year of study
                    </TableHead>
                    <TableHead>
                        Action
                    </TableHead>
                </TableHeader>
                <TableBody>
                    {Transcripts.map((item, index)=>(
                        <TableRow key={index} className='text-left h-10'>
                            <TableCell>
                                {item.name}
                            </TableCell>
                            <TableCell>
                                {item.examPeriod}
                            </TableCell>
                            <TableCell>
                                {item.studyYear}
                            </TableCell>
                            <TableCell>
                                <Button className='bg-maya-blue-400 hover:bg-maya-blue-200 trnasition-custom' onClick={()=>{
                                    toast.info('This action will download the transcript')
                                }} >
                                    <Download />
                                </Button>
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
      </div>
    </div>
  )
}

export default StudentResultsPage
