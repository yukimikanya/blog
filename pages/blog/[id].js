import Head from 'next/head';
import Link from "next/link";
import { client } from "../../libs/client";
import { groupBy } from "../../libs/util";
import styles from '../../styles/Home.module.scss';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function BlogId({ blog,monthlyIndex,category,totalCount,footer,prevBlog, nextBlog}) {

  return (
    <div>


      <div className="page_main">
        <Header />

      <div className="blog-sidebar">
        <div className="blog-wrapper">
            <main>
              <h1 className={styles.title}>{blog.title}</h1>
              
              <div className="category-wrapper">
                <img src="/ico-file.png" alt=""></img>
                <a href={`/category/${blog.category.id}/1`}>
                  <p>{blog.category && blog.category.name}</p>
                </a>
              </div>

              <p className="p-time">{new Date(blog.publishedAt).toLocaleString()}</p>
              
              <div
                dangerouslySetInnerHTML={{
                  __html: `${blog.body}`,
                }}
                className={styles.post}
              />

            </main>
            <div className='backTo'>
                {nextBlog && (
                  <Link href={`/blog/${nextBlog.id}`}>
                    <p>前の記事</p>
                  </Link>
                )}
                  <p>記事一覧に戻る</p>
                {prevBlog && (
                  <Link href={`/blog/${prevBlog.id}`}>
                    <p>次の記事</p>
                  </Link>
                )}

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


      </div>
        <Footer category={category} />
      </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  const footer_data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 6 } });

  const categoryData = await client.get({ endpoint: "categories" });

  const date = await client.get({ endpoint: "blog", queries: { limit: 3000 } });

  const monthlyIndex = groupBy(date.contents);

  const allBlogsData = await client.get({
    endpoint: "blog",
    queries: { fields: "id,title" },
  });

  const allBlogs = allBlogsData.contents;
  const currentIndex = allBlogs.findIndex((item) => item.id === id);
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  return {
    props: {
      blog: data,
      prevBlog: prevBlog,
      nextBlog: nextBlog,
      category: categoryData.contents,
      monthlyIndex: monthlyIndex,
      footer: footer_data.contents,
      
    },
  };
};