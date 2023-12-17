import { ResponsiveImage } from 'components'

const BannerTwo = props => {
  //? Props
  const { data } = props

  //? Local components
  const BannerImage = ({ item }) => (
    <ResponsiveImage
      dimensions="h-[30vw] lg:h-60 w-full"
      className="rounded-xl overflow-hidden"
      src={item.image.url}
      alt={item.title}
    />
  )

  //? Render(s)
  if (data.length === 0) return null

  return (
    <section className="grid grid-cols-2 gap-3 px-3 lg:grid-cols-4 lg:gap-4">
      {data.map((item, index) =>
        item.uri ? (
          <a href={item.uri} target="_blank" key={index}>
            <BannerImage item={item} />
          </a>
        ) : (
          <BannerImage key={index} item={item} />
        )
      )}
    </section>
  )
}

export default BannerTwo
