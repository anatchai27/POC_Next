import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { TodoProvider } from '@/lib/TodoContext';
import NavBar from '@/components/NavBar';
import { AppProvider } from '../src/context/AppContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <TodoProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <NavBar />
          <main style={{ flex: 1, padding: 20 }}>
            <Component {...pageProps} />
          </main>
        </div>
      </TodoProvider>
    </AppProvider>
  );
}
