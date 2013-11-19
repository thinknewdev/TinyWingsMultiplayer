ig.module(
    'plugins.facebook'
)
.defines(function(){

ig.Facebook = {
    appId: null,
    callback: null,
    session: null,
    me: null,
    cache: {}
};

ig.Facebook.Init = function( appId, appURL, perms, callback ) {
    ig.Facebook.appId = appId;
    ig.Facebook.appURL = appURL;
    ig.Facebook.callback = callback;
    
    
    // Not running in an IFrame on Facebook? Forward to it!
    if( !window.top || window.top == window ) {
       // window.top.location = ig.Facebook.appURL;
        //return;
    }

    ig.log("Starting Facebook API");
    
    // This function will be called as soon as the FB API is loaded
    window.fbAsyncInit = function() {
        ig.log("Facebook Init");
        FB.init({
            appId: ig.Facebook.appId,
            status: true, // check login status
            cookie: true,
            xfbml: true  // parse XFBML
        });
        
        if( window.opera ) {
            FB.XD._transport = "postmessage";
            FB.XD.PostMessage.init();
        }
        
        // Make sure the User is logged in and we have all needed permissions.
        // If not, forward to the login/request permission dialog on FB
        /*
        FB.getLoginStatus(function(response) { 
            ig.log("Check Login");           
            if( response.session ) {                
                ig.Facebook.session = response.session;
                
                FB.Canvas.setSize();

                
                if( ig.Facebook.callback ) {
                    ig.Facebook.callback();
                }

                ig.log("Logged In");
            }
            else {
                ig.log("Forwarding On");
                window.top.location =
                    'https://www.facebook.com/dialog/oauth?client_id=' + ig.Facebook.appId +
                    '&redirect_uri=' + ig.Facebook.appURL +
                    '&scope=' + perms;
            }
        });
        */
        FB.login(function(response) {
                if (window.opera) {
                    FB.XD._transport="postmessage";
                    FB.XD.PostMessage.init();
                }
                
                if (response.authResponse) {
                   ig.log(response);
                   // window.location = ig.Facebook.appURL;
                   ig.Facebook.callback();
                }
            }, {scope:'read_stream,publish_stream'});
    };
    
    // Load the FB API
    var div = ig.$new('div');
    div.id = 'fb-root';
    document.body.appendChild(div);
    
    var script = ig.$new('script');
    script.type = 'text/javascript';
    script.src = 'http://connect.facebook.net/en_US/all.js';
    script.async = true;
    ig.$('#fb-root').appendChild(script);
};

// Simple Caching "Proxy" for FB.api()
ig.Facebook.CachedAPI = function( req, callback ) {
    if( ig.Facebook.cache[req] ) {
        callback( ig.Facebook.cache[req] );
    }
    else {
        FB.api( req, function( response ) {
            ig.Facebook.cache[req] = response;
            callback( response );
        });
    }
};

});