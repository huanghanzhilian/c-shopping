import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'

const UploadImage = props => {
  //? Props
  const { folder, handleAddUploadedImageUrl } = props

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleFileChange = event => {
    setFile(event.target.files?.[0] || null)
  }

  const handleUpload = async event => {
    setLoading(true)

    if (!file) {
      setError('请选择一个文件')
      setLoading(false)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('所选文件必须是图像')
      setLoading(false)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('图像的大小不应超过5 MB')
      setLoading(false)
      return
    }

    try {
      handleAddUploadedImageUrl(
        'https://www.cheerspublishing.com/uploads/article/87a5f067-288f-4443-ab8d-dcb28987aa96.png'
      )
      setMessage('上传成功')
    } catch (error) {
      setError('未上载图像')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex-1 space-y-3 my-4">
        <label htmlFor="file" className="text-field__label">
          图像插件
        </label>
        <div className="flex items-center gap-x-3">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="border border-gray-300 px-3 py-2 w-full"
          />
          <button
            type="button"
            disabled={loading || !file}
            onClick={handleUpload}
            className="text-green-600 bg-green-50 w-36 hover:text-green-700 hover:bg-green-100 py-2 rounded"
          >
            {loading ? '正在上传...' : '上传'}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 my-1">{error}</p>}
      {message && <p className="text-green-500 my-1">{message}</p>}
    </>
  )
}

export default UploadImage
