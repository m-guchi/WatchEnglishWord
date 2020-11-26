var datanum = 0;

function click(event){
    if (event.key == "ArrowDown"){
        if (id >= datanum-1) return 0
        document.getElementById("item-" + id).classList.remove("show");
        id += 1;
    } else if (event.key == "ArrowUp") {
        if (id <= 0) return 0
        document.getElementById("item-" + id).classList.remove("show");
        id -= 1;
    }
    console.log("item-"+id);
    document.getElementById("item-" + id).classList.add("show");
}

const getCSV = new Promise((resolve,reject) => {
    var req = new XMLHttpRequest();
    req.open("get", "./data.csv", true);
    req.overrideMimeType('text/plain; charset=UTF');
    req.send(null); 
    req.onload = function () {
        convertCSVtoArray(req.responseText);
        resolve(true)
    }
})

function convertCSVtoArray(str) { 
    var result = [];
    var tmp = str.split("\n");
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }
    
    datanum = result.length * 2
    
    var textbox = ''
    for(var i=0;i<result.length;i++) {
        if (i == 0 || i == 10) textbox += '<div class="column">'
        textbox += '<div class="items">'
            + '<div class="item" id="item-' + (i*2) + '">' + result[i][0] + '</div>'
            + '<div class="item" id="item-' + (i*2+1) + '">' + result[i][1] + '</div>'
            + '</div>'
        if (i == 9 || i == 19) textbox += '</div>'
    }

    document.getElementById("textbox").innerHTML = textbox
}

window.onload = function(){
    getCSV.then((res) => {
        if (res) document.getElementById("item-0").classList.add("show");
    })
}

let id = 0;
document.onkeydown = click;
