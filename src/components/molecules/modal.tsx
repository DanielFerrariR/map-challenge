import React from 'react'
import { Fade, Modal as MuiModal, Paper, Backdrop } from 'src/components/atoms'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<any>>
}

const Modal: React.FC<Props> = ({ children, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <MuiModal
      data-testid="modal"
      aria-labelledby="modal-title"
      aria-describedby="description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Fade in={open}>
        <Paper
          elevation={5}
          width={1}
          maxWidth={800}
          height="calc(100% - 16px)"
          p={2}
          mx={2}
        >
          {children}
        </Paper>
      </Fade>
    </MuiModal>
  )
}

export default Modal
