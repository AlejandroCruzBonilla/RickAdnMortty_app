import type { AppProps } from 'next/app';
import classNames from 'classnames';
import { type APIOptions, PrimeReactProvider } from 'primereact/api';
import { usePassThrough } from 'primereact/passthrough';
import { pt } from '../libraries/primereact/passthrough';
import { UIAppProvider } from '@/context/ui';
import { PageProvider } from '@/context/page';
import { roboto, roboto_mono } from '@/assets/fonts';
import '@/styles/app.scss';

export default function App({ Component, pageProps }: AppProps) {
  const customPassThrough = usePassThrough({}, pt);

  const value: Partial<APIOptions> = {
    ripple: true,
    pt: customPassThrough,
  };

  return (
    <PageProvider>
      <PrimeReactProvider value={value}>
        <UIAppProvider>
          <div
            className={classNames(
              'next__app',
              roboto.variable,
              roboto_mono.variable
            )}
          >
            <Component {...pageProps} />
          </div>
        </UIAppProvider>
      </PrimeReactProvider>
    </PageProvider>
  );
}
