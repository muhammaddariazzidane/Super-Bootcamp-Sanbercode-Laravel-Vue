import fs from 'fs/promises';

export const login = (name, password) => {
  const filePath = 'src/data.json';

  fs.readFile(filePath, 'utf8')
    .then((data) => {
      let users = JSON.parse(data);

      const user = users.find(
        (user) => user.name === name && user.password === password
      );

      if (!user) throw new Error('User not found or incorrect password');

      user.isLogin = true;
      return fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');
    })
    .then(() => {
      console.log('Berhasil login');
    })
    .catch((error) => {
      console.error(error.message);
    });
};
