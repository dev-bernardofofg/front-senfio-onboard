import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const BaseLoadingCards = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3 mt-1" />
          </div>
          <Skeleton className="h-5 w-16 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex gap-1.5 mt-3">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-7 w-16" />
          </div>
        </div>
      </CardContent>
    </Card >
  );
};