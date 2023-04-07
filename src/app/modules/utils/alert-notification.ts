import Toastify from 'toastify-js'

export const AlertSuccessNotification = (options: {
  text: string
  className: string
  position: 'left' | 'center' | 'right'
}) => {
  const {text, className, position} = options
  return Toastify({
    text: text,
    className: className,
    gravity: 'top', // `top` or `bottom`
    position: position, // `left`, `center` or `right`
    style: {
      background: `linear-gradient(to right, #3CB371, #3CB371)`,
    },
  }).showToast()
}

export const AlertDangerNotification = (options: {
  text: string
  className: string
  position: 'left' | 'center' | 'right'
}) => {
  const {text, className, position} = options
  return Toastify({
    text: text,
    className: className,
    gravity: 'top', // `top` or `bottom`
    position: position, // `left`, `center` or `right`
    style: {
      background: `linear-gradient(to right, #FF0000, #FF0000)`,
    },
  }).showToast()
}
