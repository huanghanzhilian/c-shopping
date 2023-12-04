import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { userLogout } from 'store'
import { Icons } from 'components'
import alert from 'utils/alert'

export default function Logout() {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
    dispatch(userLogout())
    alert('success', '退出成功')
  }
  return (
    <div className="transition-colors hover:bg-gray-200 px-3">
      <div
        role="button"
        className="flex justify-between cursor-pointer py-4 gap-x-2 mx-4  border-t border-gray-300"
        onClick={() => handleLogout()}
      >
        <Icons.Logout className="icon text-black" />
        <span className="ml-auto mr-3">退出</span>
      </div>
    </div>
  )
}
