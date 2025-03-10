var opis = "Steven Paul Jobs - jeden z trzech założycieli, były prezes i przewodniczący rady nadzorczej Apple Inc."

function checkDesc(description) {
    if(description.length > 26) {
        let newdesc = "";

        for(let i=0;i<27;i++)
        {
            newdesc += description[i];
        }

        newdesc+="...";
        return newdesc;
    }
}

console.log(checkDesc(opis));