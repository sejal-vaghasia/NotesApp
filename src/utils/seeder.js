// src/utils/seeder.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
var random = require('generate-random-data');
const { lorem } = require('txtgen/dist/cjs/txtgen.js');
const { paragraph } = require('txtgen/dist/cjs/txtgen.js');
const Users = require('../models/Users');
const Notes = require('../models/Notes');
const SharedNotes = require('../models/SharedNotes');
noteCount = 20;
userCount = 20;
mongoose.connect("mongodb://127.0.0.1:27017/notes_app_db");
// Dummy users data

const usersData = [];

for (let index = 0; index <= userCount; index++) {
    const singleUser = { username: random.name(), email: random.email("gmail.com"), password: '123456789' };
    usersData.push(singleUser)
}

// Dummy notes data
const notesData = [];
for (let index = 0; index <= noteCount; index++) {
    const singleNote = { title: random.word(2, 6), content: random.sentence(5, 10) }
    notesData.push(singleNote)
}

// Seed Users
async function seedUsers() {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedUsersData = usersData.map(user => ({
            ...user,
            password: bcrypt.hashSync(user.password, salt)
        }));
        await Users.insertMany(hashedUsersData);
        console.log('Users seeded successfully');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
}

// Seed Notes
async function seedNotes() {
    try {
        notesData.forEach(async (singleNote) => {
            constrandomUser = await Users.findOne({ _id: { $ne: singleNote._id } })
            const note = new Notes({ userId: constrandomUser._id, title: singleNote.title, content: singleNote.content });
            const createdNote = await note.save();
        });
        console.log('Notes seeded successfully');
    } catch (err) {
        console.error('Error seeding notes:', err);
    }
}

// Seed SharedNotes from existing Users and Notes
async function seedSharedNotesFromUsersAndNotes() {
    try {
        const users = await Users.find().lean();
        const notes = await Notes.find().lean();

        const sharedNotesData = [];

        users.forEach(user => {
            const numberOfNotesToShare = Math.floor(Math.random() * notes.length) + 1;

            const notesToShare = notes.filter(note => String(note.userId) !== String(user._id)).slice(0, numberOfNotesToShare);

            notesToShare.forEach(note => {
                sharedNotesData.push({ userId: user._id, noteId: note._id });
            });
        });

        await SharedNotes.insertMany(sharedNotesData);
        console.log('Shared notes seeded successfully');
    } catch (err) {
        console.error('Error seeding shared notes from users and notes:', err);
    } finally {
        mongoose.disconnect();
    }
}

// Seed all data
async function seedAllData() {
    try {
        await seedUsers();
        await seedNotes();
        await seedSharedNotesFromUsersAndNotes();
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        mongoose.disconnect();
    }
}

seedAllData();
