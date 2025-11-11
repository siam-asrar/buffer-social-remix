import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function PostSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}
