
export interface IMenuItem {
  id: string,
  title: string
  icon: string
  iconActive?: string
  to: string
  routeName?: string
  children?: IMenuItem[]
}


