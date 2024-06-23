import type { FC } from 'react';
import Link from 'next/link';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import type { IEpisodeItem } from '@/interfaces/episodes';
import type { IEpisodeList } from './interfaces';

export const EpisodeList: FC<IEpisodeList> = ({ items }) => {
  const bodyColName = (episode: IEpisodeItem) => (
    <Link
      href='/episodes/[id]'
      as={`/episodes/${episode.id}`}
      className='text-primary hover:text-font'
    >
      {episode.name}
    </Link>
  );

  return (
    <DataTable value={items}>
      <Column
        field='id'
        header='ID'
        className='px-2'
        pt={{ headerContent: { className: 'px-2' } }}
      />
      <Column
        field='code'
        header='CODE'
        className='px-2'
        pt={{ headerContent: { className: 'px-2' } }}
      />
      <Column
        field='name'
        header='NAME'
        className='px-2'
        pt={{ headerContent: { className: 'px-2' } }}
        body={bodyColName}
      />
    </DataTable>
  );
};
