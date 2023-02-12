export type advantagesType = {
  id: number;
  image: string;
  imagePosition: 'left' | 'right';
  title: string;
  description: string;
}[];

const advantages: advantagesType = [
  {
    id: 1,
    image: '/images/cloud-servers/Group 437@2x.png',
    imagePosition: 'left',
    title: 'سرورهای کلاد جی سرور',
    description:
      'نسل جدید از سرورهای مجازی که بر بستر تکنولوژی های جدید مثل Openstack میزبانی میشوند, آپتایم بشتری دارد و از زیرساخت قوی تری نسبت به مجازی سازی سنتی برخوردار است و به شما امکانات مدیریتی بیشتری از جمله نصب سریع تر از سیستم عامل, تغییر آی پی و ... در مقابل با kvm یا Vmware میدهد این دسته از سرور های مجازی بسیار مقرون به صرفه تر و مناسب برای استفاده های چند روزه یا حتی ساعتی میباشند',
  },
  {
    id: 2,
    image: '/images/cloud-servers/Group 438@2x.png',
    imagePosition: 'right',
    title: 'پردازنده های پرسرعت',
    description:
      'پردازش با سرعت بالا از جمله ویژگی های منحصربه فرد سرورهای مجازس کلاد جی سرور است. تمامی پلن ها داری CPU های گیگاهرتزی هستند، از این رو جهت تامین نیاز برنامه های با عملکرد سریع بسیار مناسب خواهند بود',
  },
  {
    id: 3,
    image: '/images/cloud-servers/Group 439@2x.png',
    imagePosition: 'left',
    title: 'پنل مدیریت حرفه ای برای کاربران حرفه ای',
    description:
      'پنل کاربری جی سرور با طراحی مدرن، یکپارچه و با امکانات کاربردی به شما کمک می کند تا تمامی نیازهای فنی خود را در جهت مدیریت سروریس خود بدون نیاز به تماس با پشتیبان برآورده نمایید',
  },
  {
    id: 4,
    image: '/images/cloud-servers/Group 440@2x.png',
    imagePosition: 'right',
    title: 'دسترسی بدون معطلی',
    description:
      'در کمتر از 10 ثانیه و بلافاصله پس از ثبت سفارش از طریق پنل کاربری سروریس مورد نظرتان را ایجاد کنید و حتی 1 ثانیه بیشتر هم انتظار نکشید',
  },
];

const getAllAdvantages = () => {
  return advantages;
};

export default getAllAdvantages;
