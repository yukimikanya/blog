import Link from "next/link";
import Head from 'next/head';
import { client } from "../libs/client";
import { groupBy } from "../libs/util";
import Header from '../components/header';
import Footer from '../components/footer';



export default function Home({ blog,monthlyIndex,category,totalCount,footer }) {
  return (
    <div>

      <div className="main">
        <Header />

        <div className="list">

          <div className="list-wrapper">

            <div className="news">
              <a href="/blog/page/1" className="link"><p>記事一覧はこちら♪</p></a>
            </div>

            <div className="pagenation-url">
              <p>最新の記事が4件表示されます。</p>
            </div>

            <ul  className="list-ul">
              {blog.map((blog) => (
                <li key={blog.id} className="size">
                  <Link href={`/blog/${blog.id}`}>
                    <div className="a-link">
                                        
                      <img src={`${blog.image.url}`} alt="example"  />
                      
                      <h2>{blog.title}</h2>

                      <div className="headline">
                        <p>{blog.headline}</p>
                      </div>

                      <div className="category">
                        <p className="p-time">{new Date(blog.publishedAt).toLocaleString()}</p>
                      </div>                
                    </div>
                  </Link>
                  <div className="p-text">
                    <a href={`/category/${blog.category.id}/1`}>
                      <p>カテゴリー:{blog.category.name}</p> 
                    </a>
                  </div>
                </li>
              ))}
            </ul>

          </div>
             
          <div className="side-bar">
            <div className="profile">

              <p>Profile</p>
              <div className="profile__image">
                <img src="/profile-img.webp" alt="My Image" />
              </div>
              <p>ゆき</p>

              <div className="my-pr">
                <p>主にWEBサイトのコーティングとデザインをする人です♪</p>
                <p>このブログでは日記のようなものと、私の事について書いていきたいと思います。</p>
                <p>貧困、うつ病、トランスジェンダーですが色々な人に助けれながらなんとか生きていけます、皆さまには本当に感謝してます。</p>
              </div>

            </div>

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

            <div className="archive">
              <h2>月別アーカイブ</h2>
              {Object.keys(monthlyIndex).map((index) => (
                <li>
                  <Link href={`archive/${index}`}>
                    {index.split("_")[0] + "年" + index.split("_")[1] + "月"}
                  </Link>
                  （{monthlyIndex[index].length}）
                </li>               
              ))}
            </div>
         </div>
        </div>

        <Footer category={category} />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const Data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 4 } });
  const footer_data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 6 } });


  const data = await client.get({ endpoint: "blog", queries: { limit: 3000 } });
  const monthlyIndex = groupBy(data.contents);

  const categoryData = await client.get({ endpoint: "categories" });


  return {
    props: {
      blog: Data.contents,
      footer: footer_data.contents,
      monthlyIndex: monthlyIndex,
      category: categoryData.contents,
      totalCount: Data.totalCount
    },
  };
}
