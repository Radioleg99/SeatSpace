/**
 * This a sample data for the seat layout.
 *
 * Layout data is stored in a array.
 * Each Zone is a object with the following properties: zoneId, zoneOffsetX, zoneOffsetY, rotation, seats
 *
 * To compress the data size, seats data is stored in a 2D array.
 * Each seat is represented by an array of 4 elements: [seatId, rating, row, seatNumber]
 *  */
const sampleData = [
	{
		zoneId: 1,
		zoneOffsetX: 0,
		zoneOffsetY: 0,
		rotation: 0,
		seats: [
			[100, 0, 1, 1],
			[101, 4, 1, 2],
			[102, 2, 1, 3],
			[103, 1, 1, 4],
			[104, 3, 1, 5],
			[105, 5, 1, 6],
			[106, 0, 2, 1],
			[107, 4, 2, 2],
			[108, 2, 2, 3],
			[109, 1, 2, 4],
			[110, 3, 2, 5],
			[111, 5, 2, 6],
			[112, 0, 3, 1],
			[113, 4, 3, 2],
			[114, 2, 3, 3],
			[115, 1, 3, 4],
			[116, 3, 3, 5],
			[117, 5, 3, 6],
		],
	},
	{
		zoneId: 2,
		zoneOffsetX: 0,
		zoneOffsetY: 150,
		rotation: 50,
		seats: [
			[118, 0, 1, 1],
			[119, 4, 1, 2],
			[120, 2, 1, 3],
			[121, 1, 1, 4],
			[122, 3, 1, 5],
			[123, 5, 1, 6],
			[124, 0, 2, 1],
			[125, 4, 2, 2],
			[126, 2, 2, 3],
			[127, 1, 2, 4],
			[128, 3, 2, 5],
			[129, 5, 2, 6],
			[130, 0, 3, 1],
			[131, 4, 3, 2],
			[132, 2, 3, 3],
			[133, -1, 3, 4],
			[134, 3, 3, 5],
			[135, 5, 3, 6],
		],
	},
]

export default sampleData
