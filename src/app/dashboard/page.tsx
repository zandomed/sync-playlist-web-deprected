import { Button } from '@presentation/components/ui/button';

export default async function DashboardPage() {
  // const playlist = await (await spotify.getPlaylists()).data.items;

  // console.log("playlist", playlist);

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <Button>Connect with Spotify</Button>
        <Button>Connect with Apple Music</Button>
      </div>
      <ul>
        {/* {playlist.map((pl: any) => (
          <li key={pl.id}>
            {pl.name}
            <img src={pl.images[0]?.url} alt={pl.name} width={100} />
          </li>
        ))} */}
      </ul>
    </>
  );
}
