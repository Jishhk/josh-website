$(document).ready(function(){	//executed after the page has loaded
	
	var host = 'http://' + window.location.host;
	var hash = window.location.hash;
	if (!hash){
		pathname = window.location.pathname;
        if (pathname[1] != '_'){
            window.location.replace(host + '/#' + pathname);
        };
	} else {
		checkURL();	//check if the URL has a reference to a page and load it
	}

	$('#nav a').attr('href', function(){
		url = this.href.substr(host.length);
		this.href = '#' + url;
		
	}).click(function (e){	//traverse through all our navigation links..
			checkURL(this.hash);	//.. and assign them a new onclick event, using their own hash as a parameter 
	});

	setInterval("checkURL()",250);	//check for a change in the URL every 250 ms to detect if the history buttons have been used

});

var lasturl="";	//here we store the current URL hash


function checkURL(hash)
{
	if(!hash) hash=window.location.hash;	//if no parameter is provided, use the hash value from the current address

	if(hash != lasturl)	// if the hash value has changed
	{
		lasturl=hash;	//update the current hash
		loadPage(hash);	// and load the new page
	}
}

function loadPage(url)	//the function that loads pages via AJAX
{
	url=url.replace('#','ajax');	//change # to ajax for the post request

	$.ajax({	//create an ajax request to load_page.php
		type: "POST",
		url: url,	
		//dataType: "json",	//expect json to be returned
		success: function(return_data){
			var data = JSON.parse(return_data);
			if(data["valid"] != 0)	//if no errors
			{
				document.title = data["title"] + " | Josh HK";
				$('#content').animate({ opacity: 0.0, marginTop: '200px' }, 1000, function(){
									    	$('#content').html(data["content"]).animate({opacity: 1.0, marginTop:'5px'}, 600);
									    });
			}
		}

	});

}