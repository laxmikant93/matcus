import React from 'react';
import './home.scss';

import EdneedBgCommunity from "./HomeIcons/community-bg.png";
import AppLink from '../../Common/AppLink';
import ReactGA from "react-ga";

const EdneedCommunity = () => {
    const exploreEdneed = () => {
        ReactGA.event({
            category: "Community",
            action: "click",
            label: "Home_Explore",
        })

    }


    return (
        <div className={'edneed_community_wrap'}>
            <div className={`edContainer ${'edContainerRelative'}`}>
                <div className={'edneed_community_content'}>
                    <div className={'edneed_community_content_head'}>
                        <h5 className={`bsPink w-600 text-xs`}>LEARNING COMMUNITY</h5>
                        <h6>Learning never ends - the more you connect with others, the more you learn.</h6>
                        <p>Looking for study-buddies or simply stuck on a question?
                            The Edneed Learning Community is a global social media
                            platform where you ask questions, share knowledge,
                            participate in discussions, and connect with like-minded individuals. </p>
                    </div>
                    <AppLink className="button button-bsPink btn-sm" to="/community" onClick={() => exploreEdneed()}>Explore Edneed</AppLink>
                </div>
                <div className={'edneed_community_background'}>
                    <img className="img-fluid" src={EdneedBgCommunity} alt="Website Builder Tool With Dynamic Options" />
                </div>
            </div>
        </div>
    )
}

export default EdneedCommunity