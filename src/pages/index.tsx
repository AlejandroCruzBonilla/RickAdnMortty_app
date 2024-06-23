import { useMemo } from 'react';
import { CommonLayout } from '@/layouts/CommonLayout/CommonLayout';
import type { IMetatag } from '@/interfaces/common';

export default function Home() {


	const metaTags: IMetatag[] =  useMemo(() => [
    { tag: 'title', attributes: { name: 'title', content: 'Home - Alex139139' } },
    { tag: 'meta', attributes: { name: 'og:title', content: 'Home - Alex139139' } },
    { tag: 'meta', attributes: { name: 'twitter:title', content: 'Home - Alex139139' } },
    { tag: 'meta', attributes: { name: 'description', content: 'Rick and Morty App- By Alex139139' } },
    { tag: 'meta', attributes: { name: 'og:description', content: 'Rick and Morty App- By Alex139139' } },
    { tag: 'meta', attributes: { name: 'twitter:description', content: 'Rick and Morty App- By Alex139139' } },

  ],[]);

  return (
    <CommonLayout metaTags={metaTags} heading='Alex139139'>
      <section>
        <p>
          Esta página fue construida usando la documentación y API de{' '}
          <a
            href='https://rickandmortyapi.com/documentation'
            className='text-primary'
          >
            Rick y Morty
          </a>{' '}
          con diversas tecnologías y librerías de JavaScript como:
        </p>

        <ul className='my-8 text-primary'>
          <li>
            <a href='https://react.dev' target='_blank'>
              React
            </a>
          </li>
          <li>
            <a href='https://nextjs.org' target='_blank'>
              Next.Js
            </a>
          </li>
          <li>
            <a href='https://primereact.org' target='_blank'>
              PrimeReact
            </a>
          </li>
          <li>
            <a
              href='https://github.com/afuh/rick-and-morty-api-node'
              target='_blank'
            >
              Rick and Morty API Client
            </a>
          </li>
          <li>
            <a href='https://sass-lang.com' target='_blank'>
              SASS
            </a>
          </li>
          <li>
            <a href='https://tailwindcss.com' target='_blank'>
              Tailwindcss
            </a>
          </li>
          <li>
            <a href='https://www.typescriptlang.org' target='_blank'>
              TypeScript
            </a>
          </li>
        </ul>

        <p className='break-all'>
          Esta Aplicación fue desplegada en un&nbsp;
          <a
            href='https://aws.amazon.com/es/s3/'
            target='_blank'
            className='text-primary'
          >
            Bucket S3 de AWS
          </a>
          &nbsp; como página estática y distribuida en&nbsp;
          <a
            href='https://aws.amazon.com/es/cloudfront/'
            target='_blank'
            className='text-primary'
          >
            CloudFront de AWS
          </a>
          &nbsp;como CDN y en{' '}
          <a
            href='https://pages.github.com'
            target='_blank'
            className='text-primary'
          >
            Github Pages
          </a>
          .
          <br />
          <a
            href='https://d24pch1rifyep0.cloudfront.net'
            target='_blank'
            className='text-primary'
          >
            https://d24pch1rifyep0.cloudfront.net
          </a>
          <br />
          <a
            href='https://alejandrocruzbonilla.github.io/RickAdnMortty_app/'
            target='_blank'
            className='text-primary'
          >
            https://alejandrocruzbonilla.github.io/RickAdnMortty_app/
          </a>
        </p>

        <p>
          El código de esta aplicación se encuentra en un repositorio público de
          mi&nbsp;
          <a
            href='https://github.com/AlejandroCruzBonilla/RickAdnMortty_app'
            target='_blank'
            className='text-primary'
          >
            GitHub
          </a>
        </p>
      </section>
      <section>
        <p>
          Otros de mis proyectos se encuentran en mi página personal&nbsp;
          <a
            href='https://alex139139.com/proyectos'
            target='_blank'
            className='text-primary'
          >
            https://alex139139.com/proyectos
          </a>
        </p>
      </section>
    </CommonLayout>
  );
}
