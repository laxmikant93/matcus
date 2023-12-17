/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import './home.scss';
import settingIcon from "./HomeIcons/setting-icon.png";
import videoLoader from "./HomeIcons/loader.gif";
import LmsStudentVideo from "./VideoLms/student.mp4";
import LmsAdminVideo from "./VideoLms/admin.mp4";
import AppLink from '../../Common/AppLink';
import { useDispatch, useSelector } from 'react-redux';
import { signupRole } from '../../store/actions/userRole';
import { useNavigate } from 'react-router-dom';
import { getAllVideos } from '../../store/actions/edneedYoutube';
import useScrollTracker from '../../Common/GoogleAnalytics/useScrollTracker';
import ReactGA from "react-ga";
const EdneedLMS = () => {
    const { user, streamingVideos, streamingVideosSuccess, streamingVideosLoading } = useSelector((state) => {
        return {
            user: state.user,
            streamingVideos: state.edneedYoutube.data,
            streamingVideosLoading: state.edneedYoutube.loadin,
            streamingVideosSuccess: state.edneedYoutube.success
        }
    })
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const dispatch = useDispatch()
    const history = useNavigate()
    const videoRef_a = useRef(null);
    const videoRef_t = useRef(null);
    const videoRef_s = useRef(null);
    const handleSignUp = (value) => {
        history('/auth/create-account')
        dispatch(signupRole(value))
        ReactGA.event({
            category: "LMS",
            action: "click",
            label: `Home_${value}_LMS`,
        })

    }
    // useEffect(() => {
    //     let options = {
    //         rootMargin: "0px",
    //         threshold: [0.25, 0.75]
    //     };

    //     let handlePlay = (entries, observer) => {
    //         entries.forEach((entry) => {
    //             if (entry.isIntersecting) {
    //                 videoRef_a.current.play();
    //                 videoRef_t.current.play();
    //                 videoRef_s.current.play();
    //             } else {
    //                 videoRef_a.current.pause();
    //                 videoRef_t.current.pause();
    //                 videoRef_s.current.pause();
    //             }
    //         });
    //     };

    //     let observer = new IntersectionObserver(handlePlay, options);

    //     observer.observe(videoRef_a.current);
    //     observer.observe(videoRef_t.current);
    //     observer.observe(videoRef_s.current);
    // });

    const IARef = useRef(null);
    const TRef = useRef(null);
    const SRef = useRef(null);
    const lmsRef = useRef(null);
    useEffect(() => {
        document.addEventListener("LMS_Selection", () => {
            lmsRef.current.scrollIntoView()
        })
        document.addEventListener("IA_Selection", () => {
            IARef.current.scrollIntoView()
        })
        document.addEventListener("T_Selection", () => {
            TRef.current.scrollIntoView()
        })
        document.addEventListener("S_Selection", () => {
            SRef.current.scrollIntoView()
        })
    }, [])
    return (
        <div className={'edneed_lms_wrap'} ref={lmsRef} id="lmsRef">
            <div className={'edneed_lms_wrap_head'}>
                <h5><span className="primary">EDNEED</span> LEARNING MANAGEMENT SYSTEM </h5>
            </div>
            <div className={'ed_lms_admin'} ref={IARef}>
                <div className={'edContainer'}>
                    <div className={'ed_lms_cnt'}>
                        <div className={'ed_lms_cnt_head'}>
                            <h5 className={`primary w-600 text-xs`}>ADMIN </h5>
                            <h6>Manage all activities
                                of your Institute online</h6>
                        </div>
                        <span className={`${'ed_lms_cnt_divider'} ${'a'}`}></span>
                        <ul className={'ed_lms_cnt_list'}>
                            <li className={'ed_lms_cnt_list_item'}>
                                <div className={'ed_lms_cnt_list_item_icon'}>
                                    <img className="img-fluid" src={settingIcon} alt="Website Builder Tool With Dynamic Options" />
                                </div>
                                <div className={'ed_lms_cnt_list_item_content'}>
                                    <h6>Keep a digital eye on progress</h6>
                                    <p>Digitally track the performance & activities of your school&apos;s teachers & students.</p>
                                </div>
                            </li>
                            <li className={'ed_lms_cnt_list_item'}>
                                <div className={'ed_lms_cnt_list_item_icon'}>
                                    <img className="img-fluid" src={settingIcon} alt="Website Builder Tool With Dynamic Options" />
                                </div>
                                <div className={'ed_lms_cnt_list_item_content'}>
                                    <h6>Centralized & Secure Platform </h6>
                                    <p>Store all learning content in a single place
                                        & eliminate the fear of losing data.</p>
                                </div>
                            </li>
                            <li className={'ed_lms_cnt_list_item'}>
                                <div className={'ed_lms_cnt_list_item_icon'}>
                                    <img className="img-fluid" src={settingIcon} alt="Website Builder Tool With Dynamic Options" />
                                </div>
                                <div className={'ed_lms_cnt_list_item_content'}>
                                    <h6>Have complete control </h6>
                                    <p>Manage classrooms, teachers, students,
                                        & study material with a single click. </p>
                                </div>
                            </li>

                        </ul>
                        <button className="button button-primary btn-sm" onClick={() => handleSignUp("InstituteOwner")}>Get Started</button>
                    </div>
                    <div className={'ed_lms_cnt_wrap'}>
                        <div className={'ed_lms_cnt_video'} ref={videoRef_a}>
                            <video poster={videoLoader} autoPlay muted loop style={{ minWidth: "200px" }}>
                                <source src="https://api.edneed.com/videos/homepageVideo?videoName=admin" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
                <div className={'lms_admin_artwork'}></div>
            </div>
            <div className={'ed_lms_tutor'} ref={TRef}>
                <div className={'edContainer'}>
                    <div className={'ed_lms_cnt_wrap'}>
                        <div className={'ed_lms_cnt_video'} ref={videoRef_t}>
                            <video poster={videoLoader} autoPlay muted loop>
                                <source src="https://api.edneed.com/videos/homepageVideo?videoName=teacher" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <div className={'ed_lms_cnt'}>
                        <div className={'ed_lms_cnt_head'}>
                            <h5 className={`secondary w-600 text-xs`}>TEACHER OR PRIVATE TUTOR </h5>
                            <h6>Digitize your Classroom</h6>
                        </div>
                        <span className={`${'ed_lms_cnt_divider'} ${'t'}`}></span>
                        <ul className={'ed_lms_cnt_list'}>
                            <li className={'ed_lms_cnt_list_item'}>
                                <div className={'ed_lms_cnt_list_item_icon'}>
                                    <img className="img-fluid" src={settingIcon} alt="Website Builder Tool With Dynamic Options" />
                                </div>
                                <div className={'ed_lms_cnt_list_item_content'}>
                                    <h6>Make learning more interactive</h6>
                                    <p>Create online classes and start teaching.</p>
                                </div>
                            </li>
                            <li className={'ed_lms_cnt_list_item'}>
                                <div className={'ed_lms_cnt_list_item_icon'}>
                                    <img className="img-fluid" src={settingIcon} alt="Website Builder Tool With Dynamic Options" />
                                </div>
                                <div className={'ed_lms_cnt_list_item_content'}>
                                    <h6>Create educational content</h6>
                                    <p>Share educational content with the students.</p>
                                </div>
                            </li>
                            <li className={'ed_lms_cnt_list_item'}>
                                <div className={'ed_lms_cnt_list_item_icon'}>
                                    <img className="img-fluid" src={settingIcon} alt="Website Builder Tool With Dynamic Options" />
                                </div>
                                <div className={'ed_lms_cnt_list_item_content'}>
                                    <h6>Track student progress</h6>
                                    <p>Analyze and assess student&apos;s performance.</p>
                                </div>
                            </li>

                        </ul>
                        <button className="button button-secondary btn-sm" onClick={() => handleSignUp("Teacher")}>Get Started</button>
                    </div>
                </div>
                <div className={'lms_tutor_artwork'}></div>
            </div>
            <div className={'ed_lms_student'} ref={SRef}>
                <div className={'edContainer'}>
                    <div className={'ed_lms_cnt'}>
                        <div className={'ed_lms_cnt_head'}>
                            <h5 className={`purple w-600 text-xs`}>STUDENT </h5>
                            <h6>Enhance your digital learning experience</h6>
                        </div>
                        <span className={`${'ed_lms_cnt_divider'} ${'s'}`}></span>
                        <ul className={'ed_lms_cnt_list'}>
                            <li className={'ed_lms_cnt_list_item'}>
                                <div className={'ed_lms_cnt_list_item_icon'}>
                                    <img src={settingIcon} alt="Website Builder Tool With Dynamic Options" />
                                </div>
                                <div className={'ed_lms_cnt_list_item_content'}>
                                    <h6>Online classes</h6>
                                    <p>Join interactive online classes and empower knowledge.</p>
                                </div>
                            </li>
                            <li className={'ed_lms_cnt_list_item'}>
                                <div className={'ed_lms_cnt_list_item_icon'}>
                                    <img src={settingIcon} alt="Website Builder Tool With Dynamic Options" />
                                </div>
                                <div className={'ed_lms_cnt_list_item_content'}>
                                    <h6>Study materials for free</h6>
                                    <p>Have 24x7 access to study material with Edneed.</p>
                                </div>
                            </li>
                            <li className={'ed_lms_cnt_list_item'}>
                                <div className={'ed_lms_cnt_list_item_icon'}>
                                    <img src={settingIcon} alt="Website Builder Tool With Dynamic Options" />
                                </div>
                                <div className={'ed_lms_cnt_list_item_content'}>
                                    <h6>Submit assignments & tests</h6>
                                    <p>Easy access to submit online tests & assignments with Edneed LMS.</p>
                                </div>
                            </li>

                        </ul>
                        <button className="button button-purple btn-sm" onClick={() => handleSignUp("Student")}>Get Started</button>
                    </div>
                    <div className={'ed_lms_cnt_wrap'}>
                        <div className={'ed_lms_cnt_video'} ref={videoRef_s}>
                            <video poster={videoLoader} autoPlay muted loop>
                                <source src="https://api.edneed.com/videos/homepageVideo?videoName=student" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
                <div className={'lms_student_artwork'}></div>
            </div>
        </div>
    )
}

export default EdneedLMS