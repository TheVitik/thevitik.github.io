//localStorage.clear();
class User{

    constructor(name,plan,date) {
        this.name = name;
        this.plan = plan;
        this.date = date;
    }
    
}
function getNotes(){
    var data = localStorage.getItem("notes");
    if(data==null){
        return 0;
    }
    else{
        var array = JSON.parse(data);
        return array.length
    }
}
function getTodo(){
    var todo = localStorage.getItem("todo");
    var done = localStorage.getItem("done");
    var count = 0;
    if(todo==null && done==null){
        return count;
    }
    if(todo!=null){
        var tdArray = JSON.parse(todo);
        count+=tdArray.length;
    }
    if(done!=null){
        var dnArray = JSON.parse(done);
        count+=dnArray.length;
    }
    return count;
}
$(document).ready(function(){
    let user = localStorage.getItem("user");
    if(user!=null){
        let data = JSON.parse(user);
    }
    else{
        let html = `<div class="static"><div><h3>Register</h3><p>Enter your name</p><input type="text" id="username" placeholder="Viktor" maxlength=16><p>* You will get a premium plan for free</p><button class="btn btn-primary" id="register">Continue</button></div></div>`;
        $("body").html(html)
    }
    $("#register").click(function(){
        if($("#username").val()==""){
            $("#username").addClass("red-border");
        }
        else{
            let u = new User($("#username").val(),"Premium",Date.now());
            localStorage.setItem("user",JSON.stringify(u));
            window.location.reload();
        }
    });
});
var path = window.location.pathname;
var page = path.split("/").pop();
$("#submit").click(function(){
    let text = $(".note-editable");
    text.addClass("border");
    let name = $("#name");
    let errors = 0;
    if(name.val()==""){
        if(!name.hasClass("is-invalid")){
            name.addClass("is-invalid");
            errors+=1;
        }
    }
    else{
        if(name.hasClass("is-invalid")){
            name.removeClass("is-invalid");
            errors-=1;
        }
    }
    if(text.html()=="<p><br></p>"){
        if(!text.hasClass("border-danger")){
            text.addClass("border-danger");
            errors+=1;
        }
    }
    else{
        if(text.hasClass("border-danger")){
            text.removeClass("border-danger");
            errors-=1;
        }
    }
    if(errors==0){
        if(page=="new.html"){
            if(localStorage.getItem(name.val())==null){
                localStorage.setItem(name.val(), text.html());
                let data = localStorage.getItem("notes");
                let array=[];
                if(data!=null){
                    array=JSON.parse(data);
                }
                var newId = array.length;
                array.push(name.val());
                localStorage.setItem("notes",JSON.stringify(array));
                $('#alert').modal('show');
                
            }
            else{
                name.addClass("is-invalid");
            }
        }
        else if(page=="watch.html"){
            if(localStorage.getItem(name.val())!=null){
                localStorage.setItem(name.val(), text.html());
                $('#alertSaved').modal('show');
                
            }
            else{
                name.addClass("is-invalid");
            }
        }
    }
});
if(page=="notes.html"){
    let data = localStorage.getItem("notes");
    if(data!=null){
        let array = JSON.parse(data);
        for (let i = 0; i < array.length; i++) {
            let text = localStorage.getItem(array[i]);
            let div = document.createElement("div");
            $(div).html(text);
            let img = $(div).find("img");
            let content = div.innerText;
            if(content.length>64){
                content = content.substring(0,64);
                content+="...";
            }
            let html = `<a class="slider-link item col-lg" href="watch.html?id=${i+1}"><div class="note"><img class="banner"></img><h4>${array[i]}</h4><p>${content}</p></div></a>`
            /*if($(img).attr("src")!=undefined){
                let banner = $(html).find("img");
                $(banner).attr("src",$(img).attr("src"));
            }*/
            html+="</div>";
            $(html).appendTo("#notes");
            var el = $( '<div></div>' );
            el.html(html);
            if($('img', el).attr("src")!=undefined){
                console.log($(`#note${i}>.banner`).html("SDSD"));
                $(`#note${i}>.banner`).attr("src",$('img', el).attr("src"));
            }
         }
    }
    else{
        $(".responsive").html("<h4>You have no notes.</h4>");
    }
}
else if(page=="editor.html"){
    let data = localStorage.getItem("notes");
    let getUser = localStorage.getItem("user");
    let user = JSON.parse(getUser);
    var date1 = new Date(user.date);
    var date2 = new Date();
    var time = date2.getTime() - date1.getTime();
    var days = time / (1000 * 3600 * 24);
    $("#userName").html(user.name);
    $("#name").html(user.name);
    $("#plan").html(user.plan);
    console.log(user.plan);
    $("#notesCount").html(getNotes());
    $("#todoCount").html(getTodo());
    $("#daysCount").html(Math.floor(days));
    if(data!=null){
        $(document).ready(function(){
            $(".responsive").owlCarousel({
                items : 2,
           
            });
        });
        let array = JSON.parse(data);
        let len = 0;
        if(array.length>4){
            len=4;
        }
        else{
            len=array.length;
        }
        for (let i = 0; i < len; i++) {
            let text = localStorage.getItem(array[i]);
            let div = document.createElement("div");
            $(div).html(text);
            let img = $(div).find("img");
            let content = div.innerText;
            if(content.length>64){
                content = content.substring(0,64);
                content+="...";
            }
            let html = `<a class="slider-link item" href="watch.html?id=${i+1}"><div class="editor-note" id="note${i}"><h5>${array[i]}</h5><p>${content}</p>`
            if($(img).attr("src")!=undefined){
                html+=`<div class="image"><img src="${$(img).attr("src")}"></div>`
            }
            html+="</div></a>";
            $(html).appendTo("#noteList");
            var el = $( '<div></div>' );
            el.html(html);
            if($('img', el).attr("src")!=undefined){
                console.log($(`#note${i}>.banner`).html("SDSD"));
                $(`#note${i}>.banner`).attr("src",$('img', el).attr("src"));
            }
         }
    }
    else{
        $(".responsive").html("<h4>You have no notes.</h4>");
    }

    let todoList = localStorage.getItem("todo");
    if(todoList!=null){
        array=JSON.parse(todoList);
        let len = 0;
        if(array.length>4){
            len=4;
        }
        else{
            len=array.length;
        }
        for(let i=0;i<len;i++){
            let html = `<a style="text-decoration:none; color:#585858" href="todo.html"><div class="td-block"><span class="number">${i+1}</span><h5>${array[i]}</h5></div></a>`
            $("#todoList").append(html);
        }
    }
    else{
        $("#todoList").append("<h5>Nothing here</h5>");
    }
}
else if(page=="watch.html"){
    $(document).ready(function(){
        let data = localStorage.getItem("notes");
        let array = JSON.parse(localStorage.getItem("notes"));
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
    if(data!=null){        
        if(id>0){
            let text = localStorage.getItem(array[id-1]);
            $(".note-editable").html(text);
            $("#name").val(array[id-1]);
        }
        else{
            window.location.href = "notes.html";
        }
    }
    else{
        window.location.href="new.html";
    }
    $("#delete").click(function(){
        localStorage.removeItem(array[id-1]);
        array.splice(id-1,1);
        if(array.length>0){
            localStorage.setItem("notes",JSON.stringify(array));
        }
        else{
            localStorage.removeItem("notes");
        }
        $('#alertDeleted').modal('show');
    });
    });
}
else if(page=="todo.html"){
    $(document).ready(function(){
        let todoList = localStorage.getItem("todo");
        let doneList = localStorage.getItem("done");
        if(todoList!=null){
            array=JSON.parse(todoList);
            for(let i=0;i<array.length;i++){
                let html = `<div class="td-block">
                <h5 class="card-title">${array[i]}</h5><p class="cl-done" data-id="${i}"><i class="fas fa-check todo-btn text-success"></i></p>
                </div>`
                $("#todoContent").append(html);
            }
            $(".cl-done").click(function(){
                let id = $(this).attr("data-id");
                let todoList = localStorage.getItem("todo");
                let doneList = localStorage.getItem("done");
                if(doneList!=null){
                    done=JSON.parse(doneList);
                }
                else{
                    done=[];
                }
                array=JSON.parse(todoList);
                done.push(array[id]);
                array.splice(id,1);
                localStorage.setItem("done",JSON.stringify(done));
                if(array.length!=0){
                    localStorage.setItem("todo",JSON.stringify(array));
                }
                else{
                    localStorage.removeItem("todo");
                }
                window.location.reload();
            });
        }
        else{
            $("#todoContent").append("<h5>Nothing here</h5>");
        }

        if(doneList!=null){
            array=JSON.parse(doneList);
            for(let i=0;i<array.length;i++){
                let html = `<div class="td-block">
                <h5 class="card-title">${array[i]}</h5><a class="cl-delete" data-id="${i}"><i class="fas fa-times todo-btn text-danger"></i></a>
                </div>`
                $("#doneContent").append(html);
            }
            $(".cl-delete").click(function(){
                let id = $(this).attr("data-id");
                let doneList = localStorage.getItem("done");
                array=JSON.parse(doneList);
                array.splice(id,1);
                if(array.length!=0){
                    localStorage.setItem("done",JSON.stringify(array));
                }
                else{
                    localStorage.removeItem("done");
                }
                window.location.reload();
            });
        }
        else{
            $("#doneContent").append("<h5>Nothing here</h5>");
        }
        
    });
    $("#addItem").click(function(){
        let errors = 0;
        let task = $("#task");
        if(task.val()==""){
            if(!task.hasClass("is-invalid")){
                task.addClass("is-invalid");
                errors+=1;
            }
        }
        else{
            if(task.hasClass("is-invalid")){
                task.removeClass("is-invalid");
                errors-=1;
            }
        }
        if(errors==0){
            /*let html = `<div class="td-block">
            <h5 class="card-title">${task.val()}</h5><i class="fas fa-check todo-btn text-success"></i>
          </div>`
            $("#todoContent").append(html);*/
            let todoList = localStorage.getItem("todo");
            if(todoList!=null){
                array=JSON.parse(todoList);
                array.push(task.val());
                localStorage.setItem("todo",JSON.stringify(array));
            }
            else{
                let array=[];
                array.push(task.val());
                localStorage.setItem("todo",JSON.stringify(array));
            }
            window.location.reload();
            //task.val("");
        }
    });
}