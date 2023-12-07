import { Button, Modal } from 'components'

export default function ConfirmDeleteModal(props) {
  //? Props
  const { title, deleteFunc, isLoading, isShow, onClose, deleteInfo, setDeleteInfo } = props

  //? Handlers
  const handleConfirmClick = () => {
    deleteFunc({
      id: deleteInfo.id,
    })
  }

  const handleCancleClick = () => {
    setDeleteInfo({ id: '' })
    onClose()
  }

  //? Render(s)
  return (
    <>
      <Modal isShow={isShow} onClose={onClose} effect="ease-out">
        <Modal.Content>
          <Modal.Body>
            <div className="px-3 py-6 space-y-4 text-center bg-white md:rounded-lg">
              <p>
                确定删除<span className="font-bold text-red-500">{title}</span>吗？
              </p>
              <div className="flex justify-center gap-x-20">
                <Button onClick={handleConfirmClick} isLoading={isLoading}>
                  确定
                </Button>

                <Button className="!bg-green-500" onClick={handleCancleClick}>
                  取消
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
