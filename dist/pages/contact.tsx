import Head from 'next/head';
import ContactUs from '../components/ContactUs/ContactUs';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

export default function Index() {
  return (
    <div dir="rtl">
      <Head>
        <title>تماس با ما</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <ContactUs />

      <Footer />
    </div>
  );
}
