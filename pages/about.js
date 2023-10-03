import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import gsap from 'gsap';
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  const [open, setOpen] = useState(false);


  useEffect(() => {
    gsap.timeline()
    .fromTo(".header-circle1", {x:-100, opacity:0, ease:"back"}, {x:0, opacity: 1})
    .fromTo(".header-circle2", {x:-100, opacity:0, ease:"back", duration: 1}, {x:0, opacity: 1})
    .fromTo(".header-circle3", {opacity:0, ease:"back",  duration: 1}, {opacity: 1})
    .fromTo(".container-img", {opacity:0, ease:"back", duration: 1}, {opacity:1})
    .fromTo(".about-text h1:nth-child(1)", {y:-100, opacity:0, ease:"back", duration: 1}, {y:0, opacity:1})
    .fromTo(".about-text h1:nth-child(2)", {x:100, opacity:0, ease:"back", duration: 1}, {x: 0, opacity: 1})
    .fromTo(".about-text h1:nth-child(3)", {x:-100, opacity:0, ease:"back", duration: 1}, {x: 0, opacity: 1})
    .set(".page-header .bi-arrow-down", {"visibility": "visible"})
    .fromTo(".page-header .bi-arrow-down", {opacity:0, ease:"back", duration: 1}, {opacity: 1})
    .delay(2);

    gsap.timeline({scrollTrigger:{
      trigger:".about-remedy",
      start:"top 85%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".about-remedy h2", {y:-150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})
    .fromTo(".about-remedy p", {opacity:0, ease: 1, duration: 0.5}, {opacity:1})
    .fromTo(".about-remedy .circle", {x: -100, opacity: 0, ease: 1, rotate: -360, duration: 1}, {x:0, opacity:1, rotate:0})

    gsap.timeline({scrollTrigger:{
      trigger:".process-one",
      start:"top 85%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".process-section h2", {y: -100, opacity: 0, ease: 1, duration: 0.3}, {y: 0, opacity: 1})
    .fromTo(".process-one .process-number", {x: -100, opacity: 0, ease: 1, duration: 0.5}, {x: 0, opacity: 1})
    .fromTo(".one-content h5", {y: 100, opacity: 0, ease: 1, duration: 0.5}, {y: 0, opacity: 1})
    .fromTo(".one-content p", {x: 100, opacity: 0, ease: 1, duration: 0.5}, {x: 0, opacity: 1})
    .fromTo(".one-content img", {y: 100, opacity: 0, ease: 1, duration: 0.5}, {y: 0, opacity: 1})

    gsap.timeline({scrollTrigger:{
      trigger:".process-two",
      start:"top 70%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".process-two .process-number", {y: -100, opacity: 0, ease: 1, duration: 0.5}, {y: 0, opacity: 1})
    .fromTo(".two-content h5", {y: 100, opacity: 0, ease: 1, duration: 0.5}, {y: 0, opacity: 1})
    .fromTo(".two-content p", {x: -100, opacity: 0, ease: 1, duration: 0.5}, {x: 0, opacity: 1})
    .fromTo(".two-content img", {y: -100, opacity: 0, ease: 1, duration: 0.5}, {y: 0, opacity: 1})

    gsap.timeline({scrollTrigger:{
      trigger:".process-three",
      start:"top 70%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".process-three .process-number", {x: 100, opacity:0, ease: 1, duration: 0.5}, {x: 0, opacity: 1})
    .fromTo(".three-content h5", {y: 100, opacity:0, ease: 1, duration: 0.5}, {y: 0, opacity: 1})
    .fromTo(".three-content p", {x: -100, opacity: 0, ease: 1, duration: 0.5}, {x: 0, opacity: 1})
    .fromTo(".three-content img", {y: -100, opacity: 0, ease: 1, duration: 0.5}, {y: 0, opacity: 1})

    gsap.timeline({scrollTrigger:{
      trigger:".mission-section",
      start:"top 90%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".mission-section h2", {y:-100, opacity:0, ease:"back", duration: 1}, {y:0, opacity:1})
    .fromTo(".mission-section p", {y:100, opacity:0, ease:"back", duration: 1}, {y: 0, opacity: 1})
    .fromTo(".mission-section .irradiation-img", {x:-100, opacity:0, ease:"back", duration: 1}, {x: 0, opacity: 1})
    .fromTo(".mission-section .lab-img", {x:100, opacity:0, ease:"back", duration: 1}, {x: 0, opacity: 1})
    .delay(2);
  }, [])

    

  return (
    <Layout 
      title="About Page"
      description="Find out all about Remedy Exports and what we have to offer for your business.  We have the Remedy when it comes to Thai botanicals.">
      <div id="page" className="about-container">
        <div className="page-header">
          <div className="py-5 container header-container">
                      <div className="header-circle1" />
          <div className="header-circle2" />
            <div className="container-img" />
            <div className="row py-lg-5">
              <div className="col-lg-12 about-text text-center">
                <h1>Getting</h1>
                <h1>To Know</h1>
                <h1>Remedy Exports</h1>  
                <i className="bi bi-arrow-down"></i>
              </div>
            </div>
          </div>
          <div className="header-circle3" />
        </div>
        <div className="container-xxl">
          <section className="about-remedy">
            <div className="row">
              <h2 className="text-center">Why You Need A Remedy?</h2>
            </div>
            <div className="circle circle1">
              <div className="about-img1" />
            </div>
            <div>
              <p>
                Remedy Exports is business that specializes in the supplying and shipping of Thai botanicals to vendors worldwide. Remedy Exports is a Thai 
                registered company limited and our company works around the clock to ensure that its clients needs are met at all times.
                <br/><br/>  
                Our goal is to procure quality botanicals that are safe from any metals, bacteria, and that is grown naturally without the usage of any chemical pesticides 
                or fertilizers. Remedy Exports only looks to work with farms that agree in using GAP (Good Agricultural Pratices) as well as GMP (Good Manufacturing Practices). This 
                is to maintain a high quality standard from plantation to consumer through mutual goals in quality.
                <br/><br/> 
                Another goal of Remedy Exports is to help meet the needs of all the clients we work with. We do this by over-seeing the end-to-end production, 
                from farm, factory, and exportation. Remedy handles every step of the process from raw materials to finished products.  By partnering with our clients we look to create a process that will standardize
                this industry in a way that is safe and profitable for all.    
                <br/><br/>
                Remedy Exports has partnered and works with over <b>30 plantations</b> in Thailand that produce a wide varity of botanicals, some of which only grow in Thailand or Southeast Asia.  Our company is dedicated to
                quality and consistency and work with our clients to supply them with the raw materials, extracts, or finished products their company needs.  We work to make the process as easy as possible, and straightforward so our clients get what they need.   
              </p>
            </div>
          </section>
          <section className="investment-program">
          <div className="row">
            <div className="col-lg-12">
            <h2 >Investment Program</h2>
            <p>
              The aim of this investment program is to provide our clients with high-quality botanicals that is exclusively procured for their company&apos;s needs. We look to support 
              the needs of our clients through our investment program that will facilitate the end-to-end production of botanicals in the local market. Working with our local 
              partnerships to expand our clients supply and demand in the US and the World market. Our approach is to implement a scaleable solution with a proactive approach 
              to problem solving that keeps business cost low, and creates room for expansion for our clients. We understand that our client&apos;s business and future business needs 
              should be functional, efficient and proactive solutions to procurement, processing and exporting their valuable commodities. Here at Remedy we believe we hold the 
              remedy to helping our clients current and future business reach their full potential in the industry.
            </p>
            <ul>
              <li>Remedy Exports covers X amount of acres of plantation to grow.</li>
              <li>Investors purchase interested units equivalent to X number of botanicals. In total X number of botanicals are planted.</li>
              <li>Plantation returns are aggregated and distributed interest units held.</li>
              <li>Remedy Exports handles the end-to-end management of the plantation.</li>
              <li>Investors secure high-quality botanicals exclusively for their business within the investment period.</li>
            </ul>
            </div>
            </div>
          </section>
          <section className="process-section">
            <h2 className="text-center">Our Process is Simple</h2>
            <div className="process-one d-flex justify-content-center">
                <div className="process-number">01</div>
                <div className="one-content">
                  <h5>Processing Raw Material</h5>
                  <p>Botanicals are brought in from the plantations where they are washed, dried, and grinded.</p>
                  <Image src="/images/dried-leaves.jpg" className="d-block w-100" width={500} height={500} alt="dried leaves" />
                </div>
            </div>
            <div className="process-two d-flex justify-content-start">
              <div className="two-content">
                  <h5>Sanitization</h5>
                  <p>The botanicals are sanitized through a gamma treatment and provide with a certifcate of treatment.</p>
                  <Image src="/images/gamma-treatment.jpg" className="d-block w-100" width={600} height={388} alt="gamma treatment" />
                </div>
                <div className="process-number">02</div>
            </div>
            <div className="process-three d-flex justify-content-center align-items-center">
              <div className="three-content">
                  <h5>Taken to the Port</h5>
                  <p>Botanicals are then boxed and palleted and taken for exportation by ocean or air frieght.</p>
                  <Image src="/images/container-ship.jpg" className="d-block w-100" width={600} height={415} alt="gamma treatment" />
                </div>
                <div className="process-number">03</div>
            </div>
          </section>
          <section className="mission-section">
            <div className="row gy-5">
              <div className="col-md-12 p-2">
                <h2 className="text-center">Our Mission</h2>
                <p>
                  Remedy Exports mission is to supply our clients with the best quality Thai botanicals that are high in quality and safe.  We work with labs and facilities to ensure 
                  that our clients needs and expectations are met.  We work with the labs to help create the products that our clients are most interested in and have them treated to ensure that
                  99% of all bacteria are killed.  Our clients will also recieve a certificate of irradiation to show their product has gone through the proper treatment process.  Once the raw materials 
                  or finished product is ready for shippment we will ship it either air frieght or ocean freight at the clients request.
                </p>
              </div>
              <div className="col-md-6 col-sm-12">
                <Image onClick={() => setOpen(true)} src="/images/TINT-irradiation-center.jpg" className="irradiation-img" width={600} height={800} alt="gamma treatment" />
              </div>
              <div className="col-md-6 col-sm-12">
                <Image onClick={() => setOpen(true)} src="/images/thai-lab.jpg" className="lab-img" width={600} height={800} alt="gamma treatment" />
              </div>
              <div className="col-md-12 p-2">
                <h2 className="text-center">Testing</h2>
                <p>
                  In Thailand there are a few lab test centers that the government accepts results from. Central Laboratory of Thailand is one of these labs and is where we 
                  have our botanicals tested. The testing methods are done with High Performance Liquid Chromatography (HPLC). This method, validation, and analysis is one of 
                  the most widely used techniques for testing in formulations and biological fluids. Also, this method is the most widely used in testing botanicals in 
                  the United States. We do not test our botanicals in house as to avoid any possible questions of unethical practices, and to align with the Thai government 
                  with accredited and accepted lab results.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default About;