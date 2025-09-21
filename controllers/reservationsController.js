exports.getReservationsByExternalUserId = (req, res) => {
	const externalUserId = req.params.externalUserId;
	if (!externalUserId) {
		return res.status(400).json({ error: 'Missing required parameter: externalUserId' }); // 400
	}
	reservationsModel.getReservationsByExternalUserId(externalUserId, (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Error fetching reservations' }); // 500
		}
		res.status(200).json(results); // 200
	});
};
const reservationsModel = require('../models/reservationsModel');


exports.changeSeat = (req, res) => {
	const reservationId = req.body.reservationId;
	const oldSeatId = req.body.oldSeatId;
	const newSeatId = req.body.newSeatId;
	if (!reservationId || !oldSeatId || !newSeatId) {
		return res.status(400).json({ error: 'Missing required fields' }); // 400
	}
	reservationsModel.changeSeat(reservationId, oldSeatId, newSeatId, (err, result) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Error changing seat for reservation' }); // 500
		}
		res.status(200).json(result); // 200
	});
};


exports.createReservation = (req, res) => {
    const externalFlightId = req.params.externalFlightId;
    const externalUserId = req.params.externalUserId;
    const seatIds = req.body.seatIds;
    if (!externalUserId || !externalFlightId || !Array.isArray(seatIds) || seatIds.length === 0) {
        return res.status(400).json({ error: 'Missing required fields: externalUserId (URL), externalFlightId (URL), seatIds (array)' }); // 400
    }
    reservationsModel.createReservation(externalUserId, externalFlightId, seatIds, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Seat is already reserved' }); // 500
        }
        res.status(201).json(result); // 201
    });
};

exports.cancelReservation = (req, res) => {
    const reservationId = req.params.reservationId;
    if (!reservationId) {
        return res.status(400).json({ error: 'Missing required field: reservationId (URL)' }); // 400
    }
    reservationsModel.cancelReservation(reservationId, (err, result) => {
        if (result) {
            // Si hay resultado, mostrarlo aunque haya error interno
            return res.status(200).json(result);
        }
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error cancelling reservation', details: err });
        }
        res.status(500).json({ error: 'Unknown error cancelling reservation' });
    });
};

exports.getFullReservationsByExternalUserId = (req, res) => {
    const externalUserId = req.params.externalUserId;
    if (!externalUserId) {
        return res.status(400).json({ error: 'Missing required parameter: externalUserId' }); // 400
    }
    reservationsModel.getFullReservationsByExternalUserId(externalUserId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching full reservation data' }); // 500
        }
        res.status(200).json(results); // 200
    });
};
