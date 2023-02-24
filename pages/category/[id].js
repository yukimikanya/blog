// pages/blog/page/[id].js
import Link from 'next/link';
import { client } from "../../libs/client";
import { groupBy } from "../../libs/util";

// pages/blog/[id].js
export default function Home({ blog,monthlyIndex,category,totalCount}) {
  return (
    <div>

      <div className="main">
        <div className="header">
          
          <div className="menu-bar">

            <div className="menu-box">
              <a href="/" className="link">TOP</a>
            </div>

            <div className="menu-box">
              <a href="https://twitter.com/WebYukiyuki" className="link" target="_blank">Twitter</a>
            </div>

            <div className="menu-box">
              <a href="https://www.instagram.com/yukinya222/" className="link" target="_blank">Instaglam</a>
            </div>


          </div>
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

        <Pagination totalCount={totalCount} />
      </div>
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });

  const paths = data.contents.map((content) => `/category/${content.id}`);
  
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const Data = await client.get({ endpoint: "blog", queries: {offset: 0, limit: 6 ,filters: `category[equals]${id}`} });

  const data = await client.get({ endpoint: "blog", queries: { limit: 3000 } });
  const monthlyIndex = groupBy(data.contents);

  const categoryData = await client.get({ endpoint: "categories" });

  return {
    props: {
      blog: Data.contents,
      monthlyIndex: monthlyIndex,
      category: categoryData.contents,
      totalCount: Data.totalCount,
    },
  };
};

export const Pagination = ({ totalCount }) => {
  const PER_PAGE = 6;

  const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <ul>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={`/category/cxiw_5fpfzp/${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};