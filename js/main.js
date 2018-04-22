function makeCompleted(element){
    let parent = element.parentNode;
    if(element.checked) {
        parent.style.textDecoration = 'line-through';
    }
    else{
        parent.style.textDecoration = 'none';
    }
}

function update(){
    var task = document.getElementById('tasks');

    var c = localStorage.getItem("tasks");
    let final = '';
    if(c){
        var previous = c.split(',');
        previous.forEach(function(value){
            if(value)
            final = final + `<li data-task=${value} ><input type="checkbox" onClick="makeCompleted(this)">` + value + '<span class="delete" onClick="remove(this)"><img src="./delete-16.png" /></span></li>';
        })
        
    }
    task.innerHTML = '<ul style="list-style-type:none" >' + final + '</ul>';
    
}

function resetItems(){
    localStorage.removeItem("tasks");
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
        localStorage.setItem("tasks",temp);
        
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
    tasks.splice(tasks.indexOf(remove),1);
    console.log(tasks);
    var final = '';
    tasks.forEach(function (value) { 
        final += `,${value}`;
     })
     localStorage.setItem('tasks', final);
     update();
}