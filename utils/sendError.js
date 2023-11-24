import { NextResponse } from 'next/server'

export default function sendError(status, msg) {
  return NextResponse.json({ err: msg }, { status: status })
}
