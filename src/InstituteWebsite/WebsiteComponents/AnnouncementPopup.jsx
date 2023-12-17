import { useSelector, useDispatch } from "react-redux";
import { closeAnnPopup } from "../../store/actions/instituteannouncement";
import FormatText from "../../Common/FormatText";
import { IconAttachment } from "../../Common/Icon";
import ImageViewer from "../../Common/ImageViewer";
const AnnouncementPopup = () => {
  const dispatch = useDispatch();
  const { show, detail } = useSelector(
    (state) => state.instituteannouncement.annpopup
  );
  return (
    show && (
      <div className={`modal announcement-modal modalShowing-${show}`}>
        <div className="modalwrapper">
          <span
            className="closeModal text-xxs gray"
            onClick={() => dispatch(closeAnnPopup())}
          >
            Close
          </span>

          <div className="modalbody">
            <div className="pageFullCenter">
              {detail.thumbnail && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="announcement-modal-poster">
                      <ImageViewer object={detail.thumbnail}
                        className="img-fluid" />
                      {/* <img
                        src={detail.thumbnail}
                        className="img-fluid"
                        alt=""
                      /> */}
                    </div>
                  </div>
                </div>
              )}
              <div className="headingWrapper">
                <p className="heading text-sm w-300 mt-30">{detail.title}</p>
                {
                  !detail.attachment || detail.attachment === "" ?
                    "" :

                    <a href={detail.attachment} className="button" target="_blank" rel="noopener noreferrer"> View Attachment</a>
                }
              </div>
              <FormatText text={detail.description}>
                {({ formatedText }) => (
                  <p
                    className="text-xs sun-editor-output"
                    dangerouslySetInnerHTML={{ __html: formatedText }}
                  ></p>
                )}
              </FormatText>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AnnouncementPopup;
