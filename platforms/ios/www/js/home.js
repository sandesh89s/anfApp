/**
 * Created by sandesh on 12/25/14.
 */
$(document).ready(function() {
    var db ;
    //document.addEventListener("deviceready",onDeviceReady,false);
    onDeviceReady();

    function onDeviceReady(){
        console.log('device ready');
        db = window.openDatabase("Database","1.0","My DB",2*1024*1024);
        db.transaction(createDB,errorDB,successDB);
        console.log('created db');
        db.transaction(insertDB,errorDB);
        db.transaction(selectDB,errorDB);
    }

    function createDB(tx){
        tx.executeSql('DROP TABLE IF EXISTS EXERCISES');
        tx.executeSql('CREATE TABLE IF NOT EXISTS EXERCISES(id unique,exercise, exercise_item ,tag ,image )');
       // tx.executeSql("select * from EXERCISES",[],renderList,errorDB);
    }

    function insertDB(tx){
        var sql = 'INSERT INTO EXERCISES(exercise,exercise_item,tag) VALUES(?,?,?)';
        tx.executeSql(sql,["chest","chest press","tap"],successDB,errorDB);
        console.log('inserted into DB');
    }

    function selectDB(tx){
        tx.executeSql("select * from EXERCISES",[],renderList,errorDB);
    }

    function buildList(tx){

        tx.executeSql("select * from EXERCISES",[],renderExerciseList,errorDB);

    }

    function renderExerciseList(){
        var len = results.rows.length;
        var div = '';
        for(var i=0; i<len;i++){
            console.log(results.rows.item(i).exercise_item);
            div += "<li><a href=''>"+
            "<img src=''>"+
            "<h2>"+results.rows.item(i).exercise+"</h2>"+
            "<p>Enter to see the list of exercises</p></a></li>";
        }
        $('#listView').html(div);
        $('#listView').listview('refresh');
    }

    function errorDB(err){
        console.log("error: "+ err.code);
    }

    function successDB(){
        console.log("success");
    }

    function renderList(tx,results){
        console.log('render list');
        var len = results.rows.length;
        console.log('len: '+len);
        for(var i=0; i<len;i++){
            console.log(results.rows.item(i).exercise);
        }
    }

    //check if hash exists and that it is not for the home screen
    if (window.location.hash != '' && window.location.hash != '#page1') {

        //set whatever content you want to put into the new page
        var content_string = 'Some ' + window.location.hash + ' text...<br><br><a href="#page1">go to home screen</a>';

        //append the new page onto the end of the body
        $('#page_body').append('<div data-role="page" id="' + window.location.hash.replace('#','') + '"><div data-role="header" data-position="fixed"  data-add-back-btn="true">Chest</div><div data-role="content">' + content_string + '</div></div>');

        //add a link on the home screen to navaigate to the new page (just so nav isn't broken if user goes from new page to home screen)
        $('#page1 div[data-role="content"]').append('<br><br><a href="#' + window.location.hash.replace('#','') + '">go to ' + window.location.hash.replace('#','') + ' page</a>');
    }
});
function create_page(page_id,part) {


    $("#"+page_id).remove();
    //set whatever content you want to put into the new page
    var string = 'FOO BAR page...<br><br><a href="#page1">return to home screen</a>';
    var string1 = '';


    //if(part.match('chest')) {
    //    string1 = ' <ul data-role="listview" data-inset="true">' +
    //    '<li><a href="" data-transition="slide">' +
    //    ' <img src="">' +
    //    ' <h2>Chest Press</h2>' +
    //    ' <p>Enter to see the description</p></a>' +
    //    ' </li></ul>';
    //}else if(part.match('shoulder')) {
    //    string1 = ' <ul data-role="listview" data-inset="true">' +
    //    '<li><a href="" data-transition="slide">' +
    //    ' <img src="">' +
    //    ' <h2>Shoulder Press</h2>' +
    //    ' <p>Enter to see the description</p></a>' +
    //    ' </li></ul>';
    //}else if(part.match('biceps')) {
    //    string1 = ' <ul data-role="listview" data-inset="true">' +
    //    '<li><a href="" data-transition="slide">' +
    //    ' <img src="">' +
    //    ' <h2>Arm Curl</h2>' +
    //    ' <p>Enter to see the description</p></a>' +
    //    ' </li></ul>';
    //}else if(part.match('triceps')) {
    //    string1 = ' <ul data-role="listview" data-inset="true">' +
    //    '<li><a href="" data-transition="slide">' +
    //    ' <img src="">' +
    //    ' <h2>Pull down</h2>' +
    //    ' <p>Enter to see the description</p></a>' +
    //    ' </li></ul>';
    //}else if(part.match('back')) {
    //    string1 = ' <ul data-role="listview" data-inset="true">' +
    //    '<li><a href="" data-transition="slide">' +
    //    ' <img src="">' +
    //    ' <h2>Extention</h2>' +
    //    ' <p>Enter to see the description</p></a>' +
    //    ' </li></ul>';
    //}else if(part.match('legs')) {
    //    string1 = ' <ul data-role="listview" data-inset="true">' +
    //    '<li><a href="" data-transition="slide">' +
    //    ' <img src="">' +
    //    ' <h2>Leg </h2>' +
    //    ' <p>Enter to see the description</p></a>' +
    //    ' </li></ul>';
    //}
    //append the new page onto the end of the body

    function buildList(tx){

        tx.executeSql("select * from EXERCISES",[],renderExerciseList,errorDB);

    }


    function renderExerciseList(tx,results){
        var len = results.rows.length;
        var div = '';
        for(var i=0; i<len;i++){
            console.log(results.rows.item(i).exercise_item);
            div += "<li><a href=''>"+
            "<img src=''>"+
            "<h2>"+results.rows.item(i).exercise_item+"</h2>"+
            "<p>Enter to see the list of exercises</p></a></li>";
        }
        $('#listView'+page_id).html(div);
    }

    function errorDB(err){
        console.log("error: "+ err.code);
    }

    function successDB(){
        console.log("success");
    }

    $('#page_body').append('<div data-role="page" id="' + page_id + '"><div data-role="header" data-position="fixed" data-add-back-btn="true"><h1>'+part+'</h1></div><div data-role="content"><ul  data-role="listview" data-inset="true" id="listView' + page_id + '"></ul></div></div>');
    var db;
    db = window.openDatabase("Database","1.0","My DB",2*1024*1024);
    db.transaction(buildList,errorDB,successDB);
    //initialize the new page
    $.mobile.initializePage();

    //navigate to the new page
    $.mobile.changePage("#" + page_id,{
        transition: "slide"
    });
    $('#listView'+page_id).listview('refresh');
    //add a link on the home screen to navaigate to the new page (just so nav isn't broken if user goes from new page to home screen)
    $('#page1 div[data-role="content"]').append('<br><br><a href="#' + page_id + '">go to ' + page_id + ' page</a>');

    //refresh the home screen so new link is given proper css
    $('#page1 div[data-role="content"]').page();
}