import fs from 'fs';

export const register = (name, password, role) => {
  const filePath = 'src/data.json';

  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) console.error(error.message);

    let users = JSON.parse(data);

    users.push({ name, password, role, isLogin: false });

    fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (error) => {
      if (error) console.error(error.message);
      console.log('Berhasil register');
    });
  });
};
