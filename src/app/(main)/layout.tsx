import "@/app/globals.css"

import { EmailSimpleForm } from "@/component/email"
import { Footer } from "@/component/footer"
import { Header } from "@/component/header"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-indigo-1 dark:bg-indigodark-1">
      <Header />
      <main className="grid grid-cols-[1fr_min(850px,100%)_1fr] [&>*]:col-[2]">
        {children}
      </main>
      <EmailSimpleForm />
      <Footer />
    </div>
  )
}

export default RootLayout
