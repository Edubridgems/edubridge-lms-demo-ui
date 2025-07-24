import SectionHeader from '@/components/shared/SectionHeader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { LearningMaterials } from '@/constants/constants'
import { cn } from '@/lib/utils'
import { AccordionHeader } from '@radix-ui/react-accordion'
import { DownloadIcon, File, PresentationIcon, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const StudentMaterials = () => {

    const SelectIcon = (type: string) => {
        switch (type) {
            case 'video':
                return {
                    icon: VideoIcon,
                    className: 'bg-red-400/50 text-white rounded-md flex items-center justify-center '
                }

            case 'pptx':
                return {
                    icon: PresentationIcon,
                    className: 'bg-emerald-400/50 text-white rounded-md flex items-center justify-center '
                }

            default:
                return {
                    icon: File,
                    className: 'bg-blue-400/50 text-white rounded-md flex items-center justify-center'
                }
        }
    }

    const renderMaterials = () => {
        if (LearningMaterials.length === 0) {
            return (
                <div className="text-center py-8">
                    <h2 className="text-xl text-gray-500">No learning materials available for this course at the moment.</h2>
                </div>
            )
        }

        return LearningMaterials.map((item, index) => {
            let itemMapping = SelectIcon(item.type)
            return (
                <div key={index} className='flex my-2 flex-row items-center justify-between gap-4 bg-gray-100 rounded-md p-1' >
                    <div className='flex flex-row items-center gap-4 '>
                        <div className={cn(
                            itemMapping.className,
                            'w-20 aspect-square shadow-md'
                        )}>
                            <itemMapping.icon />
                        </div>
                        <div>
                            <h1 className='text-md md:text-lg font-bold tracking-wide leading-10 '>
                                {item.name}
                            </h1>
                            <Link href={'#'}
                                className='text-maya-blue-300 font-semibold italic '
                            >
                                {item.courseName}
                            </Link>
                        </div>

                    </div>
                    <div className=''>
                        <Button className='bg-maya-blue-400 w-16 aspect-square h-16 hover:bg-maya-blue-200 transition-custom'>
                            <DownloadIcon />
                        </Button>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='w-full h-full'>
            <SectionHeader
                name='Learning Materials'
                hasShowMore={false}
                description='Discover all uploaded learning materials for all active courses'
            />

            <div className=''>
                <Accordion type='single'>
                    <AccordionItem value='1' className='bg-white-800 rounded-md shadow-md hover:shadow-sm transition-custom'>
                        <AccordionTrigger className=' no-underline min-h-10 h-max flex items-center justify-between p-3   bg-gradient-to-r from-slate-600/35 to-indigo-dye-700/30'>
                            <div>
                                <h1 className='text-3xl text-white no-underline hover:no-underline my-5'>
                                    Operating systems
                                </h1>
                                <p className='text-gray-600 italic text-lg font-mono'>
                                    All learning materials related to operating systems
                                </p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='p-2'>
                            <AccordionHeader className='text-lg leading-10 tracking-wide italic'>
                                Currently Present Materials
                            </AccordionHeader>
                            {renderMaterials()}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default StudentMaterials
