import Head from "next/head"

type Props = {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title = "Next Image Gallery" }: Props) => {
  return (
    <html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Head>
      <div>{children}</div>
    </html>
  )
}

export default Layout
