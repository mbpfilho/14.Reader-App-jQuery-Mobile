$(function(){
    //declare variables
    var myarray;
    var inputlength;
    var reading=false;
    var counter;
    var action;
    var frequency=200;

    //on page load hide elements we don't need, leave onlöy text area and start button
    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#controls").hide();
    $("#result").hide();
    $("#error").hide();

    //click on start reading
    $("#start").click(function(){
        //get text and split it to words insidde an array
        myarray=$("#userInput").val().split(/\s+/); //\s matches spaces, tabs, new lines, etc and + menas one or more
        //get the number of words
        inputlength=myarray.length;

        if(inputlength>1){ //there is enough input
            //move to reading mode
            reading=true;

            //hide start/error/userInput, show new/pause/controls
            $("#start").hide();
            $("#error").hide();
            $("#userInput").hide();
            $("#new").show();
            $("#pause").show();
            $("#controls").show();

            //set progress slider max
            $("#progressslider").attr("max",inputlength-1);

            //start the counter at zero
            counter=0;

            //show reading box with the first word
            $("#result").show();
            $("#result").text(myarray[counter]);

            //start reading from the first word
            action=setInterval(read,frequency);

        }else{ //not enough input
            $("#error").show();
        }
    })

    //click on new
    $("#new").click(function(){
        //reload page
        location.reload();
    })

    //click on pause
    $("#pause").click(function(){
        //stop reading and switch to non reading mode
        clearInterval(action);
        reading=false;

        //hide pause and show resume
        $("#pause").hide();
        $("#resume").show();
    })

    //click on resume
    $("#resume").click(function(){
        //start reading and switch to reading mode
        action=setInterval(read,frequency);
        reading=true;

        //hide pause and show resume
        $("#resume").hide();
        $("#pause").show();
    });

    //change font size slider
    $("#fontsizeslider").on("slidestop",function(event,ui){
        //refresh the slider
        $("#fontsizeslider").slider("refresh");

        //get value of slider
        var slidervalue=parseInt($("#fontsizeslider").val());

        //change css
        $("#result").css("fontSize",slidervalue);
        $("#result").css("height",slidervalue*1.5);

        //change text on screen
        $("#fontsize").text(slidervalue);
    });

    //change speed slider
    $("#speedslider").on("slidestop",function(event,ui){
        //refresh the slider
        $("#speedslider").slider("refresh");

        //get value of slider
        var slidervalue=parseInt($("#speedslider").val());

        //change text on screen
        $("#speed").text(slidervalue);

        //stop reading
        clearInterval(action); 

        //change frequency
        frequency=60000/slidervalue;

        //resume reading if we are in reading mode
        if(reading){
            action=setInterval(read,frequency);            
        }

    });

    //progress slider
    $("#progressslider").on("slidestop",function(event,ui){
        //refresh the slider
        $("#progressslider").slider("refresh");

        //get value of slider
        var slidervalue=parseInt($("#progressslider").val());

        //stop reading
        clearInterval(action); 

        //change counter
        counter=slidervalue;

        //change the word
        $("#result").text(myarray[counter]);

        //change text of percentage on screen
        $("#percentage").text(Math.floor(counter/(inputlength-1)*100));

        //resume reading if we are in reading mode
        if(reading){
            action=setInterval(read,frequency);            
        }

    });

    //functions
    function read(){
        if(counter==inputlength-1){//last word
            clearInterval(action);
            reading=false; //move to non reading mode
            $("#pause").hide();
        }else{
            //counter goes up by one
            counter++;

            //get word
            $("#result").text(myarray[counter]);

            //change progress slider value and refresh
            $("#progressslider").val(counter).slider("refresh");

            //change text of percentage on screen
            $("#percentage").text(Math.floor(counter/(inputlength-1)*100));
            
        }
    }

})