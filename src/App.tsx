import { useState, useCallback } from 'react'
import './App.css'
import Modal from './components/Modal'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModalHandler = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const openModalHandler = useCallback(() => {
    setIsModalOpen(true)
  }, [])


  return (
    <>
      <h1>My WCAG compliant modal</h1>
      <button onClick={openModalHandler}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
        <p>Contents of modal</p>
        <input type="text" placeholder='test field' aria-label='test_field' id='testField' />
        <input type="text" placeholder='test field 2' aria-label='test_field_2' id='testField2' />
      </Modal>
    </>
  )
}

export default App
