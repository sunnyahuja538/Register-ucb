import React from 'react'
import Form from './pages/Form'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <div>
      <Toaster
  toastOptions={{
    // Global default styles
    duration: 5000,
    style: {
      background: '#1a1a1a',
      color: '#fff',
    },
    success: {
      style: {
        background: 'green',
      },
    },
    error: {
      style: {
        background: 'red',
      },
    },
  }}
/>

    <Form/>
    </div>
  )
}

export default App