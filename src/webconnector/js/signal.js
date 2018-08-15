(function() {
  // Create the connector object
  var myConnector = tableau.makeConnector();

  // Define the schema
  myConnector.getSchema = function(schemaCallback) {
    // Schema for magnitude and place data
    var signal_cols = [{
      id: "id",
      alias: "db id number",
      dataType: tableau.dataTypeEnum.string
    },{
      id: "signal_id",
      alias: "uid number",
      dataType: tableau.dataTypeEnum.string
    },{
      id: "status",
      alias: "status",
      dataType: tableau.dataTypeEnum.string
    },{
      id: "source",
      alias: "system source of signal",
      dataType: tableau.dataTypeEnum.string
    },{
      id: "text",
      alias: "is active",
      dataType: tableau.dataTypeEnum.bool
    },{
      id: "text_extra",
      alias: "address",
      dataType: tableau.dataTypeEnum.string
    }, {
      id: "lat",
      alias: "latitude",
      dataType: tableau.dataTypeEnum.float
    }, {
      id: "lon",
      alias: "longitude",
      dataType: tableau.dataTypeEnum.float
    }, {
      id: "buurt_code",
      alias: "buurt code",
      dataType: tableau.dataTypeEnum.string
    }, {
      id: "stadsdeel",
      alias: "stadsdeel",
      dataType: tableau.dataTypeEnum.string
    }, {
      id: "category main",
      alias: "category main",
      dataType: tableau.dataTypeEnum.string
    }, {
      id: "category sub",
      alias: "category sub",
      dataType: tableau.dataTypeEnum.string
    }, {
      id: "created at",
      dataType: tableau.dataTypeEnum.date
    }, {
      id: "incident_date_start",
      dataType: tableau.dataTypeEnum.date
    }, {
      id: "incident_date_end",
      dataType: tableau.dataTypeEnum.date
    }, {
      id: "extra",
      alias: "various extra properties",
      dataType: tableau.dataTypeEnum.date
    }

    ];

    var signalTable = {
      id: "signals",
      alias: "signal",
      columns: signal_cols
    };

    // Schema for time and URL data
    // var time_url_cols = [{
    //   id: "id",
    //   dataType: tableau.dataTypeEnum.string
    // }, {
    //   id: "time",
    //   alias: "time",
    //   dataType: tableau.dataTypeEnum.date
    // }, {
    //   id: "url",
    //   alias: "url",
    //   dataType: tableau.dataTypeEnum.string
    // }];

    //var timeUrlTable = {
    //    id: "timeUrl",
    //    alias: "Time and URL Data",
    //    columns: time_url_cols
    //};

    schemaCallback([
      signalTable,
      // timeUrlTable
    ]);
  };

  // Download the data
  myConnector.getData = function(table, doneCallback) {
  // var dateObj = JSON.parse(tableau.connectionData),
  // dateString = "starttime=" + dateObj.startDate + "&endtime=" + dateObj.endDate,

    //var apiCall = "https://api.data.amsterdam.nl/signals/signal/";  // + dateString + "";
    var apiCall = "http://localhost:8889/localhost:8000/signals/auth/signal/";  // + dateString + "";

    var params = {
      "format": "json",
      // "detailed": 1,
      "page_size": 100,
      "page": 1,
    };

    //var hasresults = [];
    var feat = [];
    var promises = [];
    var totalcount = 0;

    function getPage(page) {

      params.page = page;

      promises.push($.getJSON(apiCall, params, function(resp) {

        totalcount = resp.count;
        feat = resp.results;

        var tableData = [];
        var i = 0;
        var row = [];
        var len = 0;

        if( feat === undefined || feat.length === 0 ){
          return;
        } else {
          if (table.tableInfo.id == "signals") {
            for (i = 0, len = feat.length; i < len; i++) {
              row = {
                "id": feat[i].id,
                "signal_id": feat[i].signal_id,
                "address": feat[i].location.address_text,
                "stadsdeel": feat[i].location.stadsdeel,
                "buurt_code": feat[i].location.buurt_code,
                "lon": feat[i].location.geometrie.coordinates[0],
                "lat": feat[i].location.geometrie.coordinates[1],
                "status": feat[i].status.state,
                "category main": feat[i].category.main,
                "category sub": feat[i].category.sub,
                "text": feat[i].text,
                "text_extra": feat[i].text_extra,
                "created_at": feat[i].created_at,
                "incident_date_start": feat[i].incident_date_start,
                "incident_date_end": feat[i].incident_date_end,
                "extra_properties": feat[i].extra_properties
              };

              //if(feat[i].well !== null) {
              //  row.lon = feat[i].well.geometrie.coordinates[0];
              //  row.lat = feat[i].well.geometrie.coordinates[1];
              //  row.buurt_code = feat[i].well.buurt_code;
              //  row.site = feat[i].well.site;
              //}
              //for each (datefield in alldatefiels){
              //  if(row.placing_date !== null) {
              //    row.placing_date = row.placing_date.toString().slice(0, 10);
              //  }
              //}

              tableData.push(row);
            }
          }
          table.appendRows(tableData);
        }
      }));
    }

    function loadAPI(totalpages){
      var page = 2;
      while (page <= totalpages){
        // get the next page.
        getPage(page);
        page += 1;
      }
    }

    function slurpAPI(){
      // load the fist page
      getPage(1);
      $.when.apply($, promises).then(function(){
        loadAPI(Math.ceil(totalcount / params.page_size));
      });
    }

    slurpAPI();

    // wait until all pages are loaded.
    $.when.apply($, promises).then(function(){
      // we are done loading out api
      doneCallback();
    });

  };

  tableau.registerConnector(myConnector);

  // This function togglels the label shown depending
  // on whether or not the user has been authenticated
  function updateUIWithAuthState(hasAuth) {
    console.log("test");
    console.log(hasAuth);
    if (hasAuth) {
      $(".notsignedin").css("display", "none");
      $(".signedin").css("display", "block");
    } else {
      $(".notsignedin").css("display", "block");
      $(".signedin").css("display", "none");
    }
  }

  $(document).ready(function() {
    $("#submitButton").click(function() {
      tableau.connectionName = "Signals"; // This will be the data source name in Tableau
      tableau.submit(); // This sends the connector object to Tableau
    });

    updateUIWithAuthState(false);
    $("#loginButton").click(function() {
      // console.log("lets login!");
    });
  });

})();
