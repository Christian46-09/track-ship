"use client";

import { Card } from "@/components/ui/card";

export function ShipmentDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Countdown Skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded-md w-32 animate-pulse" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-8 bg-muted rounded-md animate-pulse" />
                <div className="h-4 bg-muted rounded-md w-16 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Action Buttons Skeleton */}
      <div className="flex flex-col sm:flex-row gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-10 bg-muted rounded-lg flex-1 animate-pulse"
          />
        ))}
      </div>

      {/* Content Cards Skeleton */}
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded-md w-40 animate-pulse" />
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="h-4 bg-muted rounded-md w-24 animate-pulse" />
                  <div className="h-4 bg-muted rounded-md animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="space-y-3">
            <div className="h-5 bg-muted rounded-md w-32 animate-pulse" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-4 bg-muted rounded-md animate-pulse" />
              <div className="h-4 bg-muted rounded-md animate-pulse" />
              <div className="h-4 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function AdminDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="h-10 bg-muted rounded-md w-64 animate-pulse" />

      {/* Stats Cards Skeleton */}
      <div className="grid md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded-md w-20 animate-pulse" />
              <div className="h-8 bg-muted rounded-md animate-pulse" />
            </div>
          </Card>
        ))}
      </div>

      {/* Content Skeleton */}
      {[...Array(2)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded-md w-40 animate-pulse" />
            <div className="space-y-3">
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="h-4 bg-muted rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function ErrorState({
  title = "Error Loading Data",
  description = "Something went wrong. Please try again later.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <Card className="p-12 text-center max-w-md mx-auto">
      <div className="space-y-4">
        <div className="text-5xl">⚠️</div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </Card>
  );
}
