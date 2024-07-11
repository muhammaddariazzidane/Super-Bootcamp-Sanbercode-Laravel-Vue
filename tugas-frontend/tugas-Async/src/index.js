import { register } from './lib/register';
import { login } from './lib/login';
import { addSiswa } from './lib/addSiswa';

const [, , command, userInput] = process.argv;

if (command === 'register') {
  const [name, password, role] = userInput.split(',');
  register(name, password, role);
} else if (command === 'login') {
  const [name, password] = userInput.split(',');
  login(name, password);
} else if (command === 'addSiswa') {
  const [studentName, trainerName] = userInput.split(',');
  addSiswa(studentName, trainerName);
}
