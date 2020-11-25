var datanum = 0;

function click(event){
    if (event.key == "ArrowDown"){
        if (id >= datanum-1) return 0
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

const getCSV = new Promise((resolve,reject) => {
    var req = new XMLHttpRequest();
    req.open("get", "./data.csv", true);
    req.overrideMimeType('text/plain; charset=Shift_JIS');
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
        console.log(i)
        textbox += '<div class="items">'
            + '<div class="item" id="item-'+(i*2)+'"><span class="english" id="test">' + result[i][0] + '</span></div>'
            + '<div class="item" id="item-'+(i*2+1)+'"><span class="japanese">' + result[i][1] + '</span></div>'
            + '</div>'
    }

    document.getElementById("textbox").innerHTML = textbox
}

window.onload = function(){
    getCSV.then((res) => {
        if(res) document.getElementById("item-0").style.visibility = "visible";
    })
}

let id = 0;
document.onkeydown = click;
