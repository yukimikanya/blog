import Link from "next/link";

const Footer = ({ category }) => {
    return (
      <footer>
         <div className="footer">
          <div className="footer-top">
            <div className="footer-info">
              <div className="footer-guide">

                <div className="footer-guide__box">
                  <a href="/" className="link"><p>トップ</p></a>
                </div>

                <div className="footer-guide__box">
                  <a href="/blog/page/1" className="link"><p>記事一覧</p></a>
                  <ul>
                  {category.map((category) => (
                    <li key={category.id}>
                      <Link href={`/category/${category.id}/1`}>{category.name}</Link>
                    </li>
                  ))}
                  </ul>
                </div>

                <div className="footer-guide__box">
                  <p>リンク集</p>
                  <ul>
                    <li><a href="https://twitter.com/WebYukiyuki" className="link" target="_blank"><p>Twitter</p></a></li>
                    <li><a href="https://www.instagram.com/yukinya222/" className="link" target="_blank"><p>Instaglam</p></a></li>
                  </ul>
                </div>

                

              </div>
            </div>
            <div className="shadow-bg">
            </div>
          </div>
          
          <div className="copyright">
            <small>&copy; 2023 YUKI All rights reserved.</small>
          </div>
        </div>
      </footer>
    );
  };
  
  
  export default Footer;