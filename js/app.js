(function() {
    "use strict";

    $(document).ready(() => {
        const githubOrg = function() {

            const apiKey = '76de4065405d123c5116d153c7c2a3548f325320';
            let image = '';
            let orgName = '';
            let user = '';


            function bindEvents() {


                $('#search-form').on('submit', function() {
                    user = $('#search-all').val();
                    event.preventDefault();
                    getSearchResults(user);

                });
            }


            function getSearchResults(user) {
                user = encodeURIComponent(user);
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": `https://api.github.com/users/${user}/orgs?api_key=${apiKey}`,
                    'method': "GET"
                };

                $.ajax(settings).then(function(response) {
                    if (response.length > 0) {
                        displayOrgs(response);

                    } else {
                        $('.namedisplay').text(`"${user}" isn't turning anything up...`);
                        console.log(response);
                    }
                }).catch(function(status) {
                    console.log(response);
                });
            }



            function displayOrgs(data) {

                $.each(data, function(i, value) {
                    image = value.avatar_url;
                    orgName = value.login;

                    $('<div>', {
                            class: 'org-template'
                        })
                        .append($('<img/>').attr('src', image))
                        .append($('<span/>').text(orgName))
                        .appendTo('.orgs-list');
                });
                $('.namedisplay').text(user);
            }


            function init() {
                bindEvents();
            }

            return {
                init: init
            };

        };

        const gitOrg = githubOrg();
        gitOrg.init();

    });

})();
