import { useDisclosure } from 'hooks'

import { Icons } from 'components'

const Specification = props => {
  //? Props
  const { specification } = props

  //? Assets
  const [isShowSpec, showSpecHandlers] = useDisclosure()

  let renderSpecification = isShowSpec ? specification : specification.slice(0, 7)

  //? Render(s)
  return (
    <section className="px-4">
      <div className="lg:max-w-3xl xl:max-w-5xl">
        <h4 className="mb-3 h-fit w-fit lg:border-b-2 lg:border-red-500">规格</h4>

        <div className="lg:ml-10 lg:pr-12">
          <ul className="space-y-4 lg:mt-10">
            {renderSpecification.map((item, i) => {
              if (!item.value) return
              else
                return (
                  <li key={i} className="flex">
                    <span className="py-2 ml-3 font-light leading-5 tracking-wide text-gray-500 w-36">
                      {item.title}
                    </span>
                    <span
                      className="w-full py-2 font-normal leading-5 tracking-wide text-gray-600 break-all border-b border-gray-100 md:break-normal "
                      dangerouslySetInnerHTML={{ __html: item.value }}
                    ></span>
                  </li>
                )
            })}
          </ul>
          {specification.length > 7 && (
            <button
              type="button"
              className="flex items-center py-2 text-sm text-sky-400"
              onClick={showSpecHandlers.toggle}
            >
              {isShowSpec ? '收起' : '查看更多'}
              {!isShowSpec && <Icons.ArrowRight2 className="icon text-sky-400 " />}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Specification
