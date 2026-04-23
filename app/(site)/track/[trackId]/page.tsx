import { TrackDetails } from "./_components/track-details";

const TrackingDetailsPage = async ({
  params,
}: {
  params: Promise<{ trackId: string }>;
}) => {
  const { trackId } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TrackDetails trackId={trackId} />
    </div>
  );
};

export default TrackingDetailsPage;
