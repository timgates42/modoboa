window.addEvent("domready", function() {
    sqbsubmit = function(obj, dest, id, callback) {
        obj.set('send', {
            onSuccess: function(responseText) {
                response = JSON.decode(responseText);
                if (response.status == "ko") {
                    $(dest).set("html", response.content);
                    $(id).addEvent("submit", callback);
                } else {
                    parent.SqueezeBox.close();
                    parent.location.href = response.url;
                }
            }
        });
        obj.send();
    }

    generic_submit = function(obj, event, id, callback) {
        event.stop();
        sqbsubmit(obj, "content", id, callback);
    }
    domain_submit = function(event) { 
        generic_submit(this, event, "domform", domain_submit); 
    }
    mailbox_submit = function(event) { 
        generic_submit(this, event, "mboxform", mailbox_submit); 
    }
    alias_submit = function(event) { 
        generic_submit(this, event, "aliasform", alias_submit); 
    }

    if ($("domform"))
        $("domform").addEvent("submit", domain_submit);

    if ($("mboxform"))
        $("mboxform").addEvent("submit", mailbox_submit);

    if ($("aliasform"))
        $("aliasform").addEvent("submit", alias_submit);

    if ($("permform")) {
        $("id_domain").addEvent("change", function(event) {

        });
    }
});
