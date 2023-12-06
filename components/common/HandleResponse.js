import { useEffect } from 'react'

import { showAlert } from 'store'
import { useDispatch } from 'react-redux'

export default function HandleResponse(props) {
  //? Porps
  const { isSuccess, isError, error, message, onSuccess, onError } = props

  //? Assets
  const dispatch = useDispatch()

  //? Re-Renders
  useEffect(() => {
    if (isSuccess) {
      if (onSuccess) onSuccess()

      dispatch(
        showAlert({
          status: 'success',
          title: message,
        })
      )
    }

    if (isError) {
      if (onError) onError()

      dispatch(
        showAlert({
          status: 'error',
          title: error,
        })
      )
    }
  }, [])

  return null
}
