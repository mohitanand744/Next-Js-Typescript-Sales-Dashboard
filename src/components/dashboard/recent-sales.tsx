import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { recentSales } from '@/lib/utils'
import { RecentSaleData } from '@/types/dashboard'
import { useFilters } from '@/contexts/filter-context'
import { filterRecentSales } from '@/lib/filter-utils'
import { SearchBar } from '@/components/ui/search-bar'

interface RecentSalesProps {
  className?: string
}

export function RecentSales({ className }: RecentSalesProps) {
  // Track image loading errors
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const { timeFilter, productFilter, regionFilter } = useFilters();

  // Filter recent sales data based on current filters
  const filterSalesData = () => {
    const filteredByGlobalFilters = filterRecentSales(
      recentSales,
      timeFilter,
      productFilter,
      regionFilter
    );

    // If there's a search query, filter by customer name
    if (searchQuery.trim()) {
      return filteredByGlobalFilters.filter(sale =>
        sale.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredByGlobalFilters;
  };

  const filteredSales = filterSalesData();

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <Card className={className}>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              Latest transactions across the platform
            </CardDescription>
          </div>
          <div className="w-[200px]">
            <SearchBar
              placeholder="Search customer..."
              value={searchQuery}
              onChange={handleSearch}
              variant="minimal"
              className="w-full"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredSales.length === 0 ? (
          <p className="py-4 text-center text-muted-foreground">
            {searchQuery.trim()
              ? `No results found for "${searchQuery}"`
              : "No recent sales data for the selected filters"}
          </p>
        ) : (
          <div className="space-y-6">
            {filteredSales.map((sale: RecentSaleData) => (
              <div key={sale.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                    {sale.avatar && !imageErrors[sale.id] ? (
                      <Image
                        src={sale.avatar}
                        alt={`${sale.customer} profile`}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={() => handleImageError(sale.id)}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-sm font-medium">
                        {sale.customer.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{sale.customer}</p>
                    <p className="text-xs text-muted-foreground">{sale.date}</p>
                  </div>
                </div>
                <div className="font-medium">{sale.amount}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 