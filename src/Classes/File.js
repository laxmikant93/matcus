class Files {
    
    constructor(){
        this.file = {
            allowedType:this.defaultAllowedFiles(),
            uploadSizeLimit:300, // in MB's
            isFile:false
        }
    }

    extentionFromType(type){
        return type.split('/')[1];
    }

    getExtensionFromName(name){
        let fileExtension = name.substring(name.lastIndexOf('.')+1);
        return fileExtension;
    }

    getCalculatedSize(sizeinbytes, sizeType='MB'){

        switch (sizeType) {
            case 'GB':
                return (sizeinbytes / 1073741824).toFixed(2);
            default:
                return (sizeinbytes / 1048576).toFixed(2);
                
        }
    }


    getAllowedFileType(){
        return this.file.allowedType;
    }

    isFileValid(extention){
        return this.file.allowedType.indexOf(extention)>-1?true:false;
    }

    isFileSizeValid(fileSizeToValid){
        return this.file.uploadSizeLimit > this.getCalculatedSize(fileSizeToValid);
    }

    isFileValidToUpload(name){
        name = name.toLowerCase();
        return this.isFileValid(this.getExtensionFromName(name));
    }

    setAllowedFileExtension(extraTypes) {
        
        if(typeof extraTypes === "object") {
            
            this.file.allowedType = [
                //...this.file.allowedType,
                ...extraTypes
            ];
            
        }

    }

    setFileSizeToUpload(allowFileSize){
        this.file.uploadSizeLimit = allowFileSize
    }

    defaultAllowedFiles = () => {
        return [
            'jpg',
            'jpeg',
            'png',
            'pdf',
            'mp4'
        ]
    }

    existOnServer(serverPath){
        
        return true;
        // const   xhrFile = new XMLHttpRequest();
        //         xhrFile.open('HEAD', serverPath, false);
        //         xhrFile.send();
        //         // While request is taking mare than 2 seconds then it should be aborted with and return false to respective request
        //         setTimeout(()=>{
        //             xhrFile.abort();
        //             return false;
        //         },2000)
        //         return xhrFile.status===404?false:true
    }

    isValidExtension = imageFile => {
        if (!imageFile.match(/\.(jpg|jpeg|png)$/) || imageFile.match(/\.[0-9a-z]+\.(jpg|jpeg|png)$/)) {
            return false;
        }
        return true;
    };


}

export default new Files();