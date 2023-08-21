import { Preloader as Loader, Hearts } from 'react-preloader-icon'

export const Preloader = () => {
  return <Loader use={Hearts} size={70} strokeWidth={15} strokeColor="#fff" duration={800} />
}
