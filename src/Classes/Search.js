class Search {
    /**
     * @param idOrClassName : ID with #example or .example
     * @param searchText : test eneterd by user
     */

    ForUl = (idOrClassName, searchText) =>{
        let resultItem = document.getElementById('chat-connected-ins-search-result')
        
        if(searchText.trim()!==""){
            resultItem.style.display = ""
        }
        else{
            resultItem.style.display = "none"
        }
        let searchItemCounter = 0;
        document.querySelectorAll(`${idOrClassName} > li`).forEach((li, index)=>{
            
            if(index>0){
                if(li.textContent.toLowerCase().indexOf(searchText.toLowerCase())>=0){
                    li.style.display="";
                    searchItemCounter++;
                }
                else{
                    li.style.display="none";
                }
            }
            
            resultItem.textContent = `${searchItemCounter>0?searchItemCounter+' result':"No result"}`
            

        })
    }


    filterChatUsers = ({idorclass, searchText}) => {
        let resultItem = document.getElementById('chat-connected-ins-search-result')
        if(searchText.trim()!==""){
            resultItem.style.display = ""
        }
        else{
            resultItem.style.display = "none"
        }
        let searchItemCounter = 0;
        document.querySelectorAll(`${idorclass} > a`).forEach((item, index)=>{
            if(index>=0){
                if(item.textContent.toLowerCase().indexOf(searchText.toLowerCase())>=0){
                    item.style.display="";
                    searchItemCounter++;
                }
                else{
                    item.style.display="none";
                }
            }
            
            resultItem.textContent = `${searchItemCounter>0?searchItemCounter+' result':"No result"}`
            

        })
    }
}

export default new Search()