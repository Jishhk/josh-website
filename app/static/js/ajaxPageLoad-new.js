$(document).ready(function(){	  //executed after the page has loaded
    pageData = {content: $('#content').html(), 
                title: document.title};
    pathname = window.location.pathname;
    
    window.history.replaceState(pageData, pathname, pathname);

	$('#nav a').click(function () {	
		loadPage(this.href);
        return false;
    });
    
    window.onpopstate = function(event) {
        displayPage(event.state);
    }
});


function loadPage(url){	
    host = 'http://' + window.location.host;
    path = url.substr(host.length);
	url = '/ajax' + path;	
    
    
	$.ajax({	
		type: "POST",
		url: url,	
		
		success: function(return_data){
            var data = JSON.parse(return_data);
            if(data["valid"] != 0)	//if no errors
			{
                displayPage(data);
                
                window.history.pushState(data, path, path);

			}
		}

	});

}

function displayPage(data){
    document.title = data["title"] + " | Josh HK";
    $('#content').animate({ opacity: 0.0, marginTop: '200px' }, 1000, function(){
                                $('#content').html(data["content"]).animate({opacity: 1.0, marginTop:'5px'}, 600);
                            });

}