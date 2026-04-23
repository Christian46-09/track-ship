"use client";

import { CheckCircleIcon, CircleIcon, MapIcon, MapPin } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  timestamp: string | Date;
  completed: boolean;
}

interface TimelineProps {
  events?: TimelineEvent[];
}

function formatTimelineDate(timestamp: string | Date) {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function Timeline({ events = [] }: TimelineProps) {
  if (events.length === 0) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">
          No tracking updates yet.
        </p>
      </div>
    );
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  return (
    <div className="p-6">
      <div className="space-y-6">
        {sortedEvents.map((event, index) => {
          const isLast = index === sortedEvents.length - 1;
          const isLatest = index === 0;

          return (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                {event.completed ? (
                  <CheckCircleIcon
                    className={`w-6 h-6 ${isLatest ? "text-primary" : "text-primary/80"}`}
                  />
                ) : (
                  <CircleIcon className="w-6 h-6 text-border" />
                )}

                {!isLast && (
                  <div
                    className={`w-0.5 h-12 mt-2 ${
                      event.completed ? "bg-primary/30" : "bg-border"
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 pb-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p
                      className={`font-semibold ${
                        isLatest ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {event.title}
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      {event.description}
                    </p>

                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <span className="font-medium">
                        <MapPin className="size-4 text-amber-500" />
                      </span>
                      {event.location}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTimelineDate(event.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
