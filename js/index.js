var bookmarkName=document.getElementById("bookmarkName");
var siteUrl=document.getElementById("bookmarkUrl");
var bookmarks=[];

if(localStorage.getItem("bookmark")){
    bookmarks=JSON.parse(localStorage.getItem("bookmark"));
}
display();

function addBookmark(){
    if(bookmarkNameValidation() && siteUrlValidation()){
        var bookmark={
            name:bookmarkName.value,
            url:siteUrl.value,
        };
        bookmarks.push(bookmark);
        localStorage.setItem("bookmark", JSON.stringify(bookmarks) );
        console.log( bookmarks);
        display();
        clear();
    }
}

function clear(){
    bookmarkName.value=null;
    siteUrl.value=null;
}

function display(){
    var cartona='';
    for(var i=0;i<bookmarks.length;i++){
        cartona+=`
        <tr>
            <td>${i+1}</td>
            <td>${bookmarks[i].name}</td>
            <td><button class="btn btn-success"><i class="fa-solid fa-eye pe-2 me-1"></i>Visit</button></td>
            <td><button class="btn btn-danger" onclick={deleteBookmark(${i})}><i class="fa-solid fa-trash-can me-1"></i>Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableContent").innerHTML=cartona;
}

function deleteBookmark(index){
    bookmarks.splice(index,1);
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
    display();
}

function bookmarkNameValidation(){
    var regex=/^[A-Z][a-z]{3,15}$/;
    var text=bookmarkName.value;
    
    if(regex.test(text)){
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
        document.getElementById("nameMsg").classList.add("d-none"); 
        return true;                           
    }else{
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        document.getElementById("nameMsg").classList.remove("d-none");
        return false;
    }
}

function siteUrlValidation(){
    var regex=/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/
    var text=siteUrl.value;
    
    if(regex.test(text)){
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
        document.getElementById("urlMsg").classList.add("d-none");
        return true;
    }else{
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
        document.getElementById("urlMsg").classList.remove("d-none");
        return false;
    }
}