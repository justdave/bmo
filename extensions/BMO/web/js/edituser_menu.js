/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is "Incompatible With Secondary Licenses", as
 * defined by the Mozilla Public License, v. 2.0. */

function show_usermenu(id, email, name, show_edit, hide_profile) {
    var items = [
        {
            name: "Activity",
            callback: function () {
                var href = `${BUGZILLA.config.basepath}page.cgi?` +
                           `id=user_activity.html&action=run&from=-14d&who=${encodeURIComponent(email)}`;
                window.open(href, "_blank");
            }
        },
        {
            name: "Mail",
            callback: function () {
                var href = "mailto:" + encodeURIComponent(email);
                window.open(href, "_blank");
            }
        }
    ];
    if (name) {
        items.unshift({
            name: "Copy Name",
            callback: function () {
                $('#clip-container').show();
                $('#clip').val(name).select();
                $('#floating-message-text')
                  .text(document.execCommand('copy') ? 'Name has been copied' : 'Could not copy name');
                $('#floating-message').fadeIn(250).delay(2500).fadeOut();
                $('#clip-container').hide();
            }
        });
    }
    if (!hide_profile) {
        items.unshift({
            name: "Profile",
            callback: function () {
                var href = `${BUGZILLA.config.basepath}user_profile?user_id=${id}`;
                window.open(href, "_blank");
            }
        });
    }
    if (show_edit) {
        items.push({
            name: "Edit",
            callback: function () {
                var href = `${BUGZILLA.config.basepath}editusers.cgi?action=edit&userid=${id}`;
                window.open(href, "_blank");
            }
        });
    }
    $.contextMenu({
        selector: ".vcard_" + id,
        trigger: "left",
        items: items
    });
}

$(function() {
  $('.show_usermenu').on("click", function (event) {
    var $this = $(this);
    return show_usermenu($this.data('user-id'), $this.data('user-email'), $this.data('user-name'), $this.data('show-edit'), $this.data('hide-profile'));
  });
});
