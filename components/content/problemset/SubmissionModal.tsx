import { customModalStyles } from '@utils/constants'
import React from 'react'
import Modal from 'react-modal'

const SubmissionModal = ({
  isOpen,
  onClose,
  children
}: {
  isOpen: boolean,
  onClose: () => void,
  children: React.ReactNode
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customModalStyles}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  )
}

export default SubmissionModal
