import fs from 'fs/promises';

export const addSiswa = async (studentName, trainerName) => {
  const filePath = 'src/data.json';
  try {
    let data = await fs.readFile(filePath, 'utf8');
    let users = JSON.parse(data);

    const admin = users.find((user) => user.role === 'admin' && user.isLogin);

    if (!admin)
      throw new Error(
        'Only admin can add students and admin must be logged in'
      );

    const trainer = users.find(
      (user) => user.name === trainerName && user.role === 'trainer'
    );

    if (!trainer) throw new Error('Trainer not found');

    if (!trainer.students) trainer.students = [];
    trainer.students.push({ name: studentName });

    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');
    console.log('Berhasil add siswa');
  } catch (error) {
    console.error(error.message);
  }
};
