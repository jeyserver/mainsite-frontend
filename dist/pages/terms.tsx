import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import TermComponent from '../components/Terms/Terms';

export default function Terms() {
  return (
    <div dir="rtl">
      <Head>
        <title>شرایط و قوانین جی سرور</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <TermComponent />
      <Footer />
    </div>
  );
}