export default function FormatText({children,text}) {
    
    function formatText(){
        return text?text.replace(/\n/g, '<br>'):'NA';
    }
    
    return children({
        formatedText:formatText()
    })
}