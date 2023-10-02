import { useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import gsap from 'gsap';
import Link from 'next/link';
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  useEffect(() => {

    gsap.timeline()
    .fromTo(".home-header .logo", {y:-100, opacity:0, ease:"back"}, {y:0, opacity: 1})
    .fromTo(".heading-text h1:nth-child(1)", {x:-100, opacity:0, ease:"back", duration: 1}, {x:0, opacity: 1})
    .fromTo(".heading-text h1:nth-child(2)", {x:-100, opacity:0, ease:"back", duration: 1}, {x:0, opacity: 1})
    .fromTo(".heading-text h1:nth-child(3)", {x:-100, opacity:0, ease:"back", duration: 1}, {x:0, opacity: 1})
    .set(".page-header .bi-arrow-down", {"visibility": "visible"})
    .fromTo(".page-header .bi-arrow-down", {opacity:0, ease:"back", duration: 1}, {opacity: 1})
    .delay(1.5);

    gsap.timeline({scrollTrigger:{
      trigger:".about-section-container",
      start:"top 85%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".about-section-container img", { opacity:0, ease: 1, duration: 0.3}, {opacity:1})
    .fromTo(".about-section-container h1", {x:-150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})
    .fromTo(".about-text p", {opacity:0, ease: 1, duration: 0.5}, {opacity: 1})
    .fromTo(".about-text button", {x: 100, opacity: 0, ease: 1, duration: 0.2}, {x: 0, opacity: 1})

    gsap.to(".parallax", {
      yPercent: -30,
      scrollTrigger: {
        trigger: ".parallax-container",
        scrub: true
      }, 
    });

    gsap.timeline({scrollTrigger:{
      trigger:".home-services-container",
      start:"top 75%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".services-header h1:nth-child(1)", {x:-150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})
    .fromTo(".services-header h1:nth-child(2)", {x:-150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})
    .fromTo(".services-header h1:nth-child(3)", {x:-150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})
    .fromTo(".services-header h1:nth-child(4)", {x:-150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})

    gsap.timeline({scrollTrigger:{
      trigger:".contact-section",
      start:"top 75%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".contact-section img", {x:-150, y: 50, opacity: 0, ease: 1, duration: 0.3}, { x:0, y: 0, opacity: 1 })
    .fromTo(".contact-section h2", {y:-50, opacity: 0, ease: 1, duration: 0.3}, { y: 0, opacity: 1 })
    .fromTo(".contact-section-text", {opacity: 0, ease: 1, duration: 0.3}, { opacity: 1 })
    .fromTo(".contact-section button", {x:-100, opacity:0, ease:"back", duration: 1}, {x:0, opacity: 1})


    gsap.timeline({scrollTrigger:{
      trigger:".services-features",
      start:"top 80%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".feature", {
      opacity: 0
    }, {
      opacity: 1,
      stagger: {
        each: 1,
        repeatRefresh: true,
      }
    })
}, [])

  return (
    <Layout 
      title="Home Page" 
      description="Remedy Exports is a sourcing and exporter of wholesale raw materials for Asian botanicals from Thailand to US and Europe vendors.  We handle logistics from farm to exportation.">
      <div id="page" className="home-container">
        <div id="content" className="site-content">
          <div className="page-header">
            <div className="py-lg-5 container">
              <div className="row py-lg-5">
                <div className="heading-text col-lg-6 mx-auto">
                  <h1>Thailand</h1>
                  <h1>Sourcing</h1>
                  <h1>Exporting</h1>
                </div>
                <div className="logo col-lg-6 mx-auto text-center">
                  <Image className="remedy-exports-logo" src="/images/remedy_exports_logo.png" width={350} height={350} alt="..." />
                </div>
              </div>
              <i className="bi bi-arrow-down"></i>
            </div>
          </div>
          <div className="about-section-container">
            <div className="px-4 pt-5 my-5 text-center">
              <div className="px-2 pt-2 my-3 text-center">
                <Image className="plantation-img" src="/images/thai-plantation.jpg" width={600} height={350} alt="..." />
              </div>
               <h1 className="display-4 fw-bold text-body-emphasis">What About Remedy Exports?</h1>
              <div className="about-text col-lg-6 mx-auto">
                <p className="lead mb-4">
                  Remedy Exports is a company located in Thailand that handles the end-to-end process of high-quality Thai botanicals. Our mission is to supply quality botanicals that are safe from any 
                  metals, bacteria, and that is grown naturally without the usage of any non-organic pesticides or fertilizers. 
                  <br /><br />
                  Thailand is renowned for its ecotourism, amazing food, rich history and as a diverse ethnic melting pot which draws in visitors from around the world.  Remedy Exports looks to bring this to your 
                  door step by sourcing, and investments in Thai plantations.  Thailand is famed for its tropical climate, humid air, and acidic soil rich in nutrients. These attibutes contibutre to high biodiversity, 
                  and estimates suggest there are between 10,600-12,000 species of botanicals in Thailand.  Remedy Exports doesn't just offer a supply from established plantations but an opportunity of a lifetime with our <b>Plantation Investment Program</b>. This 
                  opportunity enables our clients to secure their own supply of a multitude of botanicals that we plant and harvest solely for their company needs. 
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                  <Link href="/about">
                    <button type="button" className="btn btn-3 btn-outline-primary btn-lg px-4 me-sm-3">Findout More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="halfcircle-top fixed inverted"></div>
          <div className="parallax-container">
            <div className="parallax-wrapper">
              <h1>Step Into Thailand</h1>
              <p>We are a window into the beauty of Thailand and can help supply your company with any botanicales from Thaniland.</p>
            </div>
            <div className='parallax' data-depth='0.10'></div>
          </div>
          <div className="halfcircle-bottom fixed"></div>
          <div className="home-services-container">
            <div className="services-header">
              <div className="container px-4 py-5">
                <h1>We</h1>
                <h1>Have</h1>
                <h1>The</h1>
                <h1>Remedy</h1>
              </div>
            </div>
            <div className="services-features">
              <div className="container px-4 py-5">
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                  <div className="feature col">
                    <div className="service-img"></div>
                    <h3 className="fs-2">Sourcing</h3>
                    <p>We can go to any plantation in Thailand to help ensure quality by picking out the best botanicals.  Furthermore, we gamma treat the botanicales and provide a certificate of treatment to help ensure that 99.9% of all microbials have been removed.</p>
                  </div>
                  <div className="feature col">
                    <div className="service-img"></div>
                    <h3 className="fs-2">Ocean Freight</h3>
                    <p>We have competative rates on ocean freight from Thailand to anywhere in the world.  We have various size containers to accomidate your shipment size and make sure we pack your botanicals so they are secure and safe.</p>
                  </div>
                  <div className="feature col">
                    <div className="service-img"></div>
                    <h3 className="fs-2">Air Freight</h3>
                    <p>We have competative rates on air freight from Thailand to get your orders quickley to you anywhere in the world.  We also pack your botanicals so they are secure and safe, as well as air seal if need be so that your delivery makes it to you in one piece.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="contact-section">
            <div className="container px-4 py-5">
              <div className="row g-4 py-5 justify-content-center">
                <div className="col-lg-8">
                  <Image src="/images/paper-airplane.png" width={100} height={100} alt="..." />
                  <h2 className="text-center">Contact Us Today</h2>
                  <div className="contact-section-text">
                    <p>
                      Have more question? Then don&apos;t hesitate to contact us today so we can answer those questions in full, and tell you about some of our programs and different products.  Things to know:   
                    </p>
                    <ul>
                      <li>Click the button and lets start a discussion today.</li>
                      <li>If you are ready to get started then click on login and then the register link to register.</li>
                      <li>Once your registration has been approved Vendors will be able to start making orders.</li>
                      <li>Still not sure, then contact us and we can setup an online meeting to discuss it.</li>
                    </ul>
                  </div>
                  <div className="d-flex justify-content-center p-3">
                    <Link href={`/contact`}>
                      <button className="btn btn-3 btn-outline-primary btn-lg px-4 me-sm-3">Contact Us</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}
