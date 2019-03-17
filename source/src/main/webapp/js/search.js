function mysubmit() {

	var departure = $('#departure').val();
	var date = $('#date').val();
	$.ajax({
		type: "post",
		url: '/ws/flight/search',
		data: {
			'departure': departure,
			'date': date
		},
		dataType: "json",
		success: function(data) {
			var tbl = "<table class=\"table table-striped custab\">\r\n" +
				"               <thead>\r\n" +
				"                  <tr>\r\n" +
				"                     <th>ID</th>\r\n" +
				"                     <th>Departure</th>\r\n" +
				"                     <th>Date</th>\r\n" +
				"                     <th>Seat</th>\r\n" +
				"                     <th>Price</th>\r\n" +
				"                     <th class=\"text-center\">Action</th>\r\n" +
				"                  </tr>\r\n" +
				"               </thead>"

			for (var i = 0; i < data.length; i++) {
				var obj = JSON.parse(data[i]);
				var td0 = "<tr><td>" + obj.id + "</td>";
				var td1 = "<td>" + obj.departure + "</td>";
				var td2 = "<td>" + moment(obj.date).format("MMMM Do YYYY") + "</td>";
				var td3 = "<td>" + obj.seat + "</td>";
				var td4 = "<td>" + obj.price + "</td>";
				var td5 = "<td class=\"text-center\"><a class='btn btn-info btn-xs' href=\"#\"><span class=\"glyphicon glyphicon-ok\"></span> See</a> </td></tr>"

				tbl += td0 + td1 + td2 + td3 + td4 + td5;

			}
			tbl += "</table>"
			document.getElementById("div1").innerHTML = "";
			$("#div1").append(tbl);
		}
	})
}

$(function() {
	
	var today = moment().format("YYYY-MM-DD");
	document.getElementById('date').setAttribute("min", today);
	
});

