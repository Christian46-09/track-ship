import { TrackDetails } from "./_components/track-details";

const TrackingDetailsPage = async ({
  params,
}: {
  params: Promise<{ trackId: string }>;
}) => {
  const { trackId } = await params;

  return (
    <div>
      <TrackDetails trackId={trackId} />
    </div>
  );
};

export default TrackingDetailsPage;
