import "@/app/globals.css"

import { Footer, Header } from "@/component"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-indigo-2 dark:bg-indigodark-1">
      <Header />
      <main className="grid min-h-screen grid-cols-[1fr_min(768px,100%)_1fr] [&>*]:col-[2]">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
