import * as React from 'react';
import Head from 'next/head';
import OrderDedicatedServer from '../../../../components/Order/OrderDedicatedServer/OrderDedicatedServer';
import Layout from '../../../../components/Layout/Layout';
import { ICurrency, IPageProps } from '../../../_app';
import { IDedicatedPlan } from '../../../../helper/types/products/Dedicated/plan';
import ILicense from '../../../../helper/types/products/License/plan';
import { IHostPlan } from '../../../../helper/types/products/Host/plan';
import IOS from '../../../../helper/types/products/VPS/os';

interface IProps extends IPageProps {
  status: boolean;
  plan: IDedicatedPlan;
  licenses: ILicense[];
  backups: IHostPlan[];
  oses: IOS[];
  currencies: ICurrency[];
}

class Index extends React.Component<IProps> {
  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>خرید سرور اختصاصی</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          domainsForNavbar={this.props.domainsForNavbar}
          licensesForNavbar={this.props.licensesForNavbar}
        >
          <OrderDedicatedServer
            plan={this.props.plan}
            licenses={this.props.licenses}
            backups={this.props.backups}
            oses={this.props.oses}
          />
        </Layout>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const locale = context.locale;
  const id = context.query.id;

  if (locale !== 'fa') {
    return {
      notFound: true,
    };
  }

  const respone = await fetch(
    `${process.env.SCHEMA}://${process.env.DOMAIN}/${locale}/order/server/dedicated/${id}?ajax=1`
  );
  const data = await respone.json();

  if (!data.status) {
    return {
      notFound: true,
    };
  }

  return {
    props: { ...data },
  };
}

export default Index;
