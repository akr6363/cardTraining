import { Preloader as Loader, TailSpin, Oval } from 'react-preloader-icon'

export const Preloader = () => {
  return <Loader use={TailSpin} size={70} strokeWidth={10} strokeColor="#fff" duration={800} />
}
export const PreloaderCircle = () => {
  return <Loader use={Oval} size={16} strokeWidth={15} strokeColor="#fff" duration={800} />
}
