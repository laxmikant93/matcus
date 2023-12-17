import React from "react";
import aboutHeroBanner from "../../assets/images/img/about-us-banner.png";
import sammySinghEdneed from "../../assets/images/img/sammy-singh-edneed.png";
// import { sammySinghEdneed } from "../../Common/Icon";
//import { useDispatch } from "react-redux";
//import AppLink from "../../Common/AppLink";
import "./About.scss";
import AppLink from "../../Common/AppLink";
import men from "./images_AboutUs/Man-Holding-Cup.png";
import img1 from "./images_AboutUs/Group-2.png"
import img2 from "./images_AboutUs/Group-3.png"
import img3 from "./images_AboutUs/Group-4.png"
import img4 from "./images_AboutUs/Group-5.png"
import boss from "./images_AboutUs/Group-6.png"
import trust from "./images_AboutUs/trust.png"
import human from "./images_AboutUs/human-rights.png"
import customer from "./images_AboutUs/customer.png"
import AdminIcon from "./images_AboutUs/admin-icon.png"
import StudentIcon from "./images_AboutUs/student-icon.png"
import TeacherIcon from "./images_AboutUs/teacher-icon.png"
import OthersIcon from "./images_AboutUs/others-icon.png"
function AboutUs() {
  return (
    <React.Fragment>
      <div className="edContainer">
        <section className="mt-100 banner">
          <div className="row between-xs">
            <div className="col-xs-12 col-md-7 first-sm">
              <h1><span className="secondary w-400">Inspired</span> by the
                People, <span className="primary w-700">Developed </span>
                for the <span className="w-700">Future</span></h1>
              <h5 className="w-500"><span className="secondary">EDUCATION +</span> <span className="primary">TECHNOLOGY</span> = EDNEED</h5>
            </div>
            <div className="col-xs-12 col-md-5 first-xs">
              <img
                src={men}
                className=""
                alt="Inspired by the people. Developed for the future. Education + Technology = Edneed"
              />
            </div>
          </div>
        </section>
      </div>
      <div className="stripe">
        <div className="edContainer">
          <div className="col-xs-12 col-md-12">
            <h2>#Revolutionizing Digital Education</h2>
          </div>
        </div>
      </div>
      <section className="ourMission pt-40 pb-40">
        <div className="edContainer">
          <div className="row between-xs">
            <div className="col-xs-12 col-md-6 center-xs">
              <img src={img1} className="img-fluid" alt="" />
            </div>
            <div className="col-xs-12 col-md-5">
              <h2 className="w-400 mb-40 mission">Our <span className="primary w-600">Mission</span></h2>
              <p className="mb-40">Edneed is a diverse collective of thinkers and
                doers, continually reimagining possibilities to
                connect educators and learners the world over.
                With a wide range of online learning solutions,
                our mission is to make education accessible to
                everyone.</p>
              <p>Guided by our three core principles: Honesty,
                Equality, and Selfless service, we are revolution-
                -izing the way information is shared between
                people, whether down the street or across the
                globe. And the same innovation that goes into
                our products also applies to our practices —
                strengthening our commitment to leave the
                world better than we found it.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="ourMission pt-40 pb-40">
        <div className="edContainer">
          <div className="row between-xs">
            <div className="col-xs-12 col-md-6">
              <h2 className="w-400 mb-40 vision">Our <span className="secondary w-600">Vision</span></h2>
              <p className="mb-40">Edneed for us is a medium to give back to our society.
                We realized there was a need for an accessible platform
                that would be a one-stop solution to all learning
                impediments. That’s how Edneed came into being. Our
                vision is to connect learners and educators worldwide
                and make education accessible to everyone.</p>
              <p>Edneed stems from promoting knowledge sharing and
                the power of education. Edneed’s tagline - Endless &
                Beyond, reflects this core idea of magnifying the power
                of learning. We want to enable the ability to share
                knowledge and information without boundaries or
                limitations so that every individual has the opportunity
                to unearth their highest potential. </p>
            </div>
            <div className="col-xs-12 col-md-5 center-xs first-xs last-md">
              <img src={img2} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="principal_sec pt-40 pb-40">
        <div className="edContainer">
          <div className="row between-xs">
            <div className="col-xs-12 col-md-5 center-xs">
              <div className="align_img">
                <img src={img3} className="img-fluid" alt="" />
              </div>
            </div>
            <div className="col-xs-12 col-md-6">
              <h2 className="w-400 mb-60 principle">Our <span className="blue w-600">Principles</span></h2>
              <div className="grid_principal">
                <div className="icon">
                  <img src={trust} className="img-fluid" alt="" />
                </div>
                <div>
                  <h5 className="mb-10">Honesty</h5>
                  <p>Honesty is the best policy. At Edneed, we believe
                    that one should observe honesty with their work,
                    peers, society but most importantly themselves.
                    Because it is us who are most affected by our
                    actions.</p>
                </div>
              </div>
              <div className="grid_principal">
                <div className="icon">
                  <img src={human} className="img-fluid" alt="" />
                </div>
                <div>
                  <h5 className="mb-10">Equal Opportunity</h5>
                  <p>We believe that the greatest privilege in life is to
                    have access to an exemplary mentor. Edneed is
                    our step towards making the world a level plain
                    field, as quality education is fundamental to
                    development.</p>
                </div>
              </div>
              <div className="grid_principal">
                <div className="icon">
                  <img src={customer} className="img-fluid" alt="" />
                </div>
                <div>
                  <h5 className="mb-10">Selfless Service</h5>
                  <p>We are dedicated to giving back to our society
                    through the medium of education. By making
                    knowledge accessible, finding opportunities
                    easier and empowering educational institutes
                    with tools that will take them to the next level.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="ourMission pt-40 pb-40">
        <div className="edContainer">
          <div className="row between-xs">
            <div className="col-xs-12 col-md-6 ">
              <h2 className="w-400 mb-60 story">Our <span className="secondary w-600">Story</span></h2>
              <p className="mb-60">An entrepreneur of Indian origin, based in Austin, Texas,
                Saranjeet Singh has a strong passion for giving back to
                society. As his mother is a teacher, growing up he had
                closely witnessed the struggles in an educator’s life. This
                motivated him to build a platform to empower teachers
                and schools. He believes that it is only through education
                that positive change can be brought on a large scale to
                society. Hence, in 2016, he came up with the idea of
                Edneed.</p>
              <p>On a mission to take education beyond borders with the
                help of digitalization, Edneed helps any educational
                institute build its website. To free teachers from the hassle
                of shuffling through multiple applications for e-teaching,
                Edneed makes it possible to schedule and conduct online
                classes, assignments, and tests, all on one platform. On
                Edneed, any institute/private tutors can digitize their
                institute in 120 seconds, increasing their reach by many
                folds, for free.
              </p>
            </div>
            <div className="col-xs-12 col-md-5 center-xs first-xs last-md">
              <div className="align_img">
                <img src={img4} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ourMission pt-40 pb-40">
        <div className="edContainer">
          <div className="row between-xs">
            <div className="col-xs-12 col-md-5 center-xs">
              <div className="align_img">
                <img
                  src={boss}
                  className="img-fluid"
                  alt="Sammy Singh - Founder & CEO"
                />
                <div className="content">
                  <h5>Sammy Singh</h5>
                  <p>Founder & CEO</p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-6">
              <h3 className="w-400 mb-60">Meet Our <span className="primary w-600">Founder</span></h3>
              <p className="mb-40">An entrepreneur of the Indian origin, based in
                Austin, Texas, Sammy Singh, has a strong
                passion for giving back to the society. As his
                mother is a teacher, growing up he had closely
                witnessed the struggles in an educator’s life.</p>
              <p className="mb-40">After moving to the US in his early 20’s, Sammy
                found it difficult to connect with his school,
                situated on the outskirts of India, due to the lack
                of a proper apparatus. This motivated him to
                build a platform to empower teachers and
                schools. He believes that it is only through
                education that positive change can be brought
                on a large scale to the society.
              </p>
              <p>
                Hence, in 2016, he came up with the idea of
                Edneed. To liberate schools from geographical
                boundation and help them enter the global market
                with the help of technology.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <section className="global_community">
        <div className="edContainer">
          <div className="row">
            <div className="col-12">
              <div className="edGlobalCommunity-head w-200">
                <div className="ed_border">
                  <p>Building the largest</p>
                  <p className="secHeading uppercase">Global Community</p>
                  <p>of educators and learners.</p>
                </div>
              </div>
              <div className="edGlobalCommunity-item">
                <div className="edGC-item">
                  <div className="edGC-top">
                    <img src={AdminIcon} className="img-fluid" alt="" />
                    {/* <i className="ed-icon icon-InstituteRole primary i-75"></i> */}
                  </div>
                  <p className="text-xs w-500 underline">Institute Admin</p>
                  <p className="mt-10">
                    Digitize your institute and conduct online classes, assignments
                    and test builder with Edneed Learning Management System.
                  </p>
                </div>
                <div className="edGC-item">
                  <div className="edGC-top">
                    <img src={TeacherIcon} className="img-fluid" alt="" />
                  </div>
                  <p className="text-xs w-500 underline">Teacher</p>
                  <p className="mt-10">
                    Network globally with education professionals, share knowledge
                    and experience effortless e-teaching.
                  </p>
                </div>
                <div className="edGC-item">
                  <div className="edGC-top">
                    <img src={StudentIcon} className="img-fluid" alt="" />
                  </div>
                  <p className="text-xs w-500 underline">Student</p>
                  <p className="mt-10">
                    Connect with educators and mentors globally, find opportunities
                    and uncover the endless.
                  </p>
                </div>
                <div className="edGC-item">
                  <div className="edGC-top">
                    <img src={OthersIcon} className="img-fluid" alt="" />
                  </div>
                  <p className="text-xs w-500 underline">Others</p>
                  <p className="mt-10">
                    Edneed is for everybody! If you are unsure about your role,
                    choose "Others" as your default role. You can change to a
                    different role later on in your learning journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default AboutUs;