import React from 'react'
import { toast } from 'react-toastify'



export const Home = () => {
  const notifySuccess = () => toast.success('Todo OK!', {
    position: 'top-center'
  })
  const notifyError = () => toast.error('Algo se rompió!', {
    position: 'top-center'
  })
  return (
    <div>
      <h1 className='text-5xl text-center font-bold'>Pagina Home</h1>
      <div className='container m-auto flex flex-col gap-5 mt-16'>
        <button onClick={notifySuccess}>Ok</button>
        <button onClick={notifyError}>Error</button>
      </div>
    </div>
  )
}
