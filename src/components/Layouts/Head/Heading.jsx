import Head from 'next/head';

function Heading({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
}

export default Heading;
