import { step } from '..';
import DomainConfiguration from '../DomainConfiguration/DomainConfiguration';
import DomainSettings from '../DomainSettings/DomainSettings';

export const renderPageTitle = (step: step) => {
  switch (step) {
    case 'settings':
      return 'وضعیت دامنه';
    case 'configuration':
      return 'پیکربندی دامنه ها';
    case 'confirmation':
      return 'تایید سفارش';
    case 'complete-order':
      return 'تکمیل سفارش';
  }
};

export const renderStep = (step: step, data: any) => {
  switch (step) {
    case 'settings':
      return <DomainSettings data={data} />;
    case 'configuration':
      return <DomainConfiguration data={data} />;
    case 'confirmation':
      return 'تایید سفارش';
    case 'complete-order':
      return 'تکمیل سفارش';
  }
};
