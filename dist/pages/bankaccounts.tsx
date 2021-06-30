import * as React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import BankAccountsComponent from '../components/BankAccounts/BankAccounts';

interface bankAccount {
  id: number;
  title: string;
  owner: string;
  account: string;
  cart: string;
  sheba: string;
}

export interface IndexProps {
  bankaccounts: bankAccount[];
}

export interface IndexState {}

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>شماره حساب ها</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <BankAccountsComponent bankAccounts={this.props.bankaccounts} />

        <Footer />
      </div>
    );
  }
}

export default Index;

export async function getServerSideProps(context) {
  const bankaccountsRes = await fetch(
    `${process.env.SCHEMA}://${process.env.DOMAIN}/fa/bankaccounts?ajax=1`
  );
  const bankaccounts = await bankaccountsRes.json();

  return {
    props: {
      bankaccounts: Object.entries(bankaccounts.accounts).map(
        (value) => value[1]
      ),
    },
  };
}