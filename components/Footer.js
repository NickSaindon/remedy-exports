import Link from 'next/link'

const Footer = () => {
  return (
    <div className="Footer">
      <footer>
        <div className="footer-container">
          <div className="footer-col-left">
            <h4>Let&apos;s Work Together</h4>
            <p>Become a vendor today by going to login page and click on the resgister link.</p>
            <Link href="/login" legacyBehavior>           
              <button type="button" className="btn btn-outline-light">Login</button>
            </Link>
          </div>
          <div className="footer-col-right">
            <div id="social-media">
              <ul>
                <li>
                  <Link href="https://www.facebook.com/Remedy-Exports-105808932212368" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-facebook" />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/remedy_co.ltd/" target="_black" rel="noopener noreferrer">
                      <i className="bi bi-instagram" />
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/RemedyExports" target="_black" rel="noopener noreferrer">
                      <i className="bi bi-twitter" />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/remedy-exports/" target="_black" rel="noopener noreferrer">
                      <i className="bi bi-linkedin" />
                  </Link>
                </li>
              </ul>
            </div>
            <div id="contact">
              <ul>
                <li>remedyexportsllc@gmail.com</li>
                <li>404.663.9352</li>
              </ul>
            </div>
          </div>
        </div>             
      </footer>
      <div className="footer-copyright">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 text-center">
                        <div id="footer-nav">
                        <Link href="/" legacyBehavior>
                            <button type="button" className="btn btn-link">HOME</button>
                        </Link>
                        <Link href="/about" legacyBehavior>
                            <button type="button" className="btn btn-link">ABOUT</button>
                        </Link>
                        <Link href="/contact" legacyBehavior>
                            <button type="button" className="btn btn-link">CONTACT</button>
                        </Link>
                        </div>

                    </div>
                    <div className="col-lg-6 col-md-12 text-center">
                    <div className="copyright">
                        <p>&copy; 2022 Remedy LLC | Import.Export Company</p>
                    </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
}
  
export default Footer; 