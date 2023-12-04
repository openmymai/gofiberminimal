import useSWR from 'swr';

async function fetcher(url: string) {
  const resp = await fetch(url);
  return resp.text();
}

export default function Home() {
  const { data, error } = useSWR('/api', fetcher, { refreshInterval: 1000 });
  return (
    <main>
      <div className='container mx-auto text-xs'>
        <h1 className='text-3xl font-bold underline content-center'>
          Memory allocation stats from Go server
        </h1>
        {error && (
          <p>
            Error fetching profile: <strong>{error}</strong>
          </p>
        )}
        {!error && !data && <p>Loading ...</p>}
        {!error && data && (
          <p>
            <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
              {data}
            </pre>
          </p>
        )}
      </div>
    </main>
  );
}
