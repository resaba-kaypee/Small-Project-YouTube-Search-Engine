const api_key = "AIzaSyB_ppYsBmzz0I7fT-tr4OVh4pThBQeUdCE";

$(function() {
  const searchField = $("#query");
  const icon = $("#search-btn");

  $(searchField).on("focus", function() {
    $(this).animate(
      {
        width: "100%"
      },
      400
    );

    $(icon).animate(
      {
        right: "0px"
      },
      400
    );
  });

  $(searchField).on("blur", function() {
    if (searchField.val() == "") {
      $(searchField).animate(
        {
          width: "45%"
        },
        400
      );
      $(icon).animate(
        {
          right: "355px"
        },
        400
      );
    }
  });

  $("#search-form").on("submit", function(e) {
    e.preventDefault();
    search();
  });
});

$("#next-button").click(function(){
  console.log('hi');
});

function search() {
  //reset results
  $("#results").html("");
  $("#button").html("");

  //query input
  let query = $("#query").val();

  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet%2C%20id&q=${query}&type=video&key=AIzaSyB_ppYsBmzz0I7fT-tr4OVh4pThBQeUdCE`,
    method: "GET",
    data: {
      format: "json"
    },
    success: function(data) {
      const prevPageToken = data.prevPageToken;
      const nextPageToken = data.nextPageToken;

      //display results
      $.each(data.items, function(i, item) {
        let output = getOutPut(item);
        $("#results").append(output);
      });

      //display buttons;
      const buttons = getButtons(prevPageToken, nextPageToken);
      $("#button").append(buttons);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function nextPage() {
  let token = $("#next-button").data("token");
  let query = $("#next-button").data("query");
  //reset results
  $("#results").html("");
  $("#button").html("");

  //query input
  query = $("#query").val();

  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet%2C%20id&pageToken=${token}&q=${query}&type=video&key=AIzaSyB_ppYsBmzz0I7fT-tr4OVh4pThBQeUdCE`,
    method: "GET",
    data: {
      format: "json"
    },
    success: function(data) {
      const prevPageToken = data.prevPageToken;
      const nextPageToken = data.nextPageToken;

      //display results
      $.each(data.items, function(i, item) {
        let output = getOutPut(item);
        $("#results").append(output);
      });

      //display buttons;
      const buttons = getButtons(prevPageToken, nextPageToken);
      $("#button").append(buttons);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function prevPage() {
  let token = $("#prev-button").data("token");
  let query = $("#prev-button").data("query");
  //reset results
  $("#results").html("");
  $("#button").html("");

  //query input
  query = $("#query").val();

  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet%2C%20id&pageToken=${token}&q=${query}&type=video&key=AIzaSyB_ppYsBmzz0I7fT-tr4OVh4pThBQeUdCE`,
    method: "GET",
    data: {
      format: "json"
    },
    success: function(data) {
      const prevPageToken = data.prevPageToken;
      const nextPageToken = data.nextPageToken;

      //display results
      $.each(data.items, function(i, item) {
        let output = getOutPut(item);
        $("#results").append(output);
      });

      //display buttons;
      const buttons = getButtons(prevPageToken, nextPageToken);
      $("#button").append(buttons);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function getOutPut(item) {
  let { videoId } = item.id;
  let thumbnail = item.snippet.thumbnails.high.url;
  let { title, description, publishedAt, channelTitle } = item.snippet;

  let output = `<li>
  <div class="list-left">
  <img src="${thumbnail}">
  </div>
  <div class="list-right">
  <h3><a data-fancybox data-type="iframe" href="http://www.youtube.com/embed/${videoId}">${title}</a></h3>
  <small>By <span class="cTitle">${channelTitle} on ${publishedAt}</span></small>
  <p>${description}</p>
  </div>
  </li>`;

  return output;
}

function getButtons(prevPageToken, nextPageToken) {
  let output;
  if (!prevPageToken) {
    output = `
  <div class="button-container">
  <button id="next-button" class="paging-button" data-token="${nextPageToken}" data-query="${query}" onclick="nextPage()">Next Page</button>
  </div>`;
  } else {
    output = `
  <div class="button-container">
  <button id="prev-button" class="paging-button" data-token="${prevPageToken}" data-query="${query}" onclick="prevPage()">Prev Page</button>
    <button id="next-button" class="paging-button" data-token="${nextPageToken}" data-query="${query}" onclick="nextPage()">Next Page</button>
    </div>`;
  }
  return output;
}
