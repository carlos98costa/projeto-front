import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!apiUrl) {
      setError('VITE_API_URL não configurado. Configure o secret no Vercel ou em um .env local.');
      return;
    }

    fetch(`${apiUrl}/api/status`)
      .then((res) => res.json())
      .then(setStatus)
      .catch((err) => setError(`Erro ao conectar ao backend: ${err.message}`));
  }, []);

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <h1>Projeto Segundo Bimestre - Frontend</h1>
      <p>Aplicação React simples com deploy via Vercel e integração com API backend.</p>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Status do Backend</h2>
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        {status ? (
          <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: 8 }}>{JSON.stringify(status, null, 2)}</pre>
        ) : (
          !error && <p>Carregando status...</p>
        )}
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Instruções de Deploy</h2>
        <ul>
          <li>Front-end: Vercel com `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.</li>
          <li>Back-end: Render com `RENDER_API_KEY` e `SERVICE_ID`.</li>
          <li>Deploy acionado somente por tags Git no formato <code>vX.Y.Z</code>.</li>
        </ul>
      </section>
    </main>
  );
}

export default App;
