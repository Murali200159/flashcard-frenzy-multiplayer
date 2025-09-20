import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ReviewTable from '../../components/ReviewTable';

export default function Review() {
  const router = useRouter();
  const { matchId } = router.query;
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (!matchId) return;

    fetch(`/api/get-history?matchId=${matchId}`)
      .then(res => res.json())
      .then(data => setHistory(data));
  }, [matchId]);

  if (!matchId || !history) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10">
        <ReviewTable history={history} />
        <button onClick={() => router.push('/dashboard')} className="bg-blue-500 text-white mt-4">
          Back to Dashboard
        </button>
      </div>
    </Layout>
  );
}