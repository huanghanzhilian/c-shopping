import { Transition } from '@headlessui/react'
import { Icons } from 'components'

export default function DisplayError(props) {
  //? Props
  const { errors } = props

  //? Render(s)
  return (
    <div className="min-h-[29px]">
      <Transition
        show={!!errors}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-10"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="min-w-max mt-1.5 inline-flex gap-x-1 text-sm ">
          {errors && <Icons.Exclamation className="text-red-600" />}
          <span className="text-red-600">{errors?.message}</span>
        </div>
      </Transition>
    </div>
  )
}
