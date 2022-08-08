import Swal from 'sweetalert2'


const ToastDefault = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


export const ToastSuccess  = () => {
  return ToastDefault.fire({
      icon: 'success',
      title: 'Registro exitoso',
    });
  }


  export const ToastSuccessServer  = (text = "") => {
  return ToastDefault.fire({
      icon: 'success',
      title: 'Proceso exitoso',
      text
    });
  }

  export const ToastErrorServer  = (error) => {
    console.log(error);
    return ToastDefault.fire({
        icon: 'error',
        title: 'Disculpe, ha ocurrido un error',
        text: 'Nuestro equipo de soporte ha sido informado.'
      });
    }
  

  export const showToast = ({ title }) => {
    return ToastDefault.fire({
        icon:'success',
        title,
      });
    }

export const toastInfo = ({ title }) => {
    return ToastDefault.fire({
        icon:'info',
        title,
      });
}

export const toastWarning = ({ title }) => {
  return ToastDefault.fire({
      icon:'warning',
      title,
    });
}