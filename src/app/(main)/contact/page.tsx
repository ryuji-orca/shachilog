export const metadata = {
  title: "Contact",
  description: "お問い合わせページ",
}

const Contact = () => {
  return (
    <section className="min-h-screen px-6 pt-16 md:pt-24 ">
      <h1 className="pb-6 text-3xl text-slate-12 dark:text-slatedark-12">
        Contact
      </h1>
      <div className="prose prose-slate max-w-full  prose-headings:text-indigo-11 prose-h2:font-bold prose-p:tracking-wider prose-a:text-blue-11 prose-a:no-underline hover:prose-a:underline dark:text-slatedark-12 dark:prose-headings:text-yellowdark-11 dark:prose-a:text-bluedark-11">
        <p>
          Xの
          <a href="https://twitter.com/orca48691" target="_blank">
            DM
          </a>
          か
          <a href="mailto:shachilog.ryuji@gmail.com" target="_blank">
            shachilog.ryuji@gmail.com
          </a>
          にメッセージをお願いします。
        </p>
        <p>
          いただいたメッセージはなるべく返事をいたしますが、全てのメッセージに返信できるとは限らないのでご了承下さい🙏。
        </p>
      </div>
    </section>
  )
}

export default Contact
