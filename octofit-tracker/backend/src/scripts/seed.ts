import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya.moves', email: 'maya@example.com', name: 'Maya Chen' },
      { username: 'leo.lifts', email: 'leo@example.com', name: 'Leo Martinez' },
      { username: 'amina.runs', email: 'amina@example.com', name: 'Amina Hassan' },
      { username: 'noah.trains', email: 'noah@example.com', name: 'Noah Williams' },
    ]);
    const teams = await Team.create([
      {
        name: 'Trail Blazers',
        description: 'Outdoor miles and steady progress.',
        members: [users[0]._id, users[1]._id],
        points: 285,
      },
      {
        name: 'Pulse Crew',
        description: 'Building strength and consistency together.',
        members: [users[2]._id, users[3]._id],
        points: 320,
      },
    ]);

    await Promise.all([
      User.updateMany(
        { _id: { $in: [users[0]._id, users[1]._id] } },
        { $set: { team: teams[0]._id } },
      ),
      User.updateMany(
        { _id: { $in: [users[2]._id, users[3]._id] } },
        { $set: { team: teams[1]._id } },
      ),
    ]);

    const now = Date.now();
    await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        calories: 310,
        completedAt: new Date(now - 86_400_000),
      },
      {
        user: users[1]._id,
        type: 'Strength training',
        durationMinutes: 45,
        calories: 280,
        completedAt: new Date(now - 43_200_000),
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        durationMinutes: 50,
        calories: 420,
        completedAt: new Date(now - 21_600_000),
      },
      {
        user: users[3]._id,
        type: 'Yoga',
        durationMinutes: 30,
        calories: 140,
        completedAt: new Date(now),
      },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 150, rank: 2 },
      { user: users[1]._id, points: 135, rank: 4 },
      { user: users[2]._id, points: 180, rank: 1 },
      { user: users[3]._id, points: 140, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Easy pace run',
        activityType: 'Running',
        durationMinutes: 30,
        difficulty: 'beginner',
        description: 'A relaxed run focused on building aerobic endurance.',
      },
      {
        title: 'Full-body strength',
        activityType: 'Strength training',
        durationMinutes: 40,
        difficulty: 'intermediate',
        description: 'A balanced circuit for legs, push, pull, and core.',
      },
      {
        title: 'Tempo ride',
        activityType: 'Cycling',
        durationMinutes: 45,
        difficulty: 'advanced',
        description: 'A sustained cycling effort with controlled tempo intervals.',
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding octofit_db:', error);
  process.exitCode = 1;
});
