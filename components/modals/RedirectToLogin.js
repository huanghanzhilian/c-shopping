import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

import { Button, Modal } from 'components'

export default function RedirectToLogin(props) {
  //? Props
  const { isShow, onClose, title, text } = props
  const { push } = useRouter()
  const asPath = usePathname()

  //? Handlers
  const handleClick = () => {
    push(`/login?redirectTo=${asPath}`)

    onClose()
  }

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect="ease-out">
      <Modal.Content>
        <Modal.Body>
          <div className="p-3 space-y-4 text-center bg-white md:rounded-lg">
            <Image
              className="mx-auto"
              src="/icons/exclamation.svg"
              height={80}
              width={80}
              alt="!"
            />
            <p className="text-xl font-bold">{title}</p>
            <p className="text-red-600">{text}</p>
            <Button className="mx-auto" onClick={handleClick}>
              去登录
            </Button>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
