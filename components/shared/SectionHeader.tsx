import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  name: string
  hasShowMore: boolean
  showMoreHref?: string
  showMoreName?: string
  className?: string
  titleClassName?: string
  linkClassName?: string
  description?: string
}

const SectionHeader = ({
  name,
  hasShowMore,
  showMoreHref,
  showMoreName = "See All",
  className,
  titleClassName,
  linkClassName,
  description
}: SectionHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-2 my-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className={cn(
            "text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight",
            titleClassName
          )}>
            {name}
          </h2>
          {description && (
            <p className="text-sm md:text-base text-gray-600 max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {hasShowMore && showMoreHref && (
          <Link 
            href={showMoreHref} 
            className={cn(
              "group inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-all duration-200 hover:bg-blue-50 rounded-lg",
              linkClassName
            )}
            aria-label={`${showMoreName} ${name.toLowerCase()}`}
          >
            <span>{showMoreName}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      
      {/* Decorative line */}
      <div className="h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />
    </div>
  )
}

export default SectionHeader
