// pages/blog/page/[id].js
import Link from 'next/link';
import Head from 'next/head';
import { Pagination } from '../../../components/Pagination';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import { client } from "../../../libs/client";
import { groupBy } from "../../../libs/util";



const PER_PAGE = 9; 

// pages/blog/[id].js
export default function Home({ blog,monthlyIndex,category,totalCount,currentPage,footer }) {
  return (
    <div>
      <div className="main">
        <Header />

        <div className="main-pn">
          <div className="pn-wrapper">
            <h1>記事一覧</h1>

            <div className='page-nation'>
                  <Pagination totalCount={totalCount} currentPage={currentPage}/>
            </div>

            <div className="list">

              <div className="list-wrapper list-nation">

              <ul  className="list-ul list-ul__nation">
                  {blog.map((blog) => (
                    <li key={blog.id} className="size pn-size">
                      <Link href={`/blog/${blog.id}`}>
                        <div className="a-link pn-link">
                                            
                          <img src={`${blog.image.url}`} alt="example" className="pn-img" />

                          <div className="pn-title">
                            <h2>{blog.title}</h2>

                            <div className="headline">
                              <p>{blog.headline}</p>
                            </div>
                          </div>
                        
                  
                        </div>
                      </Link>
                      <div className="p-text pn-text">
                        <p className="p-time">{new Date(blog.publishedAt).toLocaleString()}</p>
                        <a href={`/category/${blog.category.id}/1`}>
                          <p>カテゴリー:{blog.category.name}</p> 
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="side-bar">

            <div className="category-list">
              <h2>カテゴリー</h2>
              <ul>
                {category.map((category) => (
                  <li key={category.id}>
                    <Link href={`/category/${category.id}/1`}><p>{category.name}</p></Link>
                  </li>
                ))}
              </ul>
            </div>

            <ul  className="list-side">
            <p className="title-new">最新の記事</p>
            {footer.map((blog) => (
              <li key={blog.id} className="sidebar-size">
                <Link href={`/blog/${blog.id}`}>
                  <div className="a-link">
                                      
                    
                    <h2>{blog.title}</h2>


                    <div className="category">
                      <p className="p-time">{new Date(blog.publishedAt).toLocaleString()}</p>
                    </div>                
                  </div>
                </Link>
                <div className="p-text">カテゴリー:
                  <a href={`/category/${blog.category.id}/1`}>
                    <span>{blog.category.name}</span> 
                  </a>
                </div>
              </li>
            ))}
            </ul>
          </div>

        </div>



        <Footer category={category} />
      </div>
    </div>
  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });

  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const currentPage = id ? parseInt(id) : 1;

  const Data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * 9, limit: 9 } });

  const data = await client.get({ endpoint: "blog", queries: { limit: 3000 } });
  const monthlyIndex = groupBy(data.contents);

  const categoryData = await client.get({ endpoint: "categories" });

  const footer_data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 6 } });

  return {
    props: {
        blog: Data.contents,
        monthlyIndex: monthlyIndex,
        category: categoryData.contents,
        totalCount: Data.totalCount,
        currentPage: currentPage,
        footer: footer_data.contents
    },
  };
};