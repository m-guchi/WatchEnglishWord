function click(event){
    if (event.key == "ArrowDown"){
        if(id >= 3) return 0
        document.getElementById("item-" + id).style.visibility = "hidden";
        id += 1;
    } else if (event.key == "ArrowUp") {
        if (id <= 0) return 0
        document.getElementById("item-" + id).style.visibility = "hidden";
        id -= 1;
    }
    console.log("item-"+id);
    document.getElementById("item-" + id).style.visibility = "visible";
}

function getCsvData(dataPath) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', (event) => {
        const response = event.target.responseText;
        outputElement.innerHTML = response;
    });
    request.open('GET', dataPath, true);
    request.send();
}

window.onload = function(){
    const outputElement = document.getElementById('output_csv');
    getCsvData('./data.csv');
    document.getElementById("item-0").style.visibility = "visible";
}

let id = 0;
document.onkeydown = click;
