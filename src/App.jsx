import { useEffect, useMemo, useState } from 'react';

const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const formatJson = (data) => JSON.stringify(data, null, 2);

function App() {
  const [responses, setResponses] = useState({ root: null, v1: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiBaseLabel = useMemo(() => {
    if (!apiUrl) {
      return 'VITE_API_URL não configurado';
    }

    return apiUrl;
  }, []);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!apiUrl) {
        setError('Defina VITE_API_URL com a URL pública do Render ou com http://localhost:5000 para testes locais.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const [rootResponse, v1Response] = await Promise.all([
          fetch(`${apiUrl}/`),
          fetch(`${apiUrl}/v1`),
        ]);

        if (!rootResponse.ok) {
          throw new Error(`Falha ao acessar / (HTTP ${rootResponse.status})`);
        }

        if (!v1Response.ok) {
          throw new Error(`Falha ao acessar /v1 (HTTP ${v1Response.status})`);
        }

        const [rootData, v1Data] = await Promise.all([
          rootResponse.json(),
          v1Response.json(),
        ]);

        if (active) {
          setResponses({ root: rootData, v1: v1Data });
        }
      } catch (fetchError) {
        if (active) {
          setError(`Erro ao conectar ao backend: ${fetchError.message}`);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Projeto Segundo Bimestre · Parte 2</span>
          <h1>Frontend React com Docker, Nginx e integração com a API do Render</h1>
          <p className="hero-description">
            Esta interface consome as rotas <code>/</code> e <code>/v1</code> da API, foi preparada para
            execução local em container e também para deploy na Vercel.
          </p>
        </div>

        <div className="status-panel">
          <p className="status-label">Base da API</p>
          <strong>{apiBaseLabel}</strong>
          <span className={error ? 'status-chip danger' : 'status-chip'}>
            {error ? 'Falha na conexão' : loading ? 'Carregando respostas' : 'Conectado'}
          </span>
        </div>
      </section>

      {error ? (
        <section className="alert-box" role="alert">
          <strong>Não foi possível carregar a API.</strong>
          <p>{error}</p>
        </section>
      ) : null}

      <section className="grid-cards">
        <article className="data-card">
          <div className="card-header">
            <span>Rota /</span>
            <code>{apiUrl || 'sem URL'}</code>
          </div>
          {loading && !responses.root ? (
            <div className="skeleton-block" />
          ) : (
            <pre>{responses.root ? formatJson(responses.root) : 'Sem resposta'}</pre>
          )}
        </article>

        <article className="data-card accent-card">
          <div className="card-header">
            <span>Rota /v1</span>
            <code>{apiUrl || 'sem URL'}</code>
          </div>
          {loading && !responses.v1 ? (
            <div className="skeleton-block" />
          ) : (
            <pre>{responses.v1 ? formatJson(responses.v1) : 'Sem resposta'}</pre>
          )}
        </article>
      </section>

      <section className="info-grid">
        <article className="info-card">
          <h2>Validação local</h2>
          <ul>
            <li>Front-end servido por Nginx em container na porta 8080.</li>
            <li>Back-end acessível em container na porta 5000.</li>
            <li>Integração testável no Codespaces com Docker Compose.</li>
          </ul>
        </article>

        <article className="info-card">
          <h2>Deploy</h2>
          <ul>
            <li>Vercel para o front-end.</li>
            <li>Render para a API.</li>
            <li>Tag final prevista: <code>v1.1.0</code>.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

export default App;
