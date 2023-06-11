import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PostCard from './PostCard/PostCard';
import styles from './MainPage.module.scss';
import Link from 'next/link';
import TopNav from '../TopNav/TopNav';
import IPost from '../../../helper/types/blog/Post';
import IPopularPost from '../../../helper/types/blog/PopularPost';
import ICategory from '../../../helper/types/blog/Category';
import { ISeriesPosts } from '../../../pages/blog';

interface IProps {
  recentPosts: IPost[];
  popularPosts: IPopularPost[];
  categories: ICategory[];
  seriesPosts: ISeriesPosts;
  newsletterToken: string;
}

class MainPage extends React.Component<IProps> {
  render() {
    return (
      <section>
        <TopNav
          categories={this.props.categories}
          nightMode={false}
          title="آموزش ها و مقالات کاربردی برای وبمستران"
        />

        <div className={styles.mostViewedPosts}>
          <Container>
            <Row>
              <div className={styles.header}>
                <span>پر بازدید ترین مطالب</span>
              </div>
            </Row>
            <Row>
              {this.props.popularPosts.slice(0, 4).map((post, index) => (
                <Col xs={12} sm={6} lg={3} key={post.id}>
                  <PostCard post={post} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        <div className={styles.linuxPosts}>
          <Container>
            <Row>
              <Col xs={12} sm={6} lg={3} className="d-flex align-items-center">
                <div className={styles.categoryInfo}>
                  <h3 className={styles.title}>آموزش صفر تا صد لینوکس</h3>
                  <p className={styles.info}>
                    ﻟﻮرم اﯾﭙﺴﻮم ﻣﺘﻦ ﺳﺎﺧﺘﮕﯽ ﺑﺎ ﺗﻮﻟﯿﺪ ﺳﺎدﮔﯽ ﻧﺎﻣﻔﻬﻮم از ﺻﻨﻌﺖ ﭼﺎپ و
                    ﺑﺎ اﺳﺘﻔﺎده از ﻃﺮاﺣﺎن ﮔﺮاﻓﯿﮏ اﺳﺖ. ﭼﺎﭘﮕﺮﻫﺎ و ﻣﺘﻮن ﺑﻠﮑﻪ روزﻧﺎﻣﻪ
                    می باشد.
                  </p>
                  <Link href="/blog/category/linux" className={styles.link}>

                    <span>آموزش‌های لینوکس</span>
                    <i className="fas fa-long-arrow-alt-left"></i>

                  </Link>
                </div>
              </Col>
              {this.props.seriesPosts.linux &&
                this.props.seriesPosts.linux.slice(0, 3).map((post, index) => (
                  <Col xs={12} sm={6} lg={3} key={post.id}>
                    <PostCard post={post} />
                  </Col>
                ))}
            </Row>
          </Container>
        </div>

        <div className={styles.newestPosts}>
          <Container>
            <Row>
              <div className={styles.header}>
                <span>جدید ترین مطالب</span>
              </div>
            </Row>
            <Row>
              {this.props.recentPosts.slice(0, 4).map((post, index) => (
                <Col xs={12} sm={6} lg={3} key={post.id}>
                  <PostCard post={post} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        <div className={styles.programmingLangsPosts}>
          <Container>
            <Row>
              <Col xs={12} sm={6} lg={3} className="d-flex align-items-center">
                <div className={styles.categoryInfo}>
                  <h3 className={styles.title}>
                    آموزش جامع زبان های برنامه نویسی
                  </h3>
                  <p className={styles.info}>
                    ﻟﻮرم اﯾﭙﺴﻮم ﻣﺘﻦ ﺳﺎﺧﺘﮕﯽ ﺑﺎ ﺗﻮﻟﯿﺪ ﺳﺎدﮔﯽ ﻧﺎﻣﻔﻬﻮم از ﺻﻨﻌﺖ ﭼﺎپ و
                    ﺑﺎ اﺳﺘﻔﺎده از ﻃﺮاﺣﺎن ﮔﺮاﻓﯿﮏ اﺳﺖ. ﭼﺎﭘﮕﺮﻫﺎ و ﻣﺘﻮن ﺑﻠﮑﻪ روزﻧﺎﻣﻪ
                    می باشد.
                  </p>
                  <Link href="/blog/category/linux" className={styles.link}>

                    <span>آموزش های برنامه نویسی</span>
                    <i className="fas fa-long-arrow-alt-left"></i>

                  </Link>
                </div>
              </Col>
              {this.props.seriesPosts.wordpress &&
                this.props.seriesPosts.wordpress
                  .slice(0, 3)
                  .map((post, index) => (
                    <Col xs={12} sm={6} lg={3} key={post.id}>
                      <PostCard post={post} />
                    </Col>
                  ))}
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default MainPage;
