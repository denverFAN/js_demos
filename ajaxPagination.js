//Define variables for functions that load content
    //Values store in hidden inputs in view_user.tpl
    var userId = $("#portfolio_view_id_user").val();
    var offset = $("#offset").val();
    //SQL command that will be transferred to action:
    //ORDER BY (string) - "row in table(or variable in Model) to sort by(blank)DESC or ASC"
    //WHERE (string) - "keyword or condition (row in table=some value)"
    var sql;
    //param is transfer to action to switch view(*tpl file)
    var viewAs;

    //Tab "Sights"
    $(document).ready(function () {
        //Define selectors as variables (to improve speed)
        //for "Sights"
        var sightParentDiv = $("#sights");
        var sightSortline = sightParentDiv.find("a");
        var sightLoadDiv = $("#block_sights_list");
        //for "Photos"
        var photoParentDiv = $("#photos");
        var photoSortline = photoParentDiv.find("a");
        var photoLoadDiv = $("#block_sights_images");
        //for "Videos"
        var videoParentDiv = $("#videos");
        var videoSortline = videoParentDiv.find("a");
        var videoLoadDiv = $("#block_sights_video");
        //for "Comments"
        var commentParentDiv = $("#comments");
        var commentSortline = commentParentDiv.find("a");
        var commentLoadDiv = $("#block_sights_comments");
        //for "Reviews"
        var reviewParentDiv = $("#reviews");
        var reviewSortline = reviewParentDiv.find("a");
        var reviewLoadDiv = $("#block_sights_reviews");
        //for "Visits"
        var visitParentDiv = $("#visits");
        var visitSortline = visitParentDiv.find("a");
        var visitLoadDiv = $("#block_sights_visits");

        //Load default page first
        sightLoadDiv.load("/items/sightsList/" + userId);

        //Load content and reset offset after Tab was clicked
        $(".nav-tabs").on("click", "a", function () {
            //reset values
            sql = "";
            viewAs = "";
            var loadDiv;
            var path;
            //reload buttons
            $("#moreSights, #morePhotos, #moreVideos, #moreComments, #moreReviews, #moreVisits")
                .text("LOAD MORE").prop("disabled", false);

            setTimeout(function () {
                if ($(".tab-content #sights").hasClass("active")) {
                    loadDiv = sightLoadDiv;
                    path = "/items/sightsList/";

                } else if ($(".tab-content #photos").hasClass("active")) {
                    loadDiv = photoLoadDiv;
                    path = "/portfolio/viewImages/";

                } else if ($(".tab-content #videos").hasClass("active")) {
                    loadDiv = videoLoadDiv;
                    path = "/video/videoList/";

                } else if ($(".tab-content #comments").hasClass("active")) {
                    loadDiv = commentLoadDiv;
                    path = "/comments/commentsList/";

                } else if ($(".tab-content #reviews").hasClass("active")) {
                    loadDiv = reviewLoadDiv;
                    path = "/comments/reviewsList/";

                } else if ($(".tab-content #visits").hasClass("active")) {
                    loadDiv = visitLoadDiv;
                    path = "/items/visitsList/";

                }
                //define standard offset
                offset = 12;
                //load current content
                loadDiv.load(path + userId);
            }, 200);
        });

        //change sorting sights by click on sortline
        sightParentDiv.on("click", "a", function () {
            //reload button
            $("#moreSights").text("LOAD MORE").prop("disabled", false);
            //add active class to define sql
            sightSortline.removeClass("active");
            $(this).addClass("active");
            if ($("#sightsDateDesc").hasClass("active")) {
                sql = "date DESC";
            } else if ($("#sightsDateAsc").hasClass("active")) {
                sql = "date ASC";
            } else if ($("#sightsNameAsc").hasClass("active")) {
                sql = "name ASC";
            } else if ($("#sightsNameDesc").hasClass("active")) {
                sql = "name DESC";
            } else if ($("#sightsRatingDesc").hasClass("active")) {
                sql = "sum_count DESC";
            } else if ($("#sightsRatingAsc").hasClass("active")) {
                sql = "sum_count ASC";
            }
            //define standard offset
            offset = 12;
            //loading sorted content
            sightLoadDiv.load("/items/sightsList/" + userId, {sql: sql});
        });

        //loading more records by click on button
        sightParentDiv.on("click", "#moreSights", function () {
            $.post("/items/sightsList/" + userId, {sql: sql, offset: offset})
                .done(function(data){
                    sightLoadDiv.append(data);
                    //add new value to previous offset
                    offset = Number(offset) + 12;
                })
                .fail(function(){
                    //disable button when no more records to load
                    $("#moreSights").text("NO MORE ITEMS").prop("disabled", true);
                });
        });

        //change sorting photos by click on sortline
        photoParentDiv.on("click", "a", function () {
            //reload button
            $("#morePhotos").text("LOAD MORE").prop("disabled", false);
            //add active class to define sql/viewAs
            photoSortline.removeClass("active");
            $(this).addClass("active");
            if ($("#photosInAttractions").hasClass("active")) {
                viewAs = "inAttractions";
                $(".sortBy").hide();
            } else if ($("#photosInList").hasClass("active")) {
                viewAs = "inList";
                $(".sortBy").show();
            } else if ($("#photosDateDesc").hasClass("active")) {
                sql = "date_added DESC";
            } else if ($("#photosDateAsc").hasClass("active")) {
                sql = "date_added ASC";
            } else if ($("#photosViewsDesc").hasClass("active")) {
                sql = "views DESC";
            } else if ($("#photosViewsAsc").hasClass("active")) {
                sql = "views ASC";
            } else if ($("#photosVotesDesc").hasClass("active")) {
                sql = "votes DESC";
            } else if ($("#photosVotesAsc").hasClass("active")) {
                sql = "votes ASC";
            }

            //define standard offset
            offset = 12;
            //loading sorted content
            photoLoadDiv.load("/portfolio/viewImages/" + userId, {viewAs: viewAs, sql: sql});
        });

        //loading more records by click on button
        photoParentDiv.on("click", "#morePhotos", function () {
            $.post("/portfolio/viewImages/" + userId, {viewAs: viewAs, sql: sql, offset: offset})
                .done(function(data){
                    photoLoadDiv.append(data);
                    //add new value to previous offset
                    offset = Number(offset) + 12;
                })
                .fail(function(){
                    //disable button when no more records to load
                    $("#morePhotos").text("NO MORE ITEMS").prop("disabled", true);
                });
        });

        //change sorting videos by click on sortline
        videoParentDiv.on("click", "a", function () {
            //reload button
            $("#moreVideos").text("LOAD MORE").prop("disabled", false);
            //add active class to define sql/viewAs
            videoSortline.removeClass("active");
            $(this).addClass("active");
            if ($("#videosInAttractions").hasClass("active")) {
                viewAs = "inAttractions";
                $(".sortBy").hide();
            } else if ($("#videosInList").hasClass("active")) {
                viewAs = "inList";
                $(".sortBy").show();
            } else if ($("#videosDateDesc").hasClass("active")) {
                sql = "date DESC";
            } else if ($("#videosDateAsc").hasClass("active")) {
                sql = "date ASC";
            }
            //define standard offset
            offset = 12;
            //loading sorted content
            videoLoadDiv.load("/video/videoList/" + userId, {viewAs: viewAs, sql: sql});
        });

        //loading more records by click on button
        videoParentDiv.on("click", "#moreVideos", function () {
            $.post("/video/videoList/" + userId, {viewAs: viewAs, sql: sql, offset: offset})
                .done(function(data){
                    videoLoadDiv.append(data);
                    //add new value to previous offset
                    offset = Number(offset) + 12;
                })
                .fail(function(){
                    //disable button when no more records to load
                    $("#moreVideos").text("NO MORE ITEMS").prop("disabled", true);
                });
        });

        //change sorting comments by click on sortline
        commentParentDiv.on("click", "a", function () {
            //reload button
            $("#moreComments").text("LOAD MORE").prop("disabled", false);
            //add active class to define sql
            commentSortline.removeClass("active");
            $(this).addClass("active");
            if ($("#commentsDateDesc").hasClass("active")) {
                sql = "dttm DESC";
            } else if ($("#commentsDateAsc").hasClass("active")) {
                sql = "dttm ASC";
            }
            //define standard offset
            offset = 12;
            //loading sorted content
            commentLoadDiv.load("/comments/commentsList/" + userId, {sql: sql});
        });

        //loading more records by click on button
        commentParentDiv.on("click", "#moreComments", function () {
            $.post("/comments/commentsList/" + userId, {sql: sql, offset: offset})
                .done(function(data){
                    commentLoadDiv.append(data);
                    //add new value to previous offset
                    offset = Number(offset) + 12;
                })
                .fail(function(){
                    //disable button when no more records to load
                    $("#moreComments").text("NO MORE ITEMS").prop("disabled", true);
                });
        });

        //change sorting reviews by click on sortline
        reviewParentDiv.on("click", "a", function () {
            //reload button
            $("#moreReviews").text("LOAD MORE").prop("disabled", false);
            //add active class to define sql
            reviewSortline.removeClass("active");
            $(this).addClass("active");
            if ($("#reviewsDateDesc").hasClass("active")) {
                sql = "dttm DESC";
            } else if ($("#reviewsDateAsc").hasClass("active")) {
                sql = "dttm ASC";
            } else if ($("#reviewsVotesDesc").hasClass("active")) {
                sql = "votes DESC";
            } else if ($("#reviewsVotesAsc").hasClass("active")) {
                sql = "votes ASC";
            }
            //define standard offset
            offset = 12;
            //loading sorted content
            reviewLoadDiv.load("/comments/reviewsList/" + userId, {sql: sql});
        });

        //loading more records by click on button
        reviewParentDiv.on("click", "#moreReviews", function () {
            $.post("/comments/reviewsList/" + userId, {sql: sql, offset: offset})
                .done(function(data){
                    reviewLoadDiv.append(data);
                    //add new value to previous offset
                    offset = Number(offset) + 12;
                })
                .fail(function(){
                    //disable button when no more records to load
                    $("#moreReviews").text("NO MORE ITEMS").prop("disabled", true);
                });
        });

        //change sorting visits by click on sortline
        visitParentDiv.on("click", "a", function () {
            //reload button
            $("#moreVisits").text("LOAD MORE").prop("disabled", false);
            //add active class to define sql
            visitSortline.removeClass("active");
            $(this).addClass("active");
            if ($("#beenThere").hasClass("active")) {
                sql = "beenThere";
            } else if ($("#wantVisit").hasClass("active")) {
                sql = "wantVisit";
            }
            //define standard offset
            offset = 12;
            //loading sorted content
            visitLoadDiv.load("/items/visitsList/" + userId, {sql: sql});
        });

        //loading more records by click on button
        visitParentDiv.on("click", "#moreVisits", function () {
            $.post("/items/visitsList/" + userId, {sql: sql, offset: offset})
                .done(function(data){
                    visitLoadDiv.append(data);
                    //add new value to previous offset
                    offset = Number(offset) + 12;
                })
                .fail(function(){
                    //disable button when no more records to load
                    $("#moreVisits").text("NO MORE ITEMS").prop("disabled", true);
                });
        });
    });