export interface IMetatag {
  tag: string;
  attributes: IMetatagAttributes;
}

export interface IMetatagAttributes {
  name?: string;
  content?: string;
  rel?: string;
  href?: string;
  property?: string;
}

export interface IMenuItem {
  id: string;
  title: string;
  target: '_self' | '_blank';
  url: string;
  items?: IMenuItem[];
}

export interface IImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface IBreadCrumbItem {
	label: string;
	url?: string
}