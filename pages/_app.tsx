import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { TodoProvider } from '@/lib/TodoContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TodoProvider>
      <Component {...pageProps} />
    </TodoProvider>
  );
}
