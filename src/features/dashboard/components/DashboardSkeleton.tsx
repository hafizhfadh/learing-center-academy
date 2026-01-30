import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DashboardSkeleton() {
    return (
        <div className="flex-col md:flex min-h-screen bg-background">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                     <Skeleton className="h-6 w-32 mr-4" />
                     <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                     </div>
                     <div className="ml-auto flex items-center space-x-4">
                        <Skeleton className="h-9 w-[100px] lg:w-[300px]" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                     </div>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-9 w-32" />
                </div>
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <Card key={i}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-8 w-16 mb-2" />
                                    <Skeleton className="h-3 w-32" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <Skeleton className="h-6 w-32" />
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Skeleton className="h-[350px] w-full" />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-64" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex items-center">
                                            <Skeleton className="h-9 w-9 rounded-full" />
                                            <div className="ml-4 space-y-1">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-3 w-24" />
                                            </div>
                                            <div className="ml-auto">
                                                <Skeleton className="h-4 w-12" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
