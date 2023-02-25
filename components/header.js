const Header = () => {
  return (
    <header>
      <div className="main">
            <div className="header">
              <a href="/">
              <img src="/logo.webp" alt=""></img>
              </a>
            
              <div className="menu-bar">

                  <div className="menu-box">
                  <a href="/" className="link">TOP</a>
                  </div>

                  <div className="menu-box">
                  <a href="/blog/page/1" className="link">Blog List</a>
                  </div>

                  <div className="menu-box">
                  <a href="https://twitter.com/yukimikan_nya" className="link" target="_blank">Twitter</a>
                  </div>

                  <div className="menu-box">
                  <a href="https://www.instagram.com/yukinya222/" className="link" target="_blank">Instaglam</a>
                  </div>


              </div>

              <div class="hamburger-menu">
                <input type="checkbox" id="menu-btn-check"></input>
                <label for="menu-btn-check" class="menu-btn"><span></span></label>

                <div class="menu-content">
                  <h2>MENU</h2>
                  <ul>
                      <li>
                        <a href="/" className="link">TOP</a>
                      </li>
                      <li>
                        <a href="/blog/page/1" className="link">Blog List</a>
                      </li>
                      <li>
                        <a href="https://twitter.com/WebYukiyuki" className="link" target="_blank">Twitter</a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/yukinya222/" className="link" target="_blank">Instaglam</a>
                      </li>
                  </ul>
                </div>
              </div>           
           </div>
       </div>
    </header>
  );
};

export default Header;