import { Icons } from 'components'
import moment from 'moment-jalaali'

const ReviewProductCard = props => {
  //? Props
  const { item } = props

  //? Render(s)
  return (
    <article className="flex py-3">
      <span
        className={`farsi-digits w-5 h-5 text-center pt-0.5 inline-block rounded-md text-white  ${
          item.rating <= 2 ? 'bg-red-500' : item.rating === 3 ? 'bg-amber-500' : 'bg-green-500'
        }`}
      >
        {item.rating}
      </span>
      <div className="flex-1 px-2.5 space-y-3 lg:px-6">
        <div className="w-full border-b border-gray-100">
          <p className="mb-1">{item.title}</p>
          <span className="text-xs farsi-digits">
            {moment(item.updatedAt).format('jYYYY/jM/jD')}
          </span>
          <span className="inline-block w-1 h-1 mx-3 bg-gray-400 rounded-full" />
          <span className="text-xs">{item.user?.name}</span>
        </div>

        <p>{item.comment}</p>

        {item.positivePoints.length > 0 && (
          <div>
            {item.positivePoints.map(point => (
              <div className="flex items-center gap-x-1" key={point.id}>
                <Icons.Plus className="text-green-400 icon" />
                <p>{point.title}</p>
              </div>
            ))}
          </div>
        )}

        {item.positivePoints.length > 0 && (
          <div>
            {item.negativePoints.map(point => (
              <div className="flex items-center gap-x-1" key={point.id}>
                <Icons.Minus className="text-red-400 icon" />
                <p>{point.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default ReviewProductCard
