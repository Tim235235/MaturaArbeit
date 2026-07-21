var req = new XMLHttpRequest();
req.open("GET", "https://easylist.to/easylist/easylist.txt")
req.onload = function(){
    if (req.status == 200) {
        let text = req.responseText;
        const lines = text.split("\n");
        for (let line of lines){
            if (line.startsWith("##"))
            console.log(line);
        }
}
}
req.send()

