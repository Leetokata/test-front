import { Notify } from 'quasar';

const useNotification = () => {

  const notify = (message = 'Error inesperado', color = 'negative') => {
    Notify.create({
      message: message,
      color: color,
      position: 'bottom',
    });
  }

  return {
    notify
  }
}

export default useNotification
