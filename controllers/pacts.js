const db = require("../models");
// const moment = require('moment')

const index = async (req, res) => {
	let userId = req.params.id;
	try {
		const Pacts = await db.Pact.find({ "users.user": userId })
			.populate("users collaborators performers")
			.exec();
		if (!Pacts.length)
			return res.json({
				message: "none found",
			});
		await res.json({ pact: Pacts });
	} catch (error) {
		console.log(error);
	}
};

const show = async (req, res) => {
	try {
		const foundPact = await db.Pact.findOne({ _id: req.params.id });
		console.log(foundPact);
		await res.json(foundPact);
	} catch (error) {
		console.log(error);
	}
};

const create = async (req, res) => {
	const body = JSON.parse(req.body.body);
	const users = body.users;
	const collabs = body.collaborators;
	const initBy = body.initBy.name;
	const lastUpdated = body.lastUpdated;
	let userIds = [];
	let collabIds = [];
	for (let id of collabs) {
		collabIds.push(id.user);
	}
	for (let id of users) {
		userIds.push(id.user);
	}
	try {
		const newPact = await db.Pact.create(body);
		await newPact.save();
		const foundUsers = await db.User.find().where("_id").in(userIds).exec();
		foundUsers.map(async (user) => {
			user.pacts.push(newPact);
			await user.save();
		});
		const newNotification = await db.Notification.create({
			pactId: newPact._id,
			text: ` created a ${body.type} for `,
			initBy: initBy,
			recordTitle: body.recordTitle,
			pactStatus: 1,
			date: lastUpdated,
		});
		await newNotification.save();
		const foundCollabs = await db.User.find().where("_id").in(collabIds).exec();
		foundCollabs.map(async (user) => {
			user.notifications.push(newNotification);
			await user.save();
		});
		await res.json({ pact: newPact });
	} catch (error) {
		console.log(error);
	}
};

const update = async (req, res) => {
	const pactId = req.body._id;
	const user = req.body.user;
	const users = req.body.users;
	const status = req.body.status;
	const signatureImg = req.body.signatureImg;
	const otherUsers = req.body.otherUsers;
	const producer = req.body.producer;
	const performers = req.body.performers;
	const countering = req.body.countering;
	let lastUpdated = req.body.lastUpdated;
	let otherUserIds = [];
	for (let id of otherUsers) {
		otherUserIds.push(id.user);
	}
	try {
		const updatedPact = await db.Pact.findOneAndUpdate(
			{ _id: pactId },
			{
				$set: {
					status: status,
					lastUpdated: lastUpdated,
					performers: performers,
					producer: producer,
					users: users,
				},
			},
			{ new: true }
		);
		await updatedPact.save();
		let newNotification;
		if (status === 1 && countering === false) {
			newNotification = await db.Notification.create({
				pactId: pactId,
				text: ` accepted the ${req.body.type} for `,
				initBy: req.body.name,
				recordTitle: req.body.recordTitle,
				pactStatus: status,
				date: lastUpdated,
			});
		} else if (status === 1 && countering === true) {
			newNotification = await db.Notification.create({
				pactId: pactId,
				text: ` proposed a counter for `,
				initBy: req.body.name,
				recordTitle: req.body.recordTitle,
				pactStatus: status,
				date: lastUpdated,
			});
		} else {
			newNotification = await db.Notification.create({
				pactId: pactId,
				text: `The ${req.body.type} for `,
				initBy: req.body.name,
				recordTitle: req.body.recordTitle,
				pactStatus: status,
				date: lastUpdated,
			});
		}
		await newNotification.save();
		const foundUsers = await db.User.find()
			.where("_id")
			.in(otherUserIds)
			.exec();
		foundUsers.map(async (user) => {
			user.notifications.push(newNotification);
			await user.save();
		});
		await res.json({ pact: updatedPact });
	} catch (error) {
		console.log(error);
	}
};

const destroy = async (req, res) => {
	try {
		const deletedPact = await db.Pact.findByIdAndDelete(req.params.id);
		const foundUsers = await db.User.find({ pacts: deletedPact._id });
		foundUsers.map((user) => {
			user.pacts.remove(deletedPact);
			user.save();
		});
		await res.json({ pact: deletedPact });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	index,
	show,
	create,
	update,
	destroy,
};
