import { type FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Location } from '../Location/Location';
import type { ILocationList } from './interfaces';

export const LocationList: FC<ILocationList> = ({items}) => {

	return (
    <DataTable size='small' value={items}>
      <Column field='id' header='ID' />
      <Column field='name' header='NAME' body={Location} />
    </DataTable>
  );
};
