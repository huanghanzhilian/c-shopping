import Link from 'next/link'

import { EditIconBtn, ResponsiveImage } from 'components'

const ReviewsTable = props => {
  //? Props
  const { reviews } = props

  //? Render(s)
  return (
    <section className="mx-3 overflow-x-auto mt-7 lg:mx-10">
      <table className="w-full whitespace-nowrap">
        <thead className="h-9 bg-emerald-50">
          <tr className="text-emerald-500">
            <th></th>
            <th className="border-gray-100 border-x-2">ID</th>
            <th>状态</th>
            <th className="border-gray-100 border-x-2">用户</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {reviews.length > 0 &&
            reviews.map(review => (
              <tr
                className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50"
                key={review._id}
              >
                <td className="p-2">
                  <ResponsiveImage
                    dimensions="w-7 h-7"
                    className="mx-auto"
                    src={review.product.images[0].url}
                    alt=""
                  />
                </td>
                <td className="p-2">{review._id}</td>
                <td className="p-2 font-bold">
                  <span
                    className={`py-1.5 px-2 rounded-lg font-bold inline-block
                      ${
                        review.status === 1
                          ? 'bg-amber-100 text-amber-500 '
                          : review.status === 2
                            ? 'bg-green-100 text-green-500 '
                            : 'bg-red-100 text-red-500 '
                      }
                    `}
                  >
                    {review.status === 1 ? '等待确认' : review.status === 2 ? '已确认' : 'none'}
                  </span>
                </td>
                <td className="p-2">{review.user.name}</td>

                <td className="p-2">
                  <Link href={`/admin/reviews/${review._id}`}>
                    <EditIconBtn />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )
}

export default ReviewsTable
