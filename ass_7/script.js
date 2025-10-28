function AddTask(){
    //creating new task
    let ele=document.createElement("div");
    ele.innerHTML=`<fieldset>
    <label >title:</label>
    <textarea class="title"></textarea><br>
    <label for="description">description:</label>
    <textarea class="description"></textarea><br>
    <button class="markComplete">Mark as Complete</button>
    <button class="delete">Delete</button>
    <button class="edit">Edit</button>
    </fieldset>`
    ele.classList.add("task");

    //adding new task to page
    let ref=document.getElementById("add");
    document.body.insertBefore(ele,ref);

    //when mark as complete button is pressed.
    let y=document.querySelectorAll(".markComplete");
    for(let el of y){
        el.addEventListener("click",function(event){
            //adding class "completed" to title and description
            let fieldset=event.target.closest("fieldset");
            const title=fieldset.querySelector(".title");
            const description=fieldset.querySelector(".description");
            title.classList.toggle("completed");
            description.classList.toggle("completed");

            //changing the button to "markasincomplete"
            if(title.classList.contains("completed")){
                el.textContent="Mark as Incomplete";
            }else{
                el.textContent="Mark as Complete";
            }
        })
    }

    //when delete button is pressed
    let z=document.querySelectorAll(".delete")
    for(let el of z){
        el.addEventListener("click",function(event){
            let taskdiv=event.target.closest("div");
            if(taskdiv){
                taskdiv.remove();
            }
        });
    }

    //when edit button is pressed
    let a=document.querySelectorAll(".edit");
    for(let el of a){
        el.addEventListener("click",function(event){
            let fieldset=event.target.closest("fieldset");
            const title=fieldset.querySelector(".title");
            const description=fieldset.querySelector(".description");
            console.log(description);
            if(event.target.textContent=="Edit"){
                title.removeAttribute("readonly");
                description.removeAttribute("readonly");
                title.focus();
                event.target.textContent="Save";
            }else if(event.target.textContent=="Save"){
                title.setAttribute("readonly",true);
                description.setAtrribute("readonly",true);
                event.target.textContent="Edit";
            }
        });
    }
}

// adding event listener when button "add" is clicked
let x=document.getElementById("add");
x.addEventListener("click",AddTask);

