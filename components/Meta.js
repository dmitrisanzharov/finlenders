import Head from 'next/head';
 
const Meta = ({title, keywords, description}) => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet='utf-8' />
            <link rel='icon' href='/favicon.ico' />
            <title>{title}</title>
        </Head>
    )
}
 
 
Meta.defaultProps = {
    title: 'finlenders page',
    keywords: 'investing, peer to peer, p2p, money online',
    description: 'Great way to make Passive Income, much better rates than saving account, with limited risk and exposure to the Irish SME businesses',
  }
 
export default Meta
