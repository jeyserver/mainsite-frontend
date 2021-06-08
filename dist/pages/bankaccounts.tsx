import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import BankAccountsComponent from '../components/BankAccounts/BankAccounts';

export default function Home() {
  return (
    <div dir="rtl">
      <Head>
        <title>شماره حساب ها</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
      </Head>

      <Navbar />

      <BankAccountsComponent />

      <Footer />
    </div>
  );
}
