import React, { useEffect, useState } from "react";
import EdneedEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import S3 from "react-aws-s3";
import { useDispatch } from "react-redux";
import { setCommonError } from "../../store/actions/commonerror";

const TextEditor = ({ preFilledData, currentResponse, feature }) => {

  const [editorPreFilled, setEditorPreFilled] = useState(``);

  useEffect(() => {
    if (preFilledData) {
      setEditorPreFilled(preFilledData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preFilledData]);

  const dispatch = useDispatch();

  const addPhoto = (files, uploadHandler) => {
    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }
    var file = files[0];
    var photoKey = "uploads/" + (file.name.split(".")[0]) + file.name.split(".")[1];
    const config = {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: photoKey,
      Body: file,
      ACL: "public-read",
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
      s3Url: process.env.REACT_APP_S3_URL,
      bucketName: process.env.REACT_APP_BUCKET_NAME,
    };
    var ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(
      file,
    )
      .then((data) => {

        if (data.status === 204) {
          const response = [{
            "url": data.location,
            "name": files[0].name,
            "size": files[0].size
          }];
          uploadHandler({ result: response });
          return ({ success: true, finalImageURL: "https://" + process.env.REACT_APP_BUCKET_NAME + ".s3.ap-south-1.amazonaws.com/" + photoKey });
        } else {
          dispatch(
            setCommonError(
              "Error occured in uploading your file, Try again."
            )
          );
        }
      })
      .catch((error) => {
        dispatch(setCommonError(error.message));
      });
  }

  return (
    <React.Fragment>
      <EdneedEditor
        setContents={preFilledData}
        showToolbar={true}
        onChange={currentResponse}
        onImageUploadBefore={addPhoto}
        setDefaultStyle="min-height: 200px"
        placeholder={feature ? feature : ""}
        // setOptions={feature === "Enter blog content here..." ?
        //   {
        //     buttonList: [
        //       [
        //         "undo",
        //         "redo",
        //         "font",
        //         "fontSize",
        //         "formatBlock",
        //         "paragraphStyle",
        //         "blockquote",
        //         "bold",
        //         "underline",
        //         "italic",
        //         "strike",
        //         "subscript",
        //         "superscript",
        //         "fontColor",
        //         "hiliteColor",
        //         "textStyle",
        //         "removeFormat",
        //         "outdent",
        //         "indent",
        //         "align",
        //         "horizontalRule",
        //         "list",
        //         "lineHeight",
        //         "table",
        //         "link",
        //         "image",
        //         "video",
        //         "audio",
        //         "imageGallery",
        //         "fullScreen",
        //         "showBlocks",
        //         "codeView",
        //         "preview",
        //         "print",
        //         "save",
        //         "template",
        //       ],
        //     ],
        //     "charCounterType": "char",
        //     "maxCharCount": "50000",
        //     "showPathLabel": false,
        //     "imageUploadUrl": "https://edneed-images-uat.s3.amazonaws.com",
        //     "imageMultipleFile": true,
        //     "imageGalleryUrl": "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
        //   } :
        //   feature === "description" ?
        //     {
        //       buttonList: [
        //         [
        //           "bold",
        //           "underline",
        //           "italic",
        //           "strike",
        //           "list",
        //           "align",
        //           // "table",
        //           // "font",
        //           // "fontSize",
        //         ],
        //       ],
        //       "showPathLabel": false,
        //       "charCounterType": "char",
        //       "maxCharCount": "50000",
        //     }
        //     :
        //     {
        //       buttonList: [
        //         [
        //           "bold",
        //           "underline",
        //           "italic",
        //           "strike",
        //           "list",
        //           "align",
        //           // "image",
        //           // "imageGallery",
        //           // "table",
        //           // "font",
        //           // "fontSize",
        //         ],
        //       ],
        //       "showPathLabel": false,
        //       "imageMultipleFile": true,
        //       "imageGalleryUrl": "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
        //     }
        // }
        setOptions={
          {
            buttonList: [
              [
                "undo",
                "redo",
                "font",
                "fontSize",
                "formatBlock",
                "paragraphStyle",
                "blockquote",
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
                "fontColor",
                "hiliteColor",
                "textStyle",
                "removeFormat",
                "outdent",
                "indent",
                "align",
                "horizontalRule",
                "list",
                "lineHeight",
                "table",
                "link",
                "image",
                "video",
                "audio",
                "imageGallery",
                "fullScreen",
                "showBlocks",
                "codeView",
                "preview",
                "print",
                "save",
                "template",
              ],
            ],
            "charCounterType": "char",
            "maxCharCount": feature === "description" ? 50000 : 2000,
            "showPathLabel": false,
            "imageUploadUrl": "https://edneed-images-uat.s3.amazonaws.com",
            "imageMultipleFile": true,
            "imageGalleryUrl": "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
          }
        }
      />
    </React.Fragment>
  );
};
export default TextEditor;
