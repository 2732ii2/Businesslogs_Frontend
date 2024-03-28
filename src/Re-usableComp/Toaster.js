
import toast, { Toaster,resolveValue } from 'react-hot-toast';

import React from 'react'

export default function Toasterfunc(props) {
  return (
    <>
        <Toaster
            position="top-right"
            reverseOrder={false}
            />
        </>
  )
}

