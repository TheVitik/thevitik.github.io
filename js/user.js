class User{

    constructor(name,plan,date) {
        this.name = name;
        this.plan = plan;
        this.date = date;
    }

    static getNotes(){
        var data = localStorage.getItem("notes");
        if(data==null){
            return 0;
        }
        else{
            var array = JSON.parse(data);
            return array.length
        }
    }
    static getTodo(){
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
    static getDays(){
        var t2 = Date.getTime();
        var t1 = this.date.getTime();
        return Math.floor((t2-t1)/(24*3600*1000));
    }
}