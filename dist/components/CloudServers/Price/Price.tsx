import { Container, Form, FormLabel, Image, Row } from 'react-bootstrap';
import React from 'react';
import styles from './Price.module.scss';

export interface PriceProps {}

export interface PriceState {
  price: number;
}

class Price extends React.Component<PriceProps, PriceState> {
  constructor(props: PriceProps) {
    super(props);
    this.state = {
      price: 1000000,
    };
    this.handleOnChangeRange = this.handleOnChangeRange.bind(this);
  }

  addCommas(num: number) {
    let str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  handleOnChangeRange(e) {
    const percent: number = e.target.value / 100;
    const angle_range = document.querySelector('#angle') as HTMLImageElement;
    const show_value = document.querySelector('#show-value') as HTMLDivElement;
    angle_range.style.transform = `rotate(${-170 + percent * 180}deg)`;

    if (e.target.value == 0) {
      show_value.innerHTML = '10 GB';
      show_value.style.left = `${percent * 100 - 5}%`;
    } else if (e.target.value == 12.5) {
      show_value.innerHTML = '20 GB';
      show_value.style.left = `${percent * 100 - 5}%`;
    } else if (e.target.value == 25) {
      show_value.innerHTML = '50 GB';
      show_value.style.left = `${percent * 100 - 5}%`;
    } else if (e.target.value == 37.5) {
      show_value.innerHTML = '100 GB';
      show_value.style.left = `${percent * 100 - 5}%`;
    } else if (e.target.value == 50) {
      show_value.innerHTML = '500 GB';
      show_value.style.left = `${percent * 100 - 5}%`;
    } else if (e.target.value == 62.5) {
      show_value.innerHTML = '1 TB';
      show_value.style.left = `${percent * 100 - 5}%`;
    } else if (e.target.value == 75) {
      show_value.innerHTML = '2 TB';
      show_value.style.left = `${percent * 100 - 5}%`;
    } else if (e.target.value == 87.5) {
      show_value.innerHTML = '5 TB';
      show_value.style.left = `${percent * 100 - 5}%`;
    } else if (e.target.value == 100) {
      show_value.innerHTML = '10 TB';
      show_value.style.left = `${percent * 100 - 20}%`;
    }
  }

  render() {
    return (
      <section className={styles.priceRange}>
        <Container className={styles.container}>
          <Row>
            <div className={styles.priceRateWrapper}>
              <div className={styles.left}>
                <div className={styles.ratePickerWrapper}>
                  <div className={styles.ratePicker}>
                    <Image
                      src="images/cloud-servers/Intersection 1@2x.png"
                      alt=""
                    />
                    <Image
                      className={styles.back}
                      src="images/cloud-servers/rate1.png"
                      alt=""
                    />
                    <Image
                      className={styles.angle}
                      id="angle"
                      src="images/cloud-servers/rate2.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.range}>
                    <FormLabel htmlFor="range">
                      <span className={styles.showValue} id="show-value">
                        10 GB
                      </span>
                      <Form.Control
                        onChange={this.handleOnChangeRange}
                        type="range"
                        min={0}
                        max={100}
                        id="range"
                        defaultValue={0}
                        step="12.5"
                      />
                    </FormLabel>
                  </div>
                  <div className={styles.price} dir="rtl">
                    <p>{this.addCommas(this.state.price)} تومان</p>
                    <span>ماهیانه</span>
                  </div>
                </div>
              </div>
              <div className={styles.right} dir="rtl">
                <h2>غیر قابل رقابت در قیمت!</h2>
                <p>
                  دغدغه هزینه را نداشته باشید;
                  <br />
                  زیرساخت قوی ما امکان میزبانی از سنگین ترین پروژه های شما را هم
                  دارد.
                  <br />
                  اطلاعات شما بر روی هاردهای NVme که سریع ترین تکنولوژی روز جهان
                  است نگهداری شده و ما از RAIDE10 و CEPH برای ایمن کردن اطلاعات
                  شما و جلوگیری از خسارات ناشی از خرابی سخت افزار استفاده
                  میکنیم.
                </p>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Price;
