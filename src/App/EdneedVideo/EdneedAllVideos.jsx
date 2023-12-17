import React from "react";
// import { ThumnailVideoDefault } from "../../Common/Images/index";
import Card from "../../Common/Card";
import CardMedia from "../../Common/Card/CardMedia";
import CardBody from "../../Common/Card/CardBody";
import { useSelector } from "react-redux";
import NoDataAvailable from "../../Common/NoDataAvailable";
import ReactGA from "react-ga";

const DefaultEdneedVideo = ({ toggleOption }) => {
  const { youtubeData, youtubeDataSuccess } = useSelector((state) => {
    return {
      youtubeData: state.edneedYoutube.list.data,
      youtubeDataSuccess: state.edneedYoutube.list.success,
    };
  });


  ReactGA.event({
    category: "Resources",
    action: "click",
 label:"Home_Watch_Video",
  })


  return (
    <React.Fragment>
      <div className="EdneedAllVideoWrapper mt-30">
        <div className="EdneedAllVideoItem">
          {youtubeDataSuccess ? (
            youtubeData.length > 0 ? (
              youtubeData.map((data, key) => {
                return (
                  <Card key={key} className="EdneedAllVideoCard">
                    <CardMedia>
                      <iframe
                        width="100%"
                        height="200"
                        src={data.videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </CardMedia>
                    <CardBody>
                      <p>{data.videoTitle}</p>
                    </CardBody>
                  </Card>
                );
              })
            ) : (
              <NoDataAvailable title="No Records!" />
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DefaultEdneedVideo;
