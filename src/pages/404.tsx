import { CommonLayout } from '@/layouts/CommonLayout/CommonLayout';
import Link from 'next/link';


export default function NotFoundPage() {
  return (
    <CommonLayout metaTags={[]} heading='404 Pagina No encontrada'>
			<Link href='/' className='text-center text-primary'>
				{'->'}Regresar al Inicio 
			</Link>
    </CommonLayout>
  );
}
