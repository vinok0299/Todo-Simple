function makeCompleted(element){
    let parent = element.parentNode;
    let flag = localStorage.getItem('completed');
    flag = flag.split(',');
    
    
    if(element.checked) {
        
        flag[parent.getAttribute('data-index')] = "1";
    }
    else{
        
        flag[parent.getAttribute('data-index')] = "0";
    }
    localStorage.setItem('completed', flag.join(','))
    update();
}

function update(){
    
    var task = document.getElementById('tasks');

    var c = localStorage.getItem("tasks");
    let final = '';
    let status = localStorage.getItem('completed');

    if(c){
        var previous = c.split(',');
        let b = status.split(',');
        previous.forEach(function(value, index){
            
            if(value)
                if(b[index] === "0"){
                    final = final + `<li data-task=${value} data-index=${index}><input type="checkbox" onClick="makeCompleted(this)" >` + value + '<span class="delete" onClick="remove(this)"><img src="./delete-16.png" /></span></li>';
                }
                else
                final = final + `<li data-task=${value} data-index=${index}  style="text-decoration:line-through"><input type="checkbox" onClick="makeCompleted(this)" checked="true">` + value + '<span class="delete" onClick="remove(this)" ><img src="./delete-16.png" /></span></li>';
            
        })
        
    }
    task.innerHTML = '<ul style="list-style-type:none" >' + final + '</ul>';
    
}

function resetItems(){
    localStorage.removeItem("tasks");
    localStorage.removeItem('completed');
    update();
}
function addItem(){
    var text = document.getElementById('itemAdd').value;
    document.getElementById('itemAdd').value = '';
    if(text.length>1){
        var temp = localStorage.getItem("tasks");
        if(temp){
            temp = temp +','+text;
            
        } else{
            temp = text;
        }
        let previous = localStorage.getItem('completed');
        let cFlag = [];
        if (previous !=null){
            cFlag = previous.split(",");
            
        }
        cFlag.push("0");

        localStorage.setItem("tasks",temp);
        
        localStorage.setItem('completed',cFlag.join(','));
        update();
    }
    
}

function getEvent(event){
    if(event.keyCode == 13)
        addItem();
}

function remove(element){
    var parent = element.parentNode;
    var tasks = localStorage.getItem('tasks').split(',');
    var remove = parent.dataset.task;
    let index = tasks.indexOf(remove)
    tasks.pop(remove);
    var final = '';
    var c = localStorage.getItem('completed').split(',');

    if(index>-1)
        c.splice(index,1);
    tasks.forEach(function (value) { 
        if(value!=='')
        final += `${value},`;
     })
     localStorage.setItem('tasks', final.slice(0,final.length-1));
     localStorage.setItem('completed',c.join(','));
     update();
}