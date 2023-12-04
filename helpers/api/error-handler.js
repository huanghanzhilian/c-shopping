import { NextResponse } from 'next/server'
import { setJson } from './set-json'

export { errorHandler }

function errorHandler(err) {
  if (typeof err === 'string') {
    // custom application error
    const is404 = err.toLowerCase().endsWith('not found')
    const status = is404 ? 404 : 400
    return NextResponse.json(
      setJson({
        message: err,
        code: status,
      }),
      { status }
    )
  }

  if (err.name === 'JsonWebTokenError') {
    // jwt error - delete cookie to auto logout
    return NextResponse.json(
      setJson({
        message: 'Unauthorized',
        code: '401',
      }),
      { status: 401 }
    )
  }

  // default to 500 server error
  console.error(err)
  return NextResponse.json(
    setJson({
      message: err.message,
      code: '500',
    }),
    { status: 500 }
  )
}
