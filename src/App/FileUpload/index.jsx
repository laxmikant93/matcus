/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Axios from "axios";
import { Form, Button, InputGroup, ProgressBar, Card, OverlayTrigger, Popover, Jumbotron } from "react-bootstrap";
import { string, bool, func } from "prop-types";
import { isFileAllowed, checkFileSize } from "../../Classes/FileValidation";
import Api from "../../Classes/Api";
import DeletePopup from "../DeletePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
const API = new Api();

function FileUpload({ action, title, placeholder, required, hasData, reset }) {

    const allowedSize = 30; // in MB
    const [loading, setloading] = useState(false);
    const [deleteloading, setdeleteloading] = useState(false);
    const [validExtenstion, setvalidExtenstion] = useState(false);
    const [validSize, setvalidSize] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadProgress, setuploadProgress] = useState(`0`);
    const [error, seterror] = useState(false);

    function openFileDialog() {
        resetFileInput()
        document.getElementById(`idfile-${action}`).click()
        seterror(false)
    }

    function resetFileInput() {
        document.getElementById(`idfile-${action}`).value = "";
    }

    function handleDelete() {
        Axios.delete(
            API.url(`fs/${uploadedFile._id}`),
            { headers: API.getApiheader() }
        ).then(deleteItem => {
            setUploadedFile({})
            resetFileInput()
            if (hasData) {
                hasData({})
            }
        })
    }

    function handleFileOnChange(e) {
        const fileToUpload = e.target.files[0];
        if (fileToUpload) {
            const extensionValid = isFileAllowed(fileToUpload.name)
            const sizeValid = checkFileSize(fileToUpload.size) <= allowedSize ? true : false;

            if (extensionValid && sizeValid) {
                // this.props.setFileActionTypes(this.props.hasOwnProperty('UploadTypes')?this.props.fileState.UploadTypes:'')
                const formData = new FormData();
                formData.append('file', fileToUpload, fileToUpload.name);

                // formData.append('image',fileToUpload,fileToUpload.name);
                setloading(true)
                Axios.post(
                    API.url('fs'),
                    formData,
                    {
                        headers: API.getApiheader(),
                        onUploadProgress: fileUploadProgressEvent => {
                            const progress = parseInt(Math.round((fileUploadProgressEvent.loaded * 100) / fileUploadProgressEvent.total));
                            setuploadProgress(progress);
                        }
                    }
                )
                    .then(uploadedFileItem => {
                        setUploadedFile(uploadedFileItem.data)
                        hasData({
                            ...uploadedFileItem.data,
                            reset: () => { return resetControl },
                            hideDelete: () => { return setdeleteloading }
                        })
                    })
                    .catch(fileUploadError => seterror(fileUploadError.errors))
            }
            else {
                seterror(true)
                setvalidExtenstion(!extensionValid)
                setvalidSize(!sizeValid)
            }
        }
        else {
            resetFileInput()
        }
    }


    function resetControl() {

        resetFileInput();
        // if(uploadedFile._id){
        //     handleDelete();
        // }
        setUploadedFile({});
        seterror(false);
        setvalidExtenstion(false);
        setvalidSize(false);

    }



    useEffect(() => {

        if (uploadedFile._id) {
            setloading(false)
            setuploadProgress(0);
        }




    }, [uploadedFile, reset, resetControl])

    return <Form.Group>
        {

            loading ?
                <ProgressBar animated variant="success" now={uploadProgress} label={`${uploadProgress}%`} />
                :
                uploadedFile._id ?
                    <Card style={{ maxWidth: "18rem" }}>
                        <Card.Header className="text-truncate">
                            {
                                !deleteloading && <DeletePopup deleteActionMethod={handleDelete} autoFire={true}>
                                    {({ openAction }) => <Button type="button" size="sm" variant="outline-danger" style={{ zIndex: 1 }} onClick={() => openAction()} className="position-absolute right-0 top-0"> <FontAwesomeIcon icon={faTrashAlt} /></Button>}
                                </DeletePopup>

                                // <Button type="button" size="sm" variant="outline-danger" style={{zIndex:1}}  onClick={()=>handleDelete()} className="position-absolute right-0 top-0"> <FontAwesomeIcon icon={faTrashAlt} /></Button>
                            }
                            <OverlayTrigger
                                trigger="hover"
                                placement="bottom"
                                rootClose

                                overlay={
                                    <Popover>
                                        <Popover.Title>
                                            Complete Name
                                        </Popover.Title>
                                        <Popover.Content>
                                            {uploadedFile.fileName}
                                        </Popover.Content>

                                    </Popover>
                                }
                            >
                                <div>
                                    {uploadedFile.fileName}
                                </div>
                            </OverlayTrigger>

                        </Card.Header>
                        <Card.Body className="p-0 m-0">
                            <Jumbotron className="m-0 text-center">
                                <a href={API.url(`fs/${uploadedFile._id}`)} rel="noopener noreferrer" target="_blank" className="btn btn-outline-secondary">
                                    View File <FontAwesomeIcon icon={faFileAlt} />
                                </a>
                            </Jumbotron>
                        </Card.Body>
                    </Card>
                    :
                    <React.Fragment>
                        <InputGroup onClick={() => openFileDialog()}>
                            <Form.Control type="text" readOnly placeholder={placeholder} className={`border-${(required || error) ? 'danger' : 'secondary'}`} style={{ backgroundColor: "transparent" }} isInvalid={(required || error)} />
                            <InputGroup.Append>
                                <Button variant={`outline-${(required || error) ? 'danger' : 'secondary'}`}>{title}</Button>
                            </InputGroup.Append>

                            <Form.Control.Feedback className={`${(required || error) ? 'invalid-feedback' : ''}`} type="invalid">
                                {
                                    error ?
                                        validExtenstion ?
                                            'Invalid file. Only .doc, .docx, .pdf, .xls, and .xlsx are allowed'
                                            :
                                            validSize ?
                                                `You can upload max ${allowedSize}MB file.`
                                                :
                                                'Required'
                                        :
                                        required && 'Required'

                                }
                            </Form.Control.Feedback>
                        </InputGroup>
                        <div className="text-secondary">*Allowed : .doc, .docx, .pdf, .xls, and .xlsx</div>
                    </React.Fragment>


        }
        <input type="file" style={{ display: "none" }} onChange={(e) => handleFileOnChange(e)} accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword" name="image" id={`idfile-${action}`} />
    </Form.Group>
}

FileUpload.defaultProps = {
    action: `default`,
    title: 'Browse file',
    placeholder: "Choose file",
    required: false,
    hasData: undefined,
    reset: undefined
}

FileUpload.propTypes = {
    type: string.isRequired,
    required: bool,
    hasData: func,
    reset: func
}


export default FileUpload;