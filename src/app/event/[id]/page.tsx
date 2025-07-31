import Skeleton from 'react-skeleton-builder';
import dynamic from 'next/dynamic';

const EventDetails = dynamic(() => import('@/containers/eventDetails').then(m => m.default), {
  loading: () => <Skeleton
    styles={{ width: "100%", height: "100%" }}
    grid={{
      direction: "column" as never,
      gridGap: "4",
      children: [
        { h: "36rem", skeletons: [{ r: ".6rem" }] },
        {
          direction: "column" as never,
          h: "9rem",
          skeletons: [{ w: "70%", r: ".6rem" }, { w: "50%", r: ".6rem" }]
        },
        { skeletons: [{ w: "60%", r: ".6rem" }] }
      ]
    }}
  />,
  ssr: true,
});

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function EventPage(props: Props) {
  const params = await props.params;
  const contractAddress = params.id

  return <EventDetails address={contractAddress as never} />;
}
