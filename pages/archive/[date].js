import { client } from "../../libs/client";
import Link from "next/link";
import { groupBy } from "../../libs/util";
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function BlogId({ title, blog,category,footer,monthlyIndex }) {
  return (
    <div>
      <div className="main">
        <Header />
       
        <div className="main-pn">
          <div className="pn-wrapper arc-wrapper">

            <div className="list">
              <div className="list-wrapper list-nation">
              <h1>{title}</h1>
                <ul className="arc-wrapper">
                  {blog.map((blog) => (
                    <li key={blog.id}>
                      <div className="p-text pn-text">
                        <Link href={`/blog/${blog.id}`}>
                         {new Date(blog.publishedAt).toLocaleString()}
                         <p className="p-time">{blog.title}</p>
                        </Link>
                        <a href={`/category/${blog.category.id}/1`}>
                          <p>カテゴリー:{blog.category.name}</p> 
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
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

              <div className="arc-archive">
              <h2>月別アーカイブ</h2>
              {Object.keys(monthlyIndex).map((index) => (
                <li>
                  <Link href={`${index}`}>
                    {index.split("_")[0] + "年" + index.split("_")[1] + "月"}
                  </Link>
                  （{monthlyIndex[index].length}）
                </li>               
              ))}
            </div>
            </div>

          </div>
        </div>




        <Footer category={category} />

      </div>
    </div>
  );
}

// 1. パスを生成
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });
  const monthlyIndex = groupBy(data.contents, "publishedAt");

  const paths = Object.keys(monthlyIndex).map((index) => `/archive/${index}`);
  return { paths, fallback: false };
};

// 2. 該当月のブログ記事を取得
export const getStaticProps = async (context) => {
  const date = context.params.date;
  const year = date.split("_")[0];
  const month = date.split("_")[1];

  // microCMSのfiltersクエリは >= を表現できないので開始時刻は1ミリ秒引いておく
  const startOfMonthTmp = new Date(year, month - 1, 1);
  const startOfMonth = new Date(startOfMonthTmp.getTime() - 1);

  const endOfMonth = new Date(year, month, 0);

  // filtersクエリで該当月の記事のみを取得
  const filters = `publishedAt[greater_than]${startOfMonth.toISOString()}[and]publishedAt[less_than]${endOfMonth.toISOString()}`;

  const data = await client.get({
    endpoint: "blog",
    queries: {
      filters: filters,
      limit: 3000,
    },
  });

  const categoryData = await client.get({ endpoint: "categories" });

  const footer_data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 6 } });

  const monthlyIndex = groupBy(data.contents);

  return {
    props: {
      title: `${year}年${month}月の記事一覧`,
      blog: data.contents,
      category: categoryData.contents,
      footer: footer_data.contents,
      monthlyIndex: monthlyIndex
    },
  };
};