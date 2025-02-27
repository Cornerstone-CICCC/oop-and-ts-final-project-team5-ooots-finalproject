import { writable } from "svelte/store";

export const data = writable([
		{
			id: "T1",
			name: "Todo",
			items: [
				{id: 1, members: [], tags: ["March"], name: "St. Patrick’s Day", desc: "an Irish holiday that’s celebrated throughout the week at various venues around town", date: "17/03/2025", state: 0, },
				{id: 2, members: [],  tags: ["March"],  name: "Vancouver Chocolate Run", desc: "A running event hosted by Try Events at Stanley Park.", date: "01/03/2025,", state: 0},
				{id: 3, members: [],  tags: ["March"], name: "Carnival at Lansdowne Centre", desc: "Lansdowne Centre Mall in Richmond hosts a carnival by West Coast Amusements each spring. The event features amusement rides, food and games.", date: "29/03/2025", state: 0, comment: "Ends at middle April " },
				{id: 4, members: [],  tags: ["March"], name: "Silent Movie Mondays", desc: "Vancouver Civic Theatres presents a screening of Piccadilly with live music at the Orpheum Theatre. ", date: "10/03/2025", state: 0 },
				{id: 5, members: [],  tags: ["March"], name: "The Big Picnic", desc: "Is a free event where people bring their families, friends, picnics and something to sit on and to enjoy an afternoon of live entertainment and cherry blossom viewing.", date: "29/03/2025", state: 0, comment: "Ends of April" },
				{id: 6, members: [],  tags: ["March"], name: "International Wine Festival", desc: "One of North America’s largest, oldest and most prestigious wine shows.", date: "02/03/2025", state: 0, comment: "Begins in February 22nd till March 2" },
				{id: 7, members: [],  tags: ["March"],name: "Festival du Bois", desc: "Featuring a weekend of French-Canadian music, food and festivities in Coquitlam, Festival du Bois is Metro Vancouver’s premier Francophone festival.", date: "07/03/2025", state: 0, comment: "Till March 9" },
			]
		},
		{
			id: "I1",
			name: "In Progress",
			items: [
				{id: 8, members: [],  tags:["April"], name: "Big Easter Run", desc: "happens at Jericho Beach in Vancouver. The event is fun and open to all ages with 1K to 10K runs.", date: "19/04/2025", state: 0},
				{id: 9, members: [],  tags:["April"], name: "Party for the Planet", desc: "Largest Earth Day event. It’s free and takes place on a Saturday in April outside Surrey City Hall.", date: "26/04/2025", state: 0 },
				{id: 10, members: [],  tags:["April"], name: "Food Truck Fest", desc: "Event hosted by the Greater Vancouver Food Truck Festival with 20+ food trucks, live music and artisan vendors at UBC", date: "03/04/2025", state: 0, comment: "Till April 4th" },
				{id: 11, members: [],  tags:["April"], name: "Brewhalla", desc: "Festival hosts a beer-themed event in North Vancouver. It’s at the Shipyards and features craft beer, food vendors, live music and more.", date: "11/04/2025", state: 0 },
				{id: 12, members: [],  tags:["April"], name: "Food Truck Wars", desc: "A major food truck festival with live music, a beer garden and artisan vendors at the Cloverdale Fairgrounds in Surrey.", date: "11/04/2025", state: 0, comment: "Till April 13th" },
				{id: 13, members: [],  tags:["April"], name: "Art Vancouver", desc: "Contemporary art fair featuring international artwork, panelists, classes and more at the Vancouver Convention Centre in the spring each year.", date: "24/04/2025", state: 0, comment: "Till April 27th" },
				{id: 14, members: [],  tags:["April"], name: "Abbotsford Tulip Festival ", desc: "The Abbotsford Tulip Festival is a massive flower show that features 35 acres of fields, including 28 for tulips.", date: "06/04/2025", state: 0, comment: "Till may 5th"},
			]
		},
		{
			id: "D1",
			name: "Done",
			items: [
				{id: 15, members: [],  tags:["May"], name: "Big Jungle Run", desc: " A family-friendly running event around Burnaby Lake.", date: "31/05/2025", state: 0 },
				{id: 16, members: [],  tags:["May"], name: " The Search for the Perfect Pint ", desc: "A fundraising event hosted by the Rotary Club of Port Moody, Search for the Perfect Pint is a beer-tasting event that showcases craft breweries and local food.", date: "02/05/2025", state: 0 },
				{id: 17, members: [],  tags:["May"], name: "Hong Kong Fair", desc: "A cultural celebration with exhibitions, games, market vendors and more in North Vancouver.", date: "05/05/2025", state: 0, comment: "The date is not confirmed yet, could change." },
				{id: 18, members: [],  tags:["May"], name: "Royal Canadian International Circus", desc: "The Royal Canadian Circus is in Metro Vancouver in May with acrobats, aerialists, motorcycle stunts and other great acts in Richmond and Surrey.", date: "08/05/2025", state: 0, comment: "Till May 19th" },
				{id: 19, members: [],  tags:["May"], name: "Vancouver Comic Arts Festival", desc: "A comic-themed trade show with workshops, presentations, games and other activities at Vancouver’s Roundhouse Community Centre.", date: "17/05/2025", state: 0, comment: "Till May 19th" },
				{id: 20, members: [],  tags:["May"], name: "Victoria Day", desc: "Celebrated in Metro Vancouver with a parade, car show and other events, Victoria Day is a stat holiday that takes place on a Monday in May.", date: "16/05/2025", state: 0, comment: "Till May 19th" },
				{id: 21, members: [],  tags:["May"], name: "Mother’s Day Powwow ", desc: "Traditional dancers, drummers and market vendors at Vancouver’s Trout Lake Community Centre over the Mother’s Day weekend. Admission is free and everyone is welcome.", date: "10/05/2025", date: "", state: 0 },
			]
		}
	]
);

export const members = [
	{
		id:1,
		name: 'Majito',
	},
	{
		id:2,
		name: 'Julio'
	},
	{
		id: 3,
		name: 'Phil'
	},
	{
		id:4,
		name: 'Mizuki'
	}
]