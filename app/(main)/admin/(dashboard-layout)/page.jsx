import Image from 'next/image'

const AdminPage = () => {
  return (
    <section className="py-20">
      <Image src="/icons/chart.png" alt="图表" width={208} height={208} className="mx-auto mb-8" />

      <p className="text-center">情况分析</p>
      <span className="block my-3 text-base text-center text-amber-500">(开发中)</span>
    </section>
  )
}

export default AdminPage
