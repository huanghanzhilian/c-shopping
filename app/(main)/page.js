import { inter, lusitana, vazirmatnRegular, vazirmatnMedium, vazirmatnBold } from "styles/fonts"

export default function Home() {
  return (
    <main>
      <div className={inter.className}>Inter字体 Google Fonts使用方式</div>
      <div className="font-mono">Inter字体 Google Fonts使用方式</div>

      <div className={`${lusitana.className}`}>lusitana字体 Google Fonts使用方式</div>

      <div className={`${vazirmatnRegular.className}`}>vazirmatnRegular字体 localFont使用方式</div>
      <div style={{ fontFamily: "VazirRegular" }}>vazirmatnRegular字体 fontFamily使用方式</div>

      <div className={`${vazirmatnMedium.className}`}>vazirmatnMedium字体 localFont使用方式</div>
      <div style={{ fontFamily: "VazirMedium" }}>vazirmatnMedium字体 fontFamily使用方式</div>

      <div className={`${vazirmatnBold.className}`}>vazirmatnBold字体 localFont使用方式</div>
      <div style={{ fontFamily: "VazirBold" }}>vazirmatnBold字体 fontFamily使用方式</div>
      
      
    </main>
  )
}
